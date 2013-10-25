/*******************************************************************************
 * Copyright (c) 2006, 2006 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials 
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *   Hong Guang (IBM Corp.) - initial implementation
 *******************************************************************************/
 
var isMozilla = navigator.userAgent.indexOf('Mozilla') != -1 && parseInt(navigator.appVersion.substring(0,1)) >= 5;
var isIE = navigator.userAgent.indexOf('MSIE') != -1;
var isSafari = navigator.userAgent.indexOf('Safari') != -1;

var hightLightItem;
// whether the popup menu is clicked after it show up
var parentClick = "true";
// the next item of popup menu
var childID = 0;
// amount of popup menu items
var arraylength = 4;
// popup menu items
var array= new Array(arraylength);
array[0]="singleTopicPrint";
array[1]="subTopicsPrint";
array[2]="singleTopicSearch";
array[3]="subTopicsSearch";

var quickSingleSearchDialog;
var quickSubSearchDialog;
var printWindow;

var singleAbove=false;
var subAbove=false;


//*********************************************
// deal with hot key action
// show the popup menu or change the selected
// menu item
//*********************************************
function Hotkey(event, targetObj, ctrlKey, shiftKey, altKey, keycode)
{
	if(!targetObj){
	return;
	}
	var id = targetObj.id;
	if (
		targetObj
		&& event.ctrlKey == ctrlKey 
		&& event.shiftKey == shiftKey 
		&& event.altKey == altKey 
		&& event.keyCode == keycode
		){
			showPopupMenu(targetObj); 
		}
	if(event.keyCode == 27 && parentClick == "false"){
		var leftmenu = document.getElementById("leftmenu");
		leftmenu.style.visibility="hidden"
		if(linkObject){
			linkObject.focus();
		}
	}
	var leftmenu = document.getElementById("leftmenu");
	if(leftmenu.style.visibility != "hidden"){
		if(event.keyCode == 9 && parentClick == "false" ){
			if(event.shiftKey == false){
				if(childID == 3){
					var leftmenu = document.getElementById("leftmenu");
					leftmenu.style.visibility="hidden"
					if(linkObject){
						linkObject.focus();
					}
				}
				if(childID < arraylength - 1) {
					childID = childID + 1;			
				} else {
					childID = 0;
				}
			} else {
				if(childID == 0){
				
					var leftmenu = document.getElementById("leftmenu");
					leftmenu.style.visibility="hidden"
					if(linkObject){
						linkObject.focus();
					}
				}
				if(childID > 0) {
					childID = childID - 1;
					
				} else {
					childID = arraylength - 1;
				}
			}
		}
		
		// select the previous item
		if(event.keyCode == 38 && parentClick == "false"){
			if(childID > 0) {
				childID = childID - 1;
				
			} else {
				childID = arraylength - 1;
			}
			document.getElementById(array[childID]).focus();
		}
		
		// select the next item
		if(event.keyCode == 40 && parentClick == "false"){
			if(childID < arraylength - 1) {
				childID = childID + 1;			
			} else {
				childID = 0;
			}
			document.getElementById(array[childID]).focus();
		}
	}
		
}

// hot key handler
function fnKeyup(event)
{
	var b = document.getElementById("imagmenu");
	Hotkey(event, b, false, false, true, 77);
}

// listen the key board event
if (document.addEventListener)
	document.addEventListener("keydown",fnKeyup,true);
else
	document.attachEvent("onkeydown",fnKeyup);
	
// previous icon-menu	
var preicon;
var linkObject;



//********************************
// show the popup menu
//********************************
function showPopupMenu (arg) {
		
		// ***************************************
		// following code is for cross-browser as 
		// the scroll value and the window size 
		// is different between IE and Gecko
		// ***************************************
		var scrollLeft,scrollTop;  // scroll value
		
		if(window.pageYOffset){ 
			scrollTop=window.pageYOffset 
		}else if(document.documentElement&&document.documentElement.scrollTop){ 
			scrollTop=document.documentElement.scrollTop; 
		}else if(document.body){ 
			scrollTop=document.body.scrollTop; 
		} 
		
		if(window.pageXOffset){ 
			scrollLeft=window.pageXOffset 
		}else if(document.documentElement&&document.documentElement.scrollLeft){ 
			scrollLeft=document.documentElement.scrollLeft; 
		}else if(document.body){ 
			scrollLeft=document.body.scrollLeft; 
		}
		
		
		var windowWidth,windowHight; // frame width & hight
		
		if(window.innerWidth){ 
			windowWidth=window.innerWidth; 
		}else if(document.documentElement&&document.documentElement.clientWidth){ 
			windowWidth=document.documentElement.clientWidth; 
		}else if(document.body){ 
			windowWidth=document.body.offsetWidth; 
		} 
		
		if(window.innerHeight){ 
			windowHight=window.innerHeight; 
		}else if(document.documentElement&&document.documentElement.clientHeight){ 
			windowHight=document.documentElement.clientHeight; 
		}else if(document.body){ 
			windowHight=document.body.clientHeight; 
		}
		
		// as the ancher and the TD are all listening the 
		// click action, use this flag to avoid active the 
		// action towice
		parentClick = "false";
		
		// hide the float menu icon which invoke the popup menu
		arg.style.visibility="hidden"
		
		// get the ref of the popup menu
		var leftmenu = document.getElementById("leftmenu");
		
		var dir = leftmenu.dir;
		
		var x = arg.offsetLeft; // the upper-left-x point of the image icon
		var y = arg.offsetTop;  // the upper-left-y point of the image icon
		
		//******************************
		// set the left-top of the menu
		//******************************
		
		
		var tempTop;
		var tempLeft;
		
		// set the Y
		
		if (isIE){
	
				var bottomedge = document.body.clientHeight - y;
		
		} else {
		
			    var bottomedge = window.innerHeight - y;
		
		}
	
		if (bottomedge + scrollTop < leftmenu.offsetHeight) {
				tempTop = y - leftmenu.offsetHeight + 5;
		}
		else {
			tempTop = y - 5;
		}

		leftmenu.style.top = tempTop + "px";
		
		// set the X
		// as there are two kinds of direction
		
		if(dir== "ltr") {
		
			
			var rightedge = windowWidth + scrollLeft - x;
			
			
			
			if (rightedge < leftmenu.offsetWidth) { // no enougth space to display the menu on right
				if(leftmenu.offsetWidth < x - scrollLeft) { 
					tempLeft = x - leftmenu.offsetWidth + 5;
				} else { // even no enougth space to display the menu on left
					tempLeft = document.body.scrollLeft;
				}
			}
			else { // just display it on the fight of the topic lable
				tempLeft = x - 5;
			}
			
			
			
		
		} else {
		
				var negtive = document.body.scrollWidth - windowWidth;
				x = x + negtive + 17;
				var rightedge = x - scrollLeft;
			
				if (rightedge < leftmenu.offsetWidth) { // no enougth space to display the menu on right(or we may call it left)
					if(leftmenu.offsetWidth < windowWidth - rightedge) {
						tempLeft = x - 5;
					} else {
						tempLeft=windowWidth - leftmenu.offsetWidth;
					}
				} else { // just display it on the fight of the topic lable
					tempLeft=x-leftmenu.offsetWidth - negtive + 17 + arg.offsetWidth;
				}
			
				tempLeft=tempLeft-document.body.scrollLeft;
				
	
		}
	
		
		leftmenu.style.left=tempLeft+"px";
		// show the menu
		leftmenu.style.visibility="visible";
		
		// for those whose use key board only
		// focus the first menu item
		document.getElementById("singleTopicPrint").focus();
}

//**********************
// show the icon-menu
//**********************
function showicon(arg){

	if(preicon) {
		preicon.style.visibility="hidden"
	}
	var linka = document.getElementById("m"+arg.id);
	linka.style.visibility="visible";
	preicon = linka;
}

//*********************** 
// hide the popup menu
//***********************
function hidePopupMenu(){
	var leftmenu = document.getElementById("leftmenu");
	leftmenu.style.visibility="hidden";
}

//**********************************
// whether the topic has valid href
//**********************************
function isNullHref(){

  if (linkObject.href=="about:blank")
	{ 	
		return true;
	}
	return false;
}

//*****************************************
// whether the action is for single action 
//*****************************************
function isSingleTopicAction(id){

  if (id=="psingleTopicSearch"||id=="psingleTopicPrint")
	{ 
		return true;
	}
	return false;
}

//******************************
// high light the select popup menu item
//******************************
function highlightitem(arg) {
	if(hightLightItem)
			lowlighitem(hightLightItem)
	if (isNullHref()&&isSingleTopicAction(arg.id)){
	} else{
		hightLightItem = arg;
		arg.className = "active";
		document.getElementById(arg.id.substr(1)).className="hight";
		
	}
}

//******************************
// low light the select popup menu item
//******************************
function lowlighitem(arg) {
	if (isNullHref()&&isSingleTopicAction(arg.id)){
	} else {
		if(arg.id == "psubTopicsPrint") {
			arg.className = "tdbottom";
		}
		else {
			arg.className = "";
		}
		document.getElementById(arg.id.substr(1)).className="";
	}
}

// for those has null href
function disable(e){
// alert('A blank href topic selected!');
}

/*
* to enable or disable the menu item.
*/
function doMenuItemChange(item,nullHref,subTopics){

	if (item==null){
		return;
	}
	
	if (subTopics){
	
		if (isMozilla) {
				 item.removeEventListener("mousedown",disable,false);
		 		 item.addEventListener("mousedown",quickAction,false);
		 		 item.parentNode.removeEventListener("mousedown",disable,false);
		 		 item.parentNode.addEventListener("mousedown",quickAction,false);
		 		 item.addEventListener("keydown",quickAction,false);
			 }
			else if (isIE){
				item.onmousedown=quickAction;	
				item.parentNode.onmousedown=quickAction;	 
				item.onkeypress=quickAction;	
			 }
			 
	} else if (nullHref){
	        item.className='disable';
	        item.title = getDisable();
			item.parentNode.parentNode.className='disable';
			if (isMozilla) {
		 		 item.removeEventListener("mousedown",quickAction,false);
		 		 item.addEventListener("mousedown",disable,false);
		 		 item.parentNode.removeEventListener("mousedown",quickAction,false);
		 		 item.parentNode.addEventListener("mousedown",disable,false);
		 		 item.removeEventListener("keydown",quickAction,false);
		 		 item.addEventListener("keydown",disable,false);
			 }
			else if (isIE){
				item.onmousedown=disable;
				item.parentNode.onmousedown=disable;
				item.onkeypress=disable;
			 }
	} else{
	    	item.className="menuanchor";
	    	item.title="";
	    	if(item.parentNode.parentNode.id == "psubTopicsPrint")
	    		item.parentNode.parentNode.className='tdbottom';
	    	else
				item.parentNode.parentNode.className='';
			if (isMozilla) {
				 item.removeEventListener("mousedown",disable,false);
		 		 item.addEventListener("mousedown",quickAction,false);
		 		 item.parentNode.removeEventListener("mousedown",disable,false);
		 		 item.parentNode.addEventListener("mousedown",quickAction,false);
		 		 item.removeEventListener("keydown",disable,false);
		 		 item.addEventListener("keydown",quickAction,false);
			 }
			else if (isIE){
				item.onmousedown=quickAction;	
				item.parentNode.onmousedown=quickAction;	
				item.onkeypress=quickAction;			 
			 }
	   }

}
//*****************************************
// append the icon menu after the topic
// arg: the current selected topic
//*****************************************
function addChild(arg) {

	//****************************************
	// following code is for cross-browser as 
	// the scroll value and the window size 
	// is different between IE and Gecko
	//****************************************
	var windowWidth,windowHight; // frame width & hight
		
	if(window.innerWidth){ 
		windowWidth=window.innerWidth; 
	}else if(document.documentElement&&document.documentElement.clientWidth){ 
		windowWidth=document.documentElement.clientWidth; 
	}else if(document.body){ 
		windowWidth=document.body.offsetWidth; 
	} 
	
	if(window.innerHeight){ 
		windowHight=window.innerHeight; 
	}else if(document.documentElement&&document.documentElement.clientHeight){ 
		windowHight=document.documentElement.clientHeight; 
	}else if(document.body){ 
		windowHight=document.body.clientHeight; 
	}
	
	var scrollLeft, scrollWidth; 
	if(window.pageXOffset){ 
		scrollLeft=window.pageXOffset 
		scrollWidth=window.innerWidth
		
	}else if(document.documentElement&&document.documentElement.scrollLeft){ 
		scrollLeft=document.documentElement.scrollLeft;
		scrollWidth=document.documentElement.scrollWidth; 
	}else if(document.body){ 
		scrollLeft=document.body.scrollLeft; 
		scrollWidth=document.body.scrollWidth;
	}
	linkObject=arg;
	var imageIcon = document.getElementById("imagmenu");
	
	if(imageIcon==null){
		return;
	}
	var dir = imageIcon.dir;
	// add action listenner to anchor of popup menu
	doMenuItemChange(document.getElementById("singleTopicSearch"),isNullHref(),false);
	doMenuItemChange(document.getElementById("singleTopicPrint"),isNullHref(),false);
	doMenuItemChange(document.getElementById("subTopicsSearch"),isNullHref(),true);
	doMenuItemChange(document.getElementById("subTopicsPrint"),isNullHref(),true);
	
	// add action listenner to TD of popup menu
	doMenuItemChange(document.getElementById("psingleTopicSearch"),isNullHref(),false);
	doMenuItemChange(document.getElementById("psingleTopicPrint"),isNullHref(),false);
	doMenuItemChange(document.getElementById("psubTopicsSearch"),isNullHref(),true);
	doMenuItemChange(document.getElementById("psubTopicsPrint"),isNullHref(),true);
	
	var x = arg.offsetLeft;
	var y = arg.offsetTop;
	
	var tempLeft;
	
	//set the left position of icon-menu
	if(dir=="ltr") {
			x = x + arg.offsetWidth;
			var rightedge=document.body.clientWidth-x
			if (rightedge + scrollLeft < imageIcon.offsetWidth) {
				tempLeft=document.body.clientWidth - imageIcon.offsetWidth + 5 + scrollLeft
			}
			else
				tempLeft = x
			x=tempLeft+"px"

	} else {
	
		
		
		if (isIE){
	
				scrollLeft = scrollWidth - scrollLeft - windowWidth;
				
				if(x < 0) {
						x = 15 - x;
				}
				
				x = x + arg.offsetWidth + 25;
				var letfedge = windowWidth -x;
				if (letfedge + scrollLeft < imageIcon.offsetWidth) {
					tempLeft=windowWidth + imageIcon.offsetWidth + scrollLeft; 
				}
				else {
					tempLeft=x + imageIcon.offsetWidth;
				}
				tempLeft = windowWidth - tempLeft;
				x = tempLeft + "px";
		} else {
				scrollLeft = scrollWidth - scrollLeft - document.body.clientWidth;
				if (x + scrollLeft < imageIcon.offsetWidth) {
					tempLeft=imageIcon.offsetWidth - scrollLeft - 25;
					
				}
				else {
					tempLeft=x - imageIcon.offsetWidth;
				}
				x=tempLeft+"px";
		}
			
	
	}
	
	
	imageIcon.style.left = x;
	imageIcon.style.top = y + "px";
	imageIcon.style.visibility = "visible"; 
}

<!--uat4i00000002 1/2 -->
function quickAction(e) {
	if(parentClick == "true")
		return;
	parentClick = "true";
	if (isIE){
		if(window.event.keyCode == 27){
					var leftmenu = document.getElementById("leftmenu");
					leftmenu.style.visibility="hidden"
					return;
		}

	} else {
			if(e.keyCode == 27){
				var leftmenu = document.getElementById("leftmenu");
				leftmenu.style.visibility="hidden"
				return;
			} else if(e.keyCode != 13 && e.keyCode != 0 && e.keyCode) {
				parentClick="false";
				return;
			}
		
	}
	var quickActionItem=getTarget(e);
	if (quickActionItem==null){
	return;
	}
	
	if (quickActionItem.id==null||quickActionItem.id==''){
		quickActionItem=quickActionItem.parentNode;
	}
	
	var quickActionType;
	if(quickActionItem.id.charAt(0) == 'p'){
		quickActionType = quickActionItem.id.substr(1);
		
	} else {
		quickActionType = quickActionItem.id;
	}
	//quick search event here
	if(quickActionType=='singleTopicSearch'||quickActionType=='subTopicsSearch'){
		var w = 305;
		var h = 95;
		
		var l =0;
		var t =0;
	   
		if (isIE){
		
			l = top.screenLeft + (top.document.body.clientWidth - w) / 2;
			t = top.screenTop + (top.document.body.clientHeight - h) / 2;
		
		} else {
		
			l = top.screenX + (top.innerWidth - w) / 2;
			t = top.screenY + (top.innerHeight - h) / 2;
		
		}
		
		// move the dialog just a bit higher than the middle
		if (t-50 > 0) t = t-50;
	  	window.location="javascript://needModal";
	  	
	  	if (quickActionType=='singleTopicSearch'){	  	
		  	
			  	if (subAbove&!singleAbove){
		  		
		  		t=t+h+65;
		  		singleAbove=false;
		  		subAbove=true;
		  		
		  		}
		  		else{
		  		singleAbove=true;
		  		subAbove=false;
		  		
		  		}
		  		
		  	quickSingleSearchDialog = window.open("quickSearch.jsp?"+quickActionType+"=true&quickSearchTopicID=" +linkObject.id, "QuickSearch", "location=no, status=no,resizable=yes,height="+h+",width="+w +",left="+l+",top="+t);
			quickSingleSearchDialog.focus();
			 
		}
		
		if (quickActionType=='subTopicsSearch'){
			
		  		if (singleAbove&!subAbove){
			  		t=t+h+65;
			  		subAbove=false;		  
			  		singleAbove=true;		
		  		}
		  		else {
			  		subAbove=true;
			  		singleAbove=false;		  		
		  		}
	  		
			quickSubSearchDialog = window.open("quickSearch.jsp?"+quickActionType+"=true&quickSearchTopicID=" +linkObject.id, "QuickSearch1", "location=no, status=no,resizable=yes,height="+h+",width="+w +",left="+l+",top="+t);
			quickSubSearchDialog.focus(); 
		}
	    
	}
	//quick print event here
	if(quickActionType=='singleTopicPrint'||quickActionType=='subTopicsPrint'){
		var w = 700;
		var h = 500;
	
	   
		if (isIE){
		
			var l = top.screenLeft + (top.document.body.clientWidth - w) / 2;
			var t = top.screenTop + (top.document.body.clientHeight - h) / 2;
		
		} else {
		
			var l = top.screenX + (top.innerWidth - w) / 2;
			var t = top.screenY + (top.innerHeight - h) / 2;
		
		}
		
		// move the dialog just a bit higher than the middle
		if (t-50 > 0) t = t-50;

		window.location="javascript://needModal"; 	
		printWindow = window.open("print.jsp?printType=" +quickActionType + "&linkId="+linkObject.id, "printView", "height="+h+", width="+w+", top="+t+", left="+l+", toolbar=no, menubar=yes, scrollbars=yes, resizable=yes,location=no, status=no");
		printWindow.focus();
	}
	var leftmenu = document.getElementById("leftmenu");
	leftmenu.style.visibility="hidden";
	parentClick="true";
	quickActionClicked=true;
	highlightTopic(linkObject);
	
}

<!--end of uat4i00000002 1/2 -->
