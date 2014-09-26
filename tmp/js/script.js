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
    filters.init();


    /**
    * Filtering news
     */
    util.forEach(document.querySelectorAll('.news'), function(index, element) {
        element.addEventListener('click', function(e) {
            window.location = e.target.querySelector('h2 a').href;
        }, false);
    });
});
},{"./filters.js":"/Users/claudiulimban/Work/global_news/git_front_end/site/dev/js/filters.js","./header.js":"/Users/claudiulimban/Work/global_news/git_front_end/site/dev/js/header.js","./util.js":"/Users/claudiulimban/Work/global_news/git_front_end/site/dev/js/util.js"}],"/Users/claudiulimban/Work/global_news/git_front_end/site/dev/js/filters.js":[function(require,module,exports){
'use strict';

/**
* A utility object helping with vanilla javascript (trying to mimic jQuery)
 */
var util = require('./util.js');



module.exports = {
    init: function() {
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
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jbGF1ZGl1bGltYmFuL1dvcmsvZ2xvYmFsX25ld3MvZ2l0X2Zyb250X2VuZC9zaXRlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuL2Rldi9qcy9hcHAuanMiLCIvVXNlcnMvY2xhdWRpdWxpbWJhbi9Xb3JrL2dsb2JhbF9uZXdzL2dpdF9mcm9udF9lbmQvc2l0ZS9kZXYvanMvZmlsdGVycy5qcyIsIi9Vc2Vycy9jbGF1ZGl1bGltYmFuL1dvcmsvZ2xvYmFsX25ld3MvZ2l0X2Zyb250X2VuZC9zaXRlL2Rldi9qcy9oZWFkZXIuanMiLCIvVXNlcnMvY2xhdWRpdWxpbWJhbi9Xb3JrL2dsb2JhbF9uZXdzL2dpdF9mcm9udF9lbmQvc2l0ZS9kZXYvanMvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyohIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXG4jICAgICAgYnkgQ2xhdWRpdSBMaW1iYW4gICAgICAgI1xuIyAgaHR0cDovL3NvZnV4cm8uZWxhbmNlLmNvbSAgICNcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciB1dGlsICAgID0gcmVxdWlyZSgnLi91dGlsLmpzJyksICAgIC8vIEEgdXRpbGl0eSBvYmplY3QgaGVscGluZyB3aXRoIHZhbmlsbGEgamF2YXNjcmlwdCAodHJ5aW5nIHRvIG1pbWljIGpRdWVyeSlcbiAgICBmaWx0ZXJzID0gcmVxdWlyZSgnLi9maWx0ZXJzLmpzJyksIC8vIGZpbHRlcmluZyB0aGUgbmV3c1xuICAgIGhlYWRlciAgPSByZXF1aXJlKCcuL2hlYWRlci5qcycpOyAgLy8gSGVhZCBhbmQgSGVhZGVyIGZ1bmN0aW9uYWxpdHlcblxuXG4vKiogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4qIFdoZXJlIGV2ZXJ5dGhpbmcgaGFwcGVuc1xuICovXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcbiAgICAvKipcbiAgICAqIEhlYWQgYW5kIEhlYWRlciBmdW5jdGlvbmFsaXR5XG4gICAgICovXG4gICAgaGVhZGVyKCk7XG5cblxuICAgIC8qKlxuICAgICogR28gdXAgKGZyb20gdGhlIGZvb3RlcilcbiAgICAgKi9cblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvb3RlciBbZGF0YS1yb2xlPVwiZ29fdXBcIl0nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeydzY3JvbGxUb3AnOiAnMHB4J30sIDUwMCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuXG4gICAgLyoqXG4gICAgKiBCb290c3RyYXAgdG9vbHRpcFxuICAgICAqL1xuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XG5cblxuICAgIC8qKlxuICAgICogRmlsdGVyaW5nIG5ld3NcbiAgICAgKi9cbiAgICBmaWx0ZXJzLmluaXQoKTtcblxuXG4gICAgLyoqXG4gICAgKiBGaWx0ZXJpbmcgbmV3c1xuICAgICAqL1xuICAgIHV0aWwuZm9yRWFjaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubmV3cycpLCBmdW5jdGlvbihpbmRleCwgZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gZS50YXJnZXQucXVlcnlTZWxlY3RvcignaDIgYScpLmhyZWY7XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICB9KTtcbn0pOyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4qIEEgdXRpbGl0eSBvYmplY3QgaGVscGluZyB3aXRoIHZhbmlsbGEgamF2YXNjcmlwdCAodHJ5aW5nIHRvIG1pbWljIGpRdWVyeSlcbiAqL1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwuanMnKTtcblxuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbmV3c193cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ld3Nfd3JhcHBlcicpLFxuICAgICAgICAgICAgYWxsX25ld3MgICAgID0gbmV3c193cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5uZXdzJyksXG5cbiAgICAgICAgICAgIC8vIHRoZSBmYWxsb3dpbmcgYXJlIHVzZWQgZm9yIGpzX2RhdGVcbiAgICAgICAgICAgIGRhdGUgICAgICAgICAgICAgPSBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgZGF5ICAgICAgICAgICAgICA9IGRhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICAgICAgbW9udGggICAgICAgICAgICA9IGRhdGUuZ2V0TW9udGgoKSArIDEsIC8vSmFudXJheSBpcyAwXG4gICAgICAgICAgICB5ZWFyICAgICAgICAgICAgID0gZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgZm9ybWF0X3RvZGF5ICAgICA9IGRheSArICcuJyArIChtb250aCA8IDEwID8gJzAnICsgbW9udGggOiBtb250aCkgKyAnLicgKyB5ZWFyLFxuICAgICAgICAgICAgZm9ybWF0X3llc3RlcmRheSA9IChkYXkgLSAxKSArICcuJyArIChtb250aCA8IDEwID8gJzAnICsgbW9udGggOiBtb250aCkgKyAnLicgKyB5ZWFyLFxuXG4gICAgICAgICAgICAvLyBmaWx0ZXIgdmFyaWFibGVzXG4gICAgICAgICAgICB2YXJfZGF0ZSAgPSAnJyxcbiAgICAgICAgICAgIHZhcl9tZWRpYSA9ICcnLFxuXG4gICAgICAgICAgICAvLyBmdW5jdGlvbiBmb3Igc2hvd2luZyBoaWRkaW5nIHRoZSBwcm9wZXIgbmV3c1xuICAgICAgICAgICAgdG9nZ2xlX25ld3MgID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgd2UgbmVlZCB0byBoaWRlIHNvbWV0aGluZyB3ZSBmaXJzdCBzZXQgdGhlbSBBTEwgdG8gYmxvY2tcbiAgICAgICAgICAgICAgICBuZXdzX3dyYXBwZXIuY2xhc3NMaXN0LmFkZCgnZW1wdHknKTtcbiAgICAgICAgICAgICAgICB1dGlsLmZvckVhY2goYWxsX25ld3MsIGZ1bmN0aW9uKGluZGV4LCBlbCkge1xuICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gd2Ugc2hvdyBvbmx5IHRoZSBvbmVzIHRoYXQgZnVsZmlsbCB0aGUgZmlsdGVyIGNyaXRlcmlhXG4gICAgICAgICAgICAgICAgdXRpbC5mb3JFYWNoKG5ld3Nfd3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCcubmV3cycgKyB2YXJfZGF0ZSArIHZhcl9tZWRpYSksIGZ1bmN0aW9uKGluZGV4LCBlbCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdzX3dyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnZW1wdHknKTtcbiAgICAgICAgICAgICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX2RhdGUnKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX2RhdGUgLmRyb3Bkb3duLW1lbnUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBpZihlLnRhcmdldCAmJiBlLnRhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYScpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoZS50YXJnZXQuZGF0YXNldC52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcl9kYXRlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanNfZGF0ZSA+IGJ1dHRvbiAudGV4dCcpLmlubmVySFRNTCA9ICdDaG9vc2UgYSBkYXRlJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcl9kYXRlID0gJ1tkYXRhLXJhdy1kYXRlPVwiJyArICBlLnRhcmdldC5kYXRhc2V0LnZhbHVlICsgJ1wiXSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanNfZGF0ZSA+IGJ1dHRvbiAudGV4dCcpLmlubmVySFRNTCA9IGUudGFyZ2V0LmRhdGFzZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlX25ld3MoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSAvLyBlbmQgb2YganNfZGF0ZVxuXG4gICAgICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19tZWRpYScpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanNfbWVkaWEgLmRyb3Bkb3duLW1lbnUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBpZihlLnRhcmdldCAmJiBlLnRhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYScpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoZS50YXJnZXQuZGF0YXNldC52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcl9tZWRpYSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX21lZGlhID4gYnV0dG9uIC50ZXh0JykuaW5uZXJIVE1MID0gJ0Nob29zZSBhIG1lZGlhJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcl9tZWRpYSA9ICdbZGF0YS1yYXctbWVkaWE9XCInICsgIGUudGFyZ2V0LmRhdGFzZXQudmFsdWUgKyAnXCJdJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19tZWRpYSA+IGJ1dHRvbiAudGV4dCcpLmlubmVySFRNTCA9IGUudGFyZ2V0LmRhdGFzZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlX25ld3MoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSAvLyBlbmQgb2YganNfbWVkaWFcbiAgICB9XG59OyIsIid1c2Ugc3RyaWN0JztcblxuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbC5qcycpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgLyoqXG4gICAgKiBBZGRpbmcgRm9udCBBd2Vzb21lIGFuZCBtb3N0IHVzZWQgZ29vZ2xlIGZvbnQgT3BlbiBTYW5zXG4gICAgICovXG4gICAgdXRpbC5leHRyYV9zdHlsZSgnaHR0cDovL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2ZvbnQtYXdlc29tZS80LjAuMy9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnKTtcbiAgICB1dGlsLmV4dHJhX3N0eWxlKCdodHRwOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1PcGVuK1NhbnMnKTtcblxuXG4gICAgLyoqXG4gICAgKiBNZW51IHNob3dpbmcgLyBoaWRkaW5nIG9uIHNtYWxsIHNjcmVlbnMgKDw3NjhweCkgLSBpbiBhZGRpdGlvbiB3aXRoIHRoZSBjc3NcbiAgICAgKiBhbmQgYSBzdGFuZGFyZCBodG1sIHN0cnVjdHVyZSAobmF2ID4gYnV0dG9uICsgYSpuKVxuICAgICAqL1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJvbGU9XCJtYWluX21lbnVcIl0gYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRoaXMucGFyZW50Tm9kZS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xufSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICAvKipcbiAgICAqIEdldHRpbmcgdGhlIG9mZnNldCBvZiBhIERPTSBlbGVtZW50XG4gICAgICpcbiAgICAgKiAjIyMgRXhhbXBsZXM6XG4gICAgICpcbiAgICAgKiAgICAgdXRpbC5vZmZzZXQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm15X2VsZW1lbnQnKSk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZG9tIGVsZW1lbnQgKG5vdCBqcXVlcnkgZWxlbWVudClcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGEgdG9wIC8gbGVmdCBvYmplY3RcbiAgICAgKi9cbiAgICBvZmZzZXQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICB2YXIgdG9wICA9IDAsXG4gICAgICAgICAgICBsZWZ0ID0gMDtcblxuICAgICAgICBpZihvYmoub2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgdG9wICArPSBvYmoub2Zmc2V0VG9wO1xuICAgICAgICAgICAgICAgIGxlZnQgKz0gb2JqLm9mZnNldExlZnQ7XG4gICAgICAgICAgICB9IHdoaWxlIChvYmogPSBvYmoub2Zmc2V0UGFyZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyB0b3A6IHRvcCwgbGVmdDogbGVmdCB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAqIEFkZGluZyBkeW5hbWljYWxseSBhIG5ldyBleHRlcm5hbCBzdHlsZSBpbnRvIHRoZSBodG1sXG4gICAgICpcbiAgICAgKiAjIyMgRXhhbXBsZXM6XG4gICAgICpcbiAgICAgKiAgICAgdXRpbC5leHRyYV9zdHlsZSgnaHR0cDovL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2ZvbnQtYXdlc29tZS80LjAuMy9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnKTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0aGUgYWN0dWFsIHVybCAobG9jYWwgb3IgaHR0cClcbiAgICAgKi9cbiAgICBleHRyYV9zdHlsZTogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHZhciBsaW5rX2NzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG4gICAgICAgIGxpbmtfY3NzLnNldEF0dHJpYnV0ZShcInJlbFwiLCBcInN0eWxlc2hlZXRcIik7XG4gICAgICAgIGxpbmtfY3NzLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgdXJsKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKGxpbmtfY3NzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiBMb29waW5nIHRocm91Z2ggRE9NIE5vZGVMaXN0XG4gICAgICpcbiAgICAgKiAjIyMgRXhhbXBsZXM6XG4gICAgICpcbiAgICAgKiAgICAgZm9yRWFjaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLCBmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7IGNvbnNvbGUubG9nKGluZGV4LCB2YWx1ZSk7IH0pO1xuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheSwgRnVuY3Rpb24sIFNjb3BlfVxuICAgICAqL1xuICAgIGZvckVhY2g6IGZ1bmN0aW9uIChhcnJheSwgY2FsbGJhY2ssIHNjb3BlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzY29wZSwgaSwgYXJyYXlbaV0pO1xuICAgICAgICB9XG4gICAgfVxufTsiXX0=
