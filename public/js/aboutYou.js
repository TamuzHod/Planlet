
function httpFix(){
	if(window.location.protocol==="https:")
	 window.location.protocol="http";
 }


function startNewSchedule() { 
	var major = $("#selMajor :selected").val();
	var college =  $("#selCollege :selected").text();
	var minor =  $("#selMinor :selected").val();
	var email = $("#emailInput").text();

	if(major == 'Select a Major'){
		alert("Please select a major");
		$('#selMajor').css('border-color', 'red');
	}
	else if(college == 'Select a College'){
		alert("Please select a College");
		$('#selCollege').css('border-color', 'red');
	}
	else {
		var user = {
			major: major,
			minor: minor,
			college: college,
			email: email
		}
        window.location.href = '/classes/' + email +'/'+ major +'/'+ minor + '/' + college;

		$.postJSON('/update',  user, function (result) {
            console.log('result', result);
            window.location.href = '/classes/' + email +'/'+ major +'/'+ minor + '/' + college;
        });

	}
	
};

$.postJSON = function (url, data, success, args) {
    args = $.extend({
        url: url,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        success: success
    }, args);
    return $.ajax(args);
};


