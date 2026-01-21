import { TOTAL_QUESTIONS, SCREEN } from './config.js';
import { getState, loadState } from './state.js';
import { 
    generateQuizHTML, 
    initializeElements, 
    getElements, 
    showScreen, 
    restoreQuestionState, 
    displayResults 
} from './ui.js';
import { 
    handleOptionClick, 
    handleNextClick, 
    handleEmailSubmit, 
    handleEmailInput, 
    handleEmailBlur, 
    handleRestart 
} from './handlers.js';

function setupEventListeners() {
    const elements = getElements();
    
    elements.optionsContainers.forEach((container, index) => {
        const questionNumber = index + 1;
        container.querySelectorAll('.option-btn').forEach(button => {
            button.addEventListener('click', () => handleOptionClick(questionNumber, button));
        });
    });
    
    elements.nextButtons.forEach((button, index) => {
        const questionNumber = index + 1;
        button.addEventListener('click', () => handleNextClick(questionNumber));
    });
    
    elements.emailForm.addEventListener('submit', handleEmailSubmit);
    elements.emailInput.addEventListener('input', handleEmailInput);
    elements.emailInput.addEventListener('blur', handleEmailBlur);
    elements.restartButton.addEventListener('click', handleRestart);
}

function restoreSavedState() {
    const hasSavedState = loadState();
    
    if (!hasSavedState) {
        showScreen(SCREEN.FIRST_QUESTION);
        return;
    }
    
    const state = getState();
    
    for (let questionNumber = 1; questionNumber <= TOTAL_QUESTIONS; questionNumber++) {
        if (state.answers[questionNumber]) {
            restoreQuestionState(questionNumber);
        }
    }
    
    if (state.email) {
        const elements = getElements();
        elements.emailInput.value = state.email;
    }
    
    if (state.isCompleted) {
        displayResults();
    }
    
    showScreen(state.currentStep);
}

function initializeQuiz() {
    generateQuizHTML();
    initializeElements();
    setupEventListeners();
    restoreSavedState();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeQuiz);
} else {
    initializeQuiz();
}
