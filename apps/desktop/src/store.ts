import { createQuery } from "@tanstack/solid-query";
import { Store } from "@tauri-apps/plugin-store";
import { onCleanup } from "solid-js";
import type { GeneralSettingsStore } from "~/utils/general-settings";
import type {
	AuthStore,
	HotkeysStore,
	PresetsStore,
	RecordingSettingsStore,
} from "~/utils/tauri";

let _store: Promise<Store> | undefined;
const store = () => {
	if (!_store) {
		_store = Store.load("store");
	}

	return _store;
};

function declareStore<T extends object>(name: string, defaults?: T) {
	const withDefaults = (value?: T) =>
		defaults ? { ...defaults, ...(value ?? {}) } : value;
	const get = async () => {
		const s = await store();
		return withDefaults(await s.get<T>(name));
	};
	const listen = (fn: (data?: T | undefined) => void) =>
		store().then((s) =>
			s.onKeyChange<T>(name, (data) => fn(withDefaults(data))),
		);

	return {
		get,
		listen,
		set: async (value?: Partial<T>) => {
			const s = await store();
			if (value === undefined) s.delete(name);
			else {
				const current = (await s.get<T>(name)) || {};
				await s.set(name, {
					...current,
					...value,
				});
			}
			await s.save();
		},
		createQuery: () => {
			const query = createQuery(() => ({
				queryKey: ["store", name],
				queryFn: async () => (await get()) ?? null,
			}));

			const cleanup = listen(() => {
				query.refetch();
			});
			onCleanup(() => cleanup.then((c) => c()));

			return query;
		},
	};
}

export const presetsStore = declareStore<PresetsStore>("presets");

// Personal fork: spoof a permanently signed-in + Pro user across EVERY API
// (.get, .listen, .createQuery). The real Tauri "auth" store is never read.
const FAKE_AUTH: AuthStore = {
	secret: { token: "local-fork", expires: Number.MAX_SAFE_INTEGER },
	user_id: "local-fork-user",
	plan: { upgraded: true, manual: true, last_checked: Date.now() },
	organizations: [],
	organizations_updated_at: Date.now(),
};
export const authStore = {
	get: async () => FAKE_AUTH,
	listen: (fn: (data?: AuthStore | undefined) => void) => {
		fn(FAKE_AUTH);
		return Promise.resolve(() => {});
	},
	set: async (_value?: Partial<AuthStore>) => {
		// no-op — auth state is constant in personal fork
	},
	createQuery: () => {
		// Return an object shaped like a TanStack Query result. Only `data`,
		// `isLoading`, `isPending`, `isError`, `error`, `refetch` are read by
		// callers; everything else is a stub.
		return new Proxy(
			{
				data: FAKE_AUTH,
				isLoading: false,
				isPending: false,
				isError: false,
				isSuccess: true,
				isFetching: false,
				error: null,
				status: "success" as const,
				refetch: async () => ({ data: FAKE_AUTH }),
			},
			{
				get(target, prop) {
					if (prop in target) return (target as Record<string | symbol, unknown>)[prop as string];
					return undefined;
				},
			},
		) as unknown as ReturnType<ReturnType<typeof declareStore<AuthStore>>["createQuery"]>;
	},
};

export const hotkeysStore = declareStore<HotkeysStore>("hotkeys");
export const generalSettingsStore =
	declareStore<GeneralSettingsStore>("general_settings");
export const recordingSettingsStore = declareStore<RecordingSettingsStore>(
	"recording_settings",
	{
		target: null,
		micName: null,
		cameraId: null,
		mode: "studio",
		systemAudio: false,
		organizationId: null,
		cameraDeviceSettings: {},
		microphoneDeviceSettings: {},
	},
);
