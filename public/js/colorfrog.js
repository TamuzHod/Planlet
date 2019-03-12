var currFilters = ["all"];

/*
* Initialise the Google Map in the footer
*/
function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng(60.170421, 24.938149),
		zoom: 15,
		panControl: false,
		zoomControl: false,
		mapTypeControl: false,
		scaleControl: false,
		scrollwheel: false,
		streetViewControl: false,
		overviewMapControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	//styling the map
	var styleOptions = {
		name: "Dummy Style"
	};

	var MAP_STYLE = [
		{
			"stylers": [
				{ "saturation": -100 },
				{ "visibility": "on" },
				{ "lightness": 40 }
			]
		}
	]

	var map = new google.maps.Map(document.getElementById("footer-map"), mapOptions);
	var mapType = new google.maps.StyledMapType(MAP_STYLE, styleOptions);
	map.mapTypes.set("Dummy Style", mapType);
	map.setMapTypeId("Dummy Style");

	var center;
	function calculateCenter() {
		center = map.getCenter();
	}
	google.maps.event.addDomListener(map, 'idle', function () {
		calculateCenter();
	});
	google.maps.event.addDomListener(window, 'resize', function () {
		map.setCenter(center);
	});

	var image = 'img/icon-map-marker.png';
	var myLatLng = new google.maps.LatLng(60.16992, 24.938707);
	var customMarker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: image
	});


}


//FitVids
$(function ($) { $('.mediaVideo').fitVids(); });


/*
* Filtering function for clients and products
*/

var schdules;

function removeFilter(e, filter){
	filterThis = $(filter).data('filter');
	if(filterThis != 'all'){
		$(filter).toggleClass('active-filter');
		currFilters.splice( currFilters.indexOf(filterThis), 1 );
	}
	if(currFilters.length == 0){
		currFilters.push('all');
		$('#allID').addClass('active-filter');
		$('.filter-all').show();
		$('.filter-custom').empty().hide();

	}

	checkLength();
	$('#filters').hide(0).show(0);
	e.preventDefault();
	update(filter);
}

$(document).on('click', '.filters a', function (e) {

	// Get filter key
	filterThis = $(this).data('filter');

	if($(this).hasClass("active-filter")) {
		removeFilter(e, this);
		return;
	}

	currFilters.push(filterThis);
	//$('.filters a').removeClass('active-filter');


	$('#allID').removeClass('active-filter');


	// Filter things	
	if (filterThis == 'all') {
		$('.filters a').removeClass('active-filter');
		$('.filter-all').show();
		$('.filter-custom').empty().hide();
	}
	else {
		$('.filter-custom').empty();
		if(currFilters.indexOf('all') != -1)
			currFilters.splice( currFilters.indexOf('all'), 1 );
		var classString="";
		for(var i=0;i<currFilters.length;i++){
			classString += '.type-'+currFilters[i];
		}
		contentLength = $(classString, $('.filter-all')).length;

		$(classString, $('.filter-all')).each(function (e, index) {
			//$('.filter-custom').append($(this).clone(true))
			$(this).clone(true, true).appendTo($('.filter-custom'));
		});
		$('.filter-all').hide();
		$('.filter-custom').show();
	}
	$(this).addClass('active-filter');
	checkLength();
	e.preventDefault();
});


function update(e) {
	// Get filter key


	// Filter things	
	if (currFilters.includes('all')) {
		$('.filter-all').show();
		$('.filter-custom').empty().hide();
		checkLength();
	}
	else {
		$('.filter-custom').empty();
		var classString="";
		for(var i=0;i<currFilters.length;i++){
			classString += '.type-'+currFilters[i];
		}
		contentLength = $(classString, $('.filter-all')).length;

		$(classString, $('.filter-all')).each(function (e, index) {
			//$('.filter-custom').append($(this).clone(true))
			$(this).clone(true, true).appendTo($('.filter-custom'));
		});
		$('.filter-all').hide();
		$('.filter-custom').show();
		checkLength();
	}

};

function checkLength() {
	if (currFilters.includes('all')) {
		if ($('.filter-all')[0].childElementCount == 0) {
			$('.outerdiv').remove()
			$('<div class="outerdiv"><br><div style="text-align: center; font-size: 12px"><b><p style="font-size: 16px;">No schedules due to conflicts.</p></b>Select more classes!<br><br><i style="font-size: 50px; " class="fas fa-sad-tear"></i></div></div>').appendTo($('.filter-all'));
		}
	}
	else {
		var classString="";
		for(var i=0;i<currFilters.length;i++){
			classString += '.type-'+currFilters[i];
		}
		if (contentLength = $(classString, $('.filter-all')).length == 0) {
			$('<br><div style="text-align: center; font-size: 12px"><b><p style="font-size: 16px;">No schedules with this filter.</p></b>Pick another filter or select new classes!<br><br><i style="font-size: 50px; " class="fas fa-sad-tear"></i></div>').appendTo($('.filter-custom'));
		}
	}
}


function clearClick(e) {
    var result = confirm("Are you sure you want to clear this page? You will lose all the information you have entered.");
    if (result) {
        location.reload();
    }

}

function newSchedule(e){
	var result = confirm("Are you sure you want to start a new schedule? You will lose all of your current planning info except for your starred schedules.")
	if (result){
		document.location.href = '/availability';
	}
}


function seeSignUp(e){
	$("#logInForm").toggle();
	$("#signUpForm").toggle();

	var oldText = document.getElementById("switchtosignup");
  if (oldText.innerHTML === "Don't have an account? Create Account") {
    oldText.innerHTML = "I already have an account! Sign in";
  } else if (oldText.innerHTML === "I already have an account! Sign in") {
    oldText.innerHTML = "Don't have an account? Create Account";
	}
}

/*
function login(){
	var username = $("#emailinput").val(); 
	var password = $("#passwordinput").val(); 
	console.log(username + " " + password);
	if (username != "thod@ucsd.edu"){
		alert("Username is incorrect");
	}
	else if (password != "password"){
		alert("password is incorrect");
	}
	else{
		
	}
}
 */



/*toggle color as well as starred class!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */