
import { eventBus, EVENTS } from './eventBus.js';

import { componentRegistry } from './components/Registry.js';

import { filterRCTable } from './components/RegisteredComponentsTable.js';

// import { buildCounter } from './components/Counter.js';

import { buildToggle } from './components/Toggle.js';

import { buildClock } from './components/Clock.js';

import { fillSelect, destroyComponent, clearActivityLog, resetComponent, killAll } from './util.js';

function summonComponent(e) {
    e.preventDefault();
    const selectedComponentType = document.getElementById('component-type-select').value;
    const customId = document.getElementById('custom-id').value;
    switch (selectedComponentType) {
        case 'toggle':
            if (!buildToggle(customId)) alert('Could not create Toggle!');
            break;
        // case 'counter':
        //     if (!buildCounter(customId)) alert('Could not create Counter!');
        //     break;
        case 'clock':
            if (!buildClock(customId)) alert('Could not create Clock!');
            break;
        default:
            alert('Choose something, dummy!');

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
    window.myApp.killAll = killAll;
    window.myApp.registry = componentRegistry;
    window.myApp.componentContainerId = 'component-container';
    window.myApp.registryTableId = 'registry-table';

    document.getElementById('component-type')?.focus();
    const validOptions = ['Toggle', 'Clock'];
    // const validOptions = ['Counter', 'Toggle', 'Clock'];
    fillSelect('component-type-select', validOptions);
    fillSelect('component-type-filter', validOptions);

    document.getElementById('summon-form').addEventListener('submit', window.myApp.summonComponent);

}
window.main = main;
