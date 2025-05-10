import { createComponent } from "./Base.js";
import { getRandomUUID } from "../util.js";

const COUNTER_NAME_STRING_PREPEND = 'counter-name-';
const TARGET_ID_STRING_PREPEND = 'counter-target-id-';
const INCREASE_LABEL_STRING_PREPEND = 'increase-label-';
const DECREASE_LABEL_STRING_PREPEND = 'decrease-label-';
const RESET_LABEL_STRING_PREPEND = 'reset-label-';

function createCounter(targetId, initialState = 0, props = null) {


    let counterInstance, counterComponentId;

    const counterOnMount = (props) => {
        if (props && props.labels) {
            Object.keys(props.labels).forEach(label => {
                document.getElementById(label).textContent = props.labels[label];
            });
        }

        componentRegistry.register(genericComponent.componentId, { type: "counter", instance: counterInstance });

        eventBus.emit(EVENTS.COMPONENT_MOUNT, `Counter mounted!`);
    }

    const counterOnUpdate = (prevState, newState) => {
        eventBus.emit(EVENTS.COMPONENT_UPDATE, `Counter updated! prevState: ${prevState}, newState: ${newState}`);
    }

    const counterOnUnmount = () => {
        // componentRegistry.unregister(genericComponent.componentId);
        componentRegistry.unregister(counterComponentId);

        eventBus.emit(EVENTS.COMPONENT_UNMOUNT, `Counter unmounted!`);
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

    const genericComponent = createComponent(targetId, initialState, config);

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

    counterInstance = { inc, dec, reset, unmount: genericComponent.unmount, getState: genericComponent.getState, componentId: counterComponentId };

    genericComponent.mount();

    return counterInstance;
}

function createCounterUI(randomString) {
    const parentDiv = document.createElement('div');
    const h1Element = document.createElement('h1');
    h1Element.textContent = "Counter Element";
    const targetId = `${TARGET_ID_STRING_PREPEND}${randomString}`;
    const counterName = `${COUNTER_NAME_STRING_PREPEND}${randomString}`;

    const pElement = document.createElement('p');
    pElement.id = targetId;
    pElement.setAttribute('tabindex', 0);

    // inc button
    const incButtonElement = document.createElement('button');
    const incButtonSpanElement = document.createElement('span');
    incButtonSpanElement.id = `${INCREASE_LABEL_STRING_PREPEND}${randomString}`;
    incButtonElement.appendChild(incButtonSpanElement);
    incButtonElement.setAttribute('onclick', `window.myApp.counters.${counterName}.inc()`);

    // dec button
    const decButtonElement = document.createElement('button');
    const decButtonSpanElement = document.createElement('span');
    decButtonSpanElement.id = `${DECREASE_LABEL_STRING_PREPEND}${randomString}`;
    decButtonElement.appendChild(decButtonSpanElement);
    decButtonElement.setAttribute('onclick', `window.myApp.counters.${counterName}.dec()`);

    // reset button
    const resetButtonElement = document.createElement('button');
    const resetButtonSpanElement = document.createElement('span');
    resetButtonSpanElement.id = `${RESET_LABEL_STRING_PREPEND}${randomString}`;
    resetButtonElement.appendChild(resetButtonSpanElement);
    resetButtonElement.setAttribute('onclick', `window.myApp.counters.${counterName}.reset()`);

    parentDiv.appendChild(h1Element);
    parentDiv.appendChild(pElement);
    parentDiv.appendChild(incButtonElement);
    parentDiv.appendChild(decButtonElement);
    parentDiv.appendChild(resetButtonElement);

    return parentDiv;

}
export function buildCounter() {
    // build the actual html, append it.
    const randomString = getRandomUUID();
    const counterElement = createCounterUI(randomString);
    document.getElementById('component-container').appendChild(counterElement);
    const targetId = `${TARGET_ID_STRING_PREPEND}${randomString}`;
    createCounter(targetId, 0, {
        labels: {
            [`${INCREASE_LABEL_STRING_PREPEND}${randomString}`]: '+',
            [`${DECREASE_LABEL_STRING_PREPEND}${randomString}`]: '-',
            [`${RESET_LABEL_STRING_PREPEND}${randomString}`]: 'R'
        }
    })
}