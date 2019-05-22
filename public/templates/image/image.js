(function ($) {

    (function () { 
        setTimeout(function () { 
            var imageLoader = document.getElementById("imageLoader"); 
            imageLoader.addEventListener("change", handleImage, false); 
            canvas = document.getElementById("imageCanvas"); 
            ctx = canvas.getContext("2d"); 
        }, 1);
     })();

})(jQuery);