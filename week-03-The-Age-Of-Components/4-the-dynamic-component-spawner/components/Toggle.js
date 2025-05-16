import { createComponent } from "./Base.js";
import { getRandomUUID } from "../util.js";
import { componentRegistry } from "./Registry.js";

let randomString;

const CONTAINER_NAME_STRING_PREPEND = 'toggle-container-';
const TOGGLE_NAME_STRING_PREPEND = 'toggle-name-';
const TARGET_ID_STRING_PREPEND = 'toggle-target-id-';
const TOGGLE_BUTTON_ID_STRING_PREPEND = 'toggle-button-id-';

function getTargetId() {
    return `${TARGET_ID_STRING_PREPEND}${randomString}`;
}

function getToggleName() {
    return `${TOGGLE_NAME_STRING_PREPEND}${randomString}`;
}
function getToggleButtonId() {
    return `${TOGGLE_BUTTON_ID_STRING_PREPEND}${randomString}`;
}

function getComponentParentName() {
    return `${CONTAINER_NAME_STRING_PREPEND}${randomString}`
}

function createToggleOnOff({ targetId = null, parentDiv = null, customComponentId = null }, initialState = false, props = null) {

    let timer, toggleInstance, toggleComponentId;

    const toggleOnMount = (props) => {
        if (props) {
            if (props.buttons) {
                props.buttons.forEach(button => {
                    document.getElementById(button.buttonId).style.backgroundColor = button.buttonBackgroundColor;
                    document.getElementById(button.buttonId).style.color = button.buttonTextColor;
                    document.getElementById(button.buttonId).textContent = button.buttonText;
                })
            }
        }
        window.myApp.eventBus.emit(window.myApp.EVENTS.COMPONENT_MOUNT, `Toggle mounted!`);

        timer = setInterval(() => window.myApp.eventBus.emit(window.myApp.EVENTS.LOG_EVENT, `Toggle timer in action!`), 1000);

        componentRegistry.register(genericComponent.componentId, { type: "toggle", instance: toggleInstance });

    }

    const toggleOnUpdate = (prevState, newState) => {
        window.myApp.eventBus.emit(window.myApp.EVENTS.COMPONENT_UPDATE, `toggle updated! prevState: ${prevState}, newState: ${newState}`);
    }

    const toggleOnUnmount = (props) => {
        window.myApp.eventBus.emit(window.myApp.EVENTS.COMPONENT_UNMOUNT, `Toggle unmounted!`);
        clearInterval(timer);
        document.getElementById(parentDiv).innerHTML = "";
        componentRegistry.unregister(toggleComponentId);

    }

    const renderFn = (state, props) => {
        return state;
    }

    const config = {
        onMount: toggleOnMount,
        onUpdate: toggleOnUpdate,
        onUnmount: toggleOnUnmount,
        renderFn
    }

    if (props) config.props = props;

    const genericComponent = createComponent({ targetId, customComponentId }, initialState, config);
    if (!genericComponent) {
        return false;
    }
    toggleComponentId = genericComponent.componentId;

    const toggle = () => {
        genericComponent.setState(!genericComponent.getState());
    };

    toggleInstance = { toggle, unmount: genericComponent.unmount, getState: genericComponent.getState, componentId: toggleComponentId };

    genericComponent.mount();

    return toggleInstance;
}
function createToggleUI() {
    try {
        const parentDiv = document.createElement('div');
        parentDiv.id = getComponentParentName();
        const h1Element = document.createElement('h1');
        h1Element.textContent = "Toggle Element";
        const targetId = getTargetId();
        const pElement = document.createElement('p');
        pElement.id = targetId;
        pElement.setAttribute('tabindex', 0);
        const buttonElement = document.createElement('button');
        buttonElement.id = getToggleButtonId();
        const counterName = getToggleName();
        buttonElement.setAttribute('onclick', `window.myApp.toggles['${counterName}'].toggle()`);

        parentDiv.appendChild(h1Element);
        parentDiv.appendChild(pElement);
        parentDiv.appendChild(buttonElement);
        return parentDiv;
    }
    catch (error) {
        alert(`Error during createToggleUI: ${error}`);
        return false;
    }

}
export function buildToggle(customComponentId = false) {
    // create the component's UI.
    if (customComponentId) {
        const idsArray = window.myApp.registry.getById(customComponentId);
        if (idsArray.length > 0) {
            return false;
        }
    }
    randomString = getRandomUUID();
    const toggleElement = createToggleUI();
    if (!toggleElement) return false;
    document.getElementById('component-container').appendChild(toggleElement);
    const targetId = getTargetId();
    const parentId = getComponentParentName();
    if (!window.myApp.toggles) window.myApp.toggles = {};
    // create the component
    const aToggle = createToggleOnOff({ targetId, parentId, customComponentId }, false, {
        buttons: [{ buttonId: getToggleButtonId(), buttonTextColor: 'white', buttonBackgroundColor: 'red', buttonText: 'Toggle!' }]
    });
    if (!aToggle) alert('Could not create toggle!');
    else window.myApp.toggles[getToggleName()] = aToggle;
    return true;
}
