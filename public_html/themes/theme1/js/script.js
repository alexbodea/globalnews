(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./dev/js/app.js":[function(require,module,exports){
/*!#############################
#                              #
#      by Claudiu Limban       #
#  http://sofuxro.elance.com   #
#                              #
################################*/


'use strict';


var util         = require('./util.js'),    // A utility object helping with vanilla javascript (trying to mimic jQuery)
    filters      = require('./filters.js'), // filtering the news
    header       = require('./header.js'),  // Head and Header functionality
    contact_form = require('./contact_form.js');


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


    if(document.querySelector('.contact_form')) {
        contact_form();
    }
});
},{"./contact_form.js":"M:\\Work\\www\\projects\\coffee2news.com\\front_end\\dev\\js\\contact_form.js","./filters.js":"M:\\Work\\www\\projects\\coffee2news.com\\front_end\\dev\\js\\filters.js","./header.js":"M:\\Work\\www\\projects\\coffee2news.com\\front_end\\dev\\js\\header.js","./util.js":"M:\\Work\\www\\projects\\coffee2news.com\\front_end\\dev\\js\\util.js"}],"M:\\Work\\www\\projects\\coffee2news.com\\front_end\\dev\\js\\contact_form.js":[function(require,module,exports){
'use strict';


var utils = require('./util.js'),

    form        = document.querySelector('.contact_form form'),
    input_text  = form.querySelector('input[type="text"]'),
    input_email = form.querySelector('input[type="email"]'),
    textarea    = form.querySelector('textarea'),
    success     = document.querySelector('.contact_form .success_text'),

    close_form = function() {
        // reseting
        input_text.value  = '';
        input_email.value = '';
        textarea.value    = '';
        document.querySelector('.contact_form').style.display = 'none';
        form.style.display = 'block';
        success.style.display = 'none';
    };


module.exports = function() {
    // Opening the form
    document.querySelector('footer .misc .contact').addEventListener('click', function(e) {
        document.querySelector('.contact_form').style.display = 'block';
        e.preventDefault();
    });


    // Clicking on the close button
    document.querySelector('.contact_form .close').addEventListener('click', function(e) {
        close_form();
        e.preventDefault();
    });

    // Filling the form corectly and submiting it
    form.addEventListener('submit', function(e) {
        // AJAX call
        utils.post({
            url: '/utils/ajax_interact.php',
            data:    {
                name:  input_text.value,
                email: input_email.value,
                text:  textarea.value
            },
            success: function() {
                form.style.display = 'none';
                success.style.display = 'block';

                setTimeout(function() {
                    close_form();
                }, 4000);
            }
        });

        e.preventDefault();
        return false;
    });
};
},{"./util.js":"M:\\Work\\www\\projects\\coffee2news.com\\front_end\\dev\\js\\util.js"}],"M:\\Work\\www\\projects\\coffee2news.com\\front_end\\dev\\js\\filters.js":[function(require,module,exports){
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
    };



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
    },


    /**
    * AJAX
     *
     * ### Examples:
     *
     *      utils.ajax.get({
     *          url:     '/test.php',
     *          data:    {foo: 'bar'},
     *          success: function() { // what to do on success; },
     *          error:   function() { // what to do on error; }
     *      });
     *
     * TODO
     *      DELETE and UPDATE (methods)
     *      send TYPE
     *      return TYPE
     */
    ajax: function() {
        var http_req = new XMLHttpRequest(),
            get_fn   = null,
            post_fn  = null,
            send_fn  = null;

        send_fn = function(url, data, method, success_fn, error_fn, sync) {
            var x = http_req;
            x.open(method, url, sync);
            x.onreadystatechange = function() {
                if (x.readyState == 4) {
                    if(x.status === 200) {
                        success_fn(x.responseText)
                    } else {
                        error_fn();
                    }
                }
            };
            if(method === 'POST') {
                x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            }
            x.send(data);
        };

        get_fn = function(obj) {
            var query = [];

            for(var key in obj.data) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj.data[key]));
            }
            //              url              data  method    success_fn     error_fn        sync
            send_fn(obj.url + '?' + query.join('&'), null, 'GET', obj.success, obj.error, obj.sync);
        };

        post_fn = function(obj) {
            var query = [];

            for(var key in obj.data) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj.data[key]));
            }
            //    url         data         method    success_fn     error_fn        sync
            send_fn(obj.url, query.join('&'), 'POST', obj.success, obj.error, obj.sync);
        };

        return {get: get_fn, post: post_fn};
    }
};
},{}]},{},["./dev/js/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiLi9kZXYvanMvYXBwLmpzIiwiTTovV29yay93d3cvcHJvamVjdHMvY29mZmVlMm5ld3MuY29tL2Zyb250X2VuZC9kZXYvanMvY29udGFjdF9mb3JtLmpzIiwiTTovV29yay93d3cvcHJvamVjdHMvY29mZmVlMm5ld3MuY29tL2Zyb250X2VuZC9kZXYvanMvZmlsdGVycy5qcyIsIk06L1dvcmsvd3d3L3Byb2plY3RzL2NvZmZlZTJuZXdzLmNvbS9mcm9udF9lbmQvZGV2L2pzL2hlYWRlci5qcyIsIk06L1dvcmsvd3d3L3Byb2plY3RzL2NvZmZlZTJuZXdzLmNvbS9mcm9udF9lbmQvZGV2L2pzL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyohIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXG4jICAgICAgYnkgQ2xhdWRpdSBMaW1iYW4gICAgICAgI1xuIyAgaHR0cDovL3NvZnV4cm8uZWxhbmNlLmNvbSAgICNcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciB1dGlsICAgICAgICAgPSByZXF1aXJlKCcuL3V0aWwuanMnKSwgICAgLy8gQSB1dGlsaXR5IG9iamVjdCBoZWxwaW5nIHdpdGggdmFuaWxsYSBqYXZhc2NyaXB0ICh0cnlpbmcgdG8gbWltaWMgalF1ZXJ5KVxuICAgIGZpbHRlcnMgICAgICA9IHJlcXVpcmUoJy4vZmlsdGVycy5qcycpLCAvLyBmaWx0ZXJpbmcgdGhlIG5ld3NcbiAgICBoZWFkZXIgICAgICAgPSByZXF1aXJlKCcuL2hlYWRlci5qcycpLCAgLy8gSGVhZCBhbmQgSGVhZGVyIGZ1bmN0aW9uYWxpdHlcbiAgICBjb250YWN0X2Zvcm0gPSByZXF1aXJlKCcuL2NvbnRhY3RfZm9ybS5qcycpO1xuXG5cbi8qKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiogV2hlcmUgZXZlcnl0aGluZyBoYXBwZW5zXG4gKi9cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8qKlxuICAgICogSGVhZCBhbmQgSGVhZGVyIGZ1bmN0aW9uYWxpdHlcbiAgICAgKi9cbiAgICBoZWFkZXIoKTtcblxuXG4gICAgLyoqXG4gICAgKiBHbyB1cCAoZnJvbSB0aGUgZm9vdGVyKVxuICAgICAqL1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvb3RlciBbZGF0YS1yb2xlPVwiZ29fdXBcIl0nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeydzY3JvbGxUb3AnOiAnMHB4J30sIDUwMCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuXG4gICAgLyoqXG4gICAgKiBCb290c3RyYXAgdG9vbHRpcFxuICAgICAqL1xuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XG5cblxuICAgIC8qKlxuICAgICogRmlsdGVyaW5nIG5ld3NcbiAgICAgKi9cbiAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3c193cmFwcGVyJykpIHtcbiAgICAgICAgZmlsdGVycygpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgKiBGaWx0ZXJpbmcgbmV3c1xuICAgICAqL1xuICAgIHV0aWwuZm9yRWFjaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubmV3cycpLCBmdW5jdGlvbihpbmRleCwgZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdoMiBhJykuaHJlZjtcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgIH0pO1xuXG5cbiAgICAvKipcbiAgICAqIEluZGl2aWR1YWwgYXJ0aWNsZVxuICAgICAqL1xuICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcnRpY2xlJykpIHtcbiAgICAgICAgdmFyIGhlaWdodCA9IHtcbiAgICAgICAgICAgIHc6IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgICAgICAgIGg6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHkgPiBoZWFkZXInKS5vZmZzZXRIZWlnaHQsXG4gICAgICAgICAgICBmOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5ID4gZm9vdGVyJykub2Zmc2V0SGVpZ2h0XG4gICAgICAgIH07XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFydGljbGUnKS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQudyAtIGhlaWdodC5oIC0gaGVpZ2h0LmYgLSA2ICsgJ3B4JztcbiAgICB9XG5cblxuICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0X2Zvcm0nKSkge1xuICAgICAgICBjb250YWN0X2Zvcm0oKTtcbiAgICB9XG59KTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlsLmpzJyksXHJcblxyXG4gICAgZm9ybSAgICAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdF9mb3JtIGZvcm0nKSxcclxuICAgIGlucHV0X3RleHQgID0gZm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpLFxyXG4gICAgaW5wdXRfZW1haWwgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJlbWFpbFwiXScpLFxyXG4gICAgdGV4dGFyZWEgICAgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ3RleHRhcmVhJyksXHJcbiAgICBzdWNjZXNzICAgICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0X2Zvcm0gLnN1Y2Nlc3NfdGV4dCcpLFxyXG5cclxuICAgIGNsb3NlX2Zvcm0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyByZXNldGluZ1xyXG4gICAgICAgIGlucHV0X3RleHQudmFsdWUgID0gJyc7XHJcbiAgICAgICAgaW5wdXRfZW1haWwudmFsdWUgPSAnJztcclxuICAgICAgICB0ZXh0YXJlYS52YWx1ZSAgICA9ICcnO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0X2Zvcm0nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgc3VjY2Vzcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gT3BlbmluZyB0aGUgZm9ybVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9vdGVyIC5taXNjIC5jb250YWN0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhY3RfZm9ybScpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvLyBDbGlja2luZyBvbiB0aGUgY2xvc2UgYnV0dG9uXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdF9mb3JtIC5jbG9zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGNsb3NlX2Zvcm0oKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBGaWxsaW5nIHRoZSBmb3JtIGNvcmVjdGx5IGFuZCBzdWJtaXRpbmcgaXRcclxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIC8vIEFKQVggY2FsbFxyXG4gICAgICAgIHV0aWxzLnBvc3Qoe1xyXG4gICAgICAgICAgICB1cmw6ICcvYWRtaW4vYWpheF9wcm9jZXMucGhwJyxcclxuICAgICAgICAgICAgZGF0YTogICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogIGlucHV0X3RleHQudmFsdWUsXHJcbiAgICAgICAgICAgICAgICBlbWFpbDogaW5wdXRfZW1haWwudmFsdWUsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAgdGV4dGFyZWEudmFsdWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VfZm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgfSwgNDAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG59OyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4qIEEgdXRpbGl0eSBvYmplY3QgaGVscGluZyB3aXRoIHZhbmlsbGEgamF2YXNjcmlwdCAodHJ5aW5nIHRvIG1pbWljIGpRdWVyeSlcbiAqL1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwuanMnKSxcbiAgICBuZXdzX3dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3c193cmFwcGVyJyksXG5cbiAgICBmaWx0ZXJfdHlwZXMgPSBbXG4gICAgICAgIHtuYW1lOiAnLmpzX2RhdGUnLCB2YWx1ZTogJyd9LFxuICAgICAgICB7bmFtZTogJy5qc19tZWRpYScsIHZhbHVlOiAnJ31cbiAgICBdLFxuXG5cbiAgICB0b2dnbGVfbmV3cyAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZpbHRlcl9zdHJpbmcgPSAnJztcbiAgICAgICAgLy8gaWYgd2UgbmVlZCB0byBoaWRlIHNvbWV0aGluZyB3ZSBmaXJzdCBzZXQgdGhlbSBBTEwgdG8gYmxvY2tcbiAgICAgICAgbmV3c193cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2VtcHR5Jyk7XG4gICAgICAgIHV0aWwuZm9yRWFjaChuZXdzX3dyYXBwZXIucXVlcnlTZWxlY3RvckFsbCgnLm5ld3MnKSwgZnVuY3Rpb24oaW5kZXgsIGVsKSB7XG4gICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBmaWx0ZXJfdHlwZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGZpbHRlcl9zdHJpbmcgKz0gZmlsdGVyX3R5cGVzW2ldLnZhbHVlO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLyB3ZSBzaG93IG9ubHkgdGhlIG9uZXMgdGhhdCBmdWxmaWxsIHRoZSBmaWx0ZXIgY3JpdGVyaWFcbiAgICAgICAgdXRpbC5mb3JFYWNoKG5ld3Nfd3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCcubmV3cycgKyBmaWx0ZXJfc3RyaW5nKSwgZnVuY3Rpb24oaW5kZXgsIGVsKSB7XG4gICAgICAgICAgICBuZXdzX3dyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnZW1wdHknKTtcbiAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG5cbiAgICBmaWx0ZXJfZm4gPSBmdW5jdGlvbihmaWx0ZXJfdHlwZSkge1xuICAgICAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGZpbHRlcl90eXBlLm5hbWUpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhmaWx0ZXJfdHlwZS5uYW1lKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZmlsdGVyX3R5cGUubmFtZSArICcgLmRyb3Bkb3duLW1lbnUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVmYXVsdF90ZXh0ID0gJycsIGRhdGFfdmFsdWUgPSAnJywgc3Bhbl90ZXh0ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmKGUudGFyZ2V0ICYmIGUudGFyZ2V0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdhJykge1xuICAgICAgICAgICAgICAgICAgICBzcGFuX3RleHQgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGZpbHRlcl90eXBlLm5hbWUgKyAnID4gYnV0dG9uIC50ZXh0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRfdGV4dCA9IHNwYW5fdGV4dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dCcpO1xuICAgICAgICAgICAgICAgICAgICBkYXRhX3ZhbHVlICAgPSBlLnRhcmdldC5kYXRhc2V0LnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGFfdmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJfdHlwZS52YWx1ZSAgID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuX3RleHQuaW5uZXJIVE1MID0gZGVmYXVsdF90ZXh0O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyX3R5cGUudmFsdWUgICA9ICdbZGF0YS1yYXctZGF0ZT1cIicgKyAgZGF0YV92YWx1ZSArICdcIl0nO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbl90ZXh0LmlubmVySFRNTCA9IGRhdGFfdmFsdWU7O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlX25ld3MoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IGZpbHRlcl90eXBlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBmaWx0ZXJfZm4oZmlsdGVyX3R5cGVzW2ldKTtcbiAgICB9XG5cbiAgICAvKmlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19kYXRlJykpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX2RhdGUgLmRyb3Bkb3duLW1lbnUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9ICcnO1xuXG4gICAgICAgICAgICBpZihlLnRhcmdldCAmJiBlLnRhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYScpIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0X3RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanNfZGF0ZSA+IGJ1dHRvbiAudGV4dCcpLmdldEF0dHJpYnV0ZSgnZGF0YS10ZXh0Jyk7XG5cbiAgICAgICAgICAgICAgICBpZihlLnRhcmdldC5kYXRhc2V0LnZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICB2YXJfZGF0ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanNfZGF0ZSA+IGJ1dHRvbiAudGV4dCcpLmlubmVySFRNTCA9IGRlZmF1bHRfdGV4dDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXJfZGF0ZSA9ICdbZGF0YS1yYXctZGF0ZT1cIicgKyAgZS50YXJnZXQuZGF0YXNldC52YWx1ZSArICdcIl0nO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanNfZGF0ZSA+IGJ1dHRvbiAudGV4dCcpLmlubmVySFRNTCA9IGRlZmF1bHRfdGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG9nZ2xlX25ld3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSAvLyBlbmQgb2YganNfZGF0ZVxuXG4gICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX21lZGlhJykpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX21lZGlhIC5kcm9wZG93bi1tZW51JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZihlLnRhcmdldCAmJiBlLnRhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYScpIHtcbiAgICAgICAgICAgICAgICBpZihlLnRhcmdldC5kYXRhc2V0LnZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICB2YXJfbWVkaWEgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX21lZGlhID4gYnV0dG9uIC50ZXh0JykuaW5uZXJIVE1MID0gJ0Nob29zZSBhIG1lZGlhJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXJfbWVkaWEgPSAnW2RhdGEtcmF3LW1lZGlhPVwiJyArICBlLnRhcmdldC5kYXRhc2V0LnZhbHVlICsgJ1wiXSc7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19tZWRpYSA+IGJ1dHRvbiAudGV4dCcpLmlubmVySFRNTCA9IGUudGFyZ2V0LmRhdGFzZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvZ2dsZV9uZXdzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gLy8gZW5kIG9mIGpzX21lZGlhKi9cbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsLmpzJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAvKipcbiAgICAqIEFkZGluZyBGb250IEF3ZXNvbWUgYW5kIG1vc3QgdXNlZCBnb29nbGUgZm9udCBPcGVuIFNhbnNcbiAgICAgKi9cbiAgICB1dGlsLmV4dHJhX3N0eWxlKCdodHRwOi8vbmV0ZG5hLmJvb3RzdHJhcGNkbi5jb20vZm9udC1hd2Vzb21lLzQuMy4wL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzcycpO1xuICAgIHV0aWwuZXh0cmFfc3R5bGUoJ2h0dHA6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU9wZW4rU2FucycpO1xuXG5cbiAgICAvKipcbiAgICAqIE1lbnUgc2hvd2luZyAvIGhpZGRpbmcgb24gc21hbGwgc2NyZWVucyAoPDc2OHB4KSAtIGluIGFkZGl0aW9uIHdpdGggdGhlIGNzc1xuICAgICAqIGFuZCBhIHN0YW5kYXJkIGh0bWwgc3RydWN0dXJlIChuYXYgPiBidXR0b24gKyBhKm4pXG4gICAgICovXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcm9sZT1cIm1haW5fbWVudVwiXSBidXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdGhpcy5wYXJlbnROb2RlLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIC8qKlxuICAgICogR2V0dGluZyB0aGUgb2Zmc2V0IG9mIGEgRE9NIGVsZW1lbnRcbiAgICAgKlxuICAgICAqICMjIyBFeGFtcGxlczpcbiAgICAgKlxuICAgICAqICAgICB1dGlsLm9mZnNldChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXlfZWxlbWVudCcpKTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkb20gZWxlbWVudCAobm90IGpxdWVyeSBlbGVtZW50KVxuICAgICAqIEByZXR1cm4ge09iamVjdH0gYSB0b3AgLyBsZWZ0IG9iamVjdFxuICAgICAqL1xuICAgIG9mZnNldDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHZhciB0b3AgID0gMCxcbiAgICAgICAgICAgIGxlZnQgPSAwO1xuXG4gICAgICAgIGlmKG9iai5vZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICB0b3AgICs9IG9iai5vZmZzZXRUb3A7XG4gICAgICAgICAgICAgICAgbGVmdCArPSBvYmoub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIH0gd2hpbGUgKG9iaiA9IG9iai5vZmZzZXRQYXJlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHRvcDogdG9wLCBsZWZ0OiBsZWZ0IH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICogQWRkaW5nIGR5bmFtaWNhbGx5IGEgbmV3IGV4dGVybmFsIHN0eWxlIGludG8gdGhlIGh0bWxcbiAgICAgKlxuICAgICAqICMjIyBFeGFtcGxlczpcbiAgICAgKlxuICAgICAqICAgICB1dGlsLmV4dHJhX3N0eWxlKCdodHRwOi8vbmV0ZG5hLmJvb3RzdHJhcGNkbi5jb20vZm9udC1hd2Vzb21lLzQuMC4zL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzcycpO1xuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRoZSBhY3R1YWwgdXJsIChsb2NhbCBvciBodHRwKVxuICAgICAqL1xuICAgIGV4dHJhX3N0eWxlOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgdmFyIGxpbmtfY3NzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cbiAgICAgICAgbGlua19jc3Muc2V0QXR0cmlidXRlKFwicmVsXCIsIFwic3R5bGVzaGVldFwiKTtcbiAgICAgICAgbGlua19jc3Muc2V0QXR0cmlidXRlKFwiaHJlZlwiLCB1cmwpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQobGlua19jc3MpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAqIExvb3BpbmcgdGhyb3VnaCBET00gTm9kZUxpc3RcbiAgICAgKlxuICAgICAqICMjIyBFeGFtcGxlczpcbiAgICAgKlxuICAgICAqICAgICBmb3JFYWNoKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyksIGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHsgY29uc29sZS5sb2coaW5kZXgsIHZhbHVlKTsgfSk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5LCBGdW5jdGlvbiwgU2NvcGV9XG4gICAgICovXG4gICAgZm9yRWFjaDogZnVuY3Rpb24gKGFycmF5LCBjYWxsYmFjaywgc2NvcGUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNjb3BlLCBpLCBhcnJheVtpXSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAqIEFKQVhcbiAgICAgKlxuICAgICAqICMjIyBFeGFtcGxlczpcbiAgICAgKlxuICAgICAqICAgICAgdXRpbHMuYWpheC5nZXQoe1xuICAgICAqICAgICAgICAgIHVybDogICAgICcvdGVzdC5waHAnLFxuICAgICAqICAgICAgICAgIGRhdGE6ICAgIHtmb286ICdiYXInfSxcbiAgICAgKiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpIHsgLy8gd2hhdCB0byBkbyBvbiBzdWNjZXNzOyB9LFxuICAgICAqICAgICAgICAgIGVycm9yOiAgIGZ1bmN0aW9uKCkgeyAvLyB3aGF0IHRvIGRvIG9uIGVycm9yOyB9XG4gICAgICogICAgICB9KTtcbiAgICAgKlxuICAgICAqIFRPRE9cbiAgICAgKiAgICAgIERFTEVURSBhbmQgVVBEQVRFIChtZXRob2RzKVxuICAgICAqICAgICAgc2VuZCBUWVBFXG4gICAgICogICAgICByZXR1cm4gVFlQRVxuICAgICAqL1xuICAgIGFqYXg6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaHR0cF9yZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSxcbiAgICAgICAgICAgIGdldF9mbiAgID0gbnVsbCxcbiAgICAgICAgICAgIHBvc3RfZm4gID0gbnVsbCxcbiAgICAgICAgICAgIHNlbmRfZm4gID0gbnVsbDtcblxuICAgICAgICBzZW5kX2ZuID0gZnVuY3Rpb24odXJsLCBkYXRhLCBtZXRob2QsIHN1Y2Nlc3NfZm4sIGVycm9yX2ZuLCBzeW5jKSB7XG4gICAgICAgICAgICB2YXIgeCA9IGh0dHBfcmVxO1xuICAgICAgICAgICAgeC5vcGVuKG1ldGhvZCwgdXJsLCBzeW5jKTtcbiAgICAgICAgICAgIHgub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHgucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHguc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NfZm4oeC5yZXNwb25zZVRleHQpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcl9mbigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmKG1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICAgICAgICAgICAgeC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB4LnNlbmQoZGF0YSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZ2V0X2ZuID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnkgPSBbXTtcblxuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gb2JqLmRhdGEpIHtcbiAgICAgICAgICAgICAgICBxdWVyeS5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9iai5kYXRhW2tleV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICB1cmwgICAgICAgICAgICAgIGRhdGEgIG1ldGhvZCAgICBzdWNjZXNzX2ZuICAgICBlcnJvcl9mbiAgICAgICAgc3luY1xuICAgICAgICAgICAgc2VuZF9mbihvYmoudXJsICsgJz8nICsgcXVlcnkuam9pbignJicpLCBudWxsLCAnR0VUJywgb2JqLnN1Y2Nlc3MsIG9iai5lcnJvciwgb2JqLnN5bmMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHBvc3RfZm4gPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgIHZhciBxdWVyeSA9IFtdO1xuXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBvYmouZGF0YSkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5LnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQob2JqLmRhdGFba2V5XSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgdXJsICAgICAgICAgZGF0YSAgICAgICAgIG1ldGhvZCAgICBzdWNjZXNzX2ZuICAgICBlcnJvcl9mbiAgICAgICAgc3luY1xuICAgICAgICAgICAgc2VuZF9mbihvYmoudXJsLCBxdWVyeS5qb2luKCcmJyksICdQT1NUJywgb2JqLnN1Y2Nlc3MsIG9iai5lcnJvciwgb2JqLnN5bmMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7Z2V0OiBnZXRfZm4sIHBvc3Q6IHBvc3RfZm59O1xuICAgIH1cbn07Il19
