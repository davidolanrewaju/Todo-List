import './style.css';
import { renderList } from './modules/todolist.js';
import { addTask } from './modules/add-task.js';

const addBtn = document.querySelector('.add-btn');

addBtn.addEventListener('click', addTask);
window.addEventListener('DOMContentLoaded', () => {
  renderList();
});
