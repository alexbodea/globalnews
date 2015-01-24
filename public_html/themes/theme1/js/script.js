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
},{"./filters.js":"M:\\Work\\www\\projects\\coffee2news.com\\front_end\\dev\\js\\filters.js","./header.js":"M:\\Work\\www\\projects\\coffee2news.com\\front_end\\dev\\js\\header.js","./util.js":"M:\\Work\\www\\projects\\coffee2news.com\\front_end\\dev\\js\\util.js"}],"M:\\Work\\www\\projects\\coffee2news.com\\front_end\\dev\\js\\filters.js":[function(require,module,exports){
'use strict';

/**
* A utility object helping with vanilla javascript (trying to mimic jQuery)
 */
var util = require('./util.js'),
    news_wrapper = document.querySelector('.news_wrapper'),

    filter_types = [
        {name: '.js_date', value: ''},
        {name: '.js_media', value: ''}
    ],


    toggle_news  = function() {
        var filter_string = '';
        // if we need to hide something we first set them ALL to block
        news_wrapper.classList.add('empty');
        util.forEach(news_wrapper.querySelectorAll('.news'), function(index, el) {
            el.style.display = 'none';
        });

        for(var i = 0, len = filter_types.length; i < len; i++) {
            filter_string += filter_types[i].value;
        }


        // we show only the ones that fulfill the filter criteria
        util.forEach(news_wrapper.querySelectorAll('.news' + filter_string), function(index, el) {
            news_wrapper.classList.remove('empty');
            el.style.display = 'block';
        });
    },


    filter_fn = function(filter_type) {
        if(document.querySelector(filter_type.name)) {
            console.log(filter_type.name);
            document.querySelector(filter_type.name + ' .dropdown-menu').addEventListener('click', function(e) {
                var default_text = '', data_value = '', span_text = null;

                if(e.target && e.target.nodeName.toLowerCase() === 'a') {
                    span_text    = document.querySelector(filter_type.name + ' > button .text');
                    default_text = span_text.getAttribute('data-text');
                    data_value   = e.target.dataset.value;

                    if(data_value === '') {
                        filter_type.value   = '';
                        span_text.innerHTML = default_text;
                    } else {
                        filter_type.value   = '[data-raw-date="' +  data_value + '"]';
                        span_text.innerHTML = data_value;;
                    }

                    toggle_news();
                }
            });
        }
    }



module.exports = function() {
    for(var i = 0, len = filter_types.length; i < len; i++) {
        filter_fn(filter_types[i]);
    }

    /*if(document.querySelector('.js_date')) {
        document.querySelector('.js_date .dropdown-menu').addEventListener('click', function(e) {
            var value = '';

            if(e.target && e.target.nodeName.toLowerCase() === 'a') {
                default_text = document.querySelector('.js_date > button .text').getAttribute('data-text');

                if(e.target.dataset.value === '') {
                    var_date = '';
                    document.querySelector('.js_date > button .text').innerHTML = default_text;
                } else {
                    var_date = '[data-raw-date="' +  e.target.dataset.value + '"]';
                    document.querySelector('.js_date > button .text').innerHTML = default_text;
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
    } // end of js_media*/
};
},{"./util.js":"M:\\Work\\www\\projects\\coffee2news.com\\front_end\\dev\\js\\util.js"}],"M:\\Work\\www\\projects\\coffee2news.com\\front_end\\dev\\js\\header.js":[function(require,module,exports){
'use strict';


var util = require('./util.js');


module.exports = function() {
    /**
    * Adding Font Awesome and most used google font Open Sans
     */
    util.extra_style('http://netdna.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css');
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
},{"./util.js":"M:\\Work\\www\\projects\\coffee2news.com\\front_end\\dev\\js\\util.js"}],"M:\\Work\\www\\projects\\coffee2news.com\\front_end\\dev\\js\\util.js":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiLi9kZXYvanMvYXBwLmpzIiwiTTovV29yay93d3cvcHJvamVjdHMvY29mZmVlMm5ld3MuY29tL2Zyb250X2VuZC9kZXYvanMvZmlsdGVycy5qcyIsIk06L1dvcmsvd3d3L3Byb2plY3RzL2NvZmZlZTJuZXdzLmNvbS9mcm9udF9lbmQvZGV2L2pzL2hlYWRlci5qcyIsIk06L1dvcmsvd3d3L3Byb2plY3RzL2NvZmZlZTJuZXdzLmNvbS9mcm9udF9lbmQvZGV2L2pzL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyohIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXG4jICAgICAgYnkgQ2xhdWRpdSBMaW1iYW4gICAgICAgI1xuIyAgaHR0cDovL3NvZnV4cm8uZWxhbmNlLmNvbSAgICNcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciB1dGlsICAgID0gcmVxdWlyZSgnLi91dGlsLmpzJyksICAgIC8vIEEgdXRpbGl0eSBvYmplY3QgaGVscGluZyB3aXRoIHZhbmlsbGEgamF2YXNjcmlwdCAodHJ5aW5nIHRvIG1pbWljIGpRdWVyeSlcbiAgICBmaWx0ZXJzID0gcmVxdWlyZSgnLi9maWx0ZXJzLmpzJyksIC8vIGZpbHRlcmluZyB0aGUgbmV3c1xuICAgIGhlYWRlciAgPSByZXF1aXJlKCcuL2hlYWRlci5qcycpOyAgLy8gSGVhZCBhbmQgSGVhZGVyIGZ1bmN0aW9uYWxpdHlcblxuXG4vKiogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4qIFdoZXJlIGV2ZXJ5dGhpbmcgaGFwcGVuc1xuICovXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcbiAgICAvKipcbiAgICAqIEhlYWQgYW5kIEhlYWRlciBmdW5jdGlvbmFsaXR5XG4gICAgICovXG4gICAgaGVhZGVyKCk7XG5cblxuICAgIC8qKlxuICAgICogR28gdXAgKGZyb20gdGhlIGZvb3RlcilcbiAgICAgKi9cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb290ZXIgW2RhdGEtcm9sZT1cImdvX3VwXCJdJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsnc2Nyb2xsVG9wJzogJzBweCd9LCA1MDApO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cblxuICAgIC8qKlxuICAgICogQm9vdHN0cmFwIHRvb2x0aXBcbiAgICAgKi9cbiAgICAkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpO1xuXG5cbiAgICAvKipcbiAgICAqIEZpbHRlcmluZyBuZXdzXG4gICAgICovXG4gICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ld3Nfd3JhcHBlcicpKSB7XG4gICAgICAgIGZpbHRlcnMoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICogRmlsdGVyaW5nIG5ld3NcbiAgICAgKi9cbiAgICB1dGlsLmZvckVhY2goZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5ld3MnKSwgZnVuY3Rpb24oaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignaDIgYScpLmhyZWY7XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICB9KTtcblxuXG4gICAgLyoqXG4gICAgKiBJbmRpdmlkdWFsIGFydGljbGVcbiAgICAgKi9cbiAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXJ0aWNsZScpKSB7XG4gICAgICAgIHZhciBoZWlnaHQgPSB7XG4gICAgICAgICAgICB3OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgICAgICAgICBoOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5ID4gaGVhZGVyJykub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgZjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keSA+IGZvb3RlcicpLm9mZnNldEhlaWdodFxuICAgICAgICB9O1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcnRpY2xlJykuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0LncgLSBoZWlnaHQuaCAtIGhlaWdodC5mIC0gNiArICdweCc7XG4gICAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiogQSB1dGlsaXR5IG9iamVjdCBoZWxwaW5nIHdpdGggdmFuaWxsYSBqYXZhc2NyaXB0ICh0cnlpbmcgdG8gbWltaWMgalF1ZXJ5KVxuICovXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbC5qcycpLFxuICAgIG5ld3Nfd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXdzX3dyYXBwZXInKSxcblxuICAgIGZpbHRlcl90eXBlcyA9IFtcbiAgICAgICAge25hbWU6ICcuanNfZGF0ZScsIHZhbHVlOiAnJ30sXG4gICAgICAgIHtuYW1lOiAnLmpzX21lZGlhJywgdmFsdWU6ICcnfVxuICAgIF0sXG5cblxuICAgIHRvZ2dsZV9uZXdzICA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZmlsdGVyX3N0cmluZyA9ICcnO1xuICAgICAgICAvLyBpZiB3ZSBuZWVkIHRvIGhpZGUgc29tZXRoaW5nIHdlIGZpcnN0IHNldCB0aGVtIEFMTCB0byBibG9ja1xuICAgICAgICBuZXdzX3dyYXBwZXIuY2xhc3NMaXN0LmFkZCgnZW1wdHknKTtcbiAgICAgICAgdXRpbC5mb3JFYWNoKG5ld3Nfd3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCcubmV3cycpLCBmdW5jdGlvbihpbmRleCwgZWwpIHtcbiAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IGZpbHRlcl90eXBlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgZmlsdGVyX3N0cmluZyArPSBmaWx0ZXJfdHlwZXNbaV0udmFsdWU7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIHdlIHNob3cgb25seSB0aGUgb25lcyB0aGF0IGZ1bGZpbGwgdGhlIGZpbHRlciBjcml0ZXJpYVxuICAgICAgICB1dGlsLmZvckVhY2gobmV3c193cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5uZXdzJyArIGZpbHRlcl9zdHJpbmcpLCBmdW5jdGlvbihpbmRleCwgZWwpIHtcbiAgICAgICAgICAgIG5ld3Nfd3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdlbXB0eScpO1xuICAgICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cblxuICAgIGZpbHRlcl9mbiA9IGZ1bmN0aW9uKGZpbHRlcl90eXBlKSB7XG4gICAgICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZmlsdGVyX3R5cGUubmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGZpbHRlcl90eXBlLm5hbWUpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihmaWx0ZXJfdHlwZS5uYW1lICsgJyAuZHJvcGRvd24tbWVudScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIHZhciBkZWZhdWx0X3RleHQgPSAnJywgZGF0YV92YWx1ZSA9ICcnLCBzcGFuX3RleHQgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYoZS50YXJnZXQgJiYgZS50YXJnZXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2EnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwYW5fdGV4dCAgICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZmlsdGVyX3R5cGUubmFtZSArICcgPiBidXR0b24gLnRleHQnKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdF90ZXh0ID0gc3Bhbl90ZXh0LmdldEF0dHJpYnV0ZSgnZGF0YS10ZXh0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFfdmFsdWUgICA9IGUudGFyZ2V0LmRhdGFzZXQudmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YV92YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcl90eXBlLnZhbHVlICAgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW5fdGV4dC5pbm5lckhUTUwgPSBkZWZhdWx0X3RleHQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJfdHlwZS52YWx1ZSAgID0gJ1tkYXRhLXJhdy1kYXRlPVwiJyArICBkYXRhX3ZhbHVlICsgJ1wiXSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuX3RleHQuaW5uZXJIVE1MID0gZGF0YV92YWx1ZTs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVfbmV3cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBmaWx0ZXJfdHlwZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZmlsdGVyX2ZuKGZpbHRlcl90eXBlc1tpXSk7XG4gICAgfVxuXG4gICAgLyppZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanNfZGF0ZScpKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19kYXRlIC5kcm9wZG93bi1tZW51JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAnJztcblxuICAgICAgICAgICAgaWYoZS50YXJnZXQgJiYgZS50YXJnZXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2EnKSB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdF90ZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX2RhdGUgPiBidXR0b24gLnRleHQnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dCcpO1xuXG4gICAgICAgICAgICAgICAgaWYoZS50YXJnZXQuZGF0YXNldC52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyX2RhdGUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX2RhdGUgPiBidXR0b24gLnRleHQnKS5pbm5lckhUTUwgPSBkZWZhdWx0X3RleHQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyX2RhdGUgPSAnW2RhdGEtcmF3LWRhdGU9XCInICsgIGUudGFyZ2V0LmRhdGFzZXQudmFsdWUgKyAnXCJdJztcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX2RhdGUgPiBidXR0b24gLnRleHQnKS5pbm5lckhUTUwgPSBkZWZhdWx0X3RleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvZ2dsZV9uZXdzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gLy8gZW5kIG9mIGpzX2RhdGVcblxuICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19tZWRpYScpKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19tZWRpYSAuZHJvcGRvd24tbWVudScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYoZS50YXJnZXQgJiYgZS50YXJnZXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2EnKSB7XG4gICAgICAgICAgICAgICAgaWYoZS50YXJnZXQuZGF0YXNldC52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyX21lZGlhID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19tZWRpYSA+IGJ1dHRvbiAudGV4dCcpLmlubmVySFRNTCA9ICdDaG9vc2UgYSBtZWRpYSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyX21lZGlhID0gJ1tkYXRhLXJhdy1tZWRpYT1cIicgKyAgZS50YXJnZXQuZGF0YXNldC52YWx1ZSArICdcIl0nO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanNfbWVkaWEgPiBidXR0b24gLnRleHQnKS5pbm5lckhUTUwgPSBlLnRhcmdldC5kYXRhc2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0b2dnbGVfbmV3cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9IC8vIGVuZCBvZiBqc19tZWRpYSovXG59OyIsIid1c2Ugc3RyaWN0JztcblxuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbC5qcycpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgLyoqXG4gICAgKiBBZGRpbmcgRm9udCBBd2Vzb21lIGFuZCBtb3N0IHVzZWQgZ29vZ2xlIGZvbnQgT3BlbiBTYW5zXG4gICAgICovXG4gICAgdXRpbC5leHRyYV9zdHlsZSgnaHR0cDovL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2ZvbnQtYXdlc29tZS80LjMuMC9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnKTtcbiAgICB1dGlsLmV4dHJhX3N0eWxlKCdodHRwOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1PcGVuK1NhbnMnKTtcblxuXG4gICAgLyoqXG4gICAgKiBNZW51IHNob3dpbmcgLyBoaWRkaW5nIG9uIHNtYWxsIHNjcmVlbnMgKDw3NjhweCkgLSBpbiBhZGRpdGlvbiB3aXRoIHRoZSBjc3NcbiAgICAgKiBhbmQgYSBzdGFuZGFyZCBodG1sIHN0cnVjdHVyZSAobmF2ID4gYnV0dG9uICsgYSpuKVxuICAgICAqL1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJvbGU9XCJtYWluX21lbnVcIl0gYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRoaXMucGFyZW50Tm9kZS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xufSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICAvKipcbiAgICAqIEdldHRpbmcgdGhlIG9mZnNldCBvZiBhIERPTSBlbGVtZW50XG4gICAgICpcbiAgICAgKiAjIyMgRXhhbXBsZXM6XG4gICAgICpcbiAgICAgKiAgICAgdXRpbC5vZmZzZXQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm15X2VsZW1lbnQnKSk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZG9tIGVsZW1lbnQgKG5vdCBqcXVlcnkgZWxlbWVudClcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGEgdG9wIC8gbGVmdCBvYmplY3RcbiAgICAgKi9cbiAgICBvZmZzZXQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICB2YXIgdG9wICA9IDAsXG4gICAgICAgICAgICBsZWZ0ID0gMDtcblxuICAgICAgICBpZihvYmoub2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgdG9wICArPSBvYmoub2Zmc2V0VG9wO1xuICAgICAgICAgICAgICAgIGxlZnQgKz0gb2JqLm9mZnNldExlZnQ7XG4gICAgICAgICAgICB9IHdoaWxlIChvYmogPSBvYmoub2Zmc2V0UGFyZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyB0b3A6IHRvcCwgbGVmdDogbGVmdCB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAqIEFkZGluZyBkeW5hbWljYWxseSBhIG5ldyBleHRlcm5hbCBzdHlsZSBpbnRvIHRoZSBodG1sXG4gICAgICpcbiAgICAgKiAjIyMgRXhhbXBsZXM6XG4gICAgICpcbiAgICAgKiAgICAgdXRpbC5leHRyYV9zdHlsZSgnaHR0cDovL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2ZvbnQtYXdlc29tZS80LjAuMy9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnKTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0aGUgYWN0dWFsIHVybCAobG9jYWwgb3IgaHR0cClcbiAgICAgKi9cbiAgICBleHRyYV9zdHlsZTogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHZhciBsaW5rX2NzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG4gICAgICAgIGxpbmtfY3NzLnNldEF0dHJpYnV0ZShcInJlbFwiLCBcInN0eWxlc2hlZXRcIik7XG4gICAgICAgIGxpbmtfY3NzLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgdXJsKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKGxpbmtfY3NzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiBMb29waW5nIHRocm91Z2ggRE9NIE5vZGVMaXN0XG4gICAgICpcbiAgICAgKiAjIyMgRXhhbXBsZXM6XG4gICAgICpcbiAgICAgKiAgICAgZm9yRWFjaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLCBmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7IGNvbnNvbGUubG9nKGluZGV4LCB2YWx1ZSk7IH0pO1xuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheSwgRnVuY3Rpb24sIFNjb3BlfVxuICAgICAqL1xuICAgIGZvckVhY2g6IGZ1bmN0aW9uIChhcnJheSwgY2FsbGJhY2ssIHNjb3BlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzY29wZSwgaSwgYXJyYXlbaV0pO1xuICAgICAgICB9XG4gICAgfVxufTsiXX0=
