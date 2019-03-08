


function update(kind, id, data){

}

function create(kind, id, data){

}



function logInOrRegister(address){
	var prefix = (address=="logIn") ? '#' : '#new_';
	var data = {
		email: $(prefix+"email")[0].value,
    	password: $(prefix+"password")[0].value
	}
        postJSON('/'+address, data, function (result) {
            if(!result.succses) {
            	alert(result.error);
            	return;
            }
       		window.location.href = result.address;
        });
}

function postJSON(url, data, success, args) {
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
}



