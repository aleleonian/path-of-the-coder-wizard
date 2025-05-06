🧙‍♂️ Path of the Coder Wizard — Track A, Week 3 Briefing

🎖️ Welcome to Week 3: The Age of Components

You've now mastered:

State

Rendering

Events
Now it's time to unify those powers.

🧱 Checkpoint 3.1 — Build a Component Factory
🎯 Mission:
You’ll build a basic system to define and render reusable components — with state and UI logic bundled together.

Think:

A system where you can say createCounter() and it returns a self-contained widget that:

Manages its own internal state

Can be mounted in the DOM

Updates itself when state changes

🛠 Deliverable:
A reusable createComponent() function that returns an object with at least:

js
Copy
Edit
{
  mount(targetEl),      // appends the rendered DOM
  setState(newState),   // updates state and re-renders
  getState(),           // optional, for inspection
}
You’ll use this to build at least two components, for example:

✅ A Counter: + / - buttons, shows current value

✅ A Toggle: on/off switch

They must be:

✅ Reusable (you can create 3 counters if you want)

✅ Isolated (each instance has its own state)

✅ Declarative (render logic depends only on state)

⚠️ Rules of Engagement
You must not rely on any framework — no React, Vue, etc.

You may use the EventBus from 2.3 if you want components to talk to each other — but it’s optional

Use vanilla JS only

Your components must own their render logic — not depend on global DOM hacks

📎 Bonus Objectives:
Add props support (e.g., createCounter({ initialValue: 5 }))

Add destroy/unmount support (destroy() or unmount())

🧠 Why This Matters
You’ll understand:

How React, Vue, and others structure components internally

Why local state + declarative render = composability

How to scale UIs with encapsulation and reuse

Ready to accept the mission? Want a starting code snippet or skeleton?