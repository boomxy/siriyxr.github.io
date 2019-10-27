var nextbtn = document.getElementById('next');
var startbtn = document.getElementById('start');
var answerbtn = document.getElementById('answer');
var resetbtn = document.getElementById('reset');
var Key = document.getElementById('Key');
var showBox = document.getElementById('showBox');
var inputBox = document.getElementById('inputBox');
var answerBox = document.getElementById('answerBox');

var showDiv = document.getElementById('showDiv');
var inputDiv = document.getElementById('inputDiv');

var data;
var list=new Array();

var mark = false;
var timer = 0;
var num = -1;

startbtn.onclick=function(){

	showDiv.style.display="inline";
	inputDiv.style.display="none";
		
	data = inputBox.value.split(';');
	
	for(var i=0;i< data.length; i++){
		list[i]=data[i].split(':');
	}
	
	mark = false;
	timer = 0;
	num = -1;

	showBox.innerHTML = '';
	Key.innerHTML = 'XXX';
	answerBox.innerHTML='';
  
}

resetbtn.onclick=function(){

	showDiv.style.display="none";
	inputDiv.style.display="inline";

}

nextbtn.onclick = function () {
  if(list.length == 0) {
    alert("没有啦～～～～");
    return;
  }
  mark = !mark;

  if(mark) {
    // 为true　第一次点击
    timer = setInterval(function(){
      num = random(list.length,0);
      Key.innerText = ClearBr(list[num][0]);
		answerBox.innerHTML=list[num][1];
		answerBox.style.display="none";
    },100)
  }else {
		clearInterval(timer);
		list.splice(num, 1);
		var keys=new Array();
		for(var i=0;i< list.length; i++){
			keys[i]=list[i][0];
		}				
		showBox.innerHTML = `剩余个数：${list.length}<br> ${keys.toString()}`;
  }
}

answerbtn.onclick = function(){
	answerBox.style.display="inline";

}

function random (min,max){
  return Math.floor(Math.random()*(max-min))+min;
}

去除换行
function ClearBr(key) {
    key = key.replace(/<\ ?.+?>/g,"");
    key = key.replace(/[\r\n]/g, "");
    return key;
}</\>