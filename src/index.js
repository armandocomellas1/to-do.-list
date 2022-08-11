// import _ from 'lodash';
import './style.css';

let countStart = 0;
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
    <div class="list">
      <input type="checkbox">
      <p class="editable">${elem.description}</p>
    </div>
    <div class="point" onclick="displayMenu()">
      <div class="points"></div>
      <div class="points"></div>
      <div class="points"></div>
    </div>
    <div class="delete_img">
      <div class="pointv"></div>
      <div class="pointv"></div>
      <div class="pointv"></div>
    </div>
  `;
  const createDiv = document.createElement('div');
  createDiv.classList.add('rows');
  createDiv.classList.add(elem.index);
  createDiv.innerHTML = dataStruct;
  getPrincial.appendChild(createDiv);
});

function addTask() {
  const getList = document.getElementsByClassName('input_t')[0].value;
  const ggetCount = document.getElementById('list_row');
  const arrayGrow = ggetCount.childElementCount;
  const newObject = {
    description: getList,
    completed: false,
    index: arrayGrow,
  };
  const dataStruct = `
    <div class="list">
      <input type="checkbox">
      <p class="editable">${newObject.description}</p>
    </div>
    <div class="point">
      <div class="points"></div>
      <div class="points"></div>
      <div class="points"></div>
    </div>
    <div class="delete_img">
      <div class="pointv"></div>
      <div class="pointv"></div>
      <div class="pointv"></div>
    </div>
  `;
  const createDiv = document.createElement('div');
  createDiv.classList.add('rows');
  createDiv.classList.add(newObject.index);
  createDiv.innerHTML = dataStruct;
  getPrincial.appendChild(createDiv);
  arrayList.push(newObject);
  document.getElementsByClassName('input_t')[0].value = '';
  countStart += 1;
}

function orderList() {
  const ggetCount = document.getElementById('list_row');
  const arrayGrow = ggetCount.childElementCount;
  for (let i = 0; i < arrayGrow; i += 1) {
    document.getElementsByClassName('rows')[i].className = `rows ${i}`;
  }
}

const displayMenu = ((getIndiv) => {
  const transform = getIndiv.split(' ');
  const numSelect = Number(transform[1]);
  document.getElementsByClassName('point')[numSelect].style.display = 'none';
  document.getElementsByClassName('delete_img')[numSelect].style.display = 'flex';
  document.getElementsByClassName('editable')[numSelect].contentEditable = true;
  document.getElementsByClassName('editable')[numSelect].focus();
  document.getElementsByClassName('rows')[numSelect].style.backgroundColor = 'rgb(231, 230, 177)';
});

const deleteMenu = ((getIndiv) => {
  if (getIndiv !== undefined) {
    const transform = getIndiv.split(' ');
    const numSelect = transform[1];
    document.getElementsByClassName(numSelect)[0].remove();
    orderList();
  }
});

// Logic to show the points select
const checkPoint = (() => {
  const anotherDiv = document.getElementById('list_row');
  const elementsPoint = anotherDiv.getElementsByClassName('point');
  for (let i = 0; i < elementsPoint.length; i += 1) {
    const getPointEl = elementsPoint[i];
    getPointEl.addEventListener('click', (e) => {
      if (e.type === 'click' && e.target.className === 'point') {
        const checkEventPoint = e.target.parentElement.className;
        displayMenu(checkEventPoint);
        e.preventDefault();
      }
    });
  }
});
// Logic to show delete menu
const checkDelete = (() => {
  const docs = document.getElementById('list_row');
  const elements = docs.getElementsByClassName('delete_img');
  for (let i = 0; i < elements.length; i += 1) {
    const getPoint = elements[i];
    getPoint.addEventListener('click', (e) => {
      if (e.type === 'click' && e.target.className === 'delete_img') {
        const checkEvent = e.target.parentElement.className;
        deleteMenu(checkEvent);
        e.preventDefault();
      }
    });
  }
});
document.addEventListener('DOMSubtreeModified', () => {
  if (countStart > 0) {
    checkPoint();
  }
});

document.addEventListener('DOMSubtreeModified', () => {
  if (countStart > 0) {
    checkDelete();
  }
});
// document.getElementsByClassName('input_t')[0].addEventListener('focusout', addTask);
document.getElementsByClassName('input_t')[0].addEventListener('keypress', (event) => {
  const keyCode = event.keyCode ? event.keyCode : event.which;
  if (keyCode === 13) {
    // call click function of the buttonn
    addTask();
  }
});
