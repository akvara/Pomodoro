---
target: Pomodoro timer screen
total_score: 18
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 2
target_identity: "file:/Users/andrius.buhalteres.lt/Projects/Pomodoro/src/components/Timer.jsx"
target_fingerprint: "sha256:c2ca11a3406315689838a7d669ffd57eb11465ea79e799f07da7c0e781e9c68b"
target_path: /Users/andrius.buhalteres.lt/Projects/Pomodoro/src/components/Timer.jsx
timestamp: 2026-11-07T11-21-27Z
slug: src-components-timer-jsx
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | Tab title shows state, never time left; no day progress |
| 2 | Match System / Real World | 3 | Casual Lithuanian "we" copy fits |
| 3 | User Control and Freedom | 2 | Stop doesn't reset day total; end of day has no restart |
| 4 | Consistency and Standards | 2 | English leave prompt in Lithuanian UI; play = resume icon |
| 5 | Error Prevention | 2 | Durations unbounded upward |
| 6 | Recognition Rather Than Recall | 1 | Logo-as-settings and spacebar are invisible |
| 7 | Flexibility and Efficiency | 2 | Space pauses only; settings lost on reload |
| 8 | Aesthetic and Minimalist Design | 2 | Countdown same weight as status; photo dominates |
| 9 | Error Recovery | 1 | All 5 sound URLs 404 (HEAD); fails silently |
| 10 | Help and Documentation | 1 | No hints anywhere |
| **Total** | | **18/40** | Poor |

## Design Specificity
Generic Laravel-5/Bootstrap-3 starter look (Raleway, #636b6f on #f5f8fa, grey btn, glyphicons). Only copy and tomato are product-specific. States look identical except one word. Detector: 0 findings on files and rendered URL at 1280 and 400; misses unlabeled icon button.

## Priority Issues
- [P0] Sounds are dead: all 5 soundjay.com URLs return 404 (HEAD); beep is http://. Fix: bundle sounds in public/, catch play() rejection. Command: harden
- [P0] Countdown not glanceable: title lacks time; digits are 36px grey h1 equal to status. Fix: title "38:12 · dirbam", hero tabular digits, state colour. Command: typeset, layout
- [P1] States indistinguishable; paused blink erases the word. Fix: per-state colour, dim digits on pause, day progress bar. Command: colorize
- [P1] Day-total bugs: changeStatus adds upcoming period, first work period uncounted, Stop doesn't reset; end screen dead end; English onbeforeunload prompt. Fix: count completed period, reset on stop, summary + "Nauja diena". Command: harden, delight
- [P2] Accessibility: img onClick settings trigger, unlabeled icon buttons, no aria-live, lang="en". Command: audit, clarify

## Persona Red Flags
- Owner across the desk: can't read 36px grey time, can't tell work from rest, tab shows no minutes.
- Keyboard/screen-reader user: can't open settings, buttons unnamed.
- Owner after Stop/reload: day ends early, settings lost.

## Minor Observations
Version shown twice; volume-down glyph ambiguous; settings rows are h3 with &nbsp;; audio in an empty col-sm-4 pushes content off-centre; config work.alert/rest.alert copy unused; document.title set in render().

## Questions
- Should the page just be a full-bleed colour-coded clock?
- Should the end screen be the reward (one tomato per pomodoro)?
- Would a long break or day-progress bar matter more than styling?
