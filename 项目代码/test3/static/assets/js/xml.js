function get_previousSibling(n) {
	y=n.previousSibling;
	while (y.nodeType!=1) {
  		y=y.previousSibling;
  	}
	return y;
}
function get_nextSibling(n) {
	y=n.nextSibling;
	while (y.nodeType!=1) {
  		y=y.nextSibling;
  	}
	return y;
}
function get_lastChild(n) {
	y=n.lastChild;
	while (y.nodeType!=1) {
  		y=y.previousSibling;
  	}
	return y;
}
function get_firstChild(n) {
	y=n.firstChild;
	while (y.nodeType!=1) {
  		y=y.nextSibling;
  	}
	return y;
}

// Trim() , Ltrim() , RTrim()  
String.prototype.Trim = function(){   
return this.replace(/(^\s*)|(\s*$)/g, "");   
}   
String.prototype.LTrim = function(){   
return this.replace(/(^\s*)/g, "");   
}   
String.prototype.RTrim = function() {   
return this.replace(/(\s*$)/g, "");   
}  

