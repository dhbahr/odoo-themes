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
;(function( $ ){
	var $window = $(window);
	
	$.fn.affixmenu = function() {
		var $this = $(this),
			firstPos = 0,
			outerHeight = $this.outerHeight(true);

		// function to be called whenever the window is scrolled or resized
		function updateaffix(){
			
			//ignore when offcanvas open => leave unchanged
			if($(document.body).hasClass('off-canvas-right') || $(document.body).hasClass('off-canvas-left')){
				return false;
			}

			var offsettop = ($this.hasClass('affix') && $this.prev('.hplace').length > 0) ? $this.prev('.hplace').offset().top : $this.offset().top;
			var pos = $window.scrollTop();

			if(pos < firstPos && firstPos > offsettop + outerHeight){
				
				if(!$this.hasClass('affix')){
					$(document.body).addClass('affixmenu-show');
					$this.addClass('affix');

					$this.before($('<div class="hplace clearfix"></div>').css('height', $this.outerHeight(true)));
				}
			} else if(pos > firstPos || pos < offsettop) {
				$this.removeClass('affix').prevAll('.hplace').remove();
				$(document.body).removeClass('affixmenu-show');
			}

			firstPos = pos;
		}
		
		$window.on('scroll resize', updateaffix);
		updateaffix();
	};
})(jQuery);