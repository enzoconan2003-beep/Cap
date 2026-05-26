# Changes from upstream Cap

This file documents every meaningful modification made to upstream
[CapSoftware/Cap](https://github.com/CapSoftware/Cap) in this fork.

AGPLv3 requires forks to document their changes. This is that document.

Fork branch: `feat/screen-studio-frame-no-limit`
Forked at: Cap commit `d0dcab8f6` parent (May 2026)

---

## Brand and identity

- App renamed Cap → Reel everywhere user-visible: product name, identifier
  (`me.enzo.reel.dev`), file extension (`.cap` → `.reel`), deep-link scheme
  (`cap-desktop` → `reel-desktop`), window titles, tray menu, recording
  filename prefix (`Cap YYYY-...` → `Reel YYYY-...`), update dialog copy,
  ~25 user-facing strings across onboarding, settings, editor, mode pickers
- New accent color: warm indigo (`#6a48ee` light, `#8b6dff` dark) replacing
  Cap stock blue. Added `--reel-accent` token in theme.css
- "Reel •" wordmark (text + indigo dot) replaces Cap logo art in main window
  header, onboarding welcome screen, all window loaders, editor skeleton,
  screenshot-editor skeleton, error boundary
- `settings-section-pulse` CSS keyframe color updated from Cap blue
  `rgba(59,130,246,...)` to Reel indigo `rgba(106,72,238,...)`
- Cap-pun import-progress copy ("Putting on our thinking Cap...",
  "Cap-puccino break") replaced with neutral film/reel-flavored lines
- "Cap Discord" CTA in settings/feedback removed
- Removed Cap logo from Loader.tsx, editor-skeleton.tsx,
  screenshot-editor-skeleton.tsx, update.tsx, settings/general.tsx
  filename-preview decoration

## Auth, cloud, sharing — stripped

- `authStore` rewritten to always return a spoofed signed-in + Pro user:
  no real auth check ever runs. Every downstream gate (sign-in prompts,
  upgrade prompts, Pro feature locks) passes silently
- Cap.so cloud upload removed from the recording overlay UI (no more
  "Create Shareable Link" button on completed recording tiles)
- "Shareable Link" removed from editor export destinations. File and
  Clipboard only
- Settings sidebar profile button + Sign In/Out button removed
- Settings nav stripped of Integrations, License, Feedback, Account tabs.
  Remaining: General, Shortcuts, Recordings, Screenshots, Transcription,
  Experimental, Changelog
- `OrganizationDropdown` removed from editor header (was 519 lines of
  "Connect to Cap web" UI)
- "Personal" upgrade pill removed from main window header
- "View previous versions" link to `cap.so/download/versions` removed from
  settings
- All `cap.so/download` references in update dialog and "Check for updates"
  failure messages rephrased to "Please try again later"

## Recording — Instant mode and free-tier limits removed

- Instant Mode (cloud-upload-as-you-record) removed from all three mode
  pickers: ModeInfoPanel, ModeSelect, target-overlay context menu
- Default recording mode flipped from `instant` to `studio`
- `MAX_RECORDING_FOR_FREE = 5 * 60 * 1000` enforcement disabled —
  `isMaxRecordingLimitEnabled` always returns false. No auto-stop,
  no countdown UI
- 5-minute share/export gates removed from `recordings-overlay.tsx`,
  `editor/ShareButton.tsx`, `editor/ExportPage.tsx`
- Instant filter chip removed from settings/recordings
- "Sign In To Use" button label removed from instant-mode start path
- `ShowCapFreeWarning` (Pro upgrade nag) deleted from target-select-overlay
- `mode === "instant"` dead branches stripped from target-select-overlay

## Camera overlay — Screen.studio style

- Default camera shape changed from `round` (circle) to `full` (landscape
  rounded rectangle)
- `cameraBorderRadius` reworked: `full` shape now returns a clean 20px
  radius (was scaling from ~50px+)
- Camera container shadow upgraded from `shadow-lg` to `shadow-2xl`
- Visible L-shaped corner resize brackets removed. Hit areas kept so
  resize still works

## Onboarding — trimmed

- Cut from 8 steps to 5 (~420 lines removed). Dropped: Instant mode detail
  step, mode toggle animation step, FAQ step (linked to cap.so/pricing),
  settings preview pushing S3/Custom Domain
- Remaining flow: Permissions → 2-mode overview → Studio → Screenshot →
  Customization
- Copy rewritten to name actual killer features (zoom keyframes, rounded
  camera, MP4 export) rather than cloud sharing

## Settings — pruned

- Removed 4 dead sections from General: "Cap Pro" section with
  auto-open-shareable-link toggle, "Delete Instant recordings after upload"
  toggle, Instant-quality resolution subsection, "Self-host: Cap Server URL"
  input
- Removed Integrations / License / Feedback tabs from sidebar nav
- `Mode.tsx` selected-state ring color: `ring-blue-500` →
  `ring-[var(--reel-accent)]`

## Misc

- `apps/desktop/src-tauri/tauri.conf.json` updated for new product name,
  identifier, mainBinaryName, deep-link scheme, file association
- `windows.rs` window titles updated (Cap Settings → Reel Settings, etc.)
- `general_settings.rs` `DEFAULT_EXCLUDED_WINDOW_TITLES` updated so screen
  recording correctly excludes Reel's own windows
- `recovery.rs` filename prefix parser updated (`Cap ` → `Reel `)
- `transcription_hints` default updated

## What was NOT changed

- All upstream Rust crates (`crates/`) other than the recording filename
  format are untouched. Killer features rely on these and they work
- Editor zoom keyframe code paths unchanged. This is the feature this fork
  exists to use
- `auth.ts`, `web-api.ts`, `upgrade.tsx`, `OrganizationDropdown.tsx`,
  S3/Google Drive integration config files remain on disk but are
  unreachable through UI. Removing them would touch 30+ transitive imports
  for zero user-visible benefit
- PostHog analytics calls remain in source but no-op without keys configured
- App icon (.icns) still shows Cap's logo — would need a designer to swap

## Original Cap LICENSE preserved

See [LICENSE](./LICENSE). All Cap copyright notices intact.
