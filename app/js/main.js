var Slider = function() {
        var
            _moveSlide = function($this, direction, callback) {
                var
                    container = $this.closest('.slideshow__slider'),
                    list = container.find('.slideshow__list'),
                    activeSlide = list.find('.slideshow__item.active')
                duration = 300,
                    activeSlideSibling = (direction === 'next') ? activeSlide.next() : activeSlide.prev(),
                    reqPosition = (activeSlideSibling.length) ? activeSlideSibling.position().left : '',
                    edgesElements = (direction === 'next') ? activeSlide.nextAll().eq(2) : activeSlide.prev();
                underEdgesElements = (direction === 'next') ? edgesElements.next() : edgesElements.prev();

                if (edgesElements.length) {
                    list.animate({
                        left: -reqPosition
                    }, duration, function() {
                        activeSlide.removeClass('active');
                        activeSlideSibling.addClass('active');

                        if (!underEdgesElements.length) {
                            callback.call($this);
                        }

                    });
                }
            };

        return {
            init: function() {
                $('.slideshow__nav-link').on('click', function(e) {
                    e.preventDefault();
                    var
                        $this = $(this),
                        direction = ($this.hasClass('next')) ? 'next' : 'prev';
                    _moveSlide($this, direction, function() {
                        var
                            oppositeDirection = (direction === 'next') ? 'prev' : 'next';
                        $('.slideshow__nav-link.' + direction).hide();
                        $('.slideshow__nav-link.' + oppositeDirection).show();
                    });

                    $this.siblings().show();
                });
            }
        }
    }(),

    Slideshow = function() {
        var
            _changePic = function($this) {
                var
                    path = $this.data('fullsize'),
                    container = $this.closest('.slideshow');
                display = $('.slideshow__display img'),
                    duration = 300;
                console.log(display);
                display.fadeOut(duration, function() {
                    $(this).attr('src', path);

                    $(this).on('load', function() {
                        $(this).fadeIn(duration);
                    });
                });
            };

        return {
            init: function() {
                $('.slideshow__pic').on('click', function(e) {
                    e.preventDefault();
                    _changePic($(this));
                })
            }
        }
    }(),

    ScrollToTop = function() {
        var
            _goUp = function(e) {
                e.preventDefault();

                $('body,html').animate({
                    scrollTop: 0
                }, 400);
            };

        return {
            init: function() {
                $(window).scroll(function() {
                    if ($(this).scrollTop() > 0) {
                        $('.up').fadeIn();
                    } else {
                        $('.up').fadeOut();
                    }
                });
            },
            listening: function() {
                $('.up').on('click', _goUp);
            }
        }

    }(),

    IE = function() {

        return {
            init: function() {
                $('.about-info__column:last-child').css("margin-right", "0");
                $('.user-nav__item:last-child').css("margin-right", "0");
                $('.bread-crumbs__link:last-child').css({
                    "color": "#5c7b98",
                    "text-decoration": "none"
                });
                $('.subnav__list:last-child').css("margin-right", "0");
                $('.slideshow__item:last-child').css("margin-right", "0");
                $('.subsocials__item:last-child').css("margin-right", "0");
                $('input[type="search"').css('padding-top', '10px');
                $('.desctable__row:nth-child(2n)').css("background", "#eef2f4");
            }
        }
    }();

$(document).ready(function() {
    if ($('.slideshow__list').length) {
        Slider.init();
    }

    if ($('.slideshow').length) {
        Slideshow.init();
    }

    if ($('.up').length) {
        ScrollToTop.init();
        ScrollToTop.listening();
    }

    if (/msie [1-8]{1}[^0-9]/.test(navigator.userAgent.toLowerCase())) {
        IE.init();
    }

    if ($('input, textarea')) {
        $('input, textarea').placeholder();
    }
})
