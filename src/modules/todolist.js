const displayTasks = document.querySelector('.display-tasks');
const refreshBtn = document.querySelector('.refresh');
const addToList = document.querySelector('#add-to-list');
const addBtn = document.querySelector('.add-btn');

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
                  <span class="material-icons edit" data-index = '${i}'>&#xe5d4;</span>
                  <span class="material-icons delete" data-index = '${i}'>&#xe872</span>
                </div>
            </div>
    `;
    displayTasks.appendChild(displayTask);

    const checkbox = document.querySelector(`input[data-index="${i}"]`);
    // eslint-disable-next-line no-loop-func
    checkbox.addEventListener('change', (event) => {
      const { index } = event.target.dataset;
      todoList[index].completed = event.target.checked;
      saveData();
    });

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
      deleteBtn.style.display = 'block';
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

    // eslint-disable-next-line no-loop-func
    deleteBtn.addEventListener('click', (event) => {
      const { index } = event.target.dataset;
      todoList.splice(index, 1);
      saveData();
      renderList();
    });
  }
}

function addTask(event) {
  event.preventDefault();
  const taskData = {
    description: '',
    completed: false,
    index: todoList.length,
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

loadData();
addBtn.addEventListener('click', addTask);
refreshBtn.addEventListener('click', () => {
  // eslint-disable-next-line no-restricted-globals
  location.reload();
  loadData();
});

// eslint-disable-next-line import/prefer-default-export
export { renderList };