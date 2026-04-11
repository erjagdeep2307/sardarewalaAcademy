import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Contact } from "./Contact";
import { renderWithProviders } from "@/test/renderWithProviders";
import { createContact } from "@/apis/contacts";
import { toast } from "react-toastify";

vi.mock("@/apis/contacts", () => ({
  createContact: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("Contact page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows validation errors for required fields", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await user.click(screen.getByRole("button", { name: /send data/i }));

    expect(await screen.findByText("First Name is required")).toBeInTheDocument();
    expect(screen.getByText("Last Name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(createContact).not.toHaveBeenCalled();
  });

  it("submits the form and shows a success toast", async () => {
    const user = userEvent.setup();
    vi.mocked(createContact).mockResolvedValue({
      success: true,
      message: "Saved",
      data: {
        id: 1,
        first_name: "Jagdeep",
        last_name: "Singh",
        email: "jagdeep@example.com",
        phone: "9876543210",
        program: "Army Training",
        message: "I want to join.",
        created_at: "2026-04-11T00:00:00.000Z",
        status: "Pending",
      },
    });

    renderWithProviders(<Contact />);

    await user.type(screen.getByPlaceholderText("John"), "Jagdeep");
    await user.type(screen.getByPlaceholderText("Doe"), "Singh");
    await user.type(screen.getByPlaceholderText("john@example.com"), "jagdeep@example.com");
    await user.type(screen.getByPlaceholderText("Enter Phone Number"), "9876543210");
    await user.type(screen.getByPlaceholderText("Tell us about your goals..."), "I want to join.");
    await user.click(screen.getByRole("button", { name: /send data/i }));

    await waitFor(() => {
      expect(createContact).toHaveBeenCalledTimes(1);
    });

    const [payload] = vi.mocked(createContact).mock.calls[0];

    expect(payload).toEqual({
        firstName: "Jagdeep",
        lastName: "Singh",
        email: "jagdeep@example.com",
        phone: "9876543210",
        program: "Army Training",
        message: "I want to join.",
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Contact Data Submitted Successfully");
    });

    expect(screen.getByPlaceholderText("John")).toHaveValue("");
    expect(screen.getByPlaceholderText("Doe")).toHaveValue("");
  });
});
