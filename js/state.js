import { STORAGE_KEY } from './config.js';

const INITIAL_STATE = {
    currentStep: 1,
    answers: {},
    email: '',
    isCompleted: false
};

let currentState = { ...INITIAL_STATE };

export function getState() {
    return currentState;
}

export function updateState(updates) {
    Object.assign(currentState, updates);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
}

export function saveAnswer(questionNumber, answerValue) {
    const updatedAnswers = { ...currentState.answers, [questionNumber]: answerValue };
    updateState({ answers: updatedAnswers });
}

export function loadState() {
    const savedState = localStorage.getItem(STORAGE_KEY);
    
    if (savedState) {
        try {
            currentState = JSON.parse(savedState);
            return true;
        } catch (error) {
            console.error('Failed to parse saved state:', error);
            return false;
        }
    }
    
    return false;
}

export function resetState() {
    localStorage.removeItem(STORAGE_KEY);
    currentState = { ...INITIAL_STATE };
}
