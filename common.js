
$.ajaxSetup({            cache: false        });
function StringBuffer(){this.b=[];}
StringBuffer.prototype.append=function(a){this.b.push(a);}
StringBuffer.prototype.toString=function(){return this.b.join("");}


//获取选中的相的数组
function getCheckBoxArr(){
	var arr = document.getElementsByName("checkbox");
	var newArr = new Array();
	for(var i = 0;i < arr.length;i++){
		if(arr[i].checked){
			newArr.push(arr[i]);
		}
	}
	return newArr;
}



function searchData(){
	referForm("page_" + $("#cddm").val() + ".jsp");
}
function searchDataL(url){
	referForm(url);
}

function referForm(url){
	//layer.load();
	document.forms[0].action = url;
	document.forms[0].submit();
}


function referPareForm(url){
	window.parent.document.getElementById("myframe").contentWindow.searchData();
	window.parent.layer.close(window.parent.layer.getFrameIndex(window.name));
}

function getSelNum(tabId){
	var sm = 0;
	var dqz = "";
	$("#"+tabId).find("input[name='checkbox']").each(function(){if(this.checked){sm++;dqz=this.value;}});
	return [sm, dqz];
}


function getSelVal(tabId, selValName){
	var ids = [];
	$("#"+tabId).find("input[name='checkbox']").each(function(){if(this.checked){ids.push(this.value);}});
	document.getElementById(selValName).value = ids.join("','");
}

function delInfo(msg, url){
	var gsz = getSelNum("rsTab");
	if (gsz[0] != "0"){
		window.parent.layer.confirm(msg,{shift:-1},function(index){
			getSelVal("rsTab", "selVal");
			referForm(url);
			window.parent.layer.close(index);
		});
	}else{
		showMsg('你还未选择记录，请最少选中一条记录再点操作！');
	}
}

function SetStatus(msg, url){
	window.parent.layer.confirm(msg,{shift:-1},function(index){
		referForm(url);
		window.parent.layer.close(index);
	});
}

function expExcel(url){
	document.forms[0].target="_blank";
	document.forms[0].action = url;
	document.forms[0].submit();
	document.forms[0].target="_self";
}


function expWord(url){
	var selNum = getSelNum("#tt");
	if(selNum == 0){
		window.parent.$.messager.alert('消息提示','你还未选择记录，请选择一条记录再点操作！','info');
	}else if(selNum == 1){
		var urlTmp = url + "&rowCode=" + $('#tt').datagrid('getSelected').rowCode;
		expExcel(urlTmp);
	}else{
		window.parent.$.messager.alert('消息提示','操作失败，原因：你选择了多条记录，该操作只能选择一条记录！','info');
	}
}

function yzwjgs(str, gs){
	var tag = false;
	var point = str.lastIndexOf(".");
	for(i=0; i<gs.length; i++){
		if(str.substring(point) == gs[i]){
			tag = true;
			break;
		}
	}
	return tag;
}

function closeWin(msgIndex){
	window.parent.layer.close(msgIndex);	           
}

function showWin(tlt, wid, hgh, url){	
	window.parent.layer.open({
		type: 2, //page层
		area: [wid+"px", hgh+"px"],
		title: tlt,
		skin: 'layui-layer-danlan', //淡蓝风格
		content:url,
		shade: 0.5, //遮罩透明度
		shift: -1 //0-6的动画形式，-1不开启
	});
}

function showMsg(msg){
	   layer.open({content:msg,btn:'确定'}); 
}

function addInfo(tlt, wid, hgh, url){
	showWin(tlt, wid, hgh, url)
}

function modInfo(tlt, wid, hgh, url){
	var gsz = getSelNum("rsTab");
	if(gsz[0] == "0"){
		showMsg('你还未选择记录，请选择一条记录再点操作！');
	}else if(gsz[0] == "1"){
		showWin(tlt, wid, hgh, url+"&rowCode="+gsz[1]);
	}else{
		showMsg('操作失败，原因：你选择了多条记录，该操作只能选择一条记录！');
	}
}
function selMenu(obj, url){
	   $("#menuBar").find("dd").each(function(){$(this).removeClass("selected");});
	   var menuObj = $(obj).parent();
	   menuObj.addClass("selected");
	   self.location = url;
}
function allSelCon(obj){
  		var curChkTag = obj.checked;
  		$("input[name='checkbox']").each(function(){this.checked=curChkTag;});
	}
function shutDown(obj){
	parent.layer.close(parent.layer.getFrameIndex(window.name));
}
function addTbS(tbId){
	var trObj = $(tbId).children("tr");
	for(var i=0; i<trObj.length; i++){
		if(i % 2 == 1){
			$(trObj[i]).addClass("taskL-alt");
		}
	}
}
function rowMOver(trObj){
	$(trObj).addClass("task-over");
}

function rowMOut(trObj){
	$(trObj).removeClass("task-over");
}

function initSelOpt(json, IDname){
	var OptObj = document.getElementById(IDname);
	OptObj.options.length = 0;
	OptObj.options[0] = new Option("全部", "all");
	if(json != "[]"){
	   var data = eval(json);
	   for(i=0; i<data.length; i++){
		  OptObj.options[OptObj.options.length] = new Option(data[i].mc, data[i].dm);
       }
	}
}


function getPareObj(curObjName){
	   var obj;
	   var divObj = window.parent.$("div[type='iframe']");
	   for(var i=0; i<divObj.length; i++){
		   if(divObj.eq(i).find("iframe").attr("id") != curObjName){
			   obj = window.parent.document.getElementById(divObj.eq(i).find("iframe").attr("id")).contentWindow;
			   break;
		   }
	   }
	   return obj ;
}

function uniencode(text)   //ajax传中文到后台需要通过该函数转码，后台通过EscapeUnescape.unescape函数来解码
{
 text = escape(text.toString()).replace(/\+/g, "%2B");
 var matches = text.match(/(%([0-9A-F]{2}))/gi);
 if (matches)
 {
 for (var matchid = 0; matchid < matches.length; matchid++)
 {
 var code = matches[matchid].substring(1,3);
 if (parseInt(code, 16) >= 128)
 {
 text = text.replace(matches[matchid], '%u00' + code);
 }
 }
 }
 text = text.replace('%25', '%u0025');
 return text;
}
