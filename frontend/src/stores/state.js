import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("store", () => {
    const stateHistory = ref([]);

    function addState(state) {
        stateHistory.value.push(JSON.parse(JSON.stringify(state)));
    }

    function popState() {
        let popped = stateHistory.value.pop();
    }

    function getCurrentState() {
        let currentState = stateHistory.value[stateHistory.value.length - 1];
        return JSON.parse(JSON.stringify(currentState));
    }

    function clearHistory() {
        stateHistory.value = [];
    }

    function undo() {
        if (stateHistory.value.length > 1) {
            popState();
        }
    }

    function getStateHistory() {
        return stateHistory.value;
    }

    return {
        getStateHistory,
        undo,
        addState,
        popState,
        getCurrentState,
        clearHistory,
    };
});
