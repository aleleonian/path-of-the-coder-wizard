export function createToggleOnOff(targetId = null, initialState = false, props = null) {

    let timer, togglerInstance, togglerComponentId;

    const togglerOnMount = (props) => {
        if (props) {
            if (props.buttons) {
                props.buttons.forEach(button => {
                    document.getElementById(button.buttonId).style.backgroundColor = button.buttonBackgroundColor;
                    document.getElementById(button.buttonId).style.color = button.buttonTextColor;
                })
            }
        }
        eventBus.emit(EVENTS.COMPONENT_MOUNT, `Toggler mounted!`);

        timer = setInterval(() => eventBus.emit(EVENTS.LOG_EVENT, `Toggler timer in action!`), 1000);

        componentRegistry.register(genericComponent.componentId, { type: "toggler", instance: togglerInstance });

    }

    const togglerOnUpdate = (prevState, newState) => {
        eventBus.emit(EVENTS.COMPONENT_UPDATE, `toggler updated! prevState: ${prevState}, newState: ${newState}`);
    }

    const togglerOnUnmount = (props) => {
        eventBus.emit(EVENTS.COMPONENT_UNMOUNT, `Toggler unmounted!`);
        clearInterval(timer);
        document.getElementById(props.containerDivId).innerHTML = "";
        componentRegistry.unregister(togglerComponentId);

    }

    const renderFn = (state, props) => {
        return state;
    }

    const config = {
        onMount: togglerOnMount,
        onUpdate: togglerOnUpdate,
        onUnmount: togglerOnUnmount,
        renderFn
    }

    if (props) config.props = props;

    const genericComponent = createComponent(targetId, initialState, config);

    togglerComponentId = genericComponent.componentId;

    const toggle = () => {
        genericComponent.setState(!genericComponent.getState());
    };

    togglerInstance = { toggle, unmount: genericComponent.unmount, getState: genericComponent.getState, componentId: togglerComponentId };

    genericComponent.mount();

    return togglerInstance;
}
