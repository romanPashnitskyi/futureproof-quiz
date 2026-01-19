import { STORAGE_KEY } from './config.js';

const initial = { step: 1, answers: {}, email: '', done: false };
let state = { ...initial };

export const getState = () => state;

export function save(updates) {
    Object.assign(state, updates);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function load() {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) { state = JSON.parse(s); return true; }
    return false;
}

export function reset() {
    localStorage.removeItem(STORAGE_KEY);
    state = { ...initial };
}
