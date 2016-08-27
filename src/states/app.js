import SO from '../lib/simple-observable';

export default {
    todos: new SO([
        {content: 'eat breakfast', checked: true},
        {content: 'take a shower', checked: false}
    ])
}