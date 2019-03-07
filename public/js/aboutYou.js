
function httpFix(){
	if(window.location.protocol==="https:")
	 window.location.protocol="http";
 }


function startNewSchedule() { 
	var major = $("#selMajor :selected").val();
	var college =  $("#selCollege :selected").text();
	var minor =  $("#selMinor :selected").val();

	if(major == 'Select a Major'){
		alert("Please select a major");
		$('#selMajor').css('border-color', 'red');
	}
	else if(college == 'Select a College'){
		alert("Please select a College");
		$('#selCollege').css('border-color', 'red');
	}
	else {
		window.user.major = major;
		window.user.minor = minor;
		window.user.college = college;

		$.postJSON('/update',  window.user, function (result) {
            console.log('result', result);
        });
		window.location.href = '/classes/' + major +'/'+ minor + '/' + college;
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

