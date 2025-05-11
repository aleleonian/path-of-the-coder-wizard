import { addRegistryRow, removeRegistryRow } from "../util.js";

function createButtonsForRow(componentId) {
    const buttonElement = document.createElement('button');
    buttonElement.classList.add('btn', 'btn-sm', 'btn-danger');
    buttonElement.textContent = "destroy";
    buttonElement.setAttribute('onclick', `window.myApp.destroyComponent('${componentId}')`)
    return buttonElement;
    // <button class="btn btn-sm btn-secondary" onclick="resetComponent('Component-123')">Reset</button>
}

export function addComponent(componentObject) {
    addRegistryRow(componentObject.instance.componentId, componentObject.type, createButtonsForRow(componentObject.instance.componentId));

}
export function removeComponent(componentId) {
    removeRegistryRow(componentId);
}