require('./test-runner.js');

function divide(a, b) {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
}


test("adds numbers correctly", () => {
    const result = 2 + 2;
    assertEqual(result, 4);
});

// This should fail
test("throws on wrong math", () => {
    const result = 2 + 2;
    assertEqual(result, 5);
});

test("Makes sure a division by 0 throws an error", () => {
    assertThrows(() => divide(1, 0));
});

run();