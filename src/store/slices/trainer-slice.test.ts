import { describe, it, expect } from "vitest";
import trainerReducer, { addTrainer } from "./trainer-slice";

describe("trainer-slice", () => {
  it("should return the initial state", () => {
    const state = trainerReducer(undefined, { type: "unknown" });
    expect(state).toEqual({ trainerInfo: [] });
  });

  it("should add a trainer", () => {
    const trainer = { name: "Sacha", region: "Kanto", badges: 8 };
    const state = trainerReducer(undefined, addTrainer(trainer));

    expect(state.trainerInfo).toHaveLength(1);
    expect(state.trainerInfo[0]).toEqual(trainer);
  });
});