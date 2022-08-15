// import _ from 'lodash';
import './style.css';
import status from './check';

const arrayList = [];
const getPrincial = document.getElementById('list_row');

const editElement = ((checkEvent) => {
  const storeData = document.getElementsByClassName(checkEvent)[0];
  storeData.getElementsByClassName('point')[0].style.display = 'none';
  storeData.getElementsByClassName('delete_img')[0].style.display = 'flex';
  storeData.getElementsByClassName('editable')[0].contentEditable = true;
  storeData.getElementsByClassName('editable')[0].focus();
  storeData.style.backgroundColor = 'rgb(231, 230, 177)';
});

const deleteElement = ((checkEvent) => {
  let keyCode = checkEvent.split(' ')[1];
  keyCode -= 1;
  arrayList.splice(keyCode, 1);
  document.getElementsByClassName(checkEvent)[0].remove();
  let resCount = 1;
  arrayList.forEach((ind) => {
    ind.index = resCount;
    resCount += 1;
  });
  localStorage.setItem('List', JSON.stringify(arrayList));
});

function addTask() {
  const getList = document.getElementsByClassName('input_t')[0].value;
  const ggetCount = document.getElementById('list_row');
  let arrayGrow = ggetCount.childElementCount;
  if (arrayGrow <= 0) {
    arrayGrow = 1;
  } else {
    arrayGrow = ggetCount.childElementCount + 1;
  }
  const newObject = {
    description: getList,
    completed: false,
    index: arrayGrow,
  };
  const dataStruct = `
    <div class="list">
      <input class="select" type="checkbox">
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
  localStorage.setItem('List', JSON.stringify(arrayList));
  document.getElementsByClassName('input_t')[0].value = '';
}

document.getElementById('list_row').addEventListener('click', (event) => {
  if (arrayList.length > 0) {
    const checkEvent = event.target.parentElement.className;
    const splitArr = checkEvent.split(' ');
    const getCharAt = splitArr[0];
    if (getCharAt === 'rows') {
      editElement(checkEvent);
    }
  }
});

document.getElementById('list_row').addEventListener('click', (event) => {
  if (arrayList.length > 0) {
    const checkEvent = event.target.parentElement.className;
    const checkIcon = event.target.className;
    const splitArr = checkEvent.split(' ');
    const getCharAt = splitArr[0];
    if (getCharAt === 'rows' && checkIcon === 'delete_img') {
      deleteElement(checkEvent);
    }
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

document.getElementById('list_row').addEventListener('click', (event) => {
  if (arrayList.length > 0) {
    const checkEvent = event.target.parentElement.className;
    const splitArr = checkEvent.split(' ');
    let getCharAt = splitArr[1];
    const valdiateErr = document.getElementsByClassName(checkEvent)[0];
    if (valdiateErr !== undefined) {
      document.getElementsByClassName(checkEvent)[0].addEventListener('keypress', (event) => {
        const keyCode = event.keyCode ? event.keyCode : event.which;
        if (keyCode === 13) {
          // call click function of the buttonn
          getCharAt -= 1;
          document.getElementsByClassName(checkEvent)[0].getElementsByClassName('editable')[0].contentEditable = false;
          document.getElementsByClassName(checkEvent)[0].getElementsByClassName('editable')[0].blur();
          document.getElementsByClassName('point')[getCharAt].style.display = 'flex';
          document.getElementsByClassName('delete_img')[getCharAt].style.display = 'none';
          document.getElementsByClassName(checkEvent)[0].style.backgroundColor = 'rgb(255, 255, 255)';
        }
      });
    }
  }
});

document.getElementById('unique').addEventListener('click', () => {
  const getDataLocal = localStorage.getItem('List');
  const parseLocalSt = JSON.parse(getDataLocal);
  const fileredData = parseLocalSt.filter((data) => data.completed !== true);
  let resCount = 1;
  fileredData.forEach((ind) => {
    ind.index = resCount;
    resCount += 1;
  });
  localStorage.setItem('List', JSON.stringify(fileredData));
  const getListAll = document.getElementById('list_row').childElementCount;
  let reCount = 0;
  for (let i = 0; i < getListAll; i += 1) {
    const getOne = document.getElementById('list_row').childNodes[reCount].childNodes[1].childNodes[1];
    const another = getOne.checked;
    if (another === true) {
      if (reCount === 0) {
        document.getElementById('list_row').childNodes[reCount].remove();
        reCount = 0;
      } else {
        document.getElementById('list_row').childNodes[reCount].remove();
        reCount = 1;
      }
    } else {
      reCount += 1;
    }
  }

  if (getListAll <= 1) {
    const getOne = document.getElementById('list_row').childNodes[0].childNodes[1].childNodes[1];
    const another = getOne.checked;
    if (another === true) {
      document.getElementById('list_row').childNodes[0].remove();
    }
  }
});

document.body.addEventListener('click', status(), true);

window.onload = (() => {
  const getDataLocal = localStorage.getItem('List');
  const transformData = JSON.parse(getDataLocal);
  if (transformData !== null) {
    transformData.forEach((elem) => {
      const dataStruct = `
        <div class="list">
          <input class="select" type="checkbox">
          <p class="editable">${elem.description}</p>
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
      createDiv.classList.add(elem.index);
      createDiv.innerHTML = dataStruct;
      getPrincial.appendChild(createDiv);
      const newObject = {
        description: elem.description,
        completed: false,
        index: elem.index,
      };
      arrayList.push(newObject);
    });
  }
});
