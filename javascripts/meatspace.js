$(document).ready(function() {

	var curArea;
	
	$('#navigation a.jump, a.uplink').click(function(event) {
		$(".togglearea").slideUp();
		link = $(this).attr("href");
		$('html,body').animate({scrollTop: $(link).offset().top},'slow');
		this.blur();
		return false;
	});
	
	$('#navigation a.toggle').click(function(event) {
		event.preventDefault();
		link = $(this).attr("href");		
		$(".togglearea").slideUp();
		if (curArea != link) {
			$(link).slideToggle('medium');
			curArea = link;
		} else {	
			curArea = "";
		}
		this.blur();
		return false;
	});
	
	$('#showarticle').toggle(function() {
		$("#intro").slideUp();
	  $("#entries").show();
		//$('html,body').animate({scrollTop: $('#entries').offset().top},'slow');
		this.blur();
	}, function() {
	  $("#entries").hide();
		this.blur();
	});

});