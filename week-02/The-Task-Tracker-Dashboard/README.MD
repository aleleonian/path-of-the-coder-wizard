🎯 Objective:
Build a task dashboard with multiple counters that contribute to a shared progress state.

You’ll implement:

Multiple task counters (e.g. tasks done)

Shared state: total tasks completed

Derived state: % completed

Clean UI updates

No external libraries. No global leaks. No bugs allowed.

🧩 Assignment: The Task Tracker Dashboard
🛠 Your app should include:
A list of 3 task counters
(e.g., “Wash Dishes”, “Do Homework”, “Fight Demons”)

Each task has:

A name

A counter (number of times done)

/ - buttons

A shared dashboard that shows:

Total tasks completed

Percentage complete (e.g. 6 / 10 total steps done)

🧠 Your Mission
Each task counter should be its own isolated component (like createCounter)

The shared progress state must be updated when any task changes

The dashboard updates automatically when shared state changes

📌 Requirements:
No shared global variables.

Shared state must be passed up from each task via a clean interface.

Use derived state:

const total = task1.count + task2.count + task3.count;
const percent = (total / targetTotalSteps) * 100;
Display both numbers and a visual progress bar or %.

Optional: Add reset functionality for all counters.

🧨 Stretch Goal (Optional):
If you want to really flex:

Allow dynamically adding/removing task counters

And the dashboard should adjust automatically
(hint: you’ll need a registry / observer pattern for that)

🔮 Example Output (text-based)

Task: Wash Dishes    [ + ] [ - ]   Count: 2
Task: Do Homework    [ + ] [ - ]   Count: 3
Task: Fight Demons   [ + ] [ - ]   Count: 1

[==================        ] 60% done
Total Steps: 6 / 10
🧙 Guidelines:
Use closures to manage internal state.

Lift shared state to a controller or manager function.

Keep DOM interactions modular (no spaghetti).

Avoid re-rendering the entire page — update only what’s needed.

