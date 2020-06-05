var h1 = document.getElementsByTagName('h1')[0];
const start = document.getElementById('start');
const reset = document.getElementById('reset');
let intervalToken = null;
var seconds = 0; 
var minutes = 0;
var mseconds = 0;
const Laps = document.getElementById('laps');
var lseconds = null;
var lminutes =null;
var lmseconds=null;
var time=[];
var index=0;
var lasttime=0;
var startTime;
var updatedTime;
var difference=0;
var stopTime=0;
var lastmin=0;
var lastmax=0;


function startStop(){
    if(intervalToken != null){
        clearInterval(intervalToken);
        
        intervalToken=null;
        stopTime=difference;

        start.value = "Start";
        start.className="startbtn"
        reset.value = "Reset"
    } else {
        startTime = new Date().getTime();
        intervalToken = setInterval(getShowTime, 10);

        start.value = "Stop";
        start.className="stopbtn";
        reset.value = "Lap"
    }
}



function getShowTime(){
    updatedTime = new Date().getTime();
    difference = (updatedTime - startTime) + stopTime;
    mseconds = Math.floor(difference/10) % 100;
    seconds = Math.floor(Math.floor(difference/10)/100)%60;
    minutes = Math.floor(Math.floor(Math.floor(difference/10)/100)/60);
    
    
    mseconds = (mseconds < 10) ? "0" + mseconds : mseconds;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    h1.textContent = minutes + ':' + seconds + ',' + mseconds;
}


function resetLap(){
    if(intervalToken != null){
        loglap();
    } else {
        h1.textContent = "00:00,00";
        seconds = 0; minutes = 0; mseconds = 0;
        Laps.innerHTML = "";
        index=0;
        lmseconds=null;
        time=[];
        stopTime=0;
        lasttime=0;
    }
    
}

function loglap() {
  if(lmseconds==null){
    lmseconds=mseconds;
    lseconds=seconds;
    lminutes=minutes;
    time[index]= Math.floor(difference/10);
    lasttime=time[index];
  }else{
      time[index]=Math.floor(difference/10)-lasttime;
      lasttime =Math.floor(difference/10);
      lmseconds=time[index]%100;
      lseconds=(Math.floor(time[index]/100))%60;
      lminutes=Math.floor((Math.floor(time[index]/100))/60);
      lmseconds = (lmseconds < 10) ? "0" + lmseconds : lmseconds;
      lseconds = (lseconds < 10) ? "0" + lseconds : lseconds;
      lminutes = (lminutes < 10) ? "0" + lminutes : lminutes;
  }

  Laps.innerHTML += `
    <li id="${index}">
      <label>Lap ${++index}</label>
      <label>${lminutes}:${lseconds},${lmseconds}</label>
    </li>
  `;

  if(index==3){
    lastmax=findMax(time);
    lastmin=findMin(time);
    document.getElementById(lastmax).style.color="red";
    document.getElementById(lastmin).style.color="green";
  }
  if(index>3){
    if(lastmax!=findMax(time)){
        document.getElementById(lastmax).style.color="white";
        lastmax=findMax(time);
        document.getElementById(lastmax).style.color="red";
       
    }
    if(lastmin!=findMin(time)){
        document.getElementById(lastmin).style.color="white";
        lastmin=findMin(time);
        document.getElementById(lastmin).style.color="green";
    }
    
  }
  
  
}



function findMin(array) {
    return array.reduce(
        (acc, val, idx) => val < acc.val ? {idx, val} : acc,
        {idx: -1, val: Infinity}
    ).idx;
}

function findMax(array) {
    return array.reduce(
        (acc, val, idx) => val > acc.val ? {idx, val} : acc,
        {idx: -1, val: -Infinity}
    ).idx;
}
