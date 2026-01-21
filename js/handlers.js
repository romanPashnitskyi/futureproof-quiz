import { SCREEN } from './config.js';
import { updateState, resetState, saveAnswer } from './state.js';
import { validateEmail, getEmailError } from './validation.js';
import { getElements, showScreen, setEmailError, displayResults, resetUI } from './ui.js';

export function handleOptionClick(questionNumber, clickedButton) {
    const optionsContainer = document.querySelector(`[data-question="${questionNumber}"]`);
    const nextButton = document.querySelector(`[data-next-btn="${questionNumber}"]`);
    
    optionsContainer.querySelectorAll('.option-btn').forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
    });
    
    const isCorrectAnswer = clickedButton.dataset.correct === 'true';
    clickedButton.classList.add('selected');
    clickedButton.classList.add(isCorrectAnswer ? 'correct' : 'incorrect');
    
    nextButton.disabled = false;
    saveAnswer(questionNumber, clickedButton.dataset.value);
}

export function handleNextClick(currentQuestionNumber) {
    const nextScreenNumber = currentQuestionNumber + 1;
    updateState({ currentStep: nextScreenNumber });
    showScreen(nextScreenNumber);
}

export function handleEmailSubmit(event) {
    event.preventDefault();
    
    const elements = getElements();
    const emailValue = elements.emailInput.value.trim();
    const validationError = getEmailError(emailValue);
    
    if (validationError) {
        setEmailError(validationError);
        elements.emailInput.focus();
        return;
    }
    
    updateState({
        email: emailValue,
        currentStep: SCREEN.RESULTS,
        isCompleted: true
    });
    
    displayResults();
    showScreen(SCREEN.RESULTS);
}

export function handleEmailInput() {
    const elements = getElements();
    const emailValue = elements.emailInput.value.trim();
    const isValid = validateEmail(emailValue);
    
    setEmailError(emailValue && !isValid ? '' : null);
    elements.emailInput.classList.toggle('valid', emailValue && isValid);
}

export function handleEmailBlur(event) {
    if (event.relatedTarget?.classList.contains('submit-btn')) {
        return;
    }
    
    const elements = getElements();
    const emailValue = elements.emailInput.value.trim();
    
    if (emailValue && !validateEmail(emailValue)) {
        setEmailError('Введіть коректний email');
    }
}

export function handleRestart() {
    resetState();
    resetUI();
    showScreen(SCREEN.FIRST_QUESTION);
}
