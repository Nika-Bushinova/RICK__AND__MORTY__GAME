const MY_NAME='BUSHINOVA_RICKANDMORTIGAME_RECORD';
const AJAX_SCRIPT="https://fe.it-academy.by/AjaxStringStorage2.php";
var updatePassword;
var newRecords=[];
var thisScore;
var thisName;
function getAllRecords() {//получить рекорды, внести в таблицу
  
  let sp = new URLSearchParams();
  sp.append('f', 'READ');
  sp.append('n', MY_NAME);

  fetch(AJAX_SCRIPT, { method: 'post', body: sp })
      .then(response => response.json())
      .then(data => updateRecordsOnDOM(data))
      .catch(error => { console.error(error); });
}

function updateRecordsOnDOM(data) {//записать рекорды в таблицу
  thisName=document.getElementById('nameID').value
thisScore=score
  if (data.result != "") {
      var newArray = JSON.parse(data.result);
    //  console.log('newArray old: '+newArray);

      deleteOldRecords();
     
      var numberColumn=document.getElementById('numberColumn');
      var nameColumn=document.getElementById('nameColumn');
      var scoreColumn=document.getElementById('scoreColumn');
      var NumberLine = document.createElement('div');
      var NameLine = document.createElement('div');
      var ScoreLine = document.createElement('div');
      NumberLine.id='NumberLine';
      NameLine.id='NameLine';
      ScoreLine.id='ScoreLine';

      for (var i=0; i<newArray.length; i++) {
          var position=i+1;
          var playersName=newArray[i].name;
          var playersCount=newArray[i].count;
        //  console.log(position+' '+playersName+' '+playersCount);

          var numberLine = document.createElement('div');
          var nameLine = document.createElement('div');
          var scoreLine = document.createElement('div');
          numberLine.innerHTML=position;
          nameLine.innerHTML=playersName;
          scoreLine.innerHTML=playersCount;

          NumberLine.appendChild(numberLine);
          NameLine.appendChild(nameLine);
          ScoreLine.appendChild(scoreLine);
      }
      
      numberColumn.appendChild(NumberLine);
      nameColumn.appendChild(NameLine);
      scoreColumn.appendChild(ScoreLine);
  }
}
function deleteOldRecords() {
  if (document.getElementById('customnNumberLine')!=null && document.getElementById('customnNameLine')!=null && document.getElementById('customnScoreLine')!=null) {
      document.getElementById('customnNumberLine').remove();
      document.getElementById('customnNameLine').remove();
      document.getElementById('customnScoreLine').remove();
  }
}

function writeNewRecord(playersName, playersCounters) {//обновить рекорды
  thisName=document.getElementById('nameID').value
  thisScore=score
  thisScore = playersCounters;
  thisName = playersName;

  blockDataBase();
}

//////////////////////////////////////////////////////////
function blockDataBase() {
    updatePassword=Math.random();

    let sp = new URLSearchParams();
    sp.append('f', 'LOCKGET');
    sp.append('n', MY_NAME);
    sp.append('p', updatePassword);

    fetch(AJAX_SCRIPT, {method:'POST', body:sp})
        .then(response => response.json())
        .then( data => rewriteData(data))
        .catch(error => console.error(error));
}

function rewriteData(data) {
thisName=document.getElementById('nameID').value
thisScore=score

    if (data.result != "") {
        newRecords = JSON.parse(data.result);

        if (newRecords.length == 0) {
            newRecords.push({name:thisName, count:thisScore});//добавить новые элементы в пустой массив
         //   console.log("push");
        } else {

            for (var i=0; i< newRecords.length; i++) {//поместить новый рекорд вместо старого
              if (newRecords[i].count < thisScore) {
                  newRecords.splice(i, 0, {name:thisName, count:thisScore});
                  console.log("update");
                  break;
              }
          }

          if (newRecords.length > 3) {          // если длина массива с рекордами больше 3 - удалить последний элемент
              newRecords.splice(3, 1);
             // console.log("delete");
          }
      }
    }
    writeData();
}

function writeData() {//записать обновленный массив в базу
    let sp = new URLSearchParams();
    sp.append('f', 'UPDATE');
    sp.append('n', MY_NAME);
    sp.append('p', updatePassword);
    sp.append('v', JSON.stringify(newRecords));

    fetch(AJAX_SCRIPT, { method: 'post', body: sp })
        .then(response => response.json())
        .catch(error => { console.error(error); });
}




let sc = document.getElementById('score');
let visibleScore//значение видимости для таблицы рекордов
let countPush//учет нажатий на кнопку с рекордами
getAllRecords()
function scoreF() {

  console.log(visibleScore, countPush)
 if (!visibleScore && countPush !== 1) {
      visibleScore = true;
      sc.style.transform

      countPush = 1
      console.log('1')
  }else if(visibleScore==true&&countPush==0){
        sc.style.transform
        visibleScore = false
        countPush = 1
     
   } else if (countPush === 1 && !visibleScore) {
     console.log('2', visibleScore)
      visibleScore = true;
      sc.style.transform

   } else if(countPush === 1 &&visibleScore==true){
    console.log('3')
      visibleScore = false;
      sc.style.transform
   }
}

