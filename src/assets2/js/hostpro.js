

(function($) {
    "use strict";
	
	/*Bootstrap Multilevel Dropdown*/
    $('.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
        event.preventDefault(); 
        event.stopPropagation(); 
        $(this).parent().siblings().removeClass('open');
        $(this).parent().toggleClass('open')
    });
    
    $('[data-toggle="tooltip"]').tooltip();
	
	if($('.home-slider').length){
		$('.home-slider').each(function(){
			$('.home-slider').owlCarousel({
				items: 1,
				margin: 0,
				nav: false,
				autoplay: false,
                loop: true
			})
		})
	}
	
	if($('.services-at-hostpro').length){
		$('.services-at-hostpro').each(function(){
			$('.services-at-hostpro').owlCarousel({
				items: 1,
				margin: 0,
				nav: false,
				autoplay: true
			})
		})
	}
	
	if($('.features-slider').length){
		$('.features-slider').each(function(){
			$('.features-slider').owlCarousel({
				items: 1,
				margin: 0,
				nav: false,
				autoplay: true
			})
		})
	}
	
	if($('.testimonail-carousel').length){
		$('.testimonail-carousel').each(function(){
			$('.testimonail-carousel').owlCarousel({
				items: 1,
				margin: 0,
				nav: true,
                navText: ['<img src="assets/icons/s-arrow-left.png" alt="Testmonial Arrow">','<img src="assets/icons/s-arrow-right.png" alt="Testmonial Arrow">'],
				autoplay: true,
                loop: true
			})
		})
	}
	
	if ( $('[data-slide]').length ){
		$('[data-slide]').each(function(){
			var data_value = $(this).data('slide');
			$(this).css('background-image', 'url('+ data_value +')')
		})
	}
	
	if ( $('.navbar-style1').length ){
		$('.navbar-style1').affix({
			offset: {
				top: 200,
				bottom: function () {
					return (this.bottom = $('.site-footer').outerHeight(true))
				}
			}
		})
	}
	
//	if ( $('.navbar-style2').length ){
//		$('.navbar-style2').affix({
//			offset: {
//				top: 200,
//				bottom: function () {
//					return (this.bottom = $('.site-footer').outerHeight(true))
//				}
//			}
//		})
//	}
    
    if( $(".customer-testimonial").length ){
        $(".customer-testimonial").on("slid.bs.carousel", function() {
            var to_slide;
            to_slide = $(".carousel-item.active").attr("data-slide-no");
            $(".myCarousel-target.active").removeClass("active");
            $(".carousel-indicators.dotv [data-slide-to=" + to_slide + "]").addClass("active")
        })
        $(".myCarousel-target").on("click", function(e) {
            e.preventDefault();
            $(".customer-testimonial").carousel(parseInt($(this).attr("data-slide-to")));
            $(".myCarousel-target.active").removeClass("active");
            $(this).addClass("active")
        })
    }
    
    if( $(".popup-video").length ){
        $('.popup-video').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: true,

            fixedContentPos: false
        });
    }
    
    if ( $('.go-back').length ){
        $('.go-back').on('click', function(){
            parent.history.back();
            return false
        });
    }
    
    if ( $('.counter').length ){
        $('.counter').counterUp();
    }
    
    
	
	if ( $('.gmapbox').length ){
		var $lat = $('.gmapbox').data('lat');
		var $lon = $('.gmapbox').data('lon');
		var $zoom = $('.gmapbox').data('zoom');
		var $marker = $('.gmapbox').data('marker');
		var map = new GMaps({
			el: '.gmapbox',
			lat: $lat,
			lng: $lon,
			scrollwheel: false,
			scaleControl: true,
			streetViewControl: false,
			panControl: true,
			disableDoubleClickZoom: true,
			mapTypeControl: false,
			zoom: $zoom,
			styles: [
                {"featureType":"all","stylers":[{"saturation":0},{"hue":"#e7ecf0"}]},{"featureType":"road","stylers":[{"saturation":-70}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"simplified"},{"saturation":-60}]}
			]
		});

		map.addMarker({
			lat: $lat,
			lng: $lon,
			icon: $marker
		})              
	}
    
    if ( $('.widget select').length ){
        $('.widget select').selectpicker()
    }
    
    if ( $('.number-spinner').length ){
        $(document).on('click', '.number-spinner button', function () {    
            var btn = $(this),
                oldValue = btn.closest('.number-spinner').find('input').val().trim(),
                newVal = 0;

            if (btn.attr('data-dir') == 'up') {
                newVal = parseInt(oldValue) + 1
            } else {
                if (oldValue > 1) {
                    newVal = parseInt(oldValue) - 1
                } else {
                    newVal = 1
                }
            }
            btn.closest('.number-spinner').find('input').val(newVal)
        })
    }
    
    if ( $( "#slider-range" ).length ){
        $( "#slider-range" ).slider({
            range: true,
            min: 0,
            max: 500,
            values: [ 75, 300 ],
            slide: function( event, ui ) {
                $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
                $( "[for='amount']" ).html( "Price: <sup>$</sup>" + $( "#slider-range" ).slider( "values", 0 ) + " - <sup>$</sup>" + $( "#slider-range" ).slider( "values", 1 ) )
            }
        });
        $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) + " - $" + $( "#slider-range" ).slider( "values", 1 ) );
        $( "[for='amount']" ).html( "Price: <sup>$</sup>" + $( "#slider-range" ).slider( "values", 0 ) + " - <sup>$</sup>" + $( "#slider-range" ).slider( "values", 1 ) )
    }
    
    if ( $('.flipstar-carousel').length ){
        $('.flipstar-carousel').flipster({
            nav: true,
            style: 'flat',
            loop: true,
            touch: true,
            spacing: -0.4,
        })
    }
    
    
	
	
   
})(jQuery)