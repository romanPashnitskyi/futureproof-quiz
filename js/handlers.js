import { save, reset, getState } from './state.js';
import { validateEmail, getEmailError } from './validation.js';
import { get, showScreen, setError, results, resetUI } from './ui.js';

export function onOption(n, btn) {
    const { opts, nextBtns } = get();
    opts[n - 1].querySelectorAll('.option-btn').forEach(b => {
        b.disabled = true;
        if (b.dataset.correct === 'true') b.classList.add('correct');
    });
    btn.classList.add('selected', btn.dataset.correct === 'true' ? 'correct' : 'incorrect');
    nextBtns[n - 1].disabled = false;
    save({ answers: { ...getState().answers, [n]: btn.dataset.value } });
}

export function onNext(n) {
    save({ step: n + 1 });
    showScreen(n + 1);
}

export function onSubmit(e) {
    e.preventDefault();
    const email = get().input.value.trim();
    const err = getEmailError(email);
    if (err) { setError(err); get().input.focus(); return; }
    save({ email, step: 4, done: true });
    results();
    showScreen(4);
}

export function onInput() {
    const v = get().input.value.trim();
    setError(v && !validateEmail(v) ? '' : null);
    get().input.classList.toggle('valid', v && validateEmail(v));
}

export function onBlur(e) {
    if (e.relatedTarget?.classList.contains('submit-btn')) return;
    const v = get().input.value.trim();
    if (v && !validateEmail(v)) setError('Введіть коректний email');
}

export function onRestart() {
    reset();
    resetUI();
    showScreen(1);
}
