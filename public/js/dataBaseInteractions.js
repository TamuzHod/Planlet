


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
        $.postJSON('/'+address, data, function (result) {
            if(!result.succses) {
            	alert(result.error);
            	return;
            }
       		window.location.href = results.address;
        });
}




