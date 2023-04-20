/**
 * @jest-environment jsdom
 */

import { checkTask, clearCompleted } from '../modules/update-list.js';
import { todoList } from '../modules/add-task.js';

describe('checkTask', () => {
  test('should update the completed status of a task', () => {
    const mockTask = {
      index: 0,
      title: 'Mock task',
      description: 'This is a mock task',
      completed: false,
    };
    todoList.push(mockTask);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;
    const event = { target: checkbox, dataset: { index: '0' } };

    checkTask(event);

    expect(mockTask.completed).toBe(true);
  });
});

describe('clearCompleted', () => {
  test('should remove all completed tasks from the list', () => {
    document.addEventListener('DOMContentLoaded', () => {
      const displayTasks = document.querySelector('.display-tasks');
      displayTasks.innerHTML = '';
      // Create a mock list with completed and incomplete tasks
      const mockList = [
        { completed: true },
        { completed: false },
        { completed: true },
      ];

      // Call the function with the mock list
      clearCompleted(mockList);

      // Check that the completed tasks have been removed
      expect(mockList).toEqual([{ completed: false }]);
    });
  });

  test('should update the index property of remaining tasks', () => {
    document.addEventListener('DOMContentLoaded', () => {
      const displayTasks = document.querySelector('.display-tasks');
      displayTasks.innerHTML = '';
      // Create a mock list with completed and incomplete tasks
      const mockList = [
        { index: 1, completed: true },
        { index: 2, completed: false },
        { index: 3, completed: true },
      ];

      // Call the function with the mock list
      clearCompleted(mockList);

      // Check that the index property of the remaining tasks has been updated
      expect(mockList).toEqual([
        { index: 1, completed: false },
        { index: 2, completed: true },
      ]);
    });
  });
});
