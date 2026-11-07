import React, { act } from "react";
import { createRoot } from "react-dom/client";
import "../config.js"; // dev values under vitest: work 1 min, rest 2 min, day 2 min
import Timer from "./Timer";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let container, root;

beforeEach(() => {
  vi.useFakeTimers();
  window.CONFIG.muted = true;
  container = document.createElement("div");
  root = createRoot(container);
  act(() => root.render(<Timer />));
});

afterEach(() => {
  act(() => root.unmount());
  vi.useRealTimers();
});

// One act per second so React re-renders between ticks, like the browser does.
const seconds = (n) => {
  for (let i = 0; i < n; i++) act(() => vi.advanceTimersByTime(1000));
};
const click = () => act(() => container.querySelector("button:last-of-type").click());
const text = () => container.textContent;

test("work period ends after exactly its duration and rest starts at full length", () => {
  click(); // start
  seconds(60);
  expect(text()).toContain("dirbam");
  expect(text()).toContain("0:00");
  seconds(1);
  expect(text()).toContain("ilsimės");
  expect(text()).toContain("2:00");
});

test("day ends once finished periods reach maxTotalTime", () => {
  click();
  seconds(61); // work done: 1 min
  expect(text()).not.toContain("Darbo diena baigėsi");
  seconds(121); // rest done: 3 min total >= 2
  expect(text()).toContain("Darbo diena baigėsi");
});

test("stop resets the day total", () => {
  click();
  seconds(61); // 1 min counted
  click(); // stop (last button while running)
  click(); // start again
  seconds(61); // would reach 2 min without the reset
  expect(text()).toContain("ilsimės");
});
