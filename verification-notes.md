# Single-screen replication verification

The homepage now matches the requested Saloon-style structure: one full-viewport screen with no scrollable content, a dark truck-cab highway background, top-left live clock, centered online indicator, top-right Spotify and YT Music links, centered Hindi truck-stop title, and a floating rounded player pill at the bottom center.

The previous dashboard rail, multi-section landing page, route cards, desktop dock, mobile dock, modals, and extra navigation were removed. The single page now has only the player controls needed to cycle and play the three supplied YouTube selections.

Browser verification confirmed:
- The initial state shows `Headlights & Heartlines` and `0:00 / 5:04`.
- Clicking next changes the track to `Chrome, Coffee, Radio` and updates the artwork.
- Clicking play changes the control to Pause and updates the display to `2:14 / 5:04`; a muted in-page YouTube no-cookie iframe is mounted for the selected video ID without opening a new page or modal.
- The page content has zero pixels above or below the viewport in the browser preview.
- TypeScript check and production build both completed successfully; only the standard bundle-size warning remains.
