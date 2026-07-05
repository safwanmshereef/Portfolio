## Overview
I updated the styling of the `Projects` component modal to closely match a user-provided screenshot (`image.png`). I also completely removed cached Pokemon assets from `public/assets/anime/` to ensure only the requested anime characters display.

## Key Changes
- Updated the content of the "Hybrid-RAG-AI-Assistant" project to match the specific text from the user's screenshot.
- Completely restyled the Project Details modal in `components/Projects.tsx`:
  - Changed background color to `bg-[#0f1115]` and border to `border-[#1e293b]`.
  - Updated font families (sans/mono) and colors to match the screenshot (e.g., `#ef4444` for red headers, `#06b6d4` for teal, `#10b981` for green).
  - Implemented custom syntax highlighting logic for the `topologyJson` block.
- Added a custom scrollbar to `app/globals.css`.
- Removed `blastoise.gif`, `charizard.gif`, `pikachu.gif`, `venusaur.gif` from `public/assets/anime/` to prevent aggressive caching from serving them.
