import { addTask, todoList } from '../modules/add-task.js';

describe('addTask', () => {
  test('should add tasks to the todo list', () => {
    document.addEventListener('DOMContentLoaded', () => {
      const addToList = document.querySelector('#add-to-list');
      addToList.value = 'Buy groceries';
      addToList.value = 'Do laundry';
      addTask();

      // Check that both tasks are in the list
      expect(todoList).toHaveLength(2);
      expect(todoList[1].description).toEqual('Buy groceries');
      expect(todoList[4].description).toEqual('Do laundry');
    });
  });
});
