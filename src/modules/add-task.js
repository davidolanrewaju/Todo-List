// eslint-disable-next-line import/no-cycle
import { renderList } from './todolist.js';

const addToList = document.querySelector('#add-to-list');

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

function addTask() {
  const taskData = {
    description: '',
    completed: false,
    index: todoList.length + 1,
  };
  const getInput = addToList.value;
  taskData.description = getInput;
  todoList.push(taskData);
  saveData();
  renderList();

  addToList.value = ''; // reset input field

  // eslint-disable-next-line no-restricted-globals
  location.reload(); // refresh page
}

// eslint-disable-next-line import/prefer-default-export
export {
  addTask, loadData, saveData, todoList, addToList,
};
