/**
 * @jest-environment jsdom
 */

import { checkTask, clearCompleted } from '../modules/update-list.js';
import { todoList } from '../modules/add-task.js';

describe('checkTask', () => {
  test('checks an existing task', () => {
    // Mock the event object with a data property
    const mockList = [
      { task: 'Task 1', completed: false },
      { task: 'Task 2', completed: false },
      { task: 'Task 3', completed: false },
    ];

    todoList.push(mockList);
    const event = {
      target: {
        dataset: {
          index: 0, // set the index to 0 for testing purposes
        },
        checked: true, // set the checked property to true initially
      },
    };

    // Call the function
    checkTask(event);

    // Assert that the todoList array has been modified correctly
    expect(todoList[0].completed).toBeTruthy();
  });

  // Test case for attempting to check a non-existent task
  test('attempts to check a non-existent task', () => {
    // Mock the event object with a data property
    const event = {
      target: {
        dataset: {
          index: 999, // set the index to a non-existent value for testing purposes
        },
        checked: true, // set the checked property to true for testing purposes
      },
    };

    // Set up the expected result
    const expected = undefined;

    // Call the function and store the result
    const result = checkTask(event);

    // Assert that the result matches the expected value
    expect(result).toEqual(expected);
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