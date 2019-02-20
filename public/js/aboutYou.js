function httpFix(){
	if(window.location.protocol==="https:")
	 window.location.protocol="http";
 }


function next() { 
	var major = $("#selMajor :selected").text();
	var college =  $("#selCollege :selected").text();
	var minor =  $("#selMinor :selected").text();

	if(major == 'Select a Major'){
		alert("Please select a major");
		$('#selMajor').css('border-color', 'red');
	}
	else if(college == 'Select a College'){
		alert("Please select a College");
		$('#selCollege').css('border-color', 'red');
	}
	else {
		window.location.href = '/classes/' + major +'/'+ minor + '/' + college;
	}
	
};