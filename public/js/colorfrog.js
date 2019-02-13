/*
* Initialise the Google Map in the footer
*/
function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng(60.170421,24.938149), 
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
	google.maps.event.addDomListener(map, 'idle', function() {
		calculateCenter();
	});
	google.maps.event.addDomListener(window, 'resize', function() {
		map.setCenter(center);
	});
	
	var image = 'img/icon-map-marker.png';
  	var myLatLng = new google.maps.LatLng(60.16992,24.938707);
	var customMarker = new google.maps.Marker({
	  position: myLatLng,
	  map: map,
	  icon: image
	});
}


//FitVids
$(function($){ $('.mediaVideo').fitVids(); });


/*
* Filtering function for clients and products
*/
$(document).on('click', '.filters a', function(e){
	$('.filters a').removeClass('active-filter');
	$(this).addClass('active-filter');
	
	// Get filter key
	filterThis = $(this).data('filter');

	// Filter things	
	if(filterThis == 'all'){
		$('.filter-all').show();
		$('.filter-custom').empty().hide();	
	}
	else{
 		$('.filter-custom').empty();
 		contentLength = $('.type-'+filterThis, $('.filter-all')).length;
 		
 		$('.type-'+filterThis, $('.filter-all')).each(function(e, index){
 			$('.filter-custom').append($(this).clone());
 		});
 		$('.filter-all').hide();
 		$('.filter-custom').show();
	}
	
	e.preventDefault();
});

function clearClick(e) {
    var result = confirm("Are you sure you want to clear this page? You will lose all the information you have entered.");
    if (result) {
        location.reload();
    }

}

