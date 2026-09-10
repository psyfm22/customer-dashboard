import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { vi, beforeEach } from "vitest";

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            _id: "1",
            username: "Jack",
            gender: "Male",
            verification: true,
          },
          {
            _id: "2",
            username: "John",
            gender: "Male",
            verification: false,
          },
          {
            _id: "3",
            username: "Sarah",
            gender: "Female",
            verification: true,
          },
        ]),
    }),
  );
});

test("dashboard title appears", () => {
  render(<App />);

  expect(screen.getByText("Customer Dashboard")).toBeInTheDocument();
});

test("displays customers returned by the API", async () => {
  render(<App />);

  const customer = await screen.findByText(/Username: Jack/);

  expect(customer).toBeInTheDocument();
});

test("allows the user to enter a username", async () => {
  const user = userEvent.setup();

  render(<App />);

  const input = screen.getByPlaceholderText("Username...");

  await user.type(input, "Harry");

  expect(input).toHaveValue("Harry");
});

test("allows the user to select female", async () => {
  const user = userEvent.setup();

  render(<App />);

  const femaleOption = screen.getByLabelText("Female");

  await user.click(femaleOption);

  expect(femaleOption).toBeChecked();
});

test("allows the user to select unverified", async () => {
  const user = userEvent.setup();

  render(<App />);

  const falseOption = screen.getByLabelText("False");

  await user.click(falseOption);

  expect(falseOption).toBeChecked();
});

test("searches for a customer by username", async () => {
  const user = userEvent.setup();

  render(<App />);

  const searchInput = screen.getByPlaceholderText("Enter Username...");

  await user.type(searchInput, "Jack");

  expect(screen.getByText(/Username: Jack/)).toBeInTheDocument();
});
