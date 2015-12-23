/** 
 *------------------------------------------------------------------------------
 * @package       T3 Framework for Joomla!
 *------------------------------------------------------------------------------
 * @copyright     Copyright (C) 2004-2013 JoomlArt.com. All Rights Reserved.
 * @license       GNU General Public License version 2 or later; see LICENSE.txt
 * @authors       JoomlArt, JoomlaBamboo, (contribute to this project at github 
 *                & Google group to become co-author)
 * @Google group: https://groups.google.com/forum/#!forum/t3fw
 * @Link:         http://t3-framework.org 
 *------------------------------------------------------------------------------
 */ 
(function( $ ){
	$.fn.updateSizeVideo = function(element) {
		var $this = $(this),
			mediaAspect = 16/9,
			imobile = navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/),
			loaded = false,
			video = null;

		if(imobile){
			video = document.createElement('video');
			video.src = $this.find('source').attr('src');
			video.poster = $this.attr('poster');
			video.preload = true;
			video.loop = true;

			$(video).insertAfter($this);
			$this.remove();
			
			$this = $(video);
			$this.on('loadeddata', function(){
				loaded = true;
			});

			video.load();
      video.play();

      var videoplay = function(){
      	video.load();
      	video.play();

      	if(loaded){
					$this[0].play();

					$(document).off('touchstart', videoplay);
      	}
			};

      $(document).on('touchstart', videoplay);
		}
		
		function updateSize(){

			if(!imobile){
				var elementW = $(element).width(),
					elementH = $(element).height(),
					windowAspect = elementW/elementH;

				if (windowAspect < mediaAspect) {
					$this.css('width',elementH*mediaAspect).css('height',elementH);
				}else{
					$this.css('width',elementW).css('height',elementW/mediaAspect);
				}
			} else {
				video.width = window.innerWidth;
				video.height = window.innerWidth * 9 / 16;
			}
		}

		$(window).on('resize orientationchange', function(){ setTimeout(updateSize, 200)});
		updateSize();
	};
})(jQuery);

 
(function($){
	// browser detector
	(function () {
		var browser = '';
		if(/constructor/i.test(window.HTMLElement)){
			browser = 'safari';
		} else if('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style){
			browser = 'ie11';
		} else if(document.documentElement.style.msTouchAction !== undefined){
			browser = 'ie10';
		}
		
		browser && $('html').addClass(browser);
	})();
	
	$(document).ready(function($){
		$('video').updateSizeVideo('.t3-video');
		if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
//			$('.s_big_picture img').each(function(){
//				imgsrc = $(this).attr('src');
//				$(this).closest('section.s_big_picture').css({
//					'background':'url('+imgsrc+') 50% 0 no-repeat fixed'
//				}).parallax("50%", 0.1);
//				$(this).remove();
//			});
		}
		//$('.s_big_picture').parallax("50%", 0.1);
	 	//Check div message show
		if($("#system-message").children().length){
				$("#system-message-container").show();
				$("#system-message a.close").click(function(){
						setTimeout(function(){if(!$("#system-message").children().length) $("#system-message-container").hide();}, 100);
				});
		}else{
				$("#system-message-container").hide();
		}
		//Add affix header
		$('#t3-header').affixmenu();
		//Add Inview
		$.fn.visibleElement = function (options){		
			$(this).bind('inview', function(event, visible,visiblePartX,visiblePartY){			
		      if (visible) {
		    	  if(visiblePartY == 'bottom' || visiblePartY=='both'){
		    		  $(this).addClass('inview');
		    	  }	        
		      } 
			});		
		};
		$.each(['.section.shasti'],function(i,element){
			$(element).visibleElement();
		});
		
		// back to top
		$(window).scroll(function() {
			if($(this).scrollTop() > 0){
				if($('html').attr('dir')=='rtl'){
					$('#back-to-top').css('left',(($('body').width() - jQuery('.container').width())/2)-100).removeClass('deactive').addClass('active');
				}else{
					$('#back-to-top').css('right',(($('body').width() - jQuery('.container').width())/2)-100).removeClass('deactive').addClass('active');
				}
			}else{
				$('#back-to-top').removeClass('active').addClass('deactive');
			}			
		});
		
		(function(){
			$('#back-to-top').on('click', function(){
				$('html, body').stop(true).animate({
					scrollTop: 0
				}, {
					duration: 800, 
					easing: 'easeInOutCubic',
					complete: window.reflow
				});

				return false;
			});
		})();
	});
})(jQuery);
