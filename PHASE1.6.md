\# PROJECT: Sudoku Master — Phase 1.6 Light Mode Fixes



You are a senior UI/UX engineer. Phase 1.5 is done. Now fix CRITICAL 

bugs in LIGHT MODE where text is invisible.



\## CRITICAL RULES



\- This is an EXISTING project. Do NOT rebuild anything.

\- DO NOT touch game logic (engine.js, game.js, storage.js, levels.js)

\- DO NOT touch Service Worker (sw.js)

\- DO NOT touch Audio or Vibration APIs

\- ONLY modify CSS files

\- Do NOT touch HTML structure or JS logic

\- Keep every file under 500 lines

\- All text in English



\## BUG 1 — STATS SCREEN TEXT INVISIBLE IN LIGHT MODE (critical)



Problem: When Dark Mode is toggled OFF (light mode), the Stats screen 

shows white/light text on white/light card backgrounds. The text is 

completely invisible.



Root cause: Stats cards use CSS variables like --text and --text-dim 

that only work well in dark mode. In light mode, the card background 

becomes light but text colors don't adapt.



Solution:

In light mode (body.light or \[data-theme="light"] selector):



1\. Stats cards background: #ffffff

2\. Stats card border: 1px solid #e5e7eb

3\. Card titles ("Progress", "Streaks", "Best Times", "Endless Mode"): 

&#x20;  color #0f1720

4\. Card labels ("Current Win Streak", "Best Win Streak", "Easy", 

&#x20;  "Medium", "Hard", "Expert"): color #4b5563

5\. Card values (numbers like "0", "--:--"): color #0f1720

6\. Caption "Levels Completed": color #6b7280

7\. Progress ring background circle: stroke #e5e7eb

8\. Progress ring center text: color #0f1720

9\. Bar chart background: #e5e7eb

10\. Endless Mode difficulty dots: keep their colors (green, blue, 

&#x20;   orange, red)



\## BUG 2 — SETTINGS SCREEN IN LIGHT MODE



Problem: Similar to Stats. When in light mode, some Settings text 

or backgrounds may be invisible.



Solution:

In light mode:

1\. Settings section headers ("AUDIO \& HAPTICS", "GAMEPLAY", 

&#x20;  "APPEARANCE", "DATA"): color #4f8cff

2\. Settings row backgrounds: #ffffff

3\. Settings row borders: 1px solid #e5e7eb

4\. Settings labels ("Sound Effects", "Vibration", etc.): color #0f1720

5\. Settings screen background: #f5f7fa

6\. Back button icon in light mode: color #4b5563

7\. "Reset All Progress" button: keep red outline (already correct)



\## BUG 3 — ENDLESS MODE IN LIGHT MODE



Problem: Similar light mode contrast issue.



Solution:

In light mode:

1\. Endless difficulty cards background: #ffffff

2\. Card borders: 1px solid #e5e7eb

3\. Difficulty names (Easy/Medium/Hard/Expert): keep their colors

4\. Subtitle text (e.g., "35 Empty Cells"): color #6b7280

5\. Page title "Endless Mode": color #0f1720

6\. Back button: color #4b5563

7\. Prompt text "Select a difficulty for infinite puzzles": color #4b5563



\## BUG 4 — STORY MODE LEVELS IN LIGHT MODE



Problem: Similar light mode contrast issue.



Solution:

In light mode:

1\. Level grid button backgrounds: #ffffff

2\. Level grid borders: 1px solid #e5e7eb

3\. Level numbers (unlocked): color #0f1720

4\. Level numbers (locked): color #9ca3af

5\. Lock icon (locked levels): keep gold/orange #f59e0b

6\. Play icon (current level): #4f8cff

7\. Level 1 card border (current): #4f8cff

8\. Tier badge backgrounds: keep their green/blue/orange/red colors

9\. Tier nav bar background: #ffffff with bottom border #e5e7eb

10\. Tier nav active item: #4f8cff background, #ffffff text

11\. Tier nav inactive item: #6b7280 text



\## BUG 5 — GAME SCREEN IN LIGHT MODE



Problem: Similar light mode contrast issue.



Solution:

In light mode:

1\. Board background: #ffffff

2\. Cell background (empty): #f9fafb

3\. Cell background (prefilled): #ffffff

4\. Prefilled numbers: #0f1720 (bold)

5\. User numbers: #2563eb

6\. Selected cell: #4f8cff with white text

7\. Peer highlight: #e8eef7

8\. Same-number highlight: #dbe5f5

9\. Grid lines (thin): #e5e7eb

10\. Subgrid lines (3x3): #94a3b8

11\. Top bar background: #f5f7fa

12\. Top bar text: #0f1720

13\. Back button: #4b5563

14\. Progress bar background: #e5e7eb

15\. Progress bar fill: keep gradient (blue → purple)

16\. Progress label text: #4b5563

17\. Tool button background: #ffffff

18\. Tool button border: 1px solid #e5e7eb

19\. Tool button label: #4b5563

20\. Tool button icon: #4b5563

21\. Tool button active (Notes): #4f



8cff background, white icon/text

22\. Number pad button background: #ffffff

23\. Number pad button border: 1px solid #e5e7eb

24\. Number pad number: #2563eb

25\. Number pad erase icon: #4b5563



\## BUG 6 — HOME SCREEN IN LIGHT MODE



Problem: The Home screen in light mode has too strong of a 

gradient. Also verify all text is readable.



Solution:

In light mode:

1\. Background base: #f5f7fa (light gray)

2\. Gradient overlay: very subtle, opacity \~0.15 (not 0.5)

3\. Title "SUDOKU MASTER": keep gradient text (blue → purple)

4\. Crown icon: keep gradient (blue → purple)

5\. "Continue Game" button: gradient background (already correct)

6\. "Story Mode" button: #4f8cff background (already correct)

7\. "Endless Mode", "Stats", "Settings" buttons: 

&#x20;  background #ffffff, border 1px solid #e5e7eb, text #0f1720



\## BUG 7 — SPLASH SCREEN IN LIGHT MODE



Decision: Keep splash screen DARK in all cases (it's a 

branding element). No change needed.



\## IMPLEMENTATION NOTES



1\. Use `body.light` selector for light mode overrides

2\. If the project uses `\[data-theme="light"]`, use that instead

3\. Check the existing CSS to see which selector is used

4\. Group all light mode overrides in a separate section at the 

&#x20;  bottom of each CSS file, clearly commented



Example structure:

```css

/\* ============================================

&#x20;  LIGHT MODE OVERRIDES

&#x20;  ============================================ \*/



body.light {

&#x20;   --bg: #f5f7fa;

&#x20;   --surface: #ffffff;

&#x20;   --cell: #ffffff;

&#x20;   --cell-empty: #f9fafb;

&#x20;   --line: #e5e7eb;

&#x20;   --text: #0f1720;

&#x20;   --text-dim: #4b5563;

}



body.light .stats-card {

&#x20;   background: #ffffff;

&#x20;   border: 1px solid #e5e7eb;

}



body.light .stats-card h2 {

&#x20;   color: #0f1720;

}

