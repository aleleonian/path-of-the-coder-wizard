export function createComponent(targetId = null, initialState = undefined, config = null) {
    let tid = targetId;
    let state = initialState;
    let componentId = `Component-${crypto.randomUUID()}`;
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
            document.getElementById(componentId).innerHTML = config.renderFn(state, props);
        }
        else {
            document.getElementById(componentId).innerHTML = getState();
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