/*******************************************************************************
 * Copyright (c) 2000, 2006 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials 
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *     2005/11/11 - updated by Jiang LinQuan(IBM Corp.) for uat4i00000006
 *******************************************************************************/
 
var isMozilla = navigator.userAgent.indexOf('Mozilla') != -1 && parseInt(navigator.appVersion.substring(0,1)) >= 5;
var isIE = navigator.userAgent.indexOf('MSIE') != -1;

var navVisible = true;
	
function goBack(button) {
	parent.history.back();
	if (isIE && button && document.getElementById(button)){
		document.getElementById(button).blur();
	}
}

function goForward(button) {
	parent.history.forward();
	if (isIE && button && document.getElementById(button)){
		document.getElementById(button).blur();
	}
}

function goToUpdate(button)
{
	try {
	    parent.ContentToolbarFrame.setTitle(getTitle());
		parent.ContentViewFrame.window.location="updateExist.jsp";	
	} catch(e) {
	}
	if (isIE && button && document.getElementById(button)){
			document.getElementById(button).blur();
	}
}

//Get webapp path from contentToolbar.jsp full path
function getWebappPath(){

	var href=window.location.href;
	
	var ix=href.indexOf('//');
  			if (ix < 0) {
  				return "help";
  			}
  			href = href.substr(ix+2);
  			
	ix=href.indexOf('/');
  			if (ix < 0) {
  				return "help";
  			}
			href =href.substr(ix+1);
  			
	ix=href.indexOf('advanced/contentToolbar.jsp');
  			if (ix < 0) {
  				return "help";
  			}
  			href = href.substr(0,ix-1); 			
  	return href;		
}


function bookmarkPage(button)
{
	// Currently we pick up the url from the content page.
	// If the page is from outside the help domain, a script
	// exception is thrown. We need to catch it and ignore it.
	try
	{
		// use the url from plugin id only
		var url = parent.ContentViewFrame.location.href;
		var i = url.indexOf("/topic/");
		if (i >=0 )
			url = url.substring(i+6);
		// remove any query string
		i = url.indexOf("?");
		if (i >= 0)
			url = url.substring(0, i);
			
		var title = parent.ContentViewFrame.document.title;
		if (title == null || title == "")
			title = url;

		/********** HARD CODED VIEW NAME *************/
		parent.parent.NavFrame.ViewsFrame.bookmarks.bookmarksViewFrame.location.replace("bookmarksView.jsp?operation=add&bookmark="+encodeURIComponent(url)+"&title="+encodeURIComponent(title));
	}catch (e) {}
	if (isIE && button && document.getElementById(button)){
		document.getElementById(button).blur();
	}
}

function bookmarkInfocenterPage(button)
{
	// Currently we pick up the url from the content page.
	// If the page is from outside the help domain, a script
	// exception is thrown. We need to catch it and ignore it.
	try
	{
		// use the url from plugin id only
		var url = parent.ContentViewFrame.location.href;
		var i = url.indexOf("/topic/");
		if (i >=0 )
			url = url.substring(i+6);
		// remove any query string
		i = url.indexOf("?");
		if (i >= 0)
			url = url.substring(0, i);
			
		var title = parent.ContentViewFrame.document.title;
		if (title == null || title == "")
			title = url;

		/********** HARD CODED VIEW NAME *************/
		window.external.AddFavorite(parent.ContentViewFrame.location.href,title);
	}catch (e) {}
	if (isIE && button && document.getElementById(button)){
		document.getElementById(button).blur();
	}
}

function resynch(button)
{
	try {
		var topic = parent.ContentViewFrame.window.location.href;
		// remove the query, if any
		var i = topic.indexOf('?');
		if (i != -1)
			topic = topic.substring(0, i);
		parent.parent.NavFrame.displayTocFor(topic);
	} catch(e) {}
	if (isIE && button && document.getElementById(button)){
		document.getElementById(button).blur();
	}
}
//uat4i00000006

function toggleHighLight(button){
     
//alert(getWebappPath());
var highlightCookiePath=getWebappPath();

 if (button && document.getElementById(button)){
	
	var buttonObject=document.getElementById(button);
	
	var isHighlight=true;
	
	if (buttonObject.parentNode.className=="buttonOn"){
			saveCookie('ishighlight','false',null,'/'+highlightCookiePath+'/');
			isHighlight=false;
			setButtonState("toggle_highlight", false);
			document.getElementById("toggle_highlight").setAttribute("title", highlightButtonTooltipOff);
		    document.getElementById("toggle_highlight").setAttribute("alt", highlightButtonTooltipOff);
		} else {	
			saveCookie('ishighlight','true',null,'/'+highlightCookiePath+'/');	
			isHighlight=true;
			setButtonState("toggle_highlight", true);
			document.getElementById("toggle_highlight").setAttribute("title", highlightButtonTooltipOn);
		    document.getElementById("toggle_highlight").setAttribute("alt", highlightButtonTooltipOn);
		}
	
	
	if(isIE){	
			 buttonObject.blur();	
			 top.HelpFrame.ContentFrame.ContentViewFrame.location.reload();
			 return;
		} else{		
			top.HelpFrame.ContentFrame.ContentViewFrame.location.replace(top.HelpFrame.ContentFrame.ContentViewFrame.location.href);	
		}
	}
	
}


function saveCookie(name,value,expires,path,domain) { 
    var cookie = name + "=" +escape(value) + 
       ( (expires) ? ";expires=" + expires.toGMTString() : "") + 
       ( (path) ? ";path=" + path : "") + 
       ( (domain) ? ";domain=" + domain : "") ; 
    document.cookie = cookie; 
} 

//end of uat4i00000006
function printContent(button)
{
	try {
		parent.ContentViewFrame.focus();
		parent.ContentViewFrame.print();
	} catch(e) {}
	if (isIE && button && document.getElementById(button)){
		document.getElementById(button).blur();
	}
}

function setTitle(label)
{
	if( label == null) label = "";
	var title = document.getElementById("titleText");
	if(title !=null){
		var text = title.lastChild;
		text.nodeValue = " "+label;
	}
}

