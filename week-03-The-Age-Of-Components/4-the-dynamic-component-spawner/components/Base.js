export function createComponent({ targetId = null, customComponentId = null }, initialState = undefined, config = null) {
    let tid = targetId;
    let state = initialState;
    let componentId = customComponentId ? customComponentId : `Component-${crypto.randomUUID()}`;
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
            document.getElementById(targetId).innerHTML = config.renderFn(state, props);
        }
        else {
            document.getElementById(targetId).innerHTML = getState();
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