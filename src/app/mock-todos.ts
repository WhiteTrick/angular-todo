import {Todo} from './todo';

const NAMES = ['Leave for lunch.', 'Go to work.', 'Document Code.', 'Refill Coffee.'];
const DESCRIPTIONS = [
    'Go to Panera Bread with Lhito, Nick, Anvesh, Rigo, and Austin',
    'Learn Angular 7 and 8',
    'Follow javascript documentation syntax',
    'No cream or sugar.'
];

const todoGenerator = (id: number, m: number = 86400000) => {
    const r = Math.random();
    const complete = r < .5;
    return {
        id,
        createdAt: new Date(Date.now() - (r * m)),
        completedAt: complete ? new Date(Date.now() + (r * m)) : undefined,
        name: NAMES[Math.floor(r * NAMES.length)],
        description: r < Math.random() ? DESCRIPTIONS[Math.floor(r * DESCRIPTIONS.length)] : undefined,
        complete
    };
};

export const MOCK_TODOS: Todo[] = (new Array(Math.floor(Math.random() * 2) + 5)).fill(0).map((v, i) => i + 11).map(todoGenerator);
