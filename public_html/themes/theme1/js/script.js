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
            window.location = e.target.querySelector('h2 a').href;
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

        document.querySelector('.article').style.height = height.w - height.h - height.f - 5 + 'px';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jbGF1ZGl1bGltYmFuL1dvcmsvZ2xvYmFsX25ld3MvZ2l0X2Zyb250X2VuZC9zaXRlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuL2Rldi9qcy9hcHAuanMiLCIvVXNlcnMvY2xhdWRpdWxpbWJhbi9Xb3JrL2dsb2JhbF9uZXdzL2dpdF9mcm9udF9lbmQvc2l0ZS9kZXYvanMvZmlsdGVycy5qcyIsIi9Vc2Vycy9jbGF1ZGl1bGltYmFuL1dvcmsvZ2xvYmFsX25ld3MvZ2l0X2Zyb250X2VuZC9zaXRlL2Rldi9qcy9oZWFkZXIuanMiLCIvVXNlcnMvY2xhdWRpdWxpbWJhbi9Xb3JrL2dsb2JhbF9uZXdzL2dpdF9mcm9udF9lbmQvc2l0ZS9kZXYvanMvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiEjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNcbiMgICAgICBieSBDbGF1ZGl1IExpbWJhbiAgICAgICAjXG4jICBodHRwOi8vc29mdXhyby5lbGFuY2UuY29tICAgI1xuIyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cblxudmFyIHV0aWwgICAgPSByZXF1aXJlKCcuL3V0aWwuanMnKSwgICAgLy8gQSB1dGlsaXR5IG9iamVjdCBoZWxwaW5nIHdpdGggdmFuaWxsYSBqYXZhc2NyaXB0ICh0cnlpbmcgdG8gbWltaWMgalF1ZXJ5KVxuICAgIGZpbHRlcnMgPSByZXF1aXJlKCcuL2ZpbHRlcnMuanMnKSwgLy8gZmlsdGVyaW5nIHRoZSBuZXdzXG4gICAgaGVhZGVyICA9IHJlcXVpcmUoJy4vaGVhZGVyLmpzJyk7ICAvLyBIZWFkIGFuZCBIZWFkZXIgZnVuY3Rpb25hbGl0eVxuXG5cbi8qKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiogV2hlcmUgZXZlcnl0aGluZyBoYXBwZW5zXG4gKi9cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8qKlxuICAgICogSGVhZCBhbmQgSGVhZGVyIGZ1bmN0aW9uYWxpdHlcbiAgICAgKi9cbiAgICBoZWFkZXIoKTtcblxuXG4gICAgLyoqXG4gICAgKiBHbyB1cCAoZnJvbSB0aGUgZm9vdGVyKVxuICAgICAqL1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvb3RlciBbZGF0YS1yb2xlPVwiZ29fdXBcIl0nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeydzY3JvbGxUb3AnOiAnMHB4J30sIDUwMCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuXG4gICAgLyoqXG4gICAgKiBCb290c3RyYXAgdG9vbHRpcFxuICAgICAqL1xuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XG5cblxuICAgIC8qKlxuICAgICogRmlsdGVyaW5nIG5ld3NcbiAgICAgKi9cbiAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3c193cmFwcGVyJykpIHtcbiAgICAgICAgZmlsdGVycygpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgKiBGaWx0ZXJpbmcgbmV3c1xuICAgICAqL1xuICAgIHV0aWwuZm9yRWFjaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubmV3cycpLCBmdW5jdGlvbihpbmRleCwgZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gZS50YXJnZXQucXVlcnlTZWxlY3RvcignaDIgYScpLmhyZWY7XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICB9KTtcblxuXG4gICAgLyoqXG4gICAgKiBJbmRpdmlkdWFsIGFydGljbGVcbiAgICAgKi9cbiAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXJ0aWNsZScpKSB7XG4gICAgICAgIHZhciBoZWlnaHQgPSB7XG4gICAgICAgICAgICB3OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgICAgICAgICBoOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5ID4gaGVhZGVyJykub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgZjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keSA+IGZvb3RlcicpLm9mZnNldEhlaWdodFxuICAgICAgICB9O1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcnRpY2xlJykuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0LncgLSBoZWlnaHQuaCAtIGhlaWdodC5mIC0gNSArICdweCc7XG4gICAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiogQSB1dGlsaXR5IG9iamVjdCBoZWxwaW5nIHdpdGggdmFuaWxsYSBqYXZhc2NyaXB0ICh0cnlpbmcgdG8gbWltaWMgalF1ZXJ5KVxuICovXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbC5qcycpO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbmV3c193cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ld3Nfd3JhcHBlcicpLFxuICAgICAgICBhbGxfbmV3cyAgICAgPSBuZXdzX3dyYXBwZXIucXVlcnlTZWxlY3RvckFsbCgnLm5ld3MnKSxcblxuICAgICAgICAvLyB0aGUgZmFsbG93aW5nIGFyZSB1c2VkIGZvciBqc19kYXRlXG4gICAgICAgIGRhdGUgICAgICAgICAgICAgPSBuZXcgRGF0ZSgpLFxuICAgICAgICBkYXkgICAgICAgICAgICAgID0gZGF0ZS5nZXREYXRlKCksXG4gICAgICAgIG1vbnRoICAgICAgICAgICAgPSBkYXRlLmdldE1vbnRoKCkgKyAxLCAvL0phbnVyYXkgaXMgMFxuICAgICAgICB5ZWFyICAgICAgICAgICAgID0gZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICBmb3JtYXRfdG9kYXkgICAgID0gZGF5ICsgJy4nICsgKG1vbnRoIDwgMTAgPyAnMCcgKyBtb250aCA6IG1vbnRoKSArICcuJyArIHllYXIsXG4gICAgICAgIGZvcm1hdF95ZXN0ZXJkYXkgPSAoZGF5IC0gMSkgKyAnLicgKyAobW9udGggPCAxMCA/ICcwJyArIG1vbnRoIDogbW9udGgpICsgJy4nICsgeWVhcixcblxuICAgICAgICAvLyBmaWx0ZXIgdmFyaWFibGVzXG4gICAgICAgIHZhcl9kYXRlICA9ICcnLFxuICAgICAgICB2YXJfbWVkaWEgPSAnJyxcblxuICAgICAgICAvLyBmdW5jdGlvbiBmb3Igc2hvd2luZyBoaWRkaW5nIHRoZSBwcm9wZXIgbmV3c1xuICAgICAgICB0b2dnbGVfbmV3cyAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIGlmIHdlIG5lZWQgdG8gaGlkZSBzb21ldGhpbmcgd2UgZmlyc3Qgc2V0IHRoZW0gQUxMIHRvIGJsb2NrXG4gICAgICAgICAgICBuZXdzX3dyYXBwZXIuY2xhc3NMaXN0LmFkZCgnZW1wdHknKTtcbiAgICAgICAgICAgIHV0aWwuZm9yRWFjaChhbGxfbmV3cywgZnVuY3Rpb24oaW5kZXgsIGVsKSB7XG4gICAgICAgICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyB3ZSBzaG93IG9ubHkgdGhlIG9uZXMgdGhhdCBmdWxmaWxsIHRoZSBmaWx0ZXIgY3JpdGVyaWFcbiAgICAgICAgICAgIHV0aWwuZm9yRWFjaChuZXdzX3dyYXBwZXIucXVlcnlTZWxlY3RvckFsbCgnLm5ld3MnICsgdmFyX2RhdGUgKyB2YXJfbWVkaWEpLCBmdW5jdGlvbihpbmRleCwgZWwpIHtcbiAgICAgICAgICAgICAgICBuZXdzX3dyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnZW1wdHknKTtcbiAgICAgICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG5cbiAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanNfZGF0ZScpKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19kYXRlIC5kcm9wZG93bi1tZW51JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZihlLnRhcmdldCAmJiBlLnRhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYScpIHtcbiAgICAgICAgICAgICAgICBpZihlLnRhcmdldC5kYXRhc2V0LnZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICB2YXJfZGF0ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanNfZGF0ZSA+IGJ1dHRvbiAudGV4dCcpLmlubmVySFRNTCA9ICdDaG9vc2UgYSBkYXRlJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXJfZGF0ZSA9ICdbZGF0YS1yYXctZGF0ZT1cIicgKyAgZS50YXJnZXQuZGF0YXNldC52YWx1ZSArICdcIl0nO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanNfZGF0ZSA+IGJ1dHRvbiAudGV4dCcpLmlubmVySFRNTCA9IGUudGFyZ2V0LmRhdGFzZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvZ2dsZV9uZXdzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gLy8gZW5kIG9mIGpzX2RhdGVcblxuICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19tZWRpYScpKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19tZWRpYSAuZHJvcGRvd24tbWVudScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYoZS50YXJnZXQgJiYgZS50YXJnZXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2EnKSB7XG4gICAgICAgICAgICAgICAgaWYoZS50YXJnZXQuZGF0YXNldC52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyX21lZGlhID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19tZWRpYSA+IGJ1dHRvbiAudGV4dCcpLmlubmVySFRNTCA9ICdDaG9vc2UgYSBtZWRpYSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyX21lZGlhID0gJ1tkYXRhLXJhdy1tZWRpYT1cIicgKyAgZS50YXJnZXQuZGF0YXNldC52YWx1ZSArICdcIl0nO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanNfbWVkaWEgPiBidXR0b24gLnRleHQnKS5pbm5lckhUTUwgPSBlLnRhcmdldC5kYXRhc2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0b2dnbGVfbmV3cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9IC8vIGVuZCBvZiBqc19tZWRpYVxufTsiLCIndXNlIHN0cmljdCc7XG5cblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwuanMnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIC8qKlxuICAgICogQWRkaW5nIEZvbnQgQXdlc29tZSBhbmQgbW9zdCB1c2VkIGdvb2dsZSBmb250IE9wZW4gU2Fuc1xuICAgICAqL1xuICAgIHV0aWwuZXh0cmFfc3R5bGUoJ2h0dHA6Ly9uZXRkbmEuYm9vdHN0cmFwY2RuLmNvbS9mb250LWF3ZXNvbWUvNC4wLjMvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzJyk7XG4gICAgdXRpbC5leHRyYV9zdHlsZSgnaHR0cDovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9T3BlbitTYW5zJyk7XG5cblxuICAgIC8qKlxuICAgICogTWVudSBzaG93aW5nIC8gaGlkZGluZyBvbiBzbWFsbCBzY3JlZW5zICg8NzY4cHgpIC0gaW4gYWRkaXRpb24gd2l0aCB0aGUgY3NzXG4gICAgICogYW5kIGEgc3RhbmRhcmQgaHRtbCBzdHJ1Y3R1cmUgKG5hdiA+IGJ1dHRvbiArIGEqbilcbiAgICAgKi9cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yb2xlPVwibWFpbl9tZW51XCJdIGJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLnBhcmVudE5vZGUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgLyoqXG4gICAgKiBHZXR0aW5nIHRoZSBvZmZzZXQgb2YgYSBET00gZWxlbWVudFxuICAgICAqXG4gICAgICogIyMjIEV4YW1wbGVzOlxuICAgICAqXG4gICAgICogICAgIHV0aWwub2Zmc2V0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5teV9lbGVtZW50JykpO1xuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRvbSBlbGVtZW50IChub3QganF1ZXJ5IGVsZW1lbnQpXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBhIHRvcCAvIGxlZnQgb2JqZWN0XG4gICAgICovXG4gICAgb2Zmc2V0OiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgdmFyIHRvcCAgPSAwLFxuICAgICAgICAgICAgbGVmdCA9IDA7XG5cbiAgICAgICAgaWYob2JqLm9mZnNldFBhcmVudCkge1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIHRvcCAgKz0gb2JqLm9mZnNldFRvcDtcbiAgICAgICAgICAgICAgICBsZWZ0ICs9IG9iai5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgfSB3aGlsZSAob2JqID0gb2JqLm9mZnNldFBhcmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgdG9wOiB0b3AsIGxlZnQ6IGxlZnQgfTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiBBZGRpbmcgZHluYW1pY2FsbHkgYSBuZXcgZXh0ZXJuYWwgc3R5bGUgaW50byB0aGUgaHRtbFxuICAgICAqXG4gICAgICogIyMjIEV4YW1wbGVzOlxuICAgICAqXG4gICAgICogICAgIHV0aWwuZXh0cmFfc3R5bGUoJ2h0dHA6Ly9uZXRkbmEuYm9vdHN0cmFwY2RuLmNvbS9mb250LWF3ZXNvbWUvNC4wLjMvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzJyk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdGhlIGFjdHVhbCB1cmwgKGxvY2FsIG9yIGh0dHApXG4gICAgICovXG4gICAgZXh0cmFfc3R5bGU6IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICB2YXIgbGlua19jc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuICAgICAgICBsaW5rX2Nzcy5zZXRBdHRyaWJ1dGUoXCJyZWxcIiwgXCJzdHlsZXNoZWV0XCIpO1xuICAgICAgICBsaW5rX2Nzcy5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHVybCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChsaW5rX2Nzcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICogTG9vcGluZyB0aHJvdWdoIERPTSBOb2RlTGlzdFxuICAgICAqXG4gICAgICogIyMjIEV4YW1wbGVzOlxuICAgICAqXG4gICAgICogICAgIGZvckVhY2goZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGknKSwgZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkgeyBjb25zb2xlLmxvZyhpbmRleCwgdmFsdWUpOyB9KTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXksIEZ1bmN0aW9uLCBTY29wZX1cbiAgICAgKi9cbiAgICBmb3JFYWNoOiBmdW5jdGlvbiAoYXJyYXksIGNhbGxiYWNrLCBzY29wZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2NvcGUsIGksIGFycmF5W2ldKTtcbiAgICAgICAgfVxuICAgIH1cbn07Il19
