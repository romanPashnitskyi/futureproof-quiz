export const STORAGE_KEY = 'quiz_state';

export const QUESTIONS = [
    {
        text: 'Яка мова програмування є основою веб-розробки на стороні клієнта?',
        options: [
            { value: 'python', label: 'Python' },
            { value: 'javascript', label: 'JavaScript' },
            { value: 'java', label: 'Java' },
            { value: 'csharp', label: 'C#' }
        ],
        correctAnswer: 'javascript'
    },
    {
        text: 'Який тег HTML використовується для створення гіперпосилання?',
        options: [
            { value: 'link', label: '<link>' },
            { value: 'href', label: '<href>' },
            { value: 'a', label: '<a>' },
            { value: 'url', label: '<url>' }
        ],
        correctAnswer: 'a'
    }
];

export const TOTAL_QUESTIONS = QUESTIONS.length;

export const SCREEN = {
    FIRST_QUESTION: 1,
    EMAIL: TOTAL_QUESTIONS + 1,
    RESULTS: TOTAL_QUESTIONS + 2
};

export const TOTAL_STEPS = SCREEN.RESULTS;

export const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
