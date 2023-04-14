import { addTask, todoList } from '../modules/add-task.js';

// Test the addTask function
describe('Todo List', () => {
  test('addTask function adds a task to the todo list', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const taskData = {
      description: '',
      completed: false,
      index: todoList.length + 1,
    };
    taskData.description = 'Buy Groceries';

    addTask(event);

    expect(todoList).toHaveLength(1);
    expect(todoList[0].description).toBe('Buy groceries');
  });
});
