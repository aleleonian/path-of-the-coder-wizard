📘 1. What You Mastered in Assignment 3.3 — The Component Registry
🧱 Architecture & Separation of Concerns
Designed a modular system where components don’t just exist — they register.

You decoupled creation (createCounter) from system awareness (componentRegistry.register).

📒 Component Registry as a Source of Truth
Tracks only mounted components.

Supports get, getAll, getByType, unregister, broadcastToAll, and sendMessageTo.

🔁 Lifecycle-Aware System Design
Registry registration happens inside onMount, ensuring live-only tracking.

unregister in onUnmount avoids memory leaks and zombie components.

📡 Direct Message Dispatch
Designed and implemented imperative commands like .reset() via broadcastToAll() and sendMessageTo().

You evaluated and chose between event-based and direct-invocation patterns — correctly picking the one suited to your system.

📦 ES Modules + Modern Web Structure
Split logic cleanly across files: main.js, eventBus.js, util.js, componentRegistry.js

Used type="module" with scoped imports and explicit execution

This was not just a component registry — it was a small-scale runtime engine.