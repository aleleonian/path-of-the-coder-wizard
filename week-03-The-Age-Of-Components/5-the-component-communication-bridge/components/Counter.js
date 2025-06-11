import { createComponent } from "./Base.js";
import { getRandomUUID } from "../util.js";
import { componentRegistry } from "./Registry.js";

let randomString;

const CONTAINER_NAME_STRING_PREPEND = 'counter-container-';
const COUNTER_NAME_STRING_PREPEND = 'counter-name-';
const TARGET_ID_STRING_PREPEND = 'counter-target-id-';
const INCREASE_LABEL_STRING_PREPEND = 'increase-label-';
const DECREASE_LABEL_STRING_PREPEND = 'decrease-label-';
const RESET_LABEL_STRING_PREPEND = 'reset-label-';

function getTargetId() {
    return `${TARGET_ID_STRING_PREPEND}${randomString}`;
}

function getCounterName() {
    return `${COUNTER_NAME_STRING_PREPEND}${randomString}`;
}

function getIncreaseLabelString() {
    return `${INCREASE_LABEL_STRING_PREPEND}${randomString}`;
}

function getDecreaseLabelString() {
    return `${DECREASE_LABEL_STRING_PREPEND}${randomString}`
}

function getResetLabelString() {
    return `${RESET_LABEL_STRING_PREPEND}${randomString}`
}

function getComponentParentName() {
    return `${CONTAINER_NAME_STRING_PREPEND}${randomString}`
}
function createCounter({ targetId, parentId, customComponentId }, initialState = 0, props = null) {

    let counterInstance, counterComponentId;

    const counterOnMount = (props) => {
        if (props && props.labels) {
            Object.keys(props.labels).forEach(label => {
                document.getElementById(label).textContent = props.labels[label];
            });
        }

        window.myApp.eventBus.emit(window.myApp.EVENTS.COMPONENT_MOUNT, `Counter mounted!`);
    }

    const counterOnUpdate = (prevState, newState) => {
        window.myApp.eventBus.emit(window.myApp.EVENTS.COMPONENT_UPDATE, `Counter updated! prevState: ${prevState}, newState: ${newState}`);
    }

    const counterOnUnmount = () => {
        window.myApp.eventBus.emit(window.myApp.EVENTS.COMPONENT_UNMOUNT, `Counter unmounted!`);
    }

    const renderFn = (state, props) => {
        const spanElement = document.createElement('span');
        spanElement.textContent = state;
        return spanElement.outerHTML;
    }

    const config = {
        onMount: counterOnMount,
        onUpdate: counterOnUpdate,
        onUnmount: counterOnUnmount,
        renderFn
    }

    if (props) config.props = props;

    const genericComponent = createComponent({ targetId, customComponentId }, initialState, config);
    if (!genericComponent) {
        return false;
    }
    counterComponentId = genericComponent.componentId;

    const inc = () => {
        genericComponent.setState(genericComponent.getState() + 1);
    };

    const dec = () => {
        genericComponent.setState(genericComponent.getState() - 1);
    };

    const reset = () => {
        genericComponent.setState(0);
    };

    document.getElementById(targetId)
        .addEventListener('keydown', (e) => {
            if (e.key === '+' || e.key === 'ArrowUp') inc();
            if (e.key === '-' || e.key === 'ArrowDown') dec();
            if (e.key === 'r' || e.key === 'R') reset();
        });

    counterInstance = {
        inc,
        dec,
        reset,
        unmount: genericComponent.unmount,
        getState: genericComponent.getState,
        componentId: counterComponentId,
        targetElId: targetId,
        parentId,
        counterName: getCounterName()
    };

    genericComponent.mount();

    componentRegistry.register(genericComponent.componentId, { type: "counter", instance: counterInstance });

    return counterInstance;
}

function createCounterUI() {
    try {
        const parentDiv = document.createElement('div');
        parentDiv.id = getComponentParentName();
        const h1Element = document.createElement('h1');
        h1Element.textContent = "Counter Element";
        const targetId = getTargetId();
        const counterName = getCounterName();

        const pElement = document.createElement('p');
        pElement.id = targetId;
        pElement.setAttribute('tabindex', 0);

        // inc button
        const incButtonElement = document.createElement('button');
        const incButtonSpanElement = document.createElement('span');
        incButtonSpanElement.id = getIncreaseLabelString();
        incButtonElement.appendChild(incButtonSpanElement);
        incButtonElement.setAttribute('onclick', `window.myApp.counters['${counterName}'].inc()`);

        // dec button
        const decButtonElement = document.createElement('button');
        const decButtonSpanElement = document.createElement('span');
        decButtonSpanElement.id = getDecreaseLabelString();
        decButtonElement.appendChild(decButtonSpanElement);
        decButtonElement.setAttribute('onclick', `window.myApp.counters['${counterName}'].dec()`);

        // reset button
        const resetButtonElement = document.createElement('button');
        const resetButtonSpanElement = document.createElement('span');
        resetButtonSpanElement.id = getResetLabelString();
        resetButtonElement.appendChild(resetButtonSpanElement);
        resetButtonElement.setAttribute('onclick', `window.myApp.counters['${counterName}'].reset()`);

        parentDiv.appendChild(h1Element);
        parentDiv.appendChild(pElement);
        parentDiv.appendChild(incButtonElement);
        parentDiv.appendChild(decButtonElement);
        parentDiv.appendChild(resetButtonElement);

        return parentDiv;
    }
    catch (error) {
        alert(`Error during createCounterUI: ${error}`);
        return false;
    }

}
export function buildCounter(customComponentId = false) {
    // create the component's UI.
    if (customComponentId) {
        const idsArray = window.myApp.registry.getById(customComponentId);
        if (idsArray.length > 0) {
            return false;
        }
    }
    randomString = getRandomUUID();
    const counterElement = createCounterUI();
    if (!counterElement) return false;
    document.getElementById(window.myApp.componentContainerId).appendChild(counterElement);
    const targetId = getTargetId();
    const parentId = getComponentParentName();
    window.myApp.counters = window.myApp.counters || {};

    // create the component
    const aCounter = createCounter({ targetId, parentId, customComponentId }, 0, {
        labels: {
            [getIncreaseLabelString()]: '+',
            [getDecreaseLabelString()]: '-',
            [getResetLabelString()]: 'R'
        }
    });
    if (!aCounter) alert('Could not create counter!');
    else window.myApp.counters[getCounterName()] = aCounter;
    return true;
}