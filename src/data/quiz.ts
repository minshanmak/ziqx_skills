import type { Quiz } from '../types'

export const quizzes: Record<string, Quiz> = {
  'cleaning-quiz': {
    id: 'cleaning-quiz',
    title: 'Cleaning messy data · Quiz',
    passMark: 70,
    optional: true,
    questions: [
      {
        id: 'q1',
        prompt: 'What is the first thing to do with a messy dataset?',
        options: [
          'Delete every row with a blank',
          'Look at it and note what is wrong',
          'Build a chart straight away',
          'Sort every column A to Z',
        ],
        correctIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'Which of these is a sign of duplicate data?',
        options: [
          'The same customer email appears on several rows',
          'Every value in a column is different',
          'Dates are written in one format',
          'Numbers are aligned to the right',
        ],
        correctIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'A date that is left-aligned in a cell is most likely…',
        options: [
          'A real date value',
          'Text that looks like a date',
          'A formula result',
          'A hidden column',
        ],
        correctIndex: 1,
      },
      {
        id: 'q4',
        prompt: 'Which is the safest way to handle a blank cell in a required column?',
        options: [
          'Fill it with zero',
          'Copy the value from the row above',
          'Flag it and find the real value',
          'Ignore it',
        ],
        correctIndex: 2,
      },
      {
        id: 'q5',
        prompt: 'Why keep one consistent date format across a sheet?',
        options: [
          'It makes the file smaller',
          'Sorting and filtering work correctly',
          'It removes duplicates automatically',
          'It protects the sheet',
        ],
        correctIndex: 1,
      },
    ],
  },
}
