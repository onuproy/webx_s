!(function ($) {
    $.fn.bgscroll = function (options) {
        if (!this.length) return this;

        options = options || {};
        window.scrollElements = window.scrollElements || {};

        this.each(function () {
            let allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
                randomId = "",
                element = this;

            for (let i = 0; i < 5; i++) {
                randomId += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
            }

            element.current = 0;
            element.scrollSpeed = options.scrollSpeed || 70;
            element.direction = options.direction || "h"; // "h" (horizontal), "v" (vertical), "up", "down"

            window.scrollElements[randomId] = element;

            window[randomId] = function () {
                let e = window.scrollElements[randomId];
                
                if (e.direction === "h") {
                    e.current -= 1;
                    $(e).css("background-position", `${-e.current}px 0`);
                } else if (e.direction === "v") {
                    e.current -= 1;
                    $(e).css("background-position", `0 ${e.current}px`);
                } else if (e.direction === "up") {
                    e.current += 1; // Moves background UP
                    $(e).css("background-position", `0 -${e.current}px`);
                } else if (e.direction === "down") {
                    e.current += 1; // Moves background DOWN ✅
                    $(e).css("background-position", `0 ${e.current}px`);
                }
            };

            setInterval(window[randomId], element.scrollSpeed);
        });

        return this;
    };
})(jQuery);
