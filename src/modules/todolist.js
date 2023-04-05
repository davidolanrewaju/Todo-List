const displayTasks = document.getElementsByClassName('display-tasks');
const todoList = [
  {
    description: 'Wash car',
    completed: false,
    index: 0,
  },
  {
    description: 'Braid my hair',
    completed: false,
    index: 1,
  },
  {
    description: 'Water the garden',
    completed: false,
    index: 2,
  },
];

function renderList() {
  todoList.sort((a, b) => a.index - b.index); // sort array according to index
  for (let i = 0; i < todoList.length; i += 1) {
    const displayTask = document.createElement('div');
    displayTask.classList.add('display-task');
    displayTask.innerHTML += `
                <input id = 'checkbox' data-index = '${i}' type="checkbox" ${todoList[i].completed ? 'checked' : ''}>
                <p>${todoList[i].description}</p>
                <span class="material-icons">&#xe5d4;</span>
            </div>
    `;
    displayTasks[0].appendChild(displayTask);

    const checkbox = document.querySelector(`input[data-index="${i}"]`);
    checkbox.addEventListener('change', (event) => {
      const { index } = event.target.dataset;
      todoList[index].completed = event.target.checked;
    });
  }
}

// eslint-disable-next-line import/prefer-default-export
export { renderList };