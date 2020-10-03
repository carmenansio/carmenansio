/*=========================================
 * animatedModal.js
 * author: João Pereira
 * website: https://joaopereira.pt
 * email: joaopereirawd@gmail.com
 * Licensed MIT
=========================================*/

(function($) {

  $.fn.animatedModal = function(options) {
    var modal = $(this);
    var modalTarget = modal.attr('href').replace('#', '');
    // Defaults
    var closeBt = $('#' + modalTarget).find('[data-modal-close]');
    function getScrollBarWidth() {
      var $outer = $('<div>').css({ visibility: 'hidden', width: 100, overflow: 'scroll' }).appendTo('body'),
        widthWithScroll = $('<div>').css({ width: '100%' }).appendTo($outer).outerWidth();
      $outer.remove();
      return 100 - widthWithScroll;
    }
    var settings = $.extend({
      modalTarget: modalTarget,
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndexIn: '9999',
      zIndexOut: '-9999',
      opacityIn: '1',
      opacityOut: '0',
      animatedIn: 'fadeIn',
      animatedOut: 'fadeOut',
      animationDuration: '.2s',
      // Callbacks
      beforeOpen: function() {
        $('html').css('overflowY', 'scroll');
        $('html').add(closeBt).css('marginRight', '0');
        $('#' + modalTarget).css('overflowY', 'hidden');
      },
      afterOpen: function() {
        $('html').css('overflowY', 'hidden');
        $('html').add(closeBt).css('marginRight', getScrollBarWidth());
        $('#' + modalTarget).css('overflowY', 'scroll');
      },
      beforeClose: function() {
        $('html').css('overflowY', 'scroll');
        $('html').add(closeBt).css('marginRight', '0');
        $('#' + modalTarget).css('overflowY', 'hidden');
      },
      afterClose: function() {}



    }, options);

    //console.log(closeBt)

    var href = $(modal).attr('href'),
      id = $('body').find('#' + settings.modalTarget),
      idConc = '#' + id.attr('id');
    //console.log(idConc);
    // Default Classes
    id.addClass('animated');
    id.addClass(settings.modalTarget + '-off');

    //Init styles
    var initStyles = {
      'position': settings.position,
      'width': settings.width,
      'height': settings.height,
      'top': settings.top,
      'left': settings.left,
      'z-index': settings.zIndexOut,
      'opacity': settings.opacityOut,
      '-webkit-animation-duration': settings.animationDuration,
      '-moz-animation-duration': settings.animationDuration,
      '-ms-animation-duration': settings.animationDuration,
      'animation-duration': settings.animationDuration
    };
    //Apply stles
    id.css(initStyles);

    modal.click(function(event) {
      event.preventDefault();
      if (href == idConc) {
        if (id.hasClass(settings.modalTarget + '-off')) {
          id.removeClass(settings.animatedOut);
          id.removeClass(settings.modalTarget + '-off');
          id.addClass(settings.modalTarget + '-on');
        }

        if (id.hasClass(settings.modalTarget + '-on')) {
          settings.beforeOpen();
          id.css({ 'opacity': settings.opacityIn, 'z-index': settings.zIndexIn });
          id.addClass(settings.animatedIn);
          id.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterOpen);
        };
      }
    });



    closeBt.click(function(event) {
      event.preventDefault();

      settings.beforeClose(); //beforeClose
      if (id.hasClass(settings.modalTarget + '-on')) {
        id.removeClass(settings.modalTarget + '-on');
        id.addClass(settings.modalTarget + '-off');
      }

      if (id.hasClass(settings.modalTarget + '-off')) {
        id.removeClass(settings.animatedIn);
        id.addClass(settings.animatedOut);
        id.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterClose);
      };

    });

    function afterClose() {
      id.css({ 'opacity': settings.opacityOut, 'z-index': settings.zIndexOut });
      settings.afterClose(); //afterClose
    }

    function afterOpen() {
      settings.afterOpen(); //afterOpen
    }

  }; // End animatedModal.js

}(jQuery));
