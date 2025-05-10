import { appendToLog } from './util.js';

export function createEventBus() {

    const listeners = [];

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

export const eventBus = createEventBus();

export const EVENTS = {
    COMPONENT_MOUNT: "component:mount",
    COMPONENT_UPDATE: "component:update",
    COMPONENT_UNMOUNT: "component:unmount",
    LOG_EVENT: "log"
};

eventBus.on(EVENTS.COMPONENT_MOUNT, componentMountEventHandler);
eventBus.on(EVENTS.COMPONENT_UPDATE, componentUpdateEventHandler);
eventBus.on(EVENTS.COMPONENT_UNMOUNT, componentUnmountEventHandler);
eventBus.on(EVENTS.LOG_EVENT, logEventHandler);

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

