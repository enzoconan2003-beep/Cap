export function ReelWordmark(props: { class?: string }) {
	return (
		<span
			class={
				"flex items-baseline gap-[3px] text-(--text-primary) font-semibold tracking-[-0.02em] " +
				(props.class ?? "text-base")
			}
		>
			<span>Reel</span>
			<span
				aria-hidden="true"
				class="inline-block size-[5px] rounded-full bg-[var(--reel-accent)] translate-y-[-1px]"
			/>
		</span>
	);
}

export function AbsoluteInsetLoader() {
	return (
		<div class="w-full h-full flex items-center justify-center">
			<ReelWordmark class="text-base animate-pulse" />
		</div>
	);
}
