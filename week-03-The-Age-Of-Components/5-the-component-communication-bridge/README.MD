🧭 Checkpoint 3.5 — The Component Communication Bridge
🎯 Mission:
You're going to make components talk to each other using your existing EventBus.

🛠️ Features to Build
✅ A Toggle that controls a Counter

When the Toggle is ON, the Counter is incrementing every second

When the Toggle is OFF, the Counter freezes

If the Toggle is unmounted, the Counter should stop being affected


🧩 3.5: Component Communication Playground
What to build:

Component	Visible?	Notes
🔘 Toggle	✅ Button with ON/OFF state	Can be a checkbox, button, or toggle switch
🧮 Counter	✅ Displays count (0, 1, 2, ...)	Should visibly increment every second when active
📝 Log Section	✅ (Optional)	Show events like Toggle turned ON, Counter started, etc.

🧠 Example Behavior
Toggle is OFF → Counter is paused (frozen at current value)

Toggle is ON → Counter increments by 1 every second

Toggle OFF again → Counter pauses

Toggle removed/unmounted → Counter should no longer respond to it

Reset button or Event → Counter goes back to 0

💡 Suggested Output Area
Put the counter display in its own DOM element, something like:

<div id="counter-output" class="text-3xl font-mono p-4">0</div>
You can also include a <pre id="activity-log"> to echo EventBus messages for debugging, but that’s optional polish.

✅ Multiple Toggles can exist, but only one should control the Counter at a time (optional complexity)

✅ You must use your EventBus to handle this communication — no direct function calls between components

✅ Ensure all timers are cleaned up properly on unmount

✅ Provide a way to reset the Counter, e.g., via a button or EventBus message


💡 Hints
You may need to invent custom events like TOGGLE_STATE_CHANGED, COUNTER_RESET_REQUESTED, etc.

This is the first time your components stop acting in isolation and start forming systems.

You’ll see the real power of loose coupling through the EventBus.

🧙‍♂️ Why This Matters
This is the bridge between component-based UI and full-fledged app architecture. You’re simulating the kind of communication flow you’d see in a real frontend framework (React context, Redux actions, Vuex signals, etc.).

✅ So the rules are:
Element	How many?	Behavior
🧮 Counter	1	Visibly counts up every second if controlled by an active toggle
🔘 Toggle	1 or more	Only one should be in control at a time. Others are ignored unless they take control
🔁 Reset btn	(Optional)	Sends an EventBus message to reset the counter
