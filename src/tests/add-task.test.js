// Import the functions we want to test
import { addTask, todoList } from '../modules/add-task.js';

describe('addTask', () => {
  // Test case 1
  test('should add task to todo list', () => {
    document.addEventListener('DOMContentLoaded', () => {
      const addToList = document.querySelector('#add-to-list');
      addToList.value = 'New task';
      addTask();
      expect(todoList.length).toBe(1);
      expect(todoList[0].description).toBe('New task');
    });
  });

  // Test case 2
  test('should reset input field after adding task', () => {
    document.addEventListener('DOMContentLoaded', () => {
      const addToList = document.querySelector('#add-to-list');
      addToList.value = 'New task';
      addTask();
      expect(addToList.value).toBe('');
    });
  });
});
