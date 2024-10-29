const eventListeners = { value: new WeakMap() };

export const useListener = () => {
    const addEventListenerWithTracking = (element, type, callback, options) => {
        element.addEventListener(type, callback, options);

        if (!eventListeners.value.has(element)) {
            eventListeners.value.set(element, []);
        }
        eventListeners.value.get(element).push({ type, callback, options });
    };

    const removeAllEventListenersOfType = (element, type) => {
        const listeners = eventListeners.value.get(element) || [];

        listeners
            .filter((listener) => listener.type === type)
            .forEach((listener) => element.removeEventListener(type, listener.callback, listener.options));

        eventListeners.value.set(
            element,
            listeners.filter((listener) => listener.type !== type)
        );
    };

    return {
        eventListeners,
        removeAllEventListenersOfType,
        addEventListenerWithTracking,
    };
};
