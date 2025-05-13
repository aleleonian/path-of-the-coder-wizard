
import { eventBus, EVENTS } from './eventBus.js';

import { componentRegistry } from './components/Registry.js';

import { buildCounter } from './components/Counter.js';

import { destroyComponent, clearActivityLog, resetComponent } from './util.js';

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
    window.myApp = {};
    window.myApp.handles = {};
    window.myApp.summonComponent = summonComponent;
    window.myApp.handles.logDisplayHandle = document.getElementById('activity-log')
    window.myApp.eventBus = eventBus;
    window.myApp.EVENTS = EVENTS;
    window.myApp.destroyComponent = destroyComponent;
    window.myApp.resetComponent = resetComponent;
    window.myApp.clearActivityLog = clearActivityLog;
    // document.getElementById('component-type')?.focus();
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



    document.getElementById('summon-form').addEventListener('submit', window.myApp.summonComponent);

}
window.main = main;
