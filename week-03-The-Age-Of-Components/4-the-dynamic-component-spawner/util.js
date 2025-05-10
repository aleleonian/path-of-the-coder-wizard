export function appendToLog(message) {
    const logDisplayHandle = window.myApp.handles.logDisplayHandle;
    // Ensure message is treated as plain text
    logDisplayHandle.textContent += message + '\n';
    // Scroll to the bottom to show the latest entry
    logDisplayHandle.scrollTop = logDisplayHandle.scrollHeight;
}