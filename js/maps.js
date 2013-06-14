
var myCenter=new google.maps.LatLng(-15.779039,-47.834473);
 var soccerPlace = new google.maps.LatLng(-15.783550357697369,-47.89918899536133);

var mapProp;
var map;
var livePeladas;

function Pelada(descricao, latitude, longitude, donoDaBola, inicio, fim){
		this.descricao = descricao;
		this.latitude = latitude;
		this.longitude = longitude;
		this.donoDaBola = donoDaBola;
		this.inicio = inicio;
		this.fim = fim;
	}

function describePelada(event) {
	descricao = prompt("Descricao da Pelada: ");
	return descricao;
}

function checkPeladaOnMap(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    animation:google.maps.Animation.BOUNCE,
  	icon:'img/Soccer_Ball.png'
  });

  var infowindow = new google.maps.InfoWindow({
    content: 'Latitude: ' + location.lat() +
    '<br>Longitude: ' + location.lng() + 
    '<br>Descrição: ' + describePelada()
	  });

  infowindow.open(map,marker);
}

function initialize(){
	var infowindow = new google.maps.InfoWindow({
			content:"Pelada no estádio!!!! É a boa!"
		});

	mapProp = {
		center:myCenter,
		zoom:9,
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById("googleMap")
	,mapProp);

	var marker=new google.maps.Marker({
	  position:soccerPlace,
	  animation:google.maps.Animation.BOUNCE,
	  icon:'img/Soccer_Ball.png'
	});	
	
	marker.setMap(map);


	google.maps.event.addListener(marker,'click',function() {
	infowindow.open(map,marker);
	  map.setZoom(12);
	  map.setCenter(marker.getPosition());
  	});

  	google.maps.event.addListener(map, 'click', function(event) {
		checkPeladaOnMap(event.latLng);
	  });  	

  	loadPeladas(livePeladas);
 }

 function loadPeladas(peladaArray){
 	for(i=0; i < peladaArray.length; i++)
  	{
		markPelada(peladaArray[i]);
  	}
 }

function markPelada(pelada){
	var location = new google.maps.LatLng(pelada.latitude,pelada.longitude);

	var marker = new google.maps.Marker({
		position: location,
		map: map,
		animation:google.maps.Animation.BOUNCE,
		icon:'img/Soccer_Ball.png'
	});

	var infowindow = new google.maps.InfoWindow({
		content: 'Dono da Bola: ' + pelada.donoDaBola +
			'<br>Descricao: ' + pelada.descricao +
			'<br>' + pelada.inicio + ' - ' + pelada.fim
	});

	marker.setMap(map);
	infowindow.open(map,marker);
}


google.maps.event.addDomListener(window, 'load', initialize);