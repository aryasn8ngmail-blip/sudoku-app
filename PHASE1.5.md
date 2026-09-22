\# PROJECT: Sudoku Master — Phase 1.5 Polish



You are a senior UI/UX engineer. Phase 1 fixes have been applied. 

Now polish the remaining visual issues. 



\## CRITICAL RULES



\- This is an EXISTING project. Do NOT rebuild anything.

\- DO NOT touch game logic (engine.js, game.js, storage.js, levels.js)

\- DO NOT touch Service Worker (sw.js)

\- DO NOT touch Audio or Vibration APIs

\- Only modify CSS and HTML structure

\- Keep every file under 500 lines

\- All icons must be inline SVG

\- All text in English



\## FIX 12 — REMOVE GRID LINES FROM HOME BACKGROUND (critical)



Problem: In DARK MODE, the Home screen has a subtle grid lines pattern 

in the background that looks like "checkered paper". It's ugly and 

distracting.



Solution:

\- Remove the grid lines pattern COMPLETELY from Dark mode

\- OR reduce the opacity to near-invisible (0.01 or less)

\- Keep only the soft gradient background (blue + purple glows)

\- If you prefer to keep grid lines, apply them ONLY in Light mode



The most elegant solution: keep only the two radial gradients 

(blue + purple) with soft floating animation, and remove 

any repeating linear-gradient grid pattern.



\## FIX 13 — LIGHT MODE HOME BACKGROUND



Problem: In LIGHT MODE, the Home screen has a strong purple/blue 

gradient that looks artificial and overwhelming.



Solution:

\- Reduce the opacity of the gradient in light mode by \~50%

\- The gradient should be very subtle, barely noticeable

\- Background base color should remain light (near white)

\- The gradient adds a soft hint of color, not a full purple wash



Use `body.light` or `\[data-theme="light"]` selector for light mode 

overrides.



\## FIX 14 — PAUSE BUTTON COLOR IN ENDLESS MODE



Problem: In Endless Mode, the Pause button is still ORANGE 

(bg #f59e0b). But in Story Mode it's already fixed to neutral gray.



The Pause button should look IDENTICAL in both modes:

\- Background: transparent

\- Border: 1.5px solid #2a3142

\- Icon: #icon-pause SVG in #7b8596

\- Border-radius: 10px

\- Padding: 8px



Make sure this style applies to ALL game screens (Story + Endless).



\## FIX 15 — NOTES BADGE SIZE



Problem: The blue "NOTES" badge above the sudoku grid is too big 

and draws too much attention.



Solution:

\- Reduce font-size to 10px

\- Reduce padding to 4px 12px

\- Use a softer background: rgba(79, 140, 255, 0.15) instead of solid

\- Text color: #4f8cff (accent)

\- Add subtle border: 1px solid rgba(79, 140, 255, 0.3)

\- Position: keep centered above the board

\- Add smooth fade-in/out animation (200ms)



\## FIX 16 — LEVEL STARS IN STORY MODE



Problem: In Story Mode, unlocked-but-not-completed levels show 

three empty stars (☆☆☆), which is confusing. 



Solution:

\- Unlocked \& NOT completed level: show NO stars, just the level number

&#x20; with a subtle "play" indicator (like a small chevron or dot)

\- Completed level: show earned stars (gold)

\- Locked level: show lock icon only



This makes the state clearer:

\- No stars = playable, not started

\- Gold stars = completed

\- Lock = locked



\## FIX 17 — HOME SCREEN TOP SPACING (Light Mode)



Problem: In Light Mode Home screen, there's too much empty space 

between the top of the screen and the "SUDOKU MASTER" title.



Solution:

\- Add the crown SVG icon above the title (if not already present)

\- Size: 72px

\- Color: gradient blue-to-purple (same as title)

\- Margin-bottom: 16px

\- This fills the empty space nicely



\## FIX 18 — CONSISTENT HEADER STYLES ACROSS SCREENS



Make sure all screens (Game, Levels, Stats, Settings, Endless) 

have consistent top bars:

\- Back button: same size, position, color

\- Title: same font-size (16px), font-weight (600)

\- Padding: same on all screens



Currently Endless Mode's top bar might look different.



\## FIX 19 — CELL SELECTION GLOW (Dark Mode)



The selected cell glow is currently very bright in dark mode. 

It looks good, but slightly too intense.



Solution:

\- Reduce glow intensity: box-shadow: 0 0 0 2px #4f8cff, 

&#x20; 0 0 12px rgba(79, 140, 255, 0.3) (from 0.4 to 0.3)

\- Keep the outer 2px ring at full opacity

\- This makes it elegant, not overpowering



\## FIX 20 — BUTTON ACTIVE STATES



Add clear active (pressed) states for all



buttons:

\- On :active: transform scale(0.97)

\- Transition: 80ms ease

\- This gives tactile feedback on tap



Apply to:

\- Home menu buttons

\- Level grid buttons  

\- Tool buttons (Undo, Notes, Hint)

\- Number pad buttons

\- Settings toggles



\## CRITICAL CONSTRAINTS



1\. Keep every file under 500 lines

2\. NO new dependencies

3\. Animations: transform + opacity + color only

4\. Do NOT break existing functionality

5\. All SVG icons inline

6\. Existing localStorage keys unchanged



\## DELIVERABLE



Open a single Pull Request with these polish fixes.



Test:

\- Home screen in dark mode has NO ugly grid lines

\- Home screen in light mode has subtle gradient (not overwhelming)

\- Pause button looks identical in Story and Endless modes

\- NOTES badge is smaller and softer

\- Unlocked levels show no stars

\- Home has crown icon above title

\- All top bars look consistent

\- Selected cell glow is elegant

\- Buttons have active states



Prioritize: (1) no breakage, (2) visual polish, (3) consistency.

