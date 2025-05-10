🧭 3. Next Assignment: Checkpoint 3.4 — The Dynamic Component Spawner
🎯 Mission:
You’ll now build a system that lets you spawn components at runtime via UI controls.

🛠️ Features to Build
✅ A UI panel (or buttons) that lets you:
Create a new counter

Create a new toggle

Optionally delete them

✅ Each new component:
Is dynamically added to the DOM

Gets a unique ID

Is mounted, rendered, and registered in the registry

✅ Components must be:
Added via JavaScript (no pre-defined <div>s in HTML)

Fully interactive and tracked

📎 Bonus Objectives
Add filters like “Show only counters” using getByType

Add a button to reset all counters using broadcastToAll("reset")

Add a “Kill All” button that unmounts all components via the registry