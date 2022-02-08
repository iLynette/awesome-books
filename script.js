(function () {

  var lastId = 0;
  var showList = document.getElementById("show_list");
  var btnSave = document.getElementById("save");
  var removeData;
  var dataList;

  function init() {
      if (!!(window.localStorage.getItem('dataList'))) {
          dataList = JSON.parse(window.localStorage.getItem('dataList'));
      }
      else {
          dataList = [];
      }
      btnSave.addEventListener('click', saveData);
      showData();
  }

  function showData() {
      if (!!dataList.length) {
          getLastTaskId();
          for (var item in dataList) {
              var data = dataList[item];
              addDataToList(data);
          }
          syncEvents();
      }
  }

  function saveData() {
      var data = {
          dataId: lastId,
          dataTitle: document.getElementById("title").value,
          dataAuthor: document.getElementById("author").value
      }
      dataList.push(data);
      syncTask();
      addDataToList(data);
      syncEvents();
      lastId++;
  }

  function addDataToList(data) {
      var removeData = document.createElement('span');
      var element = document.createElement('li');
      var line = document.createElement('div');

      element.setAttribute("id", data.dataId);
      element.innerHTML +=  data.dataTitle + '<br>' + data.dataAuthor + '<br> ' ;

      removeData.innerHTML = `<button>Remove</button>`;
      removeData.className = "remove_data";
      removeData.setAttribute("title", "Remove");

      line.innerHTML = `<div class="line"></div>`;

      element.appendChild(removeData);
      showList.appendChild(element);
      showList.appendChild(line);
  }

  function removeDta(event) {
      var dataToRemove = event.currentTarget.parentNode;
      console.log('data to remove', dataToRemove)
      var dataId = dataToRemove.id;
      console.log('data to remove id', dataToRemove.id)
      showList.removeChild(dataToRemove);
      dataList.forEach(function (value, i) {
          if (value.dataId == dataId) {
              dataList.splice(i, 1);
          }
      })
      syncTask();
  }

  function syncTask() {

      window.localStorage.setItem('dataList', JSON.stringify(dataList));
      dataList = JSON.parse(window.localStorage.getItem('dataList'));
  }

  function getLastTaskId() {
      var lastTask = dataList[dataList.length - 1];
      lastId = lastTask.dataId + 1;
  }

  function syncEvents() {

      removeData = document.getElementsByClassName("remove_data");
      if (!!removeData.length) {
          for (var i = 0; i < removeData.length; i++) {
              removeData[i].addEventListener('click', removeDta);
          }
      }
  }

  init();

})();