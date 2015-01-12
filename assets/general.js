
//Slide menu
function toggleMenu(){

	if($('#container').hasClass('container--show')) {
		$('#container').removeClass('container--show');
		$('#brand').removeClass('navbar__brand--active')
	} else {
		$('#container').addClass('container--show');	
		$('#brand').addClass('navbar__brand--active')
	}

;}
