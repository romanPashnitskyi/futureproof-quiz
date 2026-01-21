import { STORAGE_KEY } from './config.js';

const INITIAL_STATE = {
    currentStep: 1,
    answers: {},
    email: '',
    isCompleted: false
};

let currentState = { ...INITIAL_STATE };

function isValidState(state) {
    return state 
        && typeof state.currentStep === 'number'
        && typeof state.answers === 'object'
        && typeof state.email === 'string'
        && typeof state.isCompleted === 'boolean';
}

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
            const parsed = JSON.parse(savedState);
            
            if (!isValidState(parsed)) {
                localStorage.removeItem(STORAGE_KEY);
                return false;
            }
            
            currentState = parsed;
            return true;
        } catch {
            localStorage.removeItem(STORAGE_KEY);
            return false;
        }
    }
    
    return false;
}

export function resetState() {
    localStorage.removeItem(STORAGE_KEY);
    currentState = { ...INITIAL_STATE };
}
