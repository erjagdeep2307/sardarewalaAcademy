import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children and variant classes", () => {
    render(<Button variant="navy">Save Changes</Button>);

    const button = screen.getByRole("button", { name: "Save Changes" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-[#000080]");
  });

  it("disables the button and shows a loader when loading", () => {
    render(<Button isLoading>Submitting</Button>);

    const button = screen.getByRole("button", { name: "Submitting" });
    expect(button).toBeDisabled();
    expect(button.querySelector("svg")).toBeInTheDocument();
  });
});
