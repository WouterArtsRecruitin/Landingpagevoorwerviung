import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "./LoginPage";

const mockSignIn = vi.fn();
const mockNavigate = vi.fn();

vi.mock("@/providers/AuthProvider", () => ({
  useAuth: () => ({
    signIn: mockSignIn,
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("LoginPage", () => {
  it("renders login form with email and password fields", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("E-mailadres")).toBeInTheDocument();
    expect(screen.getByLabelText("Wachtwoord")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Inloggen" })).toBeInTheDocument();
  });

  it("renders register link", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Registreren")).toBeInTheDocument();
  });

  it("submits login form", async () => {
    mockSignIn.mockResolvedValue({ error: null });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText("E-mailadres"), "test@test.nl");
    await userEvent.type(screen.getByLabelText("Wachtwoord"), "password123");
    await userEvent.click(screen.getByRole("button", { name: "Inloggen" }));

    expect(mockSignIn).toHaveBeenCalledWith("test@test.nl", "password123");
  });

  it("shows error message on login failure", async () => {
    mockSignIn.mockResolvedValue({ error: "Ongeldig wachtwoord" });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText("E-mailadres"), "test@test.nl");
    await userEvent.type(screen.getByLabelText("Wachtwoord"), "wrong");
    await userEvent.click(screen.getByRole("button", { name: "Inloggen" }));

    expect(await screen.findByText("Ongeldig wachtwoord")).toBeInTheDocument();
  });
});
