const displayTasks = document.querySelector('.display-tasks');
const refreshBtn = document.querySelector('.refresh');
const addToList = document.querySelector('#add-to-list');
const addBtn = document.querySelector('.add-btn');

function saveData() {
  localStorage.setItem('todolist', JSON.stringify(todoList));
}

function loadData() {
  const savedData = JSON.parse(localStorage.getItem('todolist'));
  if (savedData) {
      todoList = savedData;
    }
}

let todoList = [];

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
                <input class = 'checkbox' data-index = '${i}' type="checkbox" ${todoList[i].completed ? 'checked' : ''}>
                <p>${todoList[i].description}</p>
                <span class="material-icons">&#xe5d4;</span>
            </div>
    `;
    displayTasks.appendChild(displayTask);

    const checkbox = document.querySelector(`input[data-index="${i}"]`);
    checkbox.addEventListener('change', (event) => {
      const { index } = event.target.dataset;
      todoList[index].completed = event.target.checked;
      saveData();
    });
  }
}

function addTask(event) {
    event.preventDefault();
    const taskData = {
      description: '',
      completed: false,
      index: todoList.length,
    }
    const getInput = addToList.value;
    taskData.description = getInput;
    todoList.push(taskData);
    saveData();
    renderList();

    addToList.value = ''; //reset input field
    location.reload(); //refresh page
}

loadData();
addBtn.addEventListener('click', addTask);
refreshBtn.addEventListener('click', loadData);

// eslint-disable-next-line import/prefer-default-export
export { renderList };