
function next() { 
	formData = $("form-signin clearfix");
	window.location.href = '/availability/' + formData[0].value +'/'+ formData[1].value + '/' + ormData[2].value;
};