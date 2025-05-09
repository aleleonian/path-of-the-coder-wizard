export function createComponentRegistry() {

    const registry = new Map();

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
        unregister
    }
}

export const componentRegistry = createComponentRegistry();

window.componentRegistry = componentRegistry;


// {
//     "Component-12345": { type: "counter", instance: [Object] },
//     "Component-98765": { type: "toggle", instance: [Object] }
// }
