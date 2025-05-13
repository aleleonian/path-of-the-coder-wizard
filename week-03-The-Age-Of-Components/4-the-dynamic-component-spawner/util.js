export function appendToLog(message) {
    const logDisplayHandle = window.myApp.handles.logDisplayHandle;
    // Ensure message is treated as plain text
    logDisplayHandle.textContent += message + '\n';
    // Scroll to the bottom to show the latest entry
    logDisplayHandle.scrollTop = logDisplayHandle.scrollHeight;
}

export function getRandomUUID() {
    return crypto.randomUUID();
}

export function fillSelect(whichSelect, optionsArray) {
    const desiredSelect = document.getElementById(whichSelect);
    optionsArray.forEach(item => {
        const option = document.createElement('option');
        option.value = item.toLowerCase();
        option.text = item;
        desiredSelect.appendChild(option);
        // filterSelect.appendChild(option);
    });
}
export function destroyComponent(componentId) {
    if (confirm('Do you really want to destroy this component?')) {
        // registry.delete
        const component = window.componentRegistry.get(componentId);
        window.componentRegistry.unregister(componentId);
        // get the instance, unmount it
        component.instance.unmount();
        // destroy the ui
        document.getElementById(component.instance.parentId).remove();
        // remove the reference from window.myApp[whatever]
        switch (component.type) {
            case 'counter':
                delete window.myApp.counters[component.instance.counterName];
                break;
        }
    }
}
export function resetComponent(componentId) {
    if (confirm('Do you really want to reset this component?')) {
        const component = window.componentRegistry.get(componentId);
        component.instance.reset();
    }
}

export function removeRegistryRow(componentId) {
    const tableBody = document.querySelector('#registry-table tbody');
    const rows = tableBody.querySelectorAll('tr');

    rows.forEach(row => {
        const idCell = row.querySelector('td');
        if (idCell && idCell.textContent === componentId) {
            tableBody.removeChild(row);
        }
    });
}
export function clearTable(tableId) {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = ""
}

export function addRegistryRow(tableId, componentId, componentType, actionsHtml) {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    const row = document.createElement('tr');

    const tdId = document.createElement('td');
    tdId.textContent = componentId;

    const tdType = document.createElement('td');
    tdType.textContent = componentType;

    const tdActions = document.createElement('td');
    tdActions.appendChild(actionsHtml);

    row.appendChild(tdId);
    row.appendChild(tdType);
    row.appendChild(tdActions);

    tableBody.appendChild(row);
}

export function clearActivityLog() {
    document.getElementById('activity-log').textContent = '';
}
