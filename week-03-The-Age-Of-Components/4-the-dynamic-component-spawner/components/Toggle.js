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

function createToggleOnOff({ targetId = null, parentDiv = null }, initialState = false, props = null) {

    let timer, togglerInstance, togglerComponentId;

    const togglerOnMount = (props) => {
        if (props) {
            if (props.buttons) {
                props.buttons.forEach(button => {
                    document.getElementById(button.buttonId).style.backgroundColor = button.buttonBackgroundColor;
                    document.getElementById(button.buttonId).style.color = button.buttonTextColor;
                })
            }
        }
        window.myApp.eventBus.emit(window.myApp.EVENTS.COMPONENT_MOUNT, `Toggler mounted!`);

        timer = setInterval(() => window.myApp.eventBus.emit(window.myApp.EVENTS.LOG_EVENT, `Toggler timer in action!`), 1000);

        componentRegistry.register(genericComponent.componentId, { type: "toggler", instance: togglerInstance });

    }

    const togglerOnUpdate = (prevState, newState) => {
        window.myApp.eventBus.emit(window.myApp.EVENTS.COMPONENT_UPDATE, `toggler updated! prevState: ${prevState}, newState: ${newState}`);
    }

    const togglerOnUnmount = (props) => {
        window.myApp.eventBus.emit(window.myApp.EVENTS.COMPONENT_UNMOUNT, `Toggler unmounted!`);
        clearInterval(timer);
        document.getElementById(parentDiv).innerHTML = "";
        componentRegistry.unregister(togglerComponentId);

    }

    const renderFn = (state, props) => {
        return state;
    }

    const config = {
        onMount: togglerOnMount,
        onUpdate: togglerOnUpdate,
        onUnmount: togglerOnUnmount,
        renderFn
    }

    if (props) config.props = props;

    const genericComponent = createComponent(targetId, initialState, config);

    togglerComponentId = genericComponent.componentId;

    const toggle = () => {
        genericComponent.setState(!genericComponent.getState());
    };

    togglerInstance = { toggle, unmount: genericComponent.unmount, getState: genericComponent.getState, componentId: togglerComponentId };

    genericComponent.mount();

    return togglerInstance;
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
export function buildToggle() {
    // create the component's UI.
    randomString = getRandomUUID();
    const toggleElement = createToggleUI();
    if (!createToggleUI()) return false;
    document.getElementById('component-container').appendChild(toggleElement);
    const targetId = getTargetId();
    const parentId = getComponentParentName();
    if (!window.myApp.toggles) window.myApp.toggles = {};
    // create the component
    window.myApp.toggles[getToggleName()] = createToggleOnOff({ targetId, parentId }, 0, {
        buttons: [{ buttonId: getToggleButtonId(), buttonTextColor: 'white', buttonBackgroundColor: 'red' }]
    })
}
