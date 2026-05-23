import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useDebounce } from "./use-debounce";

describe("useDebounce", () => {
  it("should return initial value", () => {
    const { result } = renderHook(() =>
      useDebounce("hola", 300)
    );

    expect(result.current).toBe("hola");
  });

  it("should update value after delay", () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      {
        initialProps: {
          value: "hola",
        },
      }
    );

    rerender({ value: "adios" });

    expect(result.current).toBe("hola");

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("adios");

    vi.useRealTimers();
  });

  it("should only update with the last value during rapid changes", () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      {
        initialProps: {
          value: "a",
        },
      }
    );

    rerender({ value: "ab" });
    rerender({ value: "abc" });
    rerender({ value: "abcd" });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("abcd");

    vi.useRealTimers();
  });
});