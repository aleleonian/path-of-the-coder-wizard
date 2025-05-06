🧱 Checkpoint 2.3 — The Event Bus & Decoupling
🎯 Mission:
You’ll replace tightly coupled code with an event-driven design.
Think: no more “A calls B which calls C” — instead, A emits an event, and B/C subscribe to react.

This is how real UI frameworks, game engines, and modular systems scale.

💡 Scenario: Mini Notification System
You’ll build:

A publish/subscribe (pub/sub) event bus

Two components:

A TaskManager that can add/complete tasks

A Logger that listens and logs changes

You’ll decouple them using your event bus

🛠 Features:
The TaskManager can:

Add a task (e.g., “Fight demons”)

Mark a task as done

Emit an event like: { type: "task:added", title: "Fight demons" }

The Logger listens and:

Logs to screen when a task is added or completed

🔧 Step 1: Build the Bus

function createEventBus() {
  const listeners = {};

  function on(eventType, callback) {
    if (!listeners[eventType]) {
      listeners[eventType] = [];
    }
    listeners[eventType].push(callback);
  }

  function emit(eventType, payload) {
    if (listeners[eventType]) {
      listeners[eventType].forEach(cb => cb(payload));
    }
  }

  return { on, emit };
}
🔧 Step 2: Hook It All Up

const bus = createEventBus();

// Task Manager emits events
const taskManager = {
  tasks: [],
  addTask(title) {
    this.tasks.push({ title, done: false });
    bus.emit("task:added", { title });
  },
  completeTask(title) {
    const task = this.tasks.find(t => t.title === title);
    if (task) {
      task.done = true;
      bus.emit("task:completed", { title });
    }
  }
};

// Logger listens
bus.on("task:added", ({ title }) => {
  logToScreen(`Task added: ${title}`);
});

bus.on("task:completed", ({ title }) => {
  logToScreen(`Task completed: ${title}`);
});
🎯 Your Deliverable:
A single HTML file with:

A form to add tasks

A button to mark them done

A log display (like a <ul> or <pre>)

All interaction goes through the bus. No direct method calls between modules.

📎 Bonus:
Add a counter that shows “X tasks completed”

Use the event bus to update it

Style it however you like

🧠 Why This Matters:
You’re simulating:

How Redux/EventEmitters/Vue/React context work

Clean separation of logic → output

A system that scales across modules/components

