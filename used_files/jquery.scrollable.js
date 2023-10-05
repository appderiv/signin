(function ($) {

    $.fn.scrollable = function (options) {
        var settings = {
            'height':($(window).height() * 0.8) + 'px'
        };
        if (options) {
            $.extend(settings, options);
        }

        this.each(function () {

            if ($(this).data('isScrollWrapped') !== true) {
                /** TODO: The clear property should be identified intelligently.
                 *  It may not always be appropriate to clear the content. */
                $(this).wrap('<div class="_scrollWrap" style="clear:both;" />');
            }
            var scrollWrap = $(this).parent('._scrollWrap');
            $(this).data('isScrollWrapped', true);
            if (scrollWrap.length) {
                scrollWrap.css('overflow', 'auto');
                if (scrollWrap.prop('scrollWidth') > scrollWrap.width()) {
                    scrollWrap.css('max-height', settings.height);
                    scrollWrap.css('position', 'relative');
                } else {
                    scrollWrap.css('overflow', 'visible');
                    scrollWrap.css('overflow-x', 'visible');
                    scrollWrap.css('overflow-y', 'visible');
                    scrollWrap.css('max-height', 'none');
                    scrollWrap.css('height', 'auto');
                    scrollWrap.css('position', 'static');
                }
            }
        });
    };
})(jQuery);

