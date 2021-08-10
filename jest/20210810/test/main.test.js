const sum = (a, b) => a + b;
describe('Test', () => {
    test('3 + 7 = 10', () => {
        expect(sum(3, 7)).toBe(10);
    })
});