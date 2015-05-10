var Slideshow = function() {
	var
		_setUpListeners = function() {
			$('.prev').on('click', _prevPhoto);
			$('.next').on('click', _nextPhoto);
			$('.slideshow__pic').on('click', _changePhoto);
		},

		_nextPhoto = function(e) {
			e.preventDefault();

			var	
				$this = $(this),
				container = $this.closest('.slideshow'),
				display = container.find('.slideshow__display'),
				slideshowList = $this.closest('.slideshow__list'),
				activeItem = slideshowList.find('.active'),
				nextItem = activeItem.next('.slideshow__item'),
				path = nextItem.find('img').attr('src'),
				duration = 300;

			if (nextItem.val() !== undefined ) {
				activeItem.removeClass('active');			
				nextItem.addClass('active');
				display.find('img').fadeOut(duration, function() {
					$(this).attr('src', path).fadeIn(duration);
				});
			} 
		},

		_prevPhoto = function(e) {
			e.preventDefault();

			var	
				$this = $(this),
				container = $this.closest('.slideshow'),
				display = container.find('.slideshow__display'),
				slideshowList = $this.closest('.slideshow__list'),
				activeItem = slideshowList.find('.active'),
				prevItem = activeItem.prev('.slideshow__item'),
				path = prevItem.find('img').attr('src'),
				duration = 300;

			if (prevItem.val() !== undefined ) {
				activeItem.removeClass('active');			
				prevItem.addClass('active');
				display.find('img').fadeOut(duration, function() {
					$(this).attr('src', path).fadeIn(duration);
				});
			}
		},

		_changePhoto = function(e) {
			e.preventDefault();

			var
				$this = $(this),
				item = $this.closest('.slideshow__item'),
				container = $this.closest('.slideshow'),
				display = container.find('.slideshow__display'),
				path = item.find('img').attr('src'),
				duration = 300;

			if (!item.hasClass('active')) {
				item.addClass('active').siblings().removeClass('active');
				display.find('img').fadeOut(duration, function() {
					$(this).attr('src', path).fadeIn(duration);
				});
			}
		};

	return {
		init: _setUpListeners
	}
}(),

ScrollToTop = function() {
	var 
		_setUpListeners = function() {
			$('.up').on('click', _goUp)
		},

		_init = function() {
			$(window).scroll(function() {
				if ($(this).scrollTop() > 0) {
					$('.up').fadeIn();
				} else {
					$('.up').fadeOut();
				}
			});
		}

		_goUp = function(e) {
			e.preventDefault();

			$('body,html').animate({
				scrollTop: 0
			}, 400);
		};

	return {
		init: _init,
		listening: _setUpListeners
	}

}(),

IE = function() {
	var
		_fixLastChild = function() {
			if (/msie [1-8]{1}[^0-9]/.test(navigator.userAgent.toLowerCase())) {
				$('.about-info__column:last-child').css("margin-right", "0");
				$('.user-nav__item:last-child').css("margin-right", "0");
				$('.bread-crumbs__link:last-child').css({
					"color": "#5c7b98",
					"text-decoration":"none"
				});
				$('.subnav__list:last-child').css("margin-right", "0");
				$('.slideshow__item:last-child').css("margin-right", "0");
				$('.subsocials__item:last-child').css("margin-right", "0");
				$('input[type="search"').css('padding-top','10px');
				$('.desctable__row:nth-child(2n)').css("background", "#eef2f4");
			}
		};

	return {
		init: _fixLastChild
	}
}();

Slideshow.init();
ScrollToTop.init();
ScrollToTop.listening();
IE.init();
$('input, textarea').placeholder();