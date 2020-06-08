var h1 = document.getElementsByTagName('h1')[0];
const start = document.getElementById('start');
const reset = document.getElementById('reset');
let intervalToken = null;
const Laps = document.getElementById('laps');
var isInitial=true;
var time=[];
var index=0;
var lasttime=0;
var startTime;
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
    var updatedTime = new Date().getTime();
    difference = (updatedTime - startTime) + stopTime;
    
    h1.textContent = formatTime(difference);
}

function formatTime(difference) {
    var minutes;
    var secs;
    var centies;
    centies = Math.floor(difference/10) % 100;
    secs = Math.floor(Math.floor(difference/10)/100)%60;
    minutes = Math.floor(Math.floor(Math.floor(difference/10)/100)/60);

    centies = (centies < 10) ? "0" + centies : centies;
    secs = (secs < 10) ? "0" + secs : secs;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    return `${minutes}:${secs},${centies}`;
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
    var laptime;
  
    if(isInitial){
      
   
    laptime=formatTime(difference);
    time[index]= difference;
    lasttime=time[index];
    isInitial=false;
  }else{
      time[index]=difference-lasttime;
      lasttime =difference;
      laptime=formatTime(time[index]);
      
  }

  Laps.innerHTML = `
    <li id="${index}">
      <label class='left'>Lap ${++index}</label>
      <label class='right'>${laptime}</label>
    </li>
  `+Laps.innerHTML;

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
