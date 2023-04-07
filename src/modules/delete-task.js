/* eslint-disable import/no-cycle */
import { todoList, saveData } from './add-task.js';
import { renderList } from './todolist.js';

function deleteTask(event) {
  const { index } = event.target.dataset;
  todoList.splice(index, 1);
  saveData();

  // update the index value of the remaining tasks
  for (let i = index; i < todoList.length; i += 1) {
    todoList[i].index = i;
  }

  renderList();
}

// eslint-disable-next-line import/prefer-default-export
export { deleteTask };
