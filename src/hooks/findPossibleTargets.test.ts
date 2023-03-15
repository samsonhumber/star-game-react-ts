import findNumbers from "./findPossibleTargets";

describe("test possibleStarNumbers function", () => {
    test("If an empty array inputted for numbers remaining, should return 0", () => {
        // Arrange
        const maxStars = 9;
        const unPressedKeys: number[] = [];
        // Act
        const actual = findNumbers({maxStars, unPressedKeys});
        // Assert
        expect(actual).toStrictEqual([0]);
    });

    test("possible sums of [1,2] should [1,2,3] when 3 stars is maximum", () => {
        // Arrange
        const maxStars = 3;
        const unPressedKeys: number[] = [1, 2];
        // Act
        const actual = findNumbers({maxStars, unPressedKeys});
        // Assert
        expect(actual).toStrictEqual([1, 2, 3]);
    });

    test("possible sums of [1,2,3] should be [1,2,3,4,5,6]", () => {
        // Arrange
        const maxStars = 9;
        const unPressedKeys: number[] = [1, 2, 3];
        // Act
        const actual = findNumbers({maxStars, unPressedKeys});
        // Assert
        expect(actual).toStrictEqual([1, 2, 3, 4, 5, 6]);
    });

    test("possible sums of numbers 1-9 should be numbers 1-9", () => {
        // Arrange
        const maxStars = 9;
        const unPressedKeys: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        // Act
        const actual = findNumbers({maxStars, unPressedKeys});
        // Assert
        expect(actual).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    test("possible sums of numbers [1,5,8,9] should be [1,5,6,8,9]", () => {
        // Arrange
        const maxStars = 9;
        const unPressedKeys: number[] = [1, 5, 8, 9];
        // Act
        const actual = findNumbers({maxStars, unPressedKeys});
        // Assert
        expect(actual).toStrictEqual([1, 5, 6, 8, 9]);
    })
})