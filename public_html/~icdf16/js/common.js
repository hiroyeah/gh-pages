// JavaScript Document


/*実行*/
$(function() {
    setOperate();
    accordion();
    smoothScroll();
    //pageTop();
    gnavToggle();

    $("body").fadeMover({
        'outSpeed': 300,
        'inSpeed': 300
    });
});

//=========================================================
//
//	Accordion
//
//=========================================================
function accordion() {
    $(".acrBody").css("display", "none");
    $(".acr").click(function() {
        $(this).toggleClass("op").next().slideToggle();
    });
}

//=========================================================
//
//	jQuery Smart_UA.JS
//
//=========================================================
function setOperate() {
    setView();
    var agent = navigator.userAgent;
    if (agent.search(/iPhone/) != -1) {
        $("body").addClass("iphone").addClass("ios"); //iPhoneには「body class="iphone"」追加
        window.onorientationchange = setView;
    } else if (agent.search(/iPad/) != -1) {
        $("body").addClass("ipad").addClass("ios"); //iPadには「body class="ipad"」追加
        window.onorientationchange = setView;
    } else if (agent.search(/Android/) != -1) {
        $("body").addClass("android"); //Androidには「body class="android"」追加
        window.onresize = setView;
    } else {
        $("body").addClass("other"); //上記以外には「body class="other"」追加
        window.onorientationchange = setView;
    }
}

function setView() {
    var orientation = window.orientation;
    if (orientation === 0) {
        $("body").addClass("portrait"); //画面が縦向きの場合は「body class="portrait"」追加
        $("body").removeClass("landscape"); //画面が縦向きの場合は「body class="landscape"」削除
    } else {
        $("body").addClass("landscape"); //画面が横向きの場合は「body class="landscape"」追加
        $("body").removeClass("portrait"); //画面が横向きの場合は「body class="portrait"」削除
    }
}

/* スムーススクロール
-------------------------------------------------- */
function smoothScroll() {
    $('a[href^=#top]').click(function() {
        var speed = 800;
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var h = $("#header").height();
        var position = target.offset().top - h;

        $('body,html').animate({
            scrollTop: position
        }, speed, 'swing');
        return false;
    });
}


/* ページトップ
-------------------------------------------------- */
function pageTop() {
    var topBtn = $('#pagetop');
    topBtn.hide();
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            topBtn.fadeIn();
        } else {
            topBtn.fadeOut();
        }
    });
    topBtn.click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
}

/* gnavトグルメニュー（SP用）
-------------------------------------------------- */
function gnavToggle() {
    var flag = 1;
    var $btn = $(".menu-trigger");
    var $target = $("#gnav-wrap");
    //$target.hide();

    $btn.click(function() {
        $(this).toggleClass("active");
        $target.slideToggle();
        flag = flag * -1;
    });

    function resetGnav() {
        var w = $(window).width();
        if (w >= 767) {
            $target.show();
            flag = 1;
        } else {
            if (flag > 0) {
                $target.hide();
                flag = -1;
                $btn.removeClass("active");
            } else {
                return false;
            }
        }
    }

    var timer = false;
    $(window).resize(function() {
        if (timer !== false) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            resetGnav();
        }, 200);
    });
}
