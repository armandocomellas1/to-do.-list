export default function status() {
  document.getElementById('list_row').addEventListener('click', (event) => {
    if (event.target.className === 'select') {
      const getParentName = event.path[1].children[1];
      getParentName.style.textDecoration = 'line-through';
      let getIndexUpdate = event.path[2].className;
      getIndexUpdate = getIndexUpdate.split(' ');
      const indexAt = getIndexUpdate[1];
      const getDescript = event.path[1].children[1].innerText;
      // getDescript = getDescript.split(' ');
      // const indexAt = getDescript[1];
      const result = {
        description: getDescript,
        completed: true,
        index: indexAt,
      };
      const getDataLocal = localStorage.getItem('List');
      const parseLocalSt = JSON.parse(getDataLocal);
      parseLocalSt.forEach((data) => {
        const comparedata = Number(data.index);
        const compareResult = Number(result.index);
        if (comparedata === compareResult) {
          // Nada
          data.completed = true;
        }
      });
      localStorage.setItem('List', JSON.stringify(parseLocalSt));
    }
  });
}
