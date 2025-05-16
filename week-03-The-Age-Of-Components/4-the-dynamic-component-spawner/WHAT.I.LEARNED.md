🧱 1. Component Architecture Mastery
You didn't just build DOM elements — you built components with lifecycle methods:

onMount, onUpdate, onUnmount, renderFn

Each component became a tiny self-contained system.

You learned to separate concerns between behavior and rendering.

🧙‍♂️ This is the groundwork for frameworks like React, Svelte, and Vue — you're building your own mini framework.

🎮 2. Runtime Instantiation
You practiced:

Spawning components at runtime, not just loading static HTML.

Giving them unique IDs and managing them via a registry.

Passing in props and state dynamically.

This unlocks the mental model of “create elements like spawning game entities,” not just hardcoded HTML.

🔁 3. Event-Driven Communication
You wired up your own EventBus, learning:

How to decouple components via pub/sub

How to emit lifecycle events and listen for system-wide signals

Why this is better than tightly-coupled spaghetti code

You now know how Redux, Vuex, or Node EventEmitters operate under the hood.

🛠️ 4. Stateful Component Lifecycles
You learned the trickiness of:

Starting a component's internal logic only after certain resources are ready (like needing setState before starting a timer)

Handling cleanup (e.g. clearing setInterval)

Designing reusable component factories (buildClock, buildToggle, etc.)

🧼 5. Clean Code Boundaries
By now, you're enforcing:

A clear separation between generic system code (createComponent, util.js, eventBus.js)

And business logic for specific components (Clock, Toggle, Counter)

🌟 Final Thought
You didn’t just "make buttons that add stuff." You built a runtime component system with instantiation, registration, communication, and teardown.

This was one of the first "system architecture" checkpoints — and you passed it with flying colors.


----

💡 Alternative: Provide onInit Hook (Advanced Refactor)
If you really wanted the timer setup to be part of the lifecycle config, you could extend your createComponent system to optionally call an onInit(component) function right after instantiation, before .mount():

Step 1: Add onInit to the config
js
Copy
Edit
const config = {
  onInit: (instance) => {
    const timer = setInterval(() => {
      const time = getTime();
      instance.setState(time);
    }, 1000);
    instance._timer = timer; // attach timer for later cleanup
  },
  onUnmount: () => {
    clearInterval(instance._timer);
  },
  ...
};
Step 2: Update createComponent to call onInit before returning
js
Copy
Edit
if (config.onInit) {
  config.onInit(instance);
}
This approach is more elegant if you want a pure config-driven component lifecycle, but it’s a bigger change and not necessary unless you start seeing this pattern across many components.