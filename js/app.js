import { getState, load } from './state.js';
import { init, get, showScreen, restore, results } from './ui.js';
import { onOption, onNext, onSubmit, onInput, onBlur, onRestart } from './handlers.js';

function start() {
    init();
    const { opts, nextBtns, form, input, restart } = get();
    
    opts.forEach((c, i) => c.querySelectorAll('.option-btn').forEach(b => 
        b.addEventListener('click', () => onOption(i + 1, b))));
    nextBtns.forEach((b, i) => b.addEventListener('click', () => onNext(i + 1)));
    form.addEventListener('submit', onSubmit);
    input.addEventListener('input', onInput);
    input.addEventListener('blur', onBlur);
    restart.addEventListener('click', onRestart);
    
    if (load()) {
        const s = getState();
        [1, 2].forEach(n => s.answers[n] && restore(n));
        if (s.email) input.value = s.email;
        if (s.done) results();
        showScreen(s.step);
    } else showScreen(1);
}

document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', start) : start();
