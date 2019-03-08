function logIn(){
    var email = $("#email").text;
    window.location.href = '/logIn/'+email;
}

function makeAccount(){
    var email = $("#email").text;
    window.location.href = '/register/'+email;
}