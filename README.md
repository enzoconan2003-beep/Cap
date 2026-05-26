<h1 align="center">Reel</h1>

<p align="center">
	A focused screen recorder + editor for making simple, polished product demos.
</p>

<p align="center">
	<em>A personal fork of <a href="https://github.com/CapSoftware/Cap">Cap</a> — stripped down, rebranded, fully local.</em>
</p>

---

## What is this?

Reel is a personal, locally-run fork of [Cap](https://github.com/CapSoftware/Cap) (AGPLv3) tailored for one job: **recording short product demos that look like Screen.studio output**, without depending on any cloud service.

It's not a separate product. It's not a competitor to Cap. It's a fork built to scratch one person's itch and shared here in case it's useful to anyone else.

## What's different from Cap?

- **No sign-in, no auth, no cloud** — fully standalone, runs entirely on your machine
- **Camera overlay** defaults to a landscape rounded rectangle (Screen.studio style) instead of a circle
- **No 5-minute recording cap** — record as long as you want
- **Studio mode only** — Instant Mode (cloud-upload) is removed since there's nothing to upload to
- **No "Pro" upgrade prompts** — all features always available
- **No third-party integrations** (S3, Custom Domain, Organizations, Licenses) — settings panel is just the essentials
- **Reel branding** — renamed everywhere, new indigo accent color, fresh wordmark
- All the killer features kept: zoom keyframes, the editor, MP4/GIF/MOV export, camera, hotkeys

See [CHANGES.md](./CHANGES.md) for a complete diff.

## Status

- macOS: works (tested on Apple Silicon)
- Windows: not tested — fork is macOS-focused
- Linux: not tested
- This is a **personal fork**. There's no release schedule, no support, no warranty. It might break.

## Install

You need:
- Node 20+
- Rust 1.88+
- pnpm 8.10+
- cmake (`brew install cmake`)
- macOS (Linux/Windows likely work but untested in this fork)

```bash
git clone https://github.com/enzoconan2003-beep/Cap.git reel
cd reel
git checkout feat/screen-studio-frame-no-limit
pnpm install
pnpm cap-setup
echo 'NODE_ENV=development
RUST_BACKTRACE=1
VITE_SERVER_URL=https://cap.so' > .env
pnpm dev:desktop
```

First build compiles ~600 Rust crates and takes **15–30 minutes**. Subsequent runs are seconds.

When the dev app launches, macOS will prompt for screen recording + camera permissions. Grant them to your **Terminal** (not to the Reel app itself — Tauri dev mode inherits permissions from the parent process).

## Why fork instead of building from scratch?

Cap already nails the hard parts: ScreenCaptureKit integration, cursor-event-driven zoom keyframes, an editor with backgrounds and padding, FFmpeg pipeline, the camera overlay. Building all of that from scratch is months of work. Forking + simplifying is days.

## Credit

This project is built entirely on top of [Cap](https://github.com/CapSoftware/Cap) by [Cap Software, Inc.](https://cap.so). Every architectural decision and 99% of the code is theirs. Reel exists because Cap is open source and well-designed.

If you want a screen recorder with a real team behind it, a hosted sharing platform, and active development → **use Cap**. This fork is for people who specifically want a stripped-down local-only version.

## License

AGPLv3, same as upstream Cap. See [LICENSE](./LICENSE) for the full text. Portions of the codebase (`cap-camera*` and `scap-*` crates) are MIT-licensed — see [licenses/](./licenses/).

If you redistribute this fork, AGPL requires you to:
- Publish your source code
- Keep the AGPL license intact
- Document your changes (see CHANGES.md as an example)

## Not endorsed by Cap

This fork is not affiliated with, endorsed by, or supported by Cap Software, Inc. Don't bother their team about it.
