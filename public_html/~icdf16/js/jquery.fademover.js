/* Copyright (c) 2011 detelu (http://www.detelu.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * jquery.fademover.js
 * Version: 2012-02-06
*/
(function($){
	$.fn.fadeMover = function(options) {
        var defaults = {
            'outSpeed': 1000,
            'inSpeed': 1000,
			'effectType': 1, // fadeIn only 2, fadeOut only 3
			'nofadeOut' : 'nonmover' //fadeOut no thx (class name)
        };
        var setting = $.extend(defaults, options);
        this.each(function() {
			var pel = this;
			if(setting.effectType == 1 || setting.effectType == 2) {
				$(pel).css("opacity", 0).animate({opacity: 1}, setting.inSpeed);
			}
			if(setting.effectType == 1 || setting.effectType == 3) {
				$('a').click(function(event) {
					var moveUrl = $(this).attr("href");
					if(!$(this).hasClass(setting.nofadeOut) && moveUrl.charAt(0) != "#"){
						event.preventDefault();
						$(pel).animate({"opacity": 0}, setting.outSpeed, function(){
							location.href = moveUrl;
						});
					}
				});
			}
		});
		return this;
	}
	window.onunload = function () {};
})(jQuery);