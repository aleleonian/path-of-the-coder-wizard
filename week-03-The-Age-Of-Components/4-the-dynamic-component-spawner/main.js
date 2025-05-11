
import { eventBus, EVENTS } from './eventBus.js';

import { componentRegistry } from './componentRegistry.js';

import { buildCounter } from './components/Counter.js';

function createToggleOnOff(targetId = null, initialState = false, props = null) {

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



function summonComponent(e) {
    e.preventDefault();
    const selectedComponentType = document.getElementById('component-type-select').value;
    switch (selectedComponentType) {
        case 'toggle':
            break;
        case 'counter':
            buildCounter();
            break;
        case 'clock':
            break;

    }
}

function main() {
    window.myApp = window.myApp || {};

    window.myApp = {
        handles: {
            logDisplayHandle: document.getElementById('activity-log')
        },
    }
    // document.getElementById('component-type')?.focus();

    document.getElementById('summon-form').addEventListener('submit', summonComponent);

    // window.myApp.counters = {
    //     firstCounter: createCounter('firstCounter', 0, {
    //         labels: {
    //             increaseLabel1: '+',
    //             decreaseLabel1: '-',
    //             resetLabel1: 'R'
    //         }
    //     }),
    //     secondCounter: createCounter('secondCounter', 0, {
    //         labels: {
    //             increaseLabel2: 'Increase',
    //             decreaseLabel2: 'Decrease',
    //             resetLabel2: 'Reset'
    //         }
    //     }),
    // }
    // window.myApp.switches = {
    //     firstToggleOnOff: createToggleOnOff('firstToggleOnOff', false,
    //         {
    //             buttons: [{ buttonId: 'toggleButton', buttonTextColor: 'white', buttonBackgroundColor: 'red' }],
    //             containerDivId: 'toggleContainerDiv'
    //         }
    //     )
    // }
    const validOptions = ['Counter', 'Toggle', 'Clock'];
    const select = document.getElementById('component-type-select');

    validOptions.forEach(item => {
        const option = document.createElement('option');
        option.value = item.toLowerCase();
        option.text = item;
        select.appendChild(option);
    });
}
window.main = main;
window.summonComponent = summonComponent;
window.eventBus = eventBus;
window.EVENTS = EVENTS;
window.myApp = {};