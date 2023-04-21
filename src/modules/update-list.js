/* eslint-disable-next-line import/no-cycle */
import { todoList, saveData } from './add-task.js';
import { renderList } from './todolist.js';

function checkTask(event) {
  const { index } = event.target.dataset;
  if (todoList[index]) {
    todoList[index].completed = event.target.checked;
    saveData();
  }
}

function clearCompleted() {
  const incompleteTasks = todoList.filter((task) => !task.completed);
  todoList.splice(0, todoList.length, ...incompleteTasks);

  // update the index property of the remaining tasks
  todoList.forEach((task, i) => {
    task.index = i + 1;
  });

  saveData();
  renderList();
  // eslint-disable-next-line no-restricted-globals
  location.reload();
}

// eslint-disable-next-line import/prefer-default-export
export { checkTask, clearCompleted };