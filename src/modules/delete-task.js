/* eslint-disable import/no-cycle */
import { todoList, saveData } from './add-task.js';
import { renderList } from './todolist.js';

function deleteTask(event) {
  const { index } = event.target.dataset;
  const itemIndex = todoList.findIndex(
    (item) => item.index === parseInt(index, 10),
  );
  if (itemIndex === -1) {
    return; // no item found, exit the function
  }
  todoList.splice(itemIndex, 1);

  // update the index value of the remaining tasks
  for (let i = itemIndex; i < todoList.length; i += 1) {
    todoList[i].index = i + 1;
  }

  saveData();
  renderList();
}

// eslint-disable-next-line import/prefer-default-export
export { deleteTask };
