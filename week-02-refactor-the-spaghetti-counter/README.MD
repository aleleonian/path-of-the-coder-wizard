🛡️ Assignment: Refactor the Spaghetti Counter
🎯 Objective:
You’re handed a poorly written “counter app” that:

Mixes UI and logic

Has bad state management

Isn’t modular

Can’t be tested

Breaks when a second counter is added

You’ll:

Fix the design

Modularize logic

Separate state, view, and events

Prepare it for reusability

🧩 Step 1: Here's the Spaghetti
You’ll recreate this bad code exactly first (in a single HTML file):

<h1>Counter</h1>
<p id="count">0</p>
<button onclick="inc()">+</button>
<button onclick="dec()">-</button>

<script>
  let count = 0;

  function update() {
    document.getElementById('count').textContent = count;
  }

  function inc() {
    count++;
    update();
  }

  function dec() {
    count--;
    update();
  }
</script>
Looks fine at first, but:

State is global

No separation of concerns

Can't scale to multiple counters

No error boundaries

Can't plug in logic from elsewhere

Not testable

🔨 Step 2: Refactor It
Your Mission:
Write a createCounter() function that:

Returns a self-contained counter instance

Manages its own state (not global)

Hooks into a specific DOM element

Exposes optional onChange callback

Allow creation of multiple counters on the same page with isolated state

Keep UI/logic/state cleanly separated

✅ Final Output Should Allow This:

const counter1 = createCounter(document.getElementById('counter1'));
const counter2 = createCounter(document.getElementById('counter2'));
And each counter behaves independently.
All state is private — no shared global.

💡 Extras (Optional):
Add reset() method

Add keyboard support

Track history of changes

🧙‍♂️ When You're Done:
Drop the code here. I’ll review it like a senior reviewing a shared component.

We’ll make it testable, scalable, and bug-resistant.

Take the field, Lieutenant.
Refactor the spaghetti. Make it modular.
I’ll be here.🧠⚔️