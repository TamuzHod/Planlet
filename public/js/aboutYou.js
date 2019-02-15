
function next() { 
	var formElements=document.getElementById("abouYouForm").elements;    
	window.location.href = '/availability/' + formElements[0].value +'/'+ formElements[1].value + '/' + formElements[2].value;
};