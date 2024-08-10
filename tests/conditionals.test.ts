import { $switch, $case, $if, $ifelse } from "../dist/index.js";
import { expect, test } from "bun:test";

test("switch cases", () => {
  const a = $switch(1, $case(1, 1))!;
  expect(a[0]).toBe(1);
});

test("if statements", () => {
  const a = $if(true, 1);
  expect(a[0]).toBe(1);
});

test("ifelse statements", () => {
  const a = $ifelse(false, 1, 1);
  expect(a).toBe(1);
});
