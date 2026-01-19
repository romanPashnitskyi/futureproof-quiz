import { QUESTIONS } from './config.js';
import { getState } from './state.js';

let el;

export function init() {
    el = {
        screens: document.querySelectorAll('.screen'),
        progress: document.getElementById('progressFill'),
        steps: document.querySelectorAll('.step'),
        opts: [document.getElementById('options1'), document.getElementById('options2')],
        nextBtns: [document.getElementById('nextBtn1'), document.getElementById('nextBtn2')],
        form: document.getElementById('emailForm'),
        input: document.getElementById('emailInput'),
        error: document.getElementById('emailError'),
        email: document.getElementById('resultEmail'),
        answers: [document.getElementById('resultAnswer1'), document.getElementById('resultAnswer2')],
        score: document.getElementById('scoreNumber'),
        restart: document.getElementById('restartBtn')
    };
}

export const get = () => el;

export function showScreen(n) {
    el.screens.forEach((s, i) => s.classList.toggle('active', i + 1 === n));
    el.progress.style.width = (n / 4 * 100) + '%';
    el.steps.forEach((s, i) => {
        s.classList.toggle('completed', i + 1 < n);
        s.classList.toggle('active', i + 1 === n);
    });
}

export function restore(n) {
    const ans = getState().answers[n];
    if (!ans) return;
    el.opts[n - 1].querySelectorAll('.option-btn').forEach(b => {
        b.disabled = true;
        if (b.dataset.correct === 'true') b.classList.add('correct');
        if (b.dataset.value === ans) b.classList.add('selected', b.dataset.correct === 'true' ? 'correct' : 'incorrect');
    });
    el.nextBtns[n - 1].disabled = false;
}

export function results() {
    const { answers, email } = getState();
    let score = 0;
    QUESTIONS.forEach((q, i) => {
        const ans = answers[i + 1];
        const ok = ans === q.correct;
        if (ok) score++;
        el.answers[i].textContent = q.options[ans] || '-';
        el.answers[i].className = 'result-value ' + (ok ? 'correct' : 'incorrect');
    });
    el.score.textContent = score;
    el.email.textContent = email;
}

export function setError(msg) {
    el.error.textContent = msg || '';
    el.input.classList.toggle('error', !!msg);
    el.input.classList.toggle('valid', !msg && el.input.value.trim());
}

export function resetUI() {
    el.opts.forEach(c => c.querySelectorAll('.option-btn').forEach(b => {
        b.disabled = false;
        b.className = 'option-btn';
    }));
    el.nextBtns.forEach(b => b.disabled = true);
    el.input.value = '';
    el.input.className = 'email-input';
    el.error.textContent = '';
}
