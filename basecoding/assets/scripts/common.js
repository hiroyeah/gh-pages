
/*	jQuery.rollover
---------------------------------------*/

jQuery.fn.rollover = function(suffix) {
	suffix = suffix || '_on';
	var check = new RegExp(suffix + '\\.\\w+$');
	return this.each(function() {
		var img = jQuery(this);
		var src = img.attr('src');
		if (check.test(src)) return;
		var _on = src.replace(/\.\w+$/, suffix + '$&');
		jQuery('<img>').attr('src', _on);
		img.hover(
		function() {
			img.attr('src', _on);
		},
		function() {
			img.attr('src', src);
		});
	});
};

jQuery(document).ready(function($) {
    $('a img.over').rollover();
});

/*	externalLinks
---------------------------------------*/

function externalLinks() {
	if (!document.getElementsByTagName) return;
	var anchors = document.getElementsByTagName("a");
	for (var i = 0; i < anchors.length; i++) {
		var anchor = anchors[i];
		if (anchor.getAttribute("href") && anchor.getAttribute("rel") == "external") anchor.target = "_blank";
	}
}

if (window.addEventListener) {
	window.addEventListener("load", externalLinks, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", externalLinks);
}

/*	jquery.mobile-menu.js
---------------------------------------*/

(function($) {
	$(document).ready(function() {
		$.slidebars({
			siteClose: true
		});
	});
}) (jQuery);

/*	trunk8.js
---------------------------------------*/

jQuery(document).ready(function($){
	"use strict";
	$('.news_item p').trunk8({
		lines: 2
	});
});

/*	webgl
---------------------------------------*/

function initialize() {
  if(Modernizr.webgl){
    var options = {
      zoom:1.5,
      position:[47.19537,8.524404],
      sky:false
    };
    var earth = new WE.map('webgl_earth', options);
    WE.tileLayer('http://data.webglearth.com/natural-earth-color/{z}/{x}/{y}.jpg', {
      tileSize: 256,
      bounds: [[-85, -180], [85, 180]],
      minZoom: 0,
      maxZoom: 16,
      tms: true
    }).addTo(earth);

    $.get("../assets/scripts/markers.json", function(data){
	    var markers = $.parseJSON(data);
      $.each(markers, function(index, val){
        var marker = WE.marker(val.point, "../assets/images/common/pin.png", 6, 6).addTo(earth);
        marker.bindPopup('<dl class="popup"><dt><a target=_blank href="' + val.url + '">' + val.name  + '</a></dt><dd>' + val.detail + '</dd></dl>', 100, false);
        if(val.show_popup){
          marker.openPopup();
        }
      });
    });

    var before = null;
    requestAnimationFrame(function animate(now) {
        var c = earth.getPosition();
        var elapsed = before? now - before: 0;
        before = now;
        earth.setCenter([c[0], c[1] + 0.1*(elapsed/30)]);
        requestAnimationFrame(animate);
    });
  }else{
    $("#webgl_earth").addClass("webgl_not_supported");
    $("#webgl_earth").html("<span>感性とデジタル製造を直結し、</br>生活者の創造性を拡張するファブ地球社会創造</span>");
  }
}