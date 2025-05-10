export function createComponentRegistry() {

    const registry = new Map();

    function getByType(desiredType) {
        return getAll().filter(component => component.type === desiredType);
    }

    function broadcastToAll(command) {
        registry.forEach(component => {
            if (component.instance[command]) {
                if (typeof component.instance[command] === 'function') {
                    component.instance[command]();
                }
            }
        })
    }

    function sendMessageTo(componentId, command) {
        const desiredComponent = get(componentId);
        if (desiredComponent) {
            const desiredCommand = desiredComponent.instance[command];
            if (desiredCommand && typeof desiredCommand === 'function') {
                desiredCommand();
            }
            else {
                console.warn(`Component ${id} has no handleMessage method.`);
                return false;
            }
        }
        else return false;
    }

    function unmountAll() {
        registry.forEach(component => {
            component.instance.unmount();
        })
    }

    function register(id, component) {
        if (!id || !component) {
            throw new Error("You must provide an id and a component, dammit!");
        }
        if (registry.has(id)) {
            throw new Error("You already added that component, godammit!");
        }
        registry.set(id, component);
    }

    function get(id) {
        if (registry.has(id)) {
            return registry.get(id)
        }
        else return false;
    }

    function getAll() {
        return Array.from(registry.values());
    }

    function unregister(id) {
        registry.delete(id);
    }

    return {
        register,
        get,
        getAll,
        unregister,
        unmountAll,
        broadcastToAll,
        sendMessageTo,
        getByType
    }
}

export const componentRegistry = createComponentRegistry();

window.componentRegistry = componentRegistry;


// {
//     "Component-12345": { type: "counter", instance: [Object] },
//     "Component-98765": { type: "toggle", instance: [Object] }
// }
