# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

One person, the owner. They use it at their desk during the workday, and the timer runs in a browser tab next to their real work.

## Product Purpose

A personal Pomodoro timer that paces a working day: 45 min of work, then 8 min of rest, repeated until the day's total reaches 490 min. Then it shows "Darbo diena baigėsi" and stops. Success means the owner can start it and forget it, while sounds and the tab title tell them when to switch.

## Positioning

Nothing special. It's a personal hobby/learning project with no market position to defend.

## Operating Context

- It runs in a background tab most of the time, so `document.title` shows the current state ("Pomodoro - dirbam") and audio cues do the alerting.
- A beep plays during the last 5 seconds of each period, and separate sounds mark work→rest, rest→work and end of day.
- The spacebar pauses and resumes while the timer runs. While paused, the status text blinks.
- Settings are hidden behind a click on the tomato logo: mute, work/rest durations (±1 up to 10, ±5 above), and the version.

## Capabilities and Constraints

- Stack: React 19 + Vite, Bootstrap 3.3.7 CSS and glyphicons from a CDN, `public/css/pomodoro.css`.
- Config lives in `src/config.js` (`window.CONFIG`). In dev mode durations shrink to 1/2 min for testing.
- Settings are not saved and reset on reload.
- Sounds load from soundjay.com URLs (external dependency).
- README todo: "Signal on finish".

## Brand Commitments

- The UI copy stays Lithuanian, in its casual "we" voice: "Dabar dirbam", "Liko 45:00", "dirbsim / ilsimės", "Darbą baigėm - ilsėtis!".
- The tomato logo `src/assets/pomodoro.png` is the identity mark and also opens Settings.
- Keep the sound cues and spacebar pause/resume.

## Product Principles

1. Glanceable from across the desk or from the tab title alone.
2. Sound and the tab title do the alerting, so the page doesn't need attention.
3. The timer comes first, and settings stay out of the way until asked for.
4. No accounts, tracking or extras. It's a tool for one person.
