import { render, screen } from "@testing-library/react";
//import { toHaveStyle } from '@testing-library/jest-dom';
import Star from './Star';

describe("Star component renders with correct styles", () => {
    test("Star component renders with correct src and alt", () => {
        // Arrange
        const expectedSrc = 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Black_Star.svg';
        const expectedAlt = 'A black, 5-pointed star';
        // Act
        render(<Star/>);
        const starImg = screen.getByRole('img');
        // Assert
        expect(starImg).toBeInTheDocument();
        expect(starImg).toHaveAttribute('src', expectedSrc);
        expect(starImg).toHaveAttribute('alt', expectedAlt);
    });

    test("Star component has same size as in the example game", () => {
        // Arrange
        const expectedSize = "[37.5 65.5]";
        // Act
        render(<Star/>);
        const starImg = screen.getByRole('img');
        // Assert
        expect(starImg).toBeInTheDocument();
        expect(starImg).toHaveStyle(`size: ${expectedSize}`);
    })
});