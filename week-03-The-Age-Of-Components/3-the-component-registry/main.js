
import { eventBus, EVENTS } from './eventBus.js';

import { componentRegistry } from './componentRegistry.js';

function createComponent(targetId = null, initialState = undefined, config = null) {
    let tid = targetId;
    let state = initialState;
    let componentId = `Component-${crypto.randomUUID()}`;
    let props = config.props ?? null;

    const mount = (targetId = tid) => {

        const targetElHandle = document.getElementById(targetId);
        if (!targetElHandle) {
            const errorMessage = `Target element '${targetId}' does not exist? Aborting.`;
            alert(errorMessage);
            throw new Error(errorMessage);
        }
        const spanElement = document.createElement('span');
        spanElement.id = componentId;
        targetElHandle.appendChild(spanElement);
        config?.onMount?.(props);
        render(state, props);
    }

    const setState = (newState) => {
        const oldState = state;
        state = newState;
        config?.onUpdate?.(oldState, newState);
        render(state, props);
    }

    const getState = () => {
        return state;
    }

    const unmount = () => {
        config?.onUnmount?.(props);
        tid = "";
        componentId = "";
    }

    const render = () => {

        if (config.renderFn) {
            document.getElementById(componentId).innerHTML = config.renderFn(state, props);
        }
        else {
            document.getElementById(componentId).innerHTML = getState();
        }
    }

    return {
        mount,
        setState,
        getState,
        unmount,
        componentId
    }
}

export function createToggleOnOff(targetId = null, initialState = false, props = null) {

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
        eventBus.emit(EVENTS.COMPONENT_MOUNT, `Toggler mounted!`);

        timer = setInterval(() => eventBus.emit(EVENTS.LOG_EVENT, `Toggler timer in action!`), 1000);

        componentRegistry.register(genericComponent.componentId, { type: "toggler", instance: togglerInstance });

    }

    const togglerOnUpdate = (prevState, newState) => {
        eventBus.emit(EVENTS.COMPONENT_UPDATE, `toggler updated! prevState: ${prevState}, newState: ${newState}`);
    }

    const togglerOnUnmount = (props) => {
        eventBus.emit(EVENTS.COMPONENT_UNMOUNT, `Toggler unmounted!`);
        clearInterval(timer);
        document.getElementById(props.containerDivId).innerHTML = "";
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


export function createCounter(targetId, initialState = 0, props = null) {


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

export function main() {
    window.myApp = window.myApp || {};

    window.myApp = {
        handles: {
            logDisplayHandle: document.getElementById('logDisplay')
        },
    }
    window.myApp.counters = {
        firstCounter: createCounter('firstCounter', 0, {
            labels: {
                increaseLabel1: '+',
                decreaseLabel1: '-',
                resetLabel1: 'R'
            }
        }),
        secondCounter: createCounter('secondCounter', 0, {
            labels: {
                increaseLabel2: 'Increase',
                decreaseLabel2: 'Decrease',
                resetLabel2: 'Reset'
            }
        }),
    }
    window.myApp.switches = {
        firstToggleOnOff: createToggleOnOff('firstToggleOnOff', false,
            {
                buttons: [{ buttonId: 'toggleButton', buttonTextColor: 'white', buttonBackgroundColor: 'red' }],
                containerDivId: 'toggleContainerDiv'
            }
        )
    }
}
window.main = main;