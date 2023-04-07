/* eslint-disable import/no-cycle */
import { todoList, saveData } from './add-task.js';
import { renderList } from './todolist.js';

function deleteTask(event) {
  const { index } = event.target.dataset;
  todoList.splice(index, 1);
  saveData();
  renderList();
}

// eslint-disable-next-line import/prefer-default-export
export { deleteTask };
