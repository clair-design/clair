import { act } from "@testing-library/react";
export const advanceTimersByTime = (timeout: number) =>
  act(() => {
    jest.advanceTimersByTime(timeout);
  });
