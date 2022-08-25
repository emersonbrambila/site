(function ( $ ) {
	$.fn.hoverEffects = function(options) {
		//Plugin Options
		var settings = $.extend({
			figcaptionTag: 'figcaption',
			figcaptionPos: 'bottom',
			figTitle: 'h2',
			figInfo: 'p',
			figEffect: 'zoomIn',
			figEase: 'easeOutCubic',
			animationTime: 400,
			hoverIntent: true,
		}, options );

		//Effects
		this.each(function() {
			var container = this;
			//Zoom In
			function zoomInEnter() {
				$(container).find('img').stop().animate({'min-width': '130%', 'min-height': '130%', 'left': '-15%', 'top': '-15%', 'opacity': '1'}, settings.animationTime, settings.figEase);
				$(container).find(settings.figTitle).stop().animate({'bottom': '0px'}, settings.animationTime, settings.figEase);
				$(container).find(settings.figInfo).stop().animate({'opacity': '1', 'top': '0' }, settings.animationTime, settings.figEase);
			}
			function zoomInLeave() {
				$(container).find('img').stop().animate({'min-width': '100%', 'min-height': '100%', 'left': '0%', 'top': '0%', 'opacity': '0.7'}, settings.animationTime, settings.figEase);
				$(container).find(settings.figTitle).stop().animate({'bottom': '-15px'}, settings.animationTime, settings.figEase);
				$(container).find(settings.figInfo).stop().animate({'opacity': '0', 'top': '-15px' }, settings.animationTime, settings.figEase);
			}
			//Zoom Out
			function zoomOutEnter() {
				$(container).find('img').stop().animate({'min-width': '100%', 'min-height': '100%', 'left': '0%', 'top': '0%', 'opacity': '1'}, settings.animationTime, settings.figEase);
				$(container).find(settings.figTitle).stop().animate({'bottom': '0px'}, settings.animationTime, settings.figEase);
				$(container).find(settings.figInfo).stop().animate({'opacity': '1', 'top': '0' }, settings.animationTime, settings.figEase);
			}
			function zoomOutLeave() {
				$(container).find('img').stop().animate({'min-width': '130%', 'min-height': '130%', 'left': '-15%', 'top': '-15%', 'opacity': '0.7'}, settings.animationTime, settings.figEase);
				$(container).find(settings.figTitle).stop().animate({'bottom': '-15px'}, settings.animationTime, settings.figEase);
				$(container).find(settings.figInfo).stop().animate({'opacity': '0', 'top': '-15px' }, settings.animationTime, settings.figEase);
			}

			//Caption Position
			$(this).find(settings.figcaptionTag).addClass(settings.figcaptionPos);
			if (settings.figcaptionPos === 'center') {
				var thisCaption = $(this).find(settings.figcaptionTag),
				heightThis = thisCaption.outerHeight(true);
				thisCaption.css('margin-top', '-' + heightThis/2 + 'px');
			}

			//Use hoverIntent Plugin
			if ($.fn.hoverIntent && settings.hoverIntent) {
				switch(settings.figEffect) {
					default:
					$(this).addClass(settings.figEffect).hoverIntent(zoomInEnter, zoomInLeave);
					break;
					case 'zoomOut':
					$(this).addClass(settings.figEffect).hoverIntent(zoomOutEnter, zoomOutLeave);
				}
			}
			//No use hoverIntent Plugin
			else {
				switch(settings.figEffect) {
					default:
					$(this).addClass('zoomIn').hover(function() { zoomInEnter(); }, function() { zoomInLeave(); });
					break;
					case 'zoomOut':
					$(this).addClass('zoomOut').hover(function() { zoomOutEnter(); }, function() { zoomOutLeave(); });
					break;
				}
			}
		});
};
}( jQuery ));

$(function() {
	$('.figure').hoverEffects({
		figcaptionTag: '.figcaption',
		figEffect: 'zoomOut',
		figcaptionPos: 'bottom',
		animationTime: 200
	});
});