/*!
 * Item: Kitzu
 * Description: Personal Portfolio Template
 * Author/Developer: Exill
 * Author/Developer URL: https://themeforest.net/user/exill
 * Version: v1.1.0
 * License: Themeforest Standard Licenses: https://themeforest.net/licenses
 */

/*----------- Table of Contents -----------*/

/**
 * Globals
 * Navbar
 * Home
 * Services
 * Testimonials
 * Contact
 * Preloader
 * Portfolio
 */

(function($) {
  'use strict';
  $(function() {
    /*----------- Globals -----------*/

    /* Lity setup */
    $(document).on('click', '[data-lightbox]', lity.options('template', '<div class="lity" role="dialog" aria-label="Dialog Window (Press escape to close)" tabindex="-1"><div class="lity-wrap" data-lity-close role="document"><div class="lity-loader" aria-hidden="true">Loading...</div><div class="lity-container"><div class="lity-content"></div><div class="lity-close" data-lity-close aria-label="Close (Press escape to close)"><span class="btn-line"></span></div></div></div></div>'));

    /* Custom function to remove margin bottom from items in the last row depending on the screen size / how many columns the grid has */
    function responsiveColumns(elements, options, styleClasses) {
      function sliceElements(elements, value) {
        var slicedElements = $(elements[0]).slice(-value);
        if (elements[1] === null) {
          slicedElements.addClass(styleClasses);
        } else {
          slicedElements.find(elements[1]).addClass(styleClasses);
        }
      }
      $.each(options, function(index, value) {
        var columns = value.columns;
        if (window.matchMedia(value.matchMedia).matches) {
          var remainder = $(elements[0]).length % columns;
          if (remainder === 0) {
            sliceElements(elements, columns);
          } else {
            sliceElements(elements, remainder);
          }
          return false;
        }
      });
    }

    /*----------- Navbar -----------*/

    /* Lightboxes setup */
    $('.navbar .navbar-nav .nav-link[href^="#"]').each(function() {
      $(this).animatedModal({
        animatedIn: 'fadeIn',
        animatedOut: 'fadeOut',
        animationDuration: '0s',
        beforeOpen: function() {
          $('#overlay-effect').addClass('animate-up').removeClass('animate-down');
          $('#' + this.modalTarget).css({
            'animationDelay': '.5s',
            'animationFillMode': 'both'
          });
        },
        afterOpen: function() {
          $('#' + this.modalTarget).css({
            'animationFillMode': 'none'
          });
        },
        beforeClose: function() {
          $('#overlay-effect').addClass('animate-down').removeClass('animate-up');
          $('#' + this.modalTarget).css({
            'animationDelay': '.5s',
            'animationFillMode': 'both'
          });
        },
        afterClose: function() {
          $('#' + this.modalTarget).css({
            'animationFillMode': 'none'
          });
        }
      });
    });

    $('.lightbox-wrapper').each(function() {
      if (!$('.navbar .navbar-nav .nav-link[href^="#' + this.id + '"]').length) {
        $(this).hide();
      }
    });

    /* Hides the the mobile navbar dropdown when the user clicks outside of it */
    $(document).on('mouseup', function(event) {
      if ($('.navbar #navbarSupportedContent').hasClass('show')) {
        // The mobile Bootstrap navbar dropdown
        var navbarToggler = $('.navbar .navbar-menu');
        if (!navbarToggler.is(event.target) && navbarToggler.has(event.target).length === 0) {
          navbarToggler.trigger('click');
        }
      }
    });

    /*----------- Home -----------*/

    /* Animated heading text */
    (function() {
      // Set animation timing
      var animationDelay = 2500,
        // Clip effect
        revealDuration = 660,
        revealAnimationDelay = 1500;

      initHeadline();

      function initHeadline() {
        // Initialise headline animation
        animateHeadline($('.cd-headline'));
      }

      function animateHeadline($headlines) {
        var duration = animationDelay;
        $headlines.each(function() {
          var headline = $(this);
          if (headline.hasClass('clip')) {
            var spanWrapper = headline.find('.cd-words-wrapper'),
              newWidth = spanWrapper.width() + 10;
            spanWrapper.css('width', newWidth);
          }

          //trigger animation
          setTimeout(function() {
            hideWord(headline.find('.is-visible').eq(0));
          }, duration);
        });
      }

      function hideWord($word) {
        var nextWord = takeNext($word);

        if ($word.parents('.cd-headline').hasClass('clip')) {
          $word.parents('.cd-words-wrapper').animate({
            width: '2px'
          }, revealDuration, function() {
            switchWord($word, nextWord);
            showWord(nextWord);
          });

        }
      }

      function showWord($word, $duration) {
        if ($word.parents('.cd-headline').hasClass('clip')) {
          $word.parents('.cd-words-wrapper').animate({
            'width': $word.width() + 10
          }, revealDuration, function() {
            setTimeout(function() {
              hideWord($word);
            }, revealAnimationDelay);
          });
        }
      }


      function takeNext($word) {
        return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
      }

      function takePrev($word) {
        return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
      }

      function switchWord($oldWord, $newWord) {
        $oldWord.removeClass('is-visible').addClass('is-hidden');
        $newWord.removeClass('is-hidden').addClass('is-visible');
      }
    }())

    /* Home variants manager */

    // If Video variant
    if ($('.home-area').hasClass('video-variant')) {
      $('#homeVideo').YTPlayer();
    }

    /*----------  About: Services  ----------*/

    /* Removes margin bottom from items in the last row depending on the screen size / how many columns the grid has */
    responsiveColumns(
      ['#about .services-section .single-service', null],
      [{
          matchMedia: '(max-width: 767.98px)',
          columns: 1,
        },
        {
          matchMedia: '(max-width: 991.98px)',
          columns: 2,
        }, {
          matchMedia: '(min-width: 991.98px)',
          columns: 3,
        }
      ],
      'rc-mb-0'
    );

    /*----------  About: Testimonials  ----------*/

    var testimonials = tns({
      container: '#about .testimonials-section .my-slider',
      items: 2,
      gutter: 30,
      "responsive": {
        "0": {
          "items": 1,
          "gutter": 0
        },
        "768": {
          "items": 2,
          "gutter": 30
        }
      },
      preventScrollOnTouch: 'auto',
      slideBy: "page",
      mouseDrag: true,
      swipeAngle: false,
      speed: 400,
      controls: false,
      autoHeight: true,
      navPosition: 'bottom'
    });

    /*----------  About: Pricing  ----------*/

    /* Removes margin bottom from items in the last row depending on the screen size / how many columns the grid has */
    responsiveColumns(
      ['#about .pricing-section .single-plan', null],
      [{
        matchMedia: '(max-width: 991.98px)',
        columns: 1,
      }, {
        matchMedia: '(min-width: 991.98px)',
        columns: 3,
      }],
      'rc-mb-0'
    );

    /*----------  Resume: Skills  ----------*/

    (function() {
      var initPercentageElement = function() {
        $('#resume .skills-section .single-skill').each(function() {
          var percentage = Math.min(100, Math.max(0, $(this).data('percentage')));
          var barWidth = $(this).find('.skill-progress').outerWidth(true);
          var percentageElementOffset = barWidth - (barWidth * (percentage / 100));
          $(this).find('.skill-percentage').text(percentage + '%').css('margin-right', percentageElementOffset);
          $(this).find('.progress-bar').attr('aria-valuenow', percentage).css('width', percentage + '%');
        });
      }
      initPercentageElement();
      $(window).on('resize', function() {
        initPercentageElement();
      });
    }());

    /*----------  Portfolio: Portfolio  ----------*/

    (function() {
      /* Setup Isotope */
      var grid = $('#portfolio .portfolio-section .portfolio-grid');
      var filters = $('#portfolio .portfolio-section .filter-control li');
      grid.imagesLoaded(function() {
        grid.isotope({
          itemSelector: '#portfolio .portfolio-section .single-item',
          masonry: {
            horizontalOrder: true
          }
        });
        filters.on('click', function() {
          filters.removeClass('tab-active');
          $(this).addClass('tab-active');
          var selector = $(this).data('filter');
          grid.isotope({
            filter: selector,
            transitionDuration: '.25s'
          });
        });
      });
    }());

    /* Removes margin bottom from items in the last row depending on the screen size / how many columns the grid has */
    responsiveColumns(
      ['#portfolio .portfolio-section .single-item .portfolio-item', '.portfolio-wrapper'],
      [{
        matchMedia: '(max-width: 991.98px)',
        columns: 2,
      }, {
        matchMedia: '(min-width: 991.98px)',
        columns: 3,
      }],
      'rc-mb-0'
    );

    /*----------  Blog: Blog  ----------*/

    /* Removes margin bottom from items in the last row depending on the screen size / how many columns the grid has */
    responsiveColumns(
      ['#blog .blog-section .single-post', null],
      [{
        matchMedia: '(max-width: 991.98px)',
        columns: 1,
      }, {
        matchMedia: '(min-width: 991.98px)',
        columns: 3,
      }],
      'rc-mb-0'
    );

  });
  $(window).on('load', function() {
    /*----------- Preloader -----------*/

    $('.preloader-icon').fadeOut(400);
    $('.preloader').delay(500).fadeOut('slow');

  });
}(jQuery));