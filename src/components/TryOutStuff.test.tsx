import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TryOutStuff from './TryOutStuff';


describe("Test the checkbox useReducer", () => {
  test('renders input element', () => {
    // Arrange
    render(<TryOutStuff />);
    const checkboxInput = screen.getByRole("checkbox");
    // Act

    // Assert
    expect(checkboxInput).toBeInTheDocument();
    expect(checkboxInput).toHaveAttribute('value', "0");
  });

  test('when ticked, should change label', () => {
    // Arrange
    render(<TryOutStuff />);
    const checkboxInput = screen.getByRole("checkbox");
    // Act
    fireEvent(checkboxInput, new MouseEvent('click', {bubbles: true, cancelable: true}));
    // Assert
    expect(screen.getByLabelText("checked")).toBeInTheDocument();
  });
});
