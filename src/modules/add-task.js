// eslint-disable-next-line import/no-cycle
import { renderList } from './todolist.js';

// eslint-disable-next-line import/no-mutable-exports
let todoList = [];

function saveData() {
  localStorage.setItem('todolist', JSON.stringify(todoList));
}

function loadData() {
  const savedData = JSON.parse(localStorage.getItem('todolist'));
  if (savedData) {
    todoList = savedData;
  }
}

function addTask(event) {
  event.preventDefault();
  const taskData = {
    description: '',
    completed: false,
    index: todoList.length + 1,
  };
  const getInput = ((document.getElementById('add-to-list') || {}).value) || '';
  taskData.description = getInput;
  todoList.push(taskData);
  saveData();
  renderList();

  document.getElementById('add-to-list').value = ''; // reset input field
  // eslint-disable-next-line no-restricted-globals
  location.reload(); // refresh page
}

// eslint-disable-next-line import/prefer-default-export
export {
  addTask, loadData, saveData, todoList,
};