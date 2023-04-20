import { deleteTask } from '../modules/delete-task.js';

// A mock todoList array to use in tests
const todoList = [
  { title: 'Task 1', description: 'Description 1', index: 1 },
  { title: 'Task 2', description: 'Description 2', index: 2 },
  { title: 'Task 3', description: 'Description 3', index: 3 },
];

describe('deleteTask function', () => {
  test('should remove the correct task from the todoList array', () => {
    document.addEventListener('DOMContentLoaded', () => {
      const displayTasks = document.querySelector('.display-tasks');
      displayTasks.innerHTML = '';
      // Mock the event object
      const event = { target: { dataset: { index: 1 } } };

      // Call the deleteTask function
      deleteTask(event);

      // Check if the correct task has been removed from the todoList array
      expect(todoList).toEqual([
        { title: 'Task 1', description: 'Description 1', index: 1 },
        { title: 'Task 3', description: 'Description 3', index: 2 },
      ]);
    });
  });

  test('should update the index property of the remaining tasks', () => {
    document.addEventListener('DOMContentLoaded', () => {
      const displayTasks = document.querySelector('.display-tasks');
      displayTasks.innerHTML = '';
      // Mock the event object
      const event = { target: { dataset: { index: 0 } } };

      // Call the deleteTask function
      deleteTask(event);

      // Check if the index property of the remaining tasks has been updated
      expect(todoList).toEqual([
        { title: 'Task 1', description: 'Description 1', index: 1 },
        { title: 'Task 3', description: 'Description 3', index: 2 },
      ]);
    });
  });
});