var startbtn = document.getElementById('start');
var datatypebtn = document.getElementById('datatype');
var nextbtn = document.getElementById('next');
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
var normaltype=true;

startbtn.onclick=function(){

	showDiv.style.display="inline";
	inputDiv.style.display="none";
		
	splitData();

	showBox.innerHTML = '';
	Key.innerHTML = 'XXX';
	answerBox.innerHTML='';
  
}

datatypebtn.onclick=function(){
	if(normaltype){
		datatypebtn.textContent="Excel"
		inputBox.placeholder ="直接从Excel中复制粘贴两列数据，每项数据占一行，不得有空白行"
	}
	else{
		datatypebtn.textContent="标准"
		inputBox.placeholder ="数据项格式为: [ 键 : 值 ; ]，最后一个数据项不用分号结尾，注意只能使用英文字符。示例：1:2;3:4;5:6"
	}
	normaltype=!normaltype;
}

resetbtn.onclick=function(){

	showDiv.style.display="none";
	inputDiv.style.display="inline";

	mark = false;
	timer = 0;
	num = -1;
	list.splice(0,list.length)
}


nextbtn.onclick = function next() {
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
		if(list[num][0].length>10)
			Key.style.fontSize=20;
		else
			Key.style.fontSize=80;
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


answerbtn.onclick = function answer() {
	if(!mark)
		answerBox.style.display="inline";
}

document.onkeydown = function(event) {

	var e = event || window.event || arguments.callee.caller.arguments[0];


	if (e && e.keyCode == 32) { 

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
				if(list[num][0].length>10)
					Key.style.fontSize=20;
				else
					Key.style.fontSize=80;
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

	if (e && e.keyCode == 65 ) { 

		if(!mark)
		answerBox.style.display="inline";
	}

};

function random (min,max){
  return Math.floor(Math.random()*(max-min))+min;
}

function splitData(){

	if(normaltype){
		data = inputBox.value.split(';');
	
		for(var i=0;i< data.length; i++){
			list[i]=data[i].split(':');
		}
	}
	else{
		data = inputBox.value.split('\n');
		for(var i=0;i< data.length-1; i++){
			list[i]=data[i].split('\t');
		}
	}
}

去除换行
function ClearBr(key) {
    key = key.replace(/<\ ?.+?>/g,"");
    key = key.replace(/[\r\n]/g, "");
    return key;
}</\>