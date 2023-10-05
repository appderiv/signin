window.onload = function () {
    if (typeof initGraphs == 'function') {
        initGraphs();
    }

    if (document.getElementById('datePreset')) {
        document.getElementById('datePreset').onchange = function () {
            var preset = document.getElementById('datePreset').value;
            var dateFrom = new Date();
            var now = serverTime.getTime();
            var dateTo = serverTime;
            var aDay = 24 * 3600 * 1000;
            var now2 = dateTo.getTime();
            switch (preset) {
                case '7d':
                    dateFrom.setTime(now - 7 * aDay);
                    document.getElementById('dateFrom').value =
                        dateFrom.getFullYear() + '-'
                        + zeroPad(dateFrom.getMonth() + 1, 2) + '-'
                        + zeroPad(dateFrom.getDate(), 2);
                    document.getElementById('dateTo').value =
                        dateTo.getFullYear() + '-'
                        + zeroPad(dateTo.getMonth() + 1, 2) + '-'
                        + zeroPad(dateTo.getDate(), 2);
                    break;
                case '30d':
                    dateFrom.setTime(now - 30 * aDay);
                    document.getElementById('dateFrom').value =
                        dateFrom.getFullYear() + '-'
                        + zeroPad(dateFrom.getMonth() + 1, 2) + '-'
                        + zeroPad(dateFrom.getDate(), 2);
                    document.getElementById('dateTo').value =
                        dateTo.getFullYear() + '-'
                        + zeroPad(dateTo.getMonth() + 1, 2) + '-'
                        + zeroPad(dateTo.getDate(), 2);
                    break;
                case 'lm':
                    dateFrom.setTime(now - dateTo.getDate() * aDay);
                    document.getElementById('dateFrom').value =
                        dateFrom.getFullYear() + '-'
                        + zeroPad(dateFrom.getMonth() + 1, 2)
                        + '-01';
                    document.getElementById('dateTo').value =
                        dateFrom.getFullYear() + '-'
                        + zeroPad(dateFrom.getMonth() + 1, 2) + '-'
                        + zeroPad(daysInMonth(dateFrom.getFullYear(), dateFrom.getMonth()), 2);
                    break;
                case 'cm':
                    document.getElementById('dateFrom').value =
                        dateFrom.getFullYear() + '-'
                        + zeroPad(dateFrom.getMonth() + 1, 2)
                        + '-01';
                    document.getElementById('dateTo').value =
                        dateTo.getFullYear() + '-'
                        + zeroPad(dateTo.getMonth() + 1, 2) + '-'
                        + zeroPad(dateTo.getDate(), 2);
                    break;
                case 'cy':
                    document.getElementById('dateFrom').value = dateFrom.getFullYear() + '-01-01';
                    document.getElementById('dateTo').value =
                        dateTo.getFullYear() + '-'
                        + zeroPad(dateTo.getMonth() + 1, 2) + '-'
                        + zeroPad(dateTo.getDate(), 2);
                    break;

                    // Set minimum #dateTo to be no less than current value of #dateFrom
                    var minTo = $('#dateFrom').datepicker('getDate');
                    $('#dateTo').datepicker('option', 'minDate', minTo);
            }
        }

        document.getElementById('dateTo').onchange = function () {
            updatePreset(document.getElementById('datePreset'));
        }

        document.getElementById('dateFrom').onchange = function () {
            updatePreset(document.getElementById('datePreset'));
        }

        // Set the date present selection based on the values in the date fields.
        updatePreset(document.getElementById('datePreset'));
    }

    if (typeof customInit == 'function') {
        customInit();
    }
};

$(document).ready(function () {
    /* Tooltip */
    xOffset = 15;
    yOffset = -10;
    $('.tooltip').parent().hover(function () {
        $(this).children('.tooltip').stop(true, true);
        $(this).children('.tooltip').fadeIn("slow");
    }, function () {
        $(this).children('.tooltip').stop(true, true);
        $(this).children('.tooltip').fadeOut("fast");
    });

    $('.tooltip').parent().mousemove(function (e) {
        $(this).children('.tooltip').offset({top: e.pageY + yOffset, left: e.pageX + xOffset});
    });
    $('.tooltip').parent().mouseleave(function (e) {
        $(this).children('.tooltip').stop(true, true);
        $(this).children('.tooltip').fadeOut("fast");
    });

    /* Tabbed area */
    $('.tabbedArea').each(function () {
        $(this).children('.tabFragment').hide();
        $(this).find('.tabs :first').addClass('active');
        $($(this).find('.tabs :first a').attr('href')).show();
    });

    /* Snow Theme Menu Arrows */
    $('#nav ul li').each(function () {
        if ($(this).children('a').outerWidth() > 105) {
            $(this).children('.arrow-down').css('margin-left', Math.round(($(this).children('a').outerWidth() - 100) / 2));
        }
    });

    $('.tabs a').click(function () {
        $(this).parents('.tabbedArea').children('.tabFragment').hide();
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
        $($(this).attr('href')).show();
        $('table.report').scrollable();
        return false;
    });

    /* Expand area */
    $('.expandArea .expandLegend').click(function () {
        $(this).siblings('.expandSection').toggle('fast');
    });

    $('.expandSelf').click(function () {
        var isVisible = $(this).find('.expandSection').is(':visible');
        $(this).parents('.accordion').find('.expandSelf .expandSection').hide('fast');
        $(this).parents('.accordion').find('.expandSelf').removeClass('open');
        if (isVisible) {
            $(this).find('.expandSection').hide('fast');
            $(this).removeClass('open');
        } else {
            $(this).find('.expandSection').show('fast');
            $(this).addClass('open');
        }
    });
    $('.triggerExpand').click(function () {
        $(this).parent().find('div.expandSection').toggle('slow');
    });

    $('.inlineMenuTrigger').click(function (event) {
        if ($(this).parent().find('.inlineMenu').is(':visible'))
            $('.inlineMenu').hide();
        else {
            $('.inlineMenu').hide();
            $(this).parent().find('.inlineMenu').first().toggle('fast');
        }
        $('body').one('click', function () {
            $('.inlineMenu').hide();
        });
        event.stopPropagation();
    });

    /* Suppress onClick events on parent blocks when clicking a link */
    $('a').click(function () {
        $(this).parents().unbind('click');
    });

    if (window.location.hash) {
        $('*[id="' + encodeURI(window.location.hash.replace('#', '')) + '"]').children('.expandSection').toggle('slow');
    }

    /* Make disabled links unclickable */
    $('.disabled a').click(function () {
        return false;
    });

    /* Adds sorting to tables */
    $('table.report').tablesorter({
        textExtraction: function (node) {
            return $(node).metadata().rawVal || node.innerText;
        },
        widgets: ['zebra']
    });

    $('table.report').scrollable();

    /* Display percent data nicely */
    $('td.percentage').each(function () {
        if ($(this).metadata().rawVal) {
            $(this).wrapInner('<div class="percentVisual"><div class="bar" style="width:' + $(this).metadata().rawVal + '%"><span></span></div></div>');
            $(this).addClass('dontCrush');
        }
    });

    /* Open external links in a new window */
    $('a[rel="external"]').click(function () {
        window.open(this.href);
        return false;
    });

    /* De-emphasises decimals in ratios*/
    $('td.ratio').each(function () {
        $(this).html($(this).html().replace(/\.(\d+)/, '<small>.$1</small>'));
    });

    $('.showBaseVal').change(function () {
        if ($(this).prop('checked')) {
            $('td.currency').each(function () {
                if (($(this).metadata().baseVal)) {
                    $(this).append('<span class="baseVal"><br />' + $(this).metadata().baseVal.toString() + '</span>');
                }
            });
        }
        else {
            $('span.baseVal').remove();
        }
    });

    /* Editable cells in a table */
    $('.editable').click(function () {
        // checks for conflicts in clicks
        if ($(this).children('.editForm').data('cancelClicked') !== true) {
            $(this).children('.editLabel').hide();
            $(this).children('.editForm').show();
        }
        $(this).children('.editForm').data('cancelClicked', false);
    });

    $('.editForm input.editSubmit').click(function () {
        var form = $(this).parent();
        var input = form.children('.editText').val();
        var label = form.siblings('.editLabel');
        $('#ajax-loader').addClass('ajax-load');

        form.submit(function (e) {
            var postData = $(this).serializeArray();
            var formURL = $(this).attr("action");
            $.ajax(
                {
                    url: formURL,
                    type: "POST",
                    data: postData,
                    success: function (data, textStatus, jqXHR) {
                        label.text(input);
                        form.hide();
                        label.show();
                        $('#ajax-loader').removeClass('ajax-load');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log('faiiiiiiiiiiiiiil');
                    }
                });
            e.preventDefault();
        });
    });

    $('.editForm button.editCancel').click(function () {
        var form = $(this).parent();
        var input = form.children('.editText');
        var label = form.siblings('.editLabel');

        input.val(label.text());
        form.hide();
        label.show();

        $(this).parent().data('cancelClicked', true);
    });

    // jQuery plugin to prevent double submission of forms
    jQuery.fn.preventDoubleSubmission = function () {
        $(this).on('submit', function (e) {
            var $form = $(this);

            if ($form.data('submitted') === true) {
                // Previously submitted - don't submit again
                e.preventDefault();
            } else {
                // Mark it so that the next submit can be ignored
                $form.data('submitted', true);
            }
        });

        // Keep chainability
        return this;
    };

    $('form').preventDoubleSubmission();

    // on a window unload, clear the double submission flag
    $(window).on('unload', function () {
        $('form').data('submitted', false);
    });

    //<editor-fold desc="Mobile Responsive Tweaks">
    // insert an image for the mobile menu icon
    $('#nav').prepend('<img class="mobile-menu-icon" src="templates/default/images/menu.svg" onclick="openMobileMenu()" />');

    // insert an image for left navigation close and expand
    $("#aside .section > h1").prepend('<img class="lh-menu-icon" src="templates/default/images/down-arrow.svg" />');

    // toggle left hand menu when on mobile
    $("#aside .section h1").click(function () {
        $(this).parents(".section").find(".show-hide").toggle();
    });

    // add class to expanded menu
    $("#aside .section h1").click(function () {
        $(this).parents(".section").toggleClass("expanded-menu");
    });

    // if a mobile device, replace 'previous' and 'next' with arrows
    if ($(window).width() < 767) {
        $(".prev").html("&nbsp;<&nbsp;");
        $(".next").html("&nbsp;>&nbsp;");
    }
    //</editor-fold>
});

function refreshIndexCharts() {
    $('.ajax-plan.selected a').trigger('click');
}

function deselectAllByClass(className) {
    $(className).each(function () {
        $(this).removeClass("selected");
    });
}

$(window).resize(function () {
    $('table.report').scrollable();
});

function zeroPad(n, digits) {
    n = n.toString();
    while (n.length < digits) {
        n = '0' + n;
    }
    return n;
}

function daysInMonth(year, month) {
    var dd = new Date(year, month + 1, 0);
    return dd.getDate();
}

function updatePreset(selectElem) {
    if (selectElem.tagName.toLowerCase() == 'select') {
        var now = serverTime;

        var dateTo = new Date();
        var dateParts = document.getElementById('dateTo').value.split('-');
        dateTo.setFullYear(dateParts[0]);
        dateTo.setMonth(dateParts[1] - 1);
        dateTo.setDate(dateParts[2]);

        var dateFrom = new Date();
        dateParts = document.getElementById('dateFrom').value.split('-');
        dateFrom.setFullYear(dateParts[0]);
        dateFrom.setMonth(dateParts[1] - 1);
        dateFrom.setDate(dateParts[2]);

        var aDay = 1000 * 3600 * 24;

        var currentYear = new Date();
        currentYear.setMonth(0);
        currentYear.setDate(1);

        var lastMonth = new Date();
        lastMonth.setMonth(now.getMonth() - 1);
        lastMonth.setDate(1);

        var eoLastMonth = new Date();
        eoLastMonth.setDate(1);
        eoLastMonth.setTime(eoLastMonth.getTime() - aDay);

        var presetVal = "";

        if ('' + now.getFullYear() + now.getMonth() + now.getDate() == '' + dateTo.getFullYear() + dateTo.getMonth() + dateTo.getDate()) {
            switch ((Math.floor(dateFrom.getTime() / aDay))) {
                case Math.floor(currentYear.getTime() / aDay):
                    presetVal = 'cy';
                    break;
                case Math.floor(now.getTime() / aDay) - (now.getDate() - 1):
                    presetVal = 'cm';
                    break;
                case Math.floor(now.getTime() / aDay) - 30:
                    presetVal = '30d';
                    break;
                case (Math.floor(now.getTime() / aDay) - 7):
                    presetVal = '7d';
                    break;
            }
        } else if (Math.floor(dateFrom.getTime() / aDay) == Math.floor(lastMonth.getTime() / aDay)
            && Math.floor(dateTo.getTime() / aDay) == Math.floor(eoLastMonth.getTime() / aDay)) {
            presetVal = 'lm';
        }


        for (var i = 0; i < selectElem.options.length; i++) {
            if (selectElem.options[i].value == presetVal)
                selectElem.options[i].selected = true;
        }
    }
}

function str_repeat(i, m) {
    for (var o = []; m > 0; o[--m] = i) ;
    return o.join('');
}

function zbanTranslator(el, template, values) {
    var data = {
        tpl : template,
        values : values,
    };
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: '/ajax-data/zban-translator.json.php',
        data: data,
        success: function (response){
            el.text(response.message);
        },
        error: function (response) {
            console.log('error receiving from zbanTranslator')
            el.text('');
        }
    });
}

//<editor-fold desc="Mobile Responsive Functions">

function openMobileMenu() {

    var nav = document.getElementById('nav').getElementsByTagName('ul')[0];

    if (nav.style.display == 'inline') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'inline';
    }

}
function nFormatter(num, digits) {
    var si = [
        {value: 1, symbol: ""},
        {value: 1E3, symbol: "K"},
        {value: 1E6, symbol: "M"},
        {value: 1E9, symbol: "G"},
        {value: 1E12, symbol: "T"},
        {value: 1E15, symbol: "P"},
        {value: 1E18, symbol: "E"}
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    if (num < 0) {
        num = Math.abs(num);
        let sign = Math.sign(num);
        let unit = 0;

        while(Math.abs(num) > 1000)
        {
            unit = unit + 1;
            num = Math.floor(Math.abs(num) / 100)/10;
        }
        return '-' + num + si[unit].symbol;

    } else {
        return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
    }
}
// populate the stats at a glance
function populateStatsGlance(timePeriod, planId) {
    if (planId === undefined) {
        planId = '';
    }
    $('div#stats-glance div.row div.col-2 p.stat-large').html('<span>&ndash;</span>');
    $('form.summary-form > div.loading-placeholder').addClass('loading');
    $.getJSON("/ajax-data/stats-glance.json.php?timeperiod=" + timePeriod + '&p=' + planId, function (data) {
        // then loop to insert data
        $.each(data, function (key, val) {
            if (val.symbol === undefined) {
                val.symbol = '';
            }
            if (val.toolTip === undefined) {
                val.toolTip = '';
            }
            if (val.label === undefined) {
                val.label = '';
            }
            if(/^-/i.test(val.value)) {
                $(".stat-" + val.name).attr('val',nFormatter(val.value, 1));
                let negativeVal = $(".stat-" + val.name).attr("val");
                negativeVal= negativeVal.replace(/^-/, "");
                $(".stat-" + val.name).empty().append(isNaN(val.value) ? val.value : "-" + (val.symbol != '' ? val.symbol : '') + negativeVal);
                $(".stat-" + val.name).addClass('negative')
            } else {
                $(".stat-" + val.name).empty().append(isNaN(val.value) ? val.value : (val.symbol != '' ? val.symbol : '') + nFormatter(val.value, 1));
            }
            $(".stat-" + val.name).parent().prop('title', val.label + ': ' + (val.toolTip != '' ? val.toolTip : ((val.symbol != '' ? val.symbol : '') + val.value)));
        });
        $('form.summary-form > div.loading-placeholder').removeClass('loading');
    });

}

let makeSumSeries = function (chart) {
    let series = chart.series;

    series[series.length - 1].update({
        data: []
    }, true);

    for (let day = 0; day < chart.series[0].data.length; day++) {
        let daySum = 0;
        for (let channel = 0; channel < chart.series.length - 1; channel++) {
            if (chart.series[channel].visible) {
                daySum += chart.series[channel].data[day].y;
            }
        }
        series[series.length - 1].addPoint({
            y: parseFloat(daySum.toFixed(2))
        }, false);
    }

    chart.redraw();
};
