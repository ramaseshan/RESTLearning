/*******************************************************************************
 * Copyright (c) 2000, 2004 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials 
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/

var isIE = navigator.userAgent.indexOf('MSIE') != -1;
var filterDialog;
function resynchNav(button){
	try {
		parent.parent.parent.parent.ContentFrame.ContentToolbarFrame.resynch(button);
	} catch(e){
	}
	if (isIE && button && document.getElementById(button)){
		document.getElementById(button).blur();
	}
}


function toggleShowAll(button){
	window.parent.parent.toggleShowAll();
	if (isIE && button && document.getElementById(button)){
		document.getElementById(button).blur();
	}
}

function openFilter(button){
	var isIE = navigator.userAgent.indexOf('MSIE') != -1;
	if (isIE){

		var l = top.screenLeft + (top.document.body.clientWidth - 300) / 2;
		var t = top.screenTop + (top.document.body.clientHeight - 500) / 2;

	} else {
		var l = top.screenX + (top.innerWidth - 300) / 2;
		var t = top.screenY + (top.innerHeight - 500) / 2;

	}

	// move the dialog just a bit higher than the middle
	if (t-50 > 0) t = t-50;
	
	window.location="javascript://needModal";
	filterDialog = window.open("filterManager.jsp?", "filterDialog", "height="+400+",width="+305+",left="+l+",top="+t+",resizable" );
	filterDialog.focus(); 
}



function removeBookmark(button){
	try {
		parent.bookmarksViewFrame.removeBookmark();
	} catch(e){
	}
	if (isIE && button && document.getElementById(button)){
		document.getElementById(button).blur();
	}
}

function removeAllBookmarks(button){
	try {
		parent.bookmarksViewFrame.removeAllBookmarks();
	} catch(e){
	}
	if (isIE && button && document.getElementById(button)){
		document.getElementById(button).blur();
	}
}