/* eslint-disable import/no-cycle */
import { saveData, loadData, todoList } from './add-task.js';
import { deleteTask } from './delete-task.js';
import { checkTask, clearCompleted } from './update-list.js';

const displayTasks = document.querySelector('.display-tasks');
const refreshBtn = document.querySelector('.refresh');
const clearBtn = document.querySelector('.clear-btn');

// Add a clearList function to remove all child nodes from the displayTasks element
function clearList() {
  while (displayTasks.firstChild) {
    displayTasks.removeChild(displayTasks.firstChild);
  }
}

function renderList() {
  clearList();

  todoList.sort((a, b) => a.index - b.index); // sort array according to index
  for (let i = 0; i < todoList.length; i += 1) {
    const displayTask = document.createElement('div');
    displayTask.classList.add('display-task');
    displayTask.innerHTML += `
                <div class="check-task">
                  <input class = 'checkbox' data-index = '${i}' type="checkbox" ${todoList[i].completed ? 'checked' : ''}>
                  <p data-index = '${i}'>${todoList[i].description}</p>
                </div>
                <div class="task-icons">
                  <span class="material-icons edit" data-index = '${i}'>&#xe3c9;</span>
                  <span class="material-icons delete" data-index = '${i}'>&#xe872</span>
                </div>
            </div>
    `;
    displayTasks.appendChild(displayTask);

    const checkbox = document.querySelector(`input[data-index="${i}"]`);
    // eslint-disable-next-line no-loop-func
    checkbox.addEventListener('change', checkTask);

    const editBtn = document.querySelector(`.edit[data-index="${i}"]`);
    const deleteBtn = document.querySelector(`.delete[data-index="${i}"]`);
    const descriptionElem = document.querySelector(`p[data-index="${i}"]`);

    // eslint-disable-next-line no-loop-func
    editBtn.addEventListener('click', (event) => {
      const { index } = event.target.dataset;
      const descriptionElem = document.querySelector(`p[data-index="${index}"]`);
      descriptionElem.contentEditable = true;
      descriptionElem.classList.add('edit-mode');
      displayTask.style.backgroundColor = '#fff9c1';
      descriptionElem.focus();
      editBtn.style.display = 'none';
      saveData();
    });

    // eslint-disable-next-line no-loop-func
    descriptionElem.addEventListener('blur', (event) => {
      const { index } = event.target.dataset;
      todoList[index].description = event.target.textContent;
      const descriptionElem = document.querySelector(`p[data-index="${index}"]`);
      descriptionElem.contentEditable = false;
      descriptionElem.classList.remove('edit-mode');
      displayTask.style.backgroundColor = 'transparent';
      editBtn.style.display = 'block';
      saveData();
    });

    deleteBtn.addEventListener('click', deleteTask);
  }
}

loadData();

refreshBtn.addEventListener('click', () => {
  // eslint-disable-next-line no-restricted-globals
  location.reload();
  loadData();
});
clearBtn.addEventListener('click', clearCompleted);

// eslint-disable-next-line import/prefer-default-export
export { renderList };