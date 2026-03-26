import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("should call onSearchChange when pressing Enter", () => {
    const onSearchChange = vi.fn();
    const onTypeChange = vi.fn();

    render(
      <SearchBar
        searchTerm=""
        onSearchChange={onSearchChange}
        selectedTypes={[]}
        onTypeChange={onTypeChange}
      />
    );

    const input = screen.getByPlaceholderText("Search by name or ID...");
    fireEvent.change(input, { target: { value: "Pikachu" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onSearchChange).toHaveBeenCalledWith("Pikachu");
  });

  it("should show clear button when searchTerm is set", () => {
    const onSearchChange = vi.fn();
    const onTypeChange = vi.fn();

    const { container } = render(
      <SearchBar
        searchTerm="Bulbasaur"
        onSearchChange={onSearchChange}
        selectedTypes={[]}
        onTypeChange={onTypeChange}
      />
    );

    // 2 buttons: search + clear
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(2);
  });
});