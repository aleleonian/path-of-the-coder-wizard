import { addRegistryRow, removeRegistryRow, clearTable } from "../util.js";

function createButtonsForRow(rowData) {
    const parentDivElement = document.createElement('div');

    const destroyButtonElement = document.createElement('button');
    destroyButtonElement.classList.add('btn', 'btn-sm', 'btn-danger', 'mx-2');
    destroyButtonElement.textContent = "destroy";
    destroyButtonElement.setAttribute('onclick', `window.myApp.destroyComponent('${rowData.componentId}')`)

    if (rowData.reset) {
        const resetButtonElement = document.createElement('button');
        resetButtonElement.classList.add('btn', 'btn-sm', 'btn-warning', 'mx-2');
        resetButtonElement.textContent = "reset";
        resetButtonElement.setAttribute('onclick', `window.myApp.resetComponent('${rowData.componentId}')`)
        parentDivElement.appendChild(resetButtonElement);
    }

    parentDivElement.appendChild(destroyButtonElement);
    return parentDivElement;
}

export function addComponent(tableId, componentObject) {
    const rowData = {};
    rowData.componentId = componentObject.instance.componentId;
    if (componentObject.instance.reset) rowData.reset = true;
    addRegistryRow(tableId, componentObject.instance.componentId, componentObject.type, createButtonsForRow(rowData));

}
export function removeComponent(componentId) {
    removeRegistryRow(componentId);
}

export function filterRCTable() {
    const filterValue = document.getElementById('component-type-filter').value;
    clearTable(window.myApp.registryTableId);
    let desiredTypesOfComponents;
    if (filterValue === "-1") desiredTypesOfComponents = window.myApp.registry.getAll();
    else desiredTypesOfComponents = window.myApp.registry.getByType(filterValue);
    desiredTypesOfComponents.forEach(component => addComponent(tableId, component));
}