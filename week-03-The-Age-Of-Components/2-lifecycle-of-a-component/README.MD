🧩 Checkpoint 3.2 — Add Lifecycle Hooks
🎯 Mission:
Extend your createComponent() system to support lifecycle hooks, just like real frameworks.

🔧 Features to Add:
1. onMount()
Called once, right after the component is first inserted into the DOM.

2. onUpdate(prevState, newState)
Called every time setState() is triggered, after state changes, but before the DOM updates.

3. onUnmount()
Called when unmount() is executed — perfect for cleanup (event listeners, timers, etc.)

🧠 Why This Matters:
These are the building blocks of:

useEffect() in React

mounted() and unmounted() in Vue

cleanup functions in Svelte and beyond

They allow you to:

Trigger side effects safely

Run code tied to the DOM's presence

Avoid memory leaks or orphaned logic

🛠 Your Deliverable
Update your createComponent() so that it accepts an optional config object like:

const myComponent = createComponent(targetEl, initialState, {
  onMount() { ... },
  onUpdate(prev, next) { ... },
  onUnmount() { ... }
});
Then demonstrate:

A component that logs when mounted, updated, and unmounted

A component that uses onMount() to start a timer and onUnmount() to clear it

📎 Bonus:
Add support for props

Trigger a re-render when props change

Log the component lifecycle transitions to screen or console

💥 Example Ideas
A self-updating clock that logs every update

A component that fetches something on mount

A component that adds a keypress listener on mount and removes it on unmount

