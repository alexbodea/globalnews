(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./dev/js/app.js":[function(require,module,exports){
/*!#############################
#                              #
#      by Claudiu Limban       #
#  http://sofuxro.elance.com   #
#                              #
################################*/


'use strict';


var util    = require('./util.js'),    // A utility object helping with vanilla javascript (trying to mimic jQuery)
    filters = require('./filters.js'), // filtering the news
    header  = require('./header.js');  // Head and Header functionality


/** =======================================================================================
* Where everything happens
 */
document.addEventListener("DOMContentLoaded", function() {
    /**
    * Head and Header functionality
     */
    header();


    /**
    * Go up (from the footer)
     */
    document.querySelector('footer [data-role="go_up"]').addEventListener('click', function(e) {
        $('html, body').animate({'scrollTop': '0px'}, 500);
        e.preventDefault();
    });


    /**
    * Bootstrap tooltip
     */
    $('[data-toggle="tooltip"]').tooltip();


    /**
    * Filtering news
     */
    if(document.querySelector('.news_wrapper')) {
        filters();
    }


    /**
    * Filtering news
     */
    util.forEach(document.querySelectorAll('.news'), function(index, element) {
        element.addEventListener('click', function(e) {
            window.location = element.querySelector('h2 a').href;
        }, false);
    });


    /**
    * Individual article
     */
    if(document.querySelector('.article')) {
        var height = {
            w: window.innerHeight,
            h: document.querySelector('body > header').offsetHeight,
            f: document.querySelector('body > footer').offsetHeight
        };

        document.querySelector('.article').style.height = height.w - height.h - height.f - 6 + 'px';
    }
});
},{"./filters.js":"/Users/claudiulimban/Work/global_news/git_front_end/site/dev/js/filters.js","./header.js":"/Users/claudiulimban/Work/global_news/git_front_end/site/dev/js/header.js","./util.js":"/Users/claudiulimban/Work/global_news/git_front_end/site/dev/js/util.js"}],"/Users/claudiulimban/Work/global_news/git_front_end/site/dev/js/filters.js":[function(require,module,exports){
'use strict';

/**
* A utility object helping with vanilla javascript (trying to mimic jQuery)
 */
var util = require('./util.js');



module.exports = function() {
    var news_wrapper = document.querySelector('.news_wrapper'),
        all_news     = news_wrapper.querySelectorAll('.news'),

        // the fallowing are used for js_date
        date             = new Date(),
        day              = date.getDate(),
        month            = date.getMonth() + 1, //Januray is 0
        year             = date.getFullYear(),
        format_today     = day + '.' + (month < 10 ? '0' + month : month) + '.' + year,
        format_yesterday = (day - 1) + '.' + (month < 10 ? '0' + month : month) + '.' + year,

        // filter variables
        var_date  = '',
        var_media = '',

        // function for showing hidding the proper news
        toggle_news  = function() {
            // if we need to hide something we first set them ALL to block
            news_wrapper.classList.add('empty');
            util.forEach(all_news, function(index, el) {
                el.style.display = 'none';
            });

            // we show only the ones that fulfill the filter criteria
            util.forEach(news_wrapper.querySelectorAll('.news' + var_date + var_media), function(index, el) {
                news_wrapper.classList.remove('empty');
                el.style.display = 'block';
            });
        };


    if(document.querySelector('.js_date')) {
        document.querySelector('.js_date .dropdown-menu').addEventListener('click', function(e) {
            if(e.target && e.target.nodeName.toLowerCase() === 'a') {
                if(e.target.dataset.value === '') {
                    var_date = '';
                    document.querySelector('.js_date > button .text').innerHTML = 'Choose a date';
                } else {
                    var_date = '[data-raw-date="' +  e.target.dataset.value + '"]';
                    document.querySelector('.js_date > button .text').innerHTML = e.target.dataset.value;
                }
                toggle_news();
            }
        });
    } // end of js_date

    if(document.querySelector('.js_media')) {
        document.querySelector('.js_media .dropdown-menu').addEventListener('click', function(e) {
            if(e.target && e.target.nodeName.toLowerCase() === 'a') {
                if(e.target.dataset.value === '') {
                    var_media = '';
                    document.querySelector('.js_media > button .text').innerHTML = 'Choose a media';
                } else {
                    var_media = '[data-raw-media="' +  e.target.dataset.value + '"]';
                    document.querySelector('.js_media > button .text').innerHTML = e.target.dataset.value;
                }
                toggle_news();
            }
        });
    } // end of js_media
};
},{"./util.js":"/Users/claudiulimban/Work/global_news/git_front_end/site/dev/js/util.js"}],"/Users/claudiulimban/Work/global_news/git_front_end/site/dev/js/header.js":[function(require,module,exports){
'use strict';


var util = require('./util.js');


module.exports = function() {
    /**
    * Adding Font Awesome and most used google font Open Sans
     */
    util.extra_style('http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css');
    util.extra_style('http://fonts.googleapis.com/css?family=Open+Sans');


    /**
    * Menu showing / hidding on small screens (<768px) - in addition with the css
     * and a standard html structure (nav > button + a*n)
     */
    document.querySelector('[data-role="main_menu"] button').addEventListener('click', function(e) {
        this.parentNode.classList.toggle('active');
        e.preventDefault();
    });
}
},{"./util.js":"/Users/claudiulimban/Work/global_news/git_front_end/site/dev/js/util.js"}],"/Users/claudiulimban/Work/global_news/git_front_end/site/dev/js/util.js":[function(require,module,exports){
'use strict';

module.exports = {

    /**
    * Getting the offset of a DOM element
     *
     * ### Examples:
     *
     *     util.offset(document.querySelector('.my_element'));
     *
     * @param {Object} dom element (not jquery element)
     * @return {Object} a top / left object
     */
    offset: function(obj) {
        var top  = 0,
            left = 0;

        if(obj.offsetParent) {
            do {
                top  += obj.offsetTop;
                left += obj.offsetLeft;
            } while (obj = obj.offsetParent);
        }
        return { top: top, left: left };
    },

    /**
    * Adding dynamically a new external style into the html
     *
     * ### Examples:
     *
     *     util.extra_style('http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css');
     *
     * @param {String} the actual url (local or http)
     */
    extra_style: function(url) {
        var link_css = document.createElement("link");

        link_css.setAttribute("rel", "stylesheet");
        link_css.setAttribute("href", url);
        document.getElementsByTagName("head")[0].appendChild(link_css);
    },

    /**
    * Looping through DOM NodeList
     *
     * ### Examples:
     *
     *     forEach(document.querySelectorAll('li'), function (index, value) { console.log(index, value); });
     *
     * @param {Array, Function, Scope}
     */
    forEach: function (array, callback, scope) {
        for (var i = 0, len = array.length; i < len; i++) {
            callback.call(scope, i, array[i]);
        }
    }
};
},{}]},{},["./dev/js/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jbGF1ZGl1bGltYmFuL1dvcmsvZ2xvYmFsX25ld3MvZ2l0X2Zyb250X2VuZC9zaXRlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuL2Rldi9qcy9hcHAuanMiLCIvVXNlcnMvY2xhdWRpdWxpbWJhbi9Xb3JrL2dsb2JhbF9uZXdzL2dpdF9mcm9udF9lbmQvc2l0ZS9kZXYvanMvZmlsdGVycy5qcyIsIi9Vc2Vycy9jbGF1ZGl1bGltYmFuL1dvcmsvZ2xvYmFsX25ld3MvZ2l0X2Zyb250X2VuZC9zaXRlL2Rldi9qcy9oZWFkZXIuanMiLCIvVXNlcnMvY2xhdWRpdWxpbWJhbi9Xb3JrL2dsb2JhbF9uZXdzL2dpdF9mcm9udF9lbmQvc2l0ZS9kZXYvanMvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiEjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNcbiMgICAgICBieSBDbGF1ZGl1IExpbWJhbiAgICAgICAjXG4jICBodHRwOi8vc29mdXhyby5lbGFuY2UuY29tICAgI1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cblxudmFyIHV0aWwgICAgPSByZXF1aXJlKCcuL3V0aWwuanMnKSwgICAgLy8gQSB1dGlsaXR5IG9iamVjdCBoZWxwaW5nIHdpdGggdmFuaWxsYSBqYXZhc2NyaXB0ICh0cnlpbmcgdG8gbWltaWMgalF1ZXJ5KVxuICAgIGZpbHRlcnMgPSByZXF1aXJlKCcuL2ZpbHRlcnMuanMnKSwgLy8gZmlsdGVyaW5nIHRoZSBuZXdzXG4gICAgaGVhZGVyICA9IHJlcXVpcmUoJy4vaGVhZGVyLmpzJyk7ICAvLyBIZWFkIGFuZCBIZWFkZXIgZnVuY3Rpb25hbGl0eVxuXG5cbi8qKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiogV2hlcmUgZXZlcnl0aGluZyBoYXBwZW5zXG4gKi9cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8qKlxuICAgICogSGVhZCBhbmQgSGVhZGVyIGZ1bmN0aW9uYWxpdHlcbiAgICAgKi9cbiAgICBoZWFkZXIoKTtcblxuXG4gICAgLyoqXG4gICAgKiBHbyB1cCAoZnJvbSB0aGUgZm9vdGVyKVxuICAgICAqL1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvb3RlciBbZGF0YS1yb2xlPVwiZ29fdXBcIl0nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeydzY3JvbGxUb3AnOiAnMHB4J30sIDUwMCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuXG4gICAgLyoqXG4gICAgKiBCb290c3RyYXAgdG9vbHRpcFxuICAgICAqL1xuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XG5cblxuICAgIC8qKlxuICAgICogRmlsdGVyaW5nIG5ld3NcbiAgICAgKi9cbiAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3c193cmFwcGVyJykpIHtcbiAgICAgICAgZmlsdGVycygpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgKiBGaWx0ZXJpbmcgbmV3c1xuICAgICAqL1xuICAgIHV0aWwuZm9yRWFjaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubmV3cycpLCBmdW5jdGlvbihpbmRleCwgZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdoMiBhJykuaHJlZjtcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgIH0pO1xuXG5cbiAgICAvKipcbiAgICAqIEluZGl2aWR1YWwgYXJ0aWNsZVxuICAgICAqL1xuICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcnRpY2xlJykpIHtcbiAgICAgICAgdmFyIGhlaWdodCA9IHtcbiAgICAgICAgICAgIHc6IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgICAgICAgIGg6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHkgPiBoZWFkZXInKS5vZmZzZXRIZWlnaHQsXG4gICAgICAgICAgICBmOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5ID4gZm9vdGVyJykub2Zmc2V0SGVpZ2h0XG4gICAgICAgIH07XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFydGljbGUnKS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQudyAtIGhlaWdodC5oIC0gaGVpZ2h0LmYgLSA2ICsgJ3B4JztcbiAgICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuKiBBIHV0aWxpdHkgb2JqZWN0IGhlbHBpbmcgd2l0aCB2YW5pbGxhIGphdmFzY3JpcHQgKHRyeWluZyB0byBtaW1pYyBqUXVlcnkpXG4gKi9cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsLmpzJyk7XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBuZXdzX3dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3c193cmFwcGVyJyksXG4gICAgICAgIGFsbF9uZXdzICAgICA9IG5ld3Nfd3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCcubmV3cycpLFxuXG4gICAgICAgIC8vIHRoZSBmYWxsb3dpbmcgYXJlIHVzZWQgZm9yIGpzX2RhdGVcbiAgICAgICAgZGF0ZSAgICAgICAgICAgICA9IG5ldyBEYXRlKCksXG4gICAgICAgIGRheSAgICAgICAgICAgICAgPSBkYXRlLmdldERhdGUoKSxcbiAgICAgICAgbW9udGggICAgICAgICAgICA9IGRhdGUuZ2V0TW9udGgoKSArIDEsIC8vSmFudXJheSBpcyAwXG4gICAgICAgIHllYXIgICAgICAgICAgICAgPSBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgIGZvcm1hdF90b2RheSAgICAgPSBkYXkgKyAnLicgKyAobW9udGggPCAxMCA/ICcwJyArIG1vbnRoIDogbW9udGgpICsgJy4nICsgeWVhcixcbiAgICAgICAgZm9ybWF0X3llc3RlcmRheSA9IChkYXkgLSAxKSArICcuJyArIChtb250aCA8IDEwID8gJzAnICsgbW9udGggOiBtb250aCkgKyAnLicgKyB5ZWFyLFxuXG4gICAgICAgIC8vIGZpbHRlciB2YXJpYWJsZXNcbiAgICAgICAgdmFyX2RhdGUgID0gJycsXG4gICAgICAgIHZhcl9tZWRpYSA9ICcnLFxuXG4gICAgICAgIC8vIGZ1bmN0aW9uIGZvciBzaG93aW5nIGhpZGRpbmcgdGhlIHByb3BlciBuZXdzXG4gICAgICAgIHRvZ2dsZV9uZXdzICA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gaWYgd2UgbmVlZCB0byBoaWRlIHNvbWV0aGluZyB3ZSBmaXJzdCBzZXQgdGhlbSBBTEwgdG8gYmxvY2tcbiAgICAgICAgICAgIG5ld3Nfd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdlbXB0eScpO1xuICAgICAgICAgICAgdXRpbC5mb3JFYWNoKGFsbF9uZXdzLCBmdW5jdGlvbihpbmRleCwgZWwpIHtcbiAgICAgICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHdlIHNob3cgb25seSB0aGUgb25lcyB0aGF0IGZ1bGZpbGwgdGhlIGZpbHRlciBjcml0ZXJpYVxuICAgICAgICAgICAgdXRpbC5mb3JFYWNoKG5ld3Nfd3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCcubmV3cycgKyB2YXJfZGF0ZSArIHZhcl9tZWRpYSksIGZ1bmN0aW9uKGluZGV4LCBlbCkge1xuICAgICAgICAgICAgICAgIG5ld3Nfd3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdlbXB0eScpO1xuICAgICAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cblxuICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19kYXRlJykpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX2RhdGUgLmRyb3Bkb3duLW1lbnUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmKGUudGFyZ2V0ICYmIGUudGFyZ2V0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdhJykge1xuICAgICAgICAgICAgICAgIGlmKGUudGFyZ2V0LmRhdGFzZXQudmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhcl9kYXRlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19kYXRlID4gYnV0dG9uIC50ZXh0JykuaW5uZXJIVE1MID0gJ0Nob29zZSBhIGRhdGUnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhcl9kYXRlID0gJ1tkYXRhLXJhdy1kYXRlPVwiJyArICBlLnRhcmdldC5kYXRhc2V0LnZhbHVlICsgJ1wiXSc7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19kYXRlID4gYnV0dG9uIC50ZXh0JykuaW5uZXJIVE1MID0gZS50YXJnZXQuZGF0YXNldC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG9nZ2xlX25ld3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSAvLyBlbmQgb2YganNfZGF0ZVxuXG4gICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX21lZGlhJykpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX21lZGlhIC5kcm9wZG93bi1tZW51JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZihlLnRhcmdldCAmJiBlLnRhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYScpIHtcbiAgICAgICAgICAgICAgICBpZihlLnRhcmdldC5kYXRhc2V0LnZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICB2YXJfbWVkaWEgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX21lZGlhID4gYnV0dG9uIC50ZXh0JykuaW5uZXJIVE1MID0gJ0Nob29zZSBhIG1lZGlhJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXJfbWVkaWEgPSAnW2RhdGEtcmF3LW1lZGlhPVwiJyArICBlLnRhcmdldC5kYXRhc2V0LnZhbHVlICsgJ1wiXSc7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19tZWRpYSA+IGJ1dHRvbiAudGV4dCcpLmlubmVySFRNTCA9IGUudGFyZ2V0LmRhdGFzZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvZ2dsZV9uZXdzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gLy8gZW5kIG9mIGpzX21lZGlhXG59OyIsIid1c2Ugc3RyaWN0JztcblxuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbC5qcycpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgLyoqXG4gICAgKiBBZGRpbmcgRm9udCBBd2Vzb21lIGFuZCBtb3N0IHVzZWQgZ29vZ2xlIGZvbnQgT3BlbiBTYW5zXG4gICAgICovXG4gICAgdXRpbC5leHRyYV9zdHlsZSgnaHR0cDovL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2ZvbnQtYXdlc29tZS80LjAuMy9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnKTtcbiAgICB1dGlsLmV4dHJhX3N0eWxlKCdodHRwOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1PcGVuK1NhbnMnKTtcblxuXG4gICAgLyoqXG4gICAgKiBNZW51IHNob3dpbmcgLyBoaWRkaW5nIG9uIHNtYWxsIHNjcmVlbnMgKDw3NjhweCkgLSBpbiBhZGRpdGlvbiB3aXRoIHRoZSBjc3NcbiAgICAgKiBhbmQgYSBzdGFuZGFyZCBodG1sIHN0cnVjdHVyZSAobmF2ID4gYnV0dG9uICsgYSpuKVxuICAgICAqL1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJvbGU9XCJtYWluX21lbnVcIl0gYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRoaXMucGFyZW50Tm9kZS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xufSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICAvKipcbiAgICAqIEdldHRpbmcgdGhlIG9mZnNldCBvZiBhIERPTSBlbGVtZW50XG4gICAgICpcbiAgICAgKiAjIyMgRXhhbXBsZXM6XG4gICAgICpcbiAgICAgKiAgICAgdXRpbC5vZmZzZXQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm15X2VsZW1lbnQnKSk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZG9tIGVsZW1lbnQgKG5vdCBqcXVlcnkgZWxlbWVudClcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGEgdG9wIC8gbGVmdCBvYmplY3RcbiAgICAgKi9cbiAgICBvZmZzZXQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICB2YXIgdG9wICA9IDAsXG4gICAgICAgICAgICBsZWZ0ID0gMDtcblxuICAgICAgICBpZihvYmoub2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgdG9wICArPSBvYmoub2Zmc2V0VG9wO1xuICAgICAgICAgICAgICAgIGxlZnQgKz0gb2JqLm9mZnNldExlZnQ7XG4gICAgICAgICAgICB9IHdoaWxlIChvYmogPSBvYmoub2Zmc2V0UGFyZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyB0b3A6IHRvcCwgbGVmdDogbGVmdCB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAqIEFkZGluZyBkeW5hbWljYWxseSBhIG5ldyBleHRlcm5hbCBzdHlsZSBpbnRvIHRoZSBodG1sXG4gICAgICpcbiAgICAgKiAjIyMgRXhhbXBsZXM6XG4gICAgICpcbiAgICAgKiAgICAgdXRpbC5leHRyYV9zdHlsZSgnaHR0cDovL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2ZvbnQtYXdlc29tZS80LjAuMy9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnKTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0aGUgYWN0dWFsIHVybCAobG9jYWwgb3IgaHR0cClcbiAgICAgKi9cbiAgICBleHRyYV9zdHlsZTogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHZhciBsaW5rX2NzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG4gICAgICAgIGxpbmtfY3NzLnNldEF0dHJpYnV0ZShcInJlbFwiLCBcInN0eWxlc2hlZXRcIik7XG4gICAgICAgIGxpbmtfY3NzLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgdXJsKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKGxpbmtfY3NzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiBMb29waW5nIHRocm91Z2ggRE9NIE5vZGVMaXN0XG4gICAgICpcbiAgICAgKiAjIyMgRXhhbXBsZXM6XG4gICAgICpcbiAgICAgKiAgICAgZm9yRWFjaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLCBmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7IGNvbnNvbGUubG9nKGluZGV4LCB2YWx1ZSk7IH0pO1xuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheSwgRnVuY3Rpb24sIFNjb3BlfVxuICAgICAqL1xuICAgIGZvckVhY2g6IGZ1bmN0aW9uIChhcnJheSwgY2FsbGJhY2ssIHNjb3BlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzY29wZSwgaSwgYXJyYXlbaV0pO1xuICAgICAgICB9XG4gICAgfVxufTsiXX0=
