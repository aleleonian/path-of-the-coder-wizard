const tests = [];

function test(name, fn) {
    tests.push({ name, fn });
}

function assertEqual(actual, expected) {
    if (actual !== expected) {
        throw new Error(`Expected "${expected}", but got "${actual}"`);
    }
}

function assertThrows(fn) {
    try {
        fn();
        throw new Error("Expected function to throw, but it did not");
    }
    catch (error) {
        if (error.message === "Expected function to throw, but it did not") {
            throw error;
        }
        return true;
    }
}
// Run all registered tests
async function run() {
    let passed = 0;

    for (const { name, fn } of tests) {
        try {
            await fn(); // support async tests
            console.log(`✅ ${name}`);
            passed++;
        } catch (err) {
            console.error(`❌ ${name}`);
            console.error(`   ${err.message}`);
        }
    }

    console.log(`\n${passed}/${tests.length} tests passed`);
}

// Expose globally
global.test = test;
global.assertEqual = assertEqual;
global.assertThrows = assertThrows;
global.run = run;

// If run directly (node test-runner.js), start running
if (require.main === module) {
    run();
}
