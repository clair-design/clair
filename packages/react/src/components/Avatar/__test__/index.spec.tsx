import React from "react";
import { render } from "@testing-library/react";
import { Avatar } from "..";

describe("Avatar", () => {
  it("should render in different sizes", () => {
    const sizes = ["large", "normal", "small"] as const;
    sizes.forEach((size, index) => {
      const { getAllByRole } = render(<Avatar size={size} />);
      const containers = getAllByRole("img");
      expect(containers[index].classList.contains(`c-avatar--${size}`)).toBe(
        true
      );
    });
  });

  it("should render in different shape", () => {
    const shapes = ["circle", "square"] as const;
    shapes.forEach((shape, index) => {
      const { getAllByRole } = render(<Avatar shape={shape} />);
      const containers = getAllByRole("img");
      expect(containers[index].classList.contains(`c-avatar--${shape}`)).toBe(
        true
      );
    });
  });

  it("should render an image", () => {
    const src = "https://p1.ssl.qhimg.com/t01c746959090f19f97.jpg";
    const { getAllByRole } = render(<Avatar src={src} />);
    const [avatar] = getAllByRole("img");
    expect(avatar.querySelector("img")).toBeTruthy();
  });

  it("should render text", () => {
    const text = "User";
    const { getByRole } = render(<Avatar>{text}</Avatar>);
    const avatar = getByRole("img");
    expect(avatar.textContent).toBe(text);
  });
});
