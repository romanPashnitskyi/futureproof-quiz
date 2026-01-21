const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEmail(email) {
    const trimmedEmail = email?.trim() || '';
    return EMAIL_PATTERN.test(trimmedEmail);
}

export function getEmailError(email) {
    if (!email?.trim()) {
        return 'Будь ласка, введіть email';
    }
    
    if (!validateEmail(email)) {
        return 'Введіть коректний email (наприклад: name@example.com)';
    }
    
    return null;
}
