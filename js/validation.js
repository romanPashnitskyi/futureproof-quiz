const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const validateEmail = (email) => EMAIL_REGEX.test(email?.trim() || '');

export function getEmailError(email) {
    if (!email?.trim()) return 'Будь ласка, введіть email';
    if (!validateEmail(email)) return 'Введіть коректний email (наприклад: name@example.com)';
    return null;
}
