import { appendToLog } from './util.js';

export function createEventBus() {

    const listeners = [];

    function on(eventType, callback) {
        if (!listeners[eventType]) {
            listeners[eventType] = [];
        }
        listeners[eventType].push(callback);
    }

    function off(eventType, callback) {
        if (!listeners[eventType]) return;
        listeners[eventType] = listeners[eventType].filter(cb => cb !== callback);
    }

    function emit(eventType, payload) {
        if (listeners[eventType]) {
            listeners[eventType].forEach(cb => cb(payload));
        }
    }
    return { on, off, emit };
}

export const eventBus = createEventBus();

export const EVENTS = {
    COMPONENT_MOUNT: "component:mount",
    COMPONENT_UPDATE: "component:update",
    COMPONENT_UNMOUNT: "component:unmount",
    LOG_EVENT: "log",
    RESUME_COUNTER: 'counter:resume',
    PAUSE_COUNTER: 'counter:pause',
    RESET_COUNTER: 'counter:reset',
};

eventBus.on(EVENTS.COMPONENT_MOUNT, componentMountEventHandler);
eventBus.on(EVENTS.COMPONENT_UPDATE, componentUpdateEventHandler);
eventBus.on(EVENTS.COMPONENT_UNMOUNT, componentUnmountEventHandler);
eventBus.on(EVENTS.LOG_EVENT, logEventHandler);
eventBus.on(EVENTS.RESUME_COUNTER, resumeCounterEventHandler);

function componentMountEventHandler(payload) {
    appendToLog(`${payload} at ${new Date()}`)
}
function componentUpdateEventHandler(payload) {
    appendToLog(`${payload} at ${new Date()}`)
}
function componentUnmountEventHandler(payload) {
    appendToLog(`${payload} at ${new Date()}`)
}
function logEventHandler(payload) {
    appendToLog(`${payload} at ${new Date()}`)
}
function resumeCounterEventHandler(payload) {
    appendToLog(`${payload} at ${new Date()}`)
}

