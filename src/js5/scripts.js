(function($) {
    'use strict';

    //======================
    // Preloder
    //======================
    $(window).on('load', function() {
        $('#status').fadeOut();
        $('#preloader').delay(500).fadeOut('slow');
        $('body').delay(500).css({'overflow':'visible'});
    });


    //======================
    // Mobile menu 
    //======================
    $('#mobile-menu-toggler').on('click', function(e) {
        e.preventDefault();
        $('nav.navbar > ul').slideToggle();
    })
    $('.has-menu-child').append('<i class="menu-dropdown ti-angle-down"></i>');
    
    if ($(window).width() <= 991) {
        $('.menu-dropdown').on('click', function() {
            $(this).prev().slideToggle('slow');
            $(this).toggleClass('ti-angle-down ti-angle-up')
        })
    }

    //======================
    // Partners carousel
    //======================
    $('.partners-caro').owlCarousel({
        autoplay: true,
        dots: false,
        items:4,
        loop: true,
        margin: 15,
        nav: false,
        smartSpeed: 500,
        responsive:{
            0:{
                items:2,
                margin: 10
            },
            400: {
                items:3,
                margin: 20
            },
            768:{
                items:4,
                margin: 30
            }
        }
    });

    //======================
    // Slider carousel
    //======================
    $('.slider-carousel').owlCarousel({
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        autoplay: true,
        dots: false,
        loop: true,
        nav: false,
        items:1
    })

    //======================
    // Testimonial
    //======================
    $('.test-caro').owlCarousel({
        dots: false,
        items:1,
        nav: true,
        navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
        smartSpeed: 500
    });

    //======================
    // Course carousel
    //======================
    $('.course-caro').owlCarousel({
        autoplay: true,
        loop: true,
        dots: false,
        items:3,
        nav: true,
        navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
        smartSpeed: 500,
        responsive: {
            0: {
                items:1,
                nav: false
            },
            768: {
                items:2,
                nav: false
            },
            992: {
                items: 3
            }
        }
    });

    //=================================
    // CountDown Timer
    //=================================
    if ($(".clock").length > 0) {
        $('.clock').countdown('2020/10/10').on('update.countdown', function(event) {
          var $this = $(this).html(event.strftime(''
            + '<p><span>%-d</span> Day%!d</p> '
            + '<p><span>%H</span> Hour%!d</p> '
            + '<p><span>%M</span> Min%!d</p> '
            + '<p><span>%S</span> Sec%!d</p>'));
        });
    }

    //======================
    // GOOGLE MAP SCRIPT
    //======================
    function init() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 11,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
            draggable: true,

            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(40.6700, -73.9400), // New York

            // How you would like to style the map.
            // This is where you would paste any style found on Snazzy Maps.
            
            // styles: [{
            //     "featureType": "water",
            //     "elementType": "geometry",
            //     "stylers": [{"color": "#193341"}]
            // }, {
            //     "featureType": "landscape",
            //     "elementType": "geometry",
            //     "stylers": [{"color": "#2c5a71"}]
            // }, {
            //     "featureType": "road",
            //     "elementType": "geometry",
            //     "stylers": [{"color": "#29768a"}, {"lightness": -37}]
            // }, {
            //     "featureType": "poi",
            //     "elementType": "geometry",
            //     "stylers": [{"color": "#406d80"}]
            // }, {
            //     "featureType": "transit",
            //     "elementType": "geometry",
            //     "stylers": [{"color": "#406d80"}]
            // }, {
            //     "elementType": "labels.text.stroke",
            //     "stylers": [{"visibility": "on"}, {"color": "#3e606f"}, {"weight": 2}, {"gamma": 0.84}]
            // }, {"elementType": "labels.text.fill", "stylers": [{"color": "#ffffff"}]}, {
            //     "featureType": "administrative",
            //     "elementType": "geometry",
            //     "stylers": [{"weight": 0.6}, {"color": "#1a3541"}]
            // }, {"elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {
            //     "featureType": "poi.park",
            //     "elementType": "geometry",
            //     "stylers": [{"color": "#2c5a71"}]
            // }]
        };

        // Get the HTML DOM element that will contain your map
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('map');

        // Create the Google Map using our element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);

        // Let's also add a marker while we're at it
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(40.6700, -73.9400),
            map: map,
            title: 'Snazzy!'
        });
    }
    if ($('#map').length > 0) {
        google.maps.event.addDomListener(window, 'load', init);
    }
    
    //======================
    // Nice Select
    //======================
    $('.search-form select').niceSelect();

})(jQuery)