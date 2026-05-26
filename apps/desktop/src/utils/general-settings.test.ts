import { describe, expect, it } from "vitest";

import {
	DEFAULT_TRANSCRIPTION_HINTS,
	deriveGeneralSettings,
	formatTranscriptionHints,
	normalizeTranscriptionHints,
	parseTranscriptionHints,
} from "~/utils/general-settings";

describe("general-settings", () => {
	it("normalizes transcription hints from text input", () => {
		expect(
			parseTranscriptionHints(" Reel \n\nTypeScript\nReel\nGitHub\n"),
		).toEqual(["Reel", "TypeScript", "GitHub"]);
	});

	it("formats transcription hints for the textarea", () => {
		expect(formatTranscriptionHints(["Reel", "TypeScript", "Reel"])).toBe(
			"Reel\nTypeScript",
		);
	});

	it("normalizes transcription hints from a list", () => {
		expect(
			normalizeTranscriptionHints([" Reel ", "", "TypeScript", "Reel", "GitHub"]),
		).toEqual(["Reel", "TypeScript", "GitHub"]);
	});

	it("defaults transcription hints when missing", () => {
		expect(deriveGeneralSettings(null).transcriptionHints).toEqual(
			DEFAULT_TRANSCRIPTION_HINTS,
		);
	});

	it("defaults recording enhancements when fields are missing", () => {
		expect(
			deriveGeneralSettings({
				enableNativeCameraPreview: false,
			}),
		).toMatchObject({
			autoZoomOnClicks: false,
			captureKeyboardEvents: true,
			custom_cursor_capture2: true,
		});
	});

	it("preserves explicit disabled recording enhancements", () => {
		expect(
			deriveGeneralSettings({
				enableNativeCameraPreview: false,
				autoZoomOnClicks: false,
				captureKeyboardEvents: false,
				custom_cursor_capture2: false,
			}),
		).toMatchObject({
			autoZoomOnClicks: false,
			captureKeyboardEvents: false,
			custom_cursor_capture2: false,
		});
	});
});
