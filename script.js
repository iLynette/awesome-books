(function () {
  let lastId = 0;
  const showList = document.getElementById('show_list');
  const btnSave = document.getElementById('save');
  let removeData;
  let dataList;

  function init() {
    if (window.localStorage.getItem('dataList')) {
      dataList = JSON.parse(window.localStorage.getItem('dataList'));
    } else {
      dataList = [];
    }
    btnSave.addEventListener('click', saveData);
    showData();
  }

  function showData() {
    if (dataList.length) {
      getLastTaskId();
      for (const item in dataList) {
        const data = dataList[item];
        addDataToList(data);
      }
      syncEvents();
    }
  }

  function saveData() {
    const data = {
      dataId: lastId,
      dataTitle: document.getElementById('title').value,
      dataAuthor: document.getElementById('author').value,
    };
    dataList.push(data);
    syncTask();
    addDataToList(data);
    syncEvents();
    lastId++;
  }

  function addDataToList(data) {
    const removeData = document.createElement('span');
    const element = document.createElement('li');
    const line = document.createElement('div');
    const alert = document.createElement('div')

    element.setAttribute('id', data.dataId);
    if (data.dataTitle !== "" && data.dataAuthor !== "") {
      element.innerHTML += `${data.dataTitle}<br>${data.dataAuthor}<br> `;

      removeData.innerHTML = '<button>Remove</button>';
      removeData.className = 'remove_data';
      removeData.setAttribute('title', 'Remove');

      line.innerHTML = '<div class="line"></div>';

      element.appendChild(removeData);
      showList.appendChild(element);
      element.appendChild(line);
    }
  }

  function removeDta(event) {
    const dataToRemove = event.currentTarget.parentNode;
    console.log('data to remove', dataToRemove);
    const dataId = dataToRemove.id;
    console.log('data to remove id', dataToRemove.id);
    showList.removeChild(dataToRemove);
    dataList.forEach((value, i) => {
      if (value.dataId == dataId) {
        dataList.splice(i, 1);
      }
    });
    syncTask();
  }

  function syncTask() {
    window.localStorage.setItem('dataList', JSON.stringify(dataList));
    dataList = JSON.parse(window.localStorage.getItem('dataList'));
  }

  function getLastTaskId() {
    const lastTask = dataList[dataList.length - 1];
    lastId = lastTask.dataId + 1;
  }

  function syncEvents() {
    removeData = document.getElementsByClassName('remove_data');
    if (removeData.length) {
      for (let i = 0; i < removeData.length; i++) {
        removeData[i].addEventListener('click', removeDta);
      }
    }
  }

  init();
}());