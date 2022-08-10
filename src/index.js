// import _ from 'lodash';
import './style.css';

const arrayList = [
  {
    description: 'wash the dishes',
    completed: false,
    index: 0,
  },
  {
    description: 'complete To Do list project',
    completed: false,
    index: 1,
  },
];

const getPrincial = document.getElementById('list_row');

arrayList.forEach((elem) => {
  const dataStruct = `
    <div class="list list${elem.index}">
      <input type="checkbox">
      <p>${elem.description}</p>
    </div>
    <div class="point">
      <div class="points"></div>
      <div class="points"></div>
      <div class="points"></div>
    </div>
`;
  const createDiv = document.createElement('div');
  createDiv.classList.add('rows');
  createDiv.innerHTML = dataStruct;
  getPrincial.appendChild(createDiv);
});

function addTask() {
  const getList = document.getElementsByClassName('input_t')[0].value;
  const arrayGrow = arrayList.length;
  const newObject = {
    description: getList,
    completed: false,
    index: arrayGrow,
  };
  const dataStruct = `
    <div class="list list${newObject.index}">
      <input type="checkbox">
      <p>${newObject.description}</p>
    </div>
    <div class="point">
      <div class="points"></div>
      <div class="points"></div>
      <div class="points"></div>
    </div>
  `;
  const createDiv = document.createElement('div');
  createDiv.classList.add('rows');
  createDiv.innerHTML = dataStruct;
  getPrincial.appendChild(createDiv);
  arrayList.push(newObject);
}

// document.getElementsByClassName('input_t')[0].addEventListener('focusout', addTask);
document.getElementsByClassName('input_t')[0].addEventListener('keypress', (event) => {
  const keyCode = event.keyCode ? event.keyCode : event.which;
  if (keyCode === 13) {
    // call click function of the buttonn
    addTask();
  }
});
