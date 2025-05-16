import { createComponent } from "./Base.js";
import { getRandomUUID } from "../util.js";
import { componentRegistry } from "./Registry.js";

let randomString;

const CONTAINER_NAME_STRING_PREPEND = 'clock-container-';
const CLOCK_NAME_STRING_PREPEND = 'clock-name-';
const TARGET_ID_STRING_PREPEND = 'clock-target-id-';

function getTargetId() {
    return `${TARGET_ID_STRING_PREPEND}${randomString}`;
}
function getClockName() {
    return `${CLOCK_NAME_STRING_PREPEND}${randomString}`;
}
function getComponentParentName() {
    return `${CONTAINER_NAME_STRING_PREPEND}${randomString}`
}

function getTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    return h + ":" + m + ":" + s;
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}

function createClock({ targetId = null, parentId = null, customComponentId = null }, initialState = false, props = null) {

    
    let timer, clockInstance, clockComponentId, currentTime;

    const getTimer = () => timer;

    const clockOnMount = (props) => {
        window.myApp.eventBus.emit(window.myApp.EVENTS.COMPONENT_MOUNT, `Clock mounted!`);
        componentRegistry.register(genericComponent.componentId, { type: "clock", instance: clockInstance });
    }

    const clockOnUpdate = (prevState, newState) => {
        window.myApp.eventBus.emit(window.myApp.EVENTS.COMPONENT_UPDATE, `clock updated! prevState: ${prevState}, newState: ${newState}`);
    }

    const clockOnUnmount = (props) => {
        window.myApp.eventBus.emit(window.myApp.EVENTS.COMPONENT_UNMOUNT, `Clock unmounted!`);
        document.getElementById(parentId).innerHTML = "";
        componentRegistry.unregister(clockComponentId);
        clearInterval(getTimer());
    }

    const renderFn = (state, props) => {
        return state;
    }

    const config = {
        onMount: clockOnMount,
        onUpdate: clockOnUpdate,
        onUnmount: clockOnUnmount,
        renderFn
    }

    if (props) config.props = props;

    const genericComponent = createComponent({ targetId, customComponentId }, initialState, config);
    if (!genericComponent) {
        return false;
    }
    clockComponentId = genericComponent.componentId;

    timer = setInterval(() => {
        currentTime = getTime();
        genericComponent.setState(currentTime);
    }, 1000);

    clockInstance = { unmount: genericComponent.unmount, getState: genericComponent.getState, componentId: clockComponentId, parentId };

    genericComponent.mount();

    return clockInstance;
}
function createClockUI() {
    try {
        const parentDiv = document.createElement('div');
        parentDiv.id = getComponentParentName();
        const h1Element = document.createElement('h1');
        h1Element.textContent = "Clock Element";
        const targetId = getTargetId();
        const pElement = document.createElement('p');
        pElement.id = targetId;
        pElement.setAttribute('tabindex', 0);
        parentDiv.appendChild(h1Element);
        parentDiv.appendChild(pElement);
        return parentDiv;
    }
    catch (error) {
        alert(`Error during createClockUI: ${error}`);
        return false;
    }

}
export function buildClock(customComponentId = false) {
    // create the component's UI.
    if (customComponentId) {
        const idsArray = window.myApp.registry.getById(customComponentId);
        if (idsArray.length > 0) {
            return false;
        }
    }
    randomString = getRandomUUID();
    const clockElement = createClockUI();
    if (!clockElement) return false;
    document.getElementById('component-container').appendChild(clockElement);
    const targetId = getTargetId();
    const parentId = getComponentParentName();
    if (!window.myApp.clocks) window.myApp.clocks = {};
    // create the component
    const aClock = createClock({ targetId, parentId, customComponentId }, false, null);
    if (!aClock) alert('Could not create clock!');
    else window.myApp.clocks[getClockName()] = aClock;
    return true;
}
