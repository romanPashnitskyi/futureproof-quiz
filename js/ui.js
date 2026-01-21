import { QUESTIONS, TOTAL_QUESTIONS, TOTAL_STEPS, SCREEN, OPTION_LETTERS } from './config.js';
import { getState } from './state.js';

let elements = null;

const escapeHTML = (text) => text.replace(/</g, '&lt;').replace(/>/g, '&gt;');

function createOptionHTML(option, index, questionIndex) {
    const isCorrect = option.value === QUESTIONS[questionIndex].correctAnswer;
    const letter = OPTION_LETTERS[index];
    
    return `
        <button class="option-btn" data-value="${option.value}" data-correct="${isCorrect}">
            <span class="option-letter">${letter}</span>
            <span class="option-text">${escapeHTML(option.label)}</span>
            <span class="option-icon"></span>
        </button>
    `;
}

function createQuestionScreenHTML(question, questionIndex) {
    const questionNumber = questionIndex + 1;
    const optionsHTML = question.options
        .map((option, index) => createOptionHTML(option, index, questionIndex))
        .join('');
    
    return `
        <div class="screen ${questionNumber === 1 ? 'active' : ''}" data-screen="${questionNumber}">
            <div class="question-card">
                <span class="question-badge">Питання ${questionNumber} з ${TOTAL_QUESTIONS}</span>
                <h2 class="question-title">${question.text}</h2>
                <div class="options-grid" data-question="${questionNumber}">
                    ${optionsHTML}
                </div>
                <button class="next-btn" data-next-btn="${questionNumber}" disabled>
                    Далі
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

function createEmailScreenHTML() {
    return `
        <div class="screen" data-screen="${SCREEN.EMAIL}">
            <div class="question-card email-card">
                <div class="email-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                        <path d="M22 6l-10 7L2 6"/>
                    </svg>
                </div>
                <h2 class="question-title">Майже готово!</h2>
                <p class="email-subtitle">Введіть вашу електронну адресу, щоб побачити результати квізу</p>
                <form id="emailForm" class="email-form" novalidate>
                    <div class="input-wrapper">
                        <input 
                            type="email" 
                            id="emailInput" 
                            class="email-input" 
                            placeholder="your@email.com"
                            autocomplete="email"
                            required
                        >
                        <span class="input-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="2" y="4" width="20" height="16" rx="2"/>
                                <path d="M22 6l-10 7L2 6"/>
                            </svg>
                        </span>
                    </div>
                    <span class="error-message" id="emailError"></span>
                    <button type="submit" class="next-btn submit-btn">
                        Показати результати
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    `;
}

function createResultItemsHTML() {
    let html = `
        <div class="result-item">
            <span class="result-label">Email:</span>
            <span class="result-value" id="resultEmail"></span>
        </div>
    `;
    
    for (let questionIndex = 0; questionIndex < TOTAL_QUESTIONS; questionIndex++) {
        html += `
            <div class="result-item">
                <span class="result-label">Питання ${questionIndex + 1}:</span>
                <span class="result-value" data-result-answer="${questionIndex + 1}"></span>
            </div>
        `;
    }
    
    return html;
}

function createResultsScreenHTML() {
    return `
        <div class="screen" data-screen="${SCREEN.RESULTS}">
            <div class="question-card results-card">
                <div class="results-header">
                    <div class="trophy-icon">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                            <path d="M4 22h16"/>
                            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                        </svg>
                    </div>
                    <h2 class="results-title">Квіз завершено!</h2>
                    <div class="score-display">
                        <span class="score-number" id="scoreNumber">0</span>
                        <span class="score-total">/ ${TOTAL_QUESTIONS}</span>
                    </div>
                    <p class="score-label">правильних відповідей</p>
                </div>
                
                <div class="results-details">
                    ${createResultItemsHTML()}
                </div>

                <button class="restart-btn" id="restartBtn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                        <path d="M21 3v5h-5"/>
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                        <path d="M8 16H3v5"/>
                    </svg>
                    Пройти знову
                </button>
            </div>
        </div>
    `;
}

function createProgressStepsHTML() {
    let html = '';
    
    for (let step = 1; step <= TOTAL_STEPS; step++) {
        const isFirstStep = step === 1;
        const isLastStep = step === TOTAL_STEPS;
        const stepContent = isLastStep ? '✓' : step;
        const activeClass = isFirstStep ? ' active' : '';
        
        html += `<span class="step${activeClass}" data-step="${step}">${stepContent}</span>`;
    }
    
    return html;
}

export function generateQuizHTML() {
    const container = document.querySelector('.quiz-container');
    
    const progressBarHTML = `
        <div class="progress-bar">
            <div class="progress-fill" id="progressFill"></div>
        </div>
        <div class="progress-steps">
            ${createProgressStepsHTML()}
        </div>
    `;
    
    const questionScreensHTML = QUESTIONS
        .map((question, index) => createQuestionScreenHTML(question, index))
        .join('');
    
    container.innerHTML = progressBarHTML + questionScreensHTML + createEmailScreenHTML() + createResultsScreenHTML();
}

export function initializeElements() {
    elements = {
        screens: document.querySelectorAll('.screen'),
        progressFill: document.getElementById('progressFill'),
        progressSteps: document.querySelectorAll('.step'),
        optionsContainers: document.querySelectorAll('.options-grid'),
        nextButtons: document.querySelectorAll('[data-next-btn]'),
        emailForm: document.getElementById('emailForm'),
        emailInput: document.getElementById('emailInput'),
        emailError: document.getElementById('emailError'),
        resultEmail: document.getElementById('resultEmail'),
        resultAnswers: document.querySelectorAll('[data-result-answer]'),
        scoreNumber: document.getElementById('scoreNumber'),
        restartButton: document.getElementById('restartBtn')
    };
}

export function getElements() {
    return elements;
}

export function showScreen(screenNumber) {
    elements.screens.forEach(screen => {
        const isTargetScreen = parseInt(screen.dataset.screen) === screenNumber;
        screen.classList.toggle('active', isTargetScreen);
    });
    
    const progressPercentage = (screenNumber / TOTAL_STEPS) * 100;
    elements.progressFill.style.width = `${progressPercentage}%`;
    
    elements.progressSteps.forEach(step => {
        const stepNumber = parseInt(step.dataset.step);
        step.classList.toggle('completed', stepNumber < screenNumber);
        step.classList.toggle('active', stepNumber === screenNumber);
    });
}

export function restoreQuestionState(questionNumber) {
    const state = getState();
    const savedAnswer = state.answers[questionNumber];
    
    if (!savedAnswer) return;
    
    const optionsContainer = document.querySelector(`[data-question="${questionNumber}"]`);
    const nextButton = document.querySelector(`[data-next-btn="${questionNumber}"]`);
    
    if (!optionsContainer || !nextButton) return;
    
    optionsContainer.querySelectorAll('.option-btn').forEach(button => {
        button.disabled = true;
        
        const isCorrectAnswer = button.dataset.correct === 'true';
        const isSelectedAnswer = button.dataset.value === savedAnswer;
        
        if (isCorrectAnswer) {
            button.classList.add('correct');
        }
        
        if (isSelectedAnswer) {
            button.classList.add('selected');
            button.classList.add(isCorrectAnswer ? 'correct' : 'incorrect');
        }
    });
    
    nextButton.disabled = false;
}

export function displayResults() {
    const state = getState();
    let correctAnswersCount = 0;
    
    QUESTIONS.forEach((question, index) => {
        const questionNumber = index + 1;
        const userAnswer = state.answers[questionNumber];
        const isCorrect = userAnswer === question.correctAnswer;
        
        if (isCorrect) {
            correctAnswersCount++;
        }
        
        const answerOption = question.options.find(option => option.value === userAnswer);
        const answerLabel = answerOption ? answerOption.label : '-';
        
        const resultElement = document.querySelector(`[data-result-answer="${questionNumber}"]`);
        if (resultElement) {
            resultElement.textContent = answerLabel;
            resultElement.className = `result-value ${isCorrect ? 'correct' : 'incorrect'}`;
        }
    });
    
    elements.scoreNumber.textContent = correctAnswersCount;
    elements.resultEmail.textContent = state.email;
}

export function setEmailError(errorMessage) {
    elements.emailError.textContent = errorMessage || '';
    elements.emailInput.classList.toggle('error', !!errorMessage);
    elements.emailInput.classList.toggle('valid', !errorMessage && elements.emailInput.value.trim());
}

export function resetUI() {
    elements.optionsContainers.forEach(container => {
        container.querySelectorAll('.option-btn').forEach(button => {
            button.disabled = false;
            button.className = 'option-btn';
        });
    });
    
    elements.nextButtons.forEach(button => {
        button.disabled = true;
    });
    
    elements.emailInput.value = '';
    elements.emailInput.className = 'email-input';
    elements.emailError.textContent = '';
}
