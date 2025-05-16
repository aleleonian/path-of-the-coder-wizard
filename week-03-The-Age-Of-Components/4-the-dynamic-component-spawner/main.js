
import { eventBus, EVENTS } from './eventBus.js';

import { componentRegistry } from './components/Registry.js';

import { filterRCTable } from './components/RegisteredComponentsTable.js';

import { buildCounter } from './components/Counter.js';

import { buildToggle } from './components/Toggle.js';

import { fillSelect, destroyComponent, clearActivityLog, resetComponent } from './util.js';

function summonComponent(e) {
    e.preventDefault();
    const selectedComponentType = document.getElementById('component-type-select').value;
    const customId = document.getElementById('custom-id').value;
    switch (selectedComponentType) {
        case 'toggle':
            if (!buildToggle(customId)) alert('Could not create Toggle!');
            break;
        case 'counter':
            if (!buildCounter(customId)) alert('Could not create Counter!');
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
    window.myApp.filterRCTable = filterRCTable;
    window.myApp.registry = componentRegistry;
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
    fillSelect('component-type-select', validOptions);
    fillSelect('component-type-filter', validOptions);





    document.getElementById('summon-form').addEventListener('submit', window.myApp.summonComponent);

}
window.main = main;
