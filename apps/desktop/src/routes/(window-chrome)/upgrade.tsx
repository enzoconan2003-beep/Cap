import { Button } from "@cap/ui-solid";
import { getCurrentWindow } from "@tauri-apps/api/window";

export default function Page() {
	return (
		<div class="flex flex-col items-center justify-center w-full h-full gap-4 p-8 text-center">
			<h1 class="text-xl font-medium text-gray-12">
				Reel is fully featured.
			</h1>
			<p class="text-sm text-gray-11 max-w-sm">
				No upgrades, no plans, no licenses. Everything ships in the app.
			</p>
			<Button
				onClick={() => getCurrentWindow().close()}
				variant="primary"
				size="md"
			>
				Close
			</Button>
		</div>
	);
}
