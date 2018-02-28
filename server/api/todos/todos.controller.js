import { find } from 'lodash';

// Exported controller methods
export default {
  index,
  show
};

// This is an example to mock an async fetch from a database or service.
const getTodos = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(require('./todos.fixture.js'));
    });
  });
};

export function show(req, res) {
  const id = parseInt(req.params.id);
  const todos = require('./todos.fixture.js');
  const todo = find(todos, { id });

  return res.json(todo);
}

export async function index(req, res) {
  const todos = await getTodos();
  return res.json(todos);
}
