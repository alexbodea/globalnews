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
        {name: '.js_date',  type: 'date',  value: ''},
        {name: '.js_media', type: 'media', value: ''}
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
        console.log(news_wrapper);
        console.log('.news' + filter_string);
        console.log(news_wrapper.querySelectorAll('.news' + filter_string));
        util.forEach(news_wrapper.querySelectorAll('.news' + filter_string), function(index, el) {
            news_wrapper.classList.remove('empty');
            el.style.display = 'block';
        });
    },


    filter_fn = function(filter_type) {
        if(document.querySelector(filter_type.name)) {
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
                        filter_type.value   = '[data-raw-' + filter_type.type  + '="' +  data_value + '"]';
                        span_text.innerHTML = data_value;
                    }

                    toggle_news();
                }
                e.preventDefault();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiLi9kZXYvanMvYXBwLmpzIiwiTTovV29yay93d3cvcHJvamVjdHMvY29mZmVlMm5ld3MuY29tL2Zyb250X2VuZC9kZXYvanMvY29udGFjdF9mb3JtLmpzIiwiTTovV29yay93d3cvcHJvamVjdHMvY29mZmVlMm5ld3MuY29tL2Zyb250X2VuZC9kZXYvanMvZmlsdGVycy5qcyIsIk06L1dvcmsvd3d3L3Byb2plY3RzL2NvZmZlZTJuZXdzLmNvbS9mcm9udF9lbmQvZGV2L2pzL2hlYWRlci5qcyIsIk06L1dvcmsvd3d3L3Byb2plY3RzL2NvZmZlZTJuZXdzLmNvbS9mcm9udF9lbmQvZGV2L2pzL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyohIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXG4jICAgICAgYnkgQ2xhdWRpdSBMaW1iYW4gICAgICAgI1xuIyAgaHR0cDovL3NvZnV4cm8uZWxhbmNlLmNvbSAgICNcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciB1dGlsICAgICAgICAgPSByZXF1aXJlKCcuL3V0aWwuanMnKSwgICAgLy8gQSB1dGlsaXR5IG9iamVjdCBoZWxwaW5nIHdpdGggdmFuaWxsYSBqYXZhc2NyaXB0ICh0cnlpbmcgdG8gbWltaWMgalF1ZXJ5KVxuICAgIGZpbHRlcnMgICAgICA9IHJlcXVpcmUoJy4vZmlsdGVycy5qcycpLCAvLyBmaWx0ZXJpbmcgdGhlIG5ld3NcbiAgICBoZWFkZXIgICAgICAgPSByZXF1aXJlKCcuL2hlYWRlci5qcycpLCAgLy8gSGVhZCBhbmQgSGVhZGVyIGZ1bmN0aW9uYWxpdHlcbiAgICBjb250YWN0X2Zvcm0gPSByZXF1aXJlKCcuL2NvbnRhY3RfZm9ybS5qcycpO1xuXG5cbi8qKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiogV2hlcmUgZXZlcnl0aGluZyBoYXBwZW5zXG4gKi9cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8qKlxuICAgICogSGVhZCBhbmQgSGVhZGVyIGZ1bmN0aW9uYWxpdHlcbiAgICAgKi9cbiAgICBoZWFkZXIoKTtcblxuXG4gICAgLyoqXG4gICAgKiBHbyB1cCAoZnJvbSB0aGUgZm9vdGVyKVxuICAgICAqL1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvb3RlciBbZGF0YS1yb2xlPVwiZ29fdXBcIl0nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeydzY3JvbGxUb3AnOiAnMHB4J30sIDUwMCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuXG4gICAgLyoqXG4gICAgKiBCb290c3RyYXAgdG9vbHRpcFxuICAgICAqL1xuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XG5cblxuICAgIC8qKlxuICAgICogRmlsdGVyaW5nIG5ld3NcbiAgICAgKi9cbiAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3c193cmFwcGVyJykpIHtcbiAgICAgICAgZmlsdGVycygpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgKiBGaWx0ZXJpbmcgbmV3c1xuICAgICAqL1xuICAgIHV0aWwuZm9yRWFjaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubmV3cycpLCBmdW5jdGlvbihpbmRleCwgZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdoMiBhJykuaHJlZjtcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgIH0pO1xuXG5cbiAgICAvKipcbiAgICAqIEluZGl2aWR1YWwgYXJ0aWNsZVxuICAgICAqL1xuICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcnRpY2xlJykpIHtcbiAgICAgICAgdmFyIGhlaWdodCA9IHtcbiAgICAgICAgICAgIHc6IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgICAgICAgIGg6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHkgPiBoZWFkZXInKS5vZmZzZXRIZWlnaHQsXG4gICAgICAgICAgICBmOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5ID4gZm9vdGVyJykub2Zmc2V0SGVpZ2h0XG4gICAgICAgIH07XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFydGljbGUnKS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQudyAtIGhlaWdodC5oIC0gaGVpZ2h0LmYgLSA2ICsgJ3B4JztcbiAgICB9XG5cblxuICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0X2Zvcm0nKSkge1xuICAgICAgICBjb250YWN0X2Zvcm0oKTtcbiAgICB9XG59KTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlsLmpzJyksXHJcblxyXG4gICAgZm9ybSAgICAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdF9mb3JtIGZvcm0nKSxcclxuICAgIGlucHV0X3RleHQgID0gZm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpLFxyXG4gICAgaW5wdXRfZW1haWwgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJlbWFpbFwiXScpLFxyXG4gICAgdGV4dGFyZWEgICAgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ3RleHRhcmVhJyksXHJcbiAgICBzdWNjZXNzICAgICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0X2Zvcm0gLnN1Y2Nlc3NfdGV4dCcpLFxyXG5cclxuICAgIGNsb3NlX2Zvcm0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyByZXNldGluZ1xyXG4gICAgICAgIGlucHV0X3RleHQudmFsdWUgID0gJyc7XHJcbiAgICAgICAgaW5wdXRfZW1haWwudmFsdWUgPSAnJztcclxuICAgICAgICB0ZXh0YXJlYS52YWx1ZSAgICA9ICcnO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0X2Zvcm0nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgc3VjY2Vzcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gT3BlbmluZyB0aGUgZm9ybVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9vdGVyIC5taXNjIC5jb250YWN0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhY3RfZm9ybScpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvLyBDbGlja2luZyBvbiB0aGUgY2xvc2UgYnV0dG9uXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdF9mb3JtIC5jbG9zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGNsb3NlX2Zvcm0oKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBGaWxsaW5nIHRoZSBmb3JtIGNvcmVjdGx5IGFuZCBzdWJtaXRpbmcgaXRcclxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIC8vIEFKQVggY2FsbFxyXG4gICAgICAgIHV0aWxzLnBvc3Qoe1xyXG4gICAgICAgICAgICB1cmw6ICcvYWRtaW4vYWpheF9wcm9jZXMucGhwJyxcclxuICAgICAgICAgICAgZGF0YTogICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogIGlucHV0X3RleHQudmFsdWUsXHJcbiAgICAgICAgICAgICAgICBlbWFpbDogaW5wdXRfZW1haWwudmFsdWUsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAgdGV4dGFyZWEudmFsdWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VfZm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgfSwgNDAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG59OyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4qIEEgdXRpbGl0eSBvYmplY3QgaGVscGluZyB3aXRoIHZhbmlsbGEgamF2YXNjcmlwdCAodHJ5aW5nIHRvIG1pbWljIGpRdWVyeSlcbiAqL1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwuanMnKSxcbiAgICBuZXdzX3dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3c193cmFwcGVyJyksXG5cbiAgICBmaWx0ZXJfdHlwZXMgPSBbXG4gICAgICAgIHtuYW1lOiAnLmpzX2RhdGUnLCAgdHlwZTogJ2RhdGUnLCAgdmFsdWU6ICcnfSxcbiAgICAgICAge25hbWU6ICcuanNfbWVkaWEnLCB0eXBlOiAnbWVkaWEnLCB2YWx1ZTogJyd9XG4gICAgXSxcblxuXG4gICAgdG9nZ2xlX25ld3MgID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBmaWx0ZXJfc3RyaW5nID0gJyc7XG4gICAgICAgIC8vIGlmIHdlIG5lZWQgdG8gaGlkZSBzb21ldGhpbmcgd2UgZmlyc3Qgc2V0IHRoZW0gQUxMIHRvIGJsb2NrXG4gICAgICAgIG5ld3Nfd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdlbXB0eScpO1xuICAgICAgICB1dGlsLmZvckVhY2gobmV3c193cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5uZXdzJyksIGZ1bmN0aW9uKGluZGV4LCBlbCkge1xuICAgICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yKHZhciBpID0gMCwgbGVuID0gZmlsdGVyX3R5cGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBmaWx0ZXJfc3RyaW5nICs9IGZpbHRlcl90eXBlc1tpXS52YWx1ZTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gd2Ugc2hvdyBvbmx5IHRoZSBvbmVzIHRoYXQgZnVsZmlsbCB0aGUgZmlsdGVyIGNyaXRlcmlhXG4gICAgICAgIGNvbnNvbGUubG9nKG5ld3Nfd3JhcHBlcik7XG4gICAgICAgIGNvbnNvbGUubG9nKCcubmV3cycgKyBmaWx0ZXJfc3RyaW5nKTtcbiAgICAgICAgY29uc29sZS5sb2cobmV3c193cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5uZXdzJyArIGZpbHRlcl9zdHJpbmcpKTtcbiAgICAgICAgdXRpbC5mb3JFYWNoKG5ld3Nfd3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCcubmV3cycgKyBmaWx0ZXJfc3RyaW5nKSwgZnVuY3Rpb24oaW5kZXgsIGVsKSB7XG4gICAgICAgICAgICBuZXdzX3dyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnZW1wdHknKTtcbiAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG5cbiAgICBmaWx0ZXJfZm4gPSBmdW5jdGlvbihmaWx0ZXJfdHlwZSkge1xuICAgICAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGZpbHRlcl90eXBlLm5hbWUpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGZpbHRlcl90eXBlLm5hbWUgKyAnIC5kcm9wZG93bi1tZW51JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlZmF1bHRfdGV4dCA9ICcnLCBkYXRhX3ZhbHVlID0gJycsIHNwYW5fdGV4dCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZihlLnRhcmdldCAmJiBlLnRhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYScpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Bhbl90ZXh0ICAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihmaWx0ZXJfdHlwZS5uYW1lICsgJyA+IGJ1dHRvbiAudGV4dCcpO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0X3RleHQgPSBzcGFuX3RleHQuZ2V0QXR0cmlidXRlKCdkYXRhLXRleHQnKTtcbiAgICAgICAgICAgICAgICAgICAgZGF0YV92YWx1ZSAgID0gZS50YXJnZXQuZGF0YXNldC52YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhX3ZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyX3R5cGUudmFsdWUgICA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbl90ZXh0LmlubmVySFRNTCA9IGRlZmF1bHRfdGV4dDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcl90eXBlLnZhbHVlICAgPSAnW2RhdGEtcmF3LScgKyBmaWx0ZXJfdHlwZS50eXBlICArICc9XCInICsgIGRhdGFfdmFsdWUgKyAnXCJdJztcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYW5fdGV4dC5pbm5lckhUTUwgPSBkYXRhX3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlX25ld3MoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBmaWx0ZXJfdHlwZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZmlsdGVyX2ZuKGZpbHRlcl90eXBlc1tpXSk7XG4gICAgfVxuXG4gICAgLyppZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanNfZGF0ZScpKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19kYXRlIC5kcm9wZG93bi1tZW51JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAnJztcblxuICAgICAgICAgICAgaWYoZS50YXJnZXQgJiYgZS50YXJnZXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2EnKSB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdF90ZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX2RhdGUgPiBidXR0b24gLnRleHQnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dCcpO1xuXG4gICAgICAgICAgICAgICAgaWYoZS50YXJnZXQuZGF0YXNldC52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyX2RhdGUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX2RhdGUgPiBidXR0b24gLnRleHQnKS5pbm5lckhUTUwgPSBkZWZhdWx0X3RleHQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyX2RhdGUgPSAnW2RhdGEtcmF3LWRhdGU9XCInICsgIGUudGFyZ2V0LmRhdGFzZXQudmFsdWUgKyAnXCJdJztcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX2RhdGUgPiBidXR0b24gLnRleHQnKS5pbm5lckhUTUwgPSBkZWZhdWx0X3RleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvZ2dsZV9uZXdzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gLy8gZW5kIG9mIGpzX2RhdGVcblxuICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19tZWRpYScpKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19tZWRpYSAuZHJvcGRvd24tbWVudScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYoZS50YXJnZXQgJiYgZS50YXJnZXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2EnKSB7XG4gICAgICAgICAgICAgICAgaWYoZS50YXJnZXQuZGF0YXNldC52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyX21lZGlhID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19tZWRpYSA+IGJ1dHRvbiAudGV4dCcpLmlubmVySFRNTCA9ICdDaG9vc2UgYSBtZWRpYSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyX21lZGlhID0gJ1tkYXRhLXJhdy1tZWRpYT1cIicgKyAgZS50YXJnZXQuZGF0YXNldC52YWx1ZSArICdcIl0nO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanNfbWVkaWEgPiBidXR0b24gLnRleHQnKS5pbm5lckhUTUwgPSBlLnRhcmdldC5kYXRhc2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0b2dnbGVfbmV3cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9IC8vIGVuZCBvZiBqc19tZWRpYSovXG59OyIsIid1c2Ugc3RyaWN0JztcblxuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbC5qcycpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgLyoqXG4gICAgKiBBZGRpbmcgRm9udCBBd2Vzb21lIGFuZCBtb3N0IHVzZWQgZ29vZ2xlIGZvbnQgT3BlbiBTYW5zXG4gICAgICovXG4gICAgdXRpbC5leHRyYV9zdHlsZSgnaHR0cDovL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2ZvbnQtYXdlc29tZS80LjMuMC9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnKTtcbiAgICB1dGlsLmV4dHJhX3N0eWxlKCdodHRwOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1PcGVuK1NhbnMnKTtcblxuXG4gICAgLyoqXG4gICAgKiBNZW51IHNob3dpbmcgLyBoaWRkaW5nIG9uIHNtYWxsIHNjcmVlbnMgKDw3NjhweCkgLSBpbiBhZGRpdGlvbiB3aXRoIHRoZSBjc3NcbiAgICAgKiBhbmQgYSBzdGFuZGFyZCBodG1sIHN0cnVjdHVyZSAobmF2ID4gYnV0dG9uICsgYSpuKVxuICAgICAqL1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJvbGU9XCJtYWluX21lbnVcIl0gYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRoaXMucGFyZW50Tm9kZS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xufSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICAvKipcbiAgICAqIEdldHRpbmcgdGhlIG9mZnNldCBvZiBhIERPTSBlbGVtZW50XG4gICAgICpcbiAgICAgKiAjIyMgRXhhbXBsZXM6XG4gICAgICpcbiAgICAgKiAgICAgdXRpbC5vZmZzZXQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm15X2VsZW1lbnQnKSk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZG9tIGVsZW1lbnQgKG5vdCBqcXVlcnkgZWxlbWVudClcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGEgdG9wIC8gbGVmdCBvYmplY3RcbiAgICAgKi9cbiAgICBvZmZzZXQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICB2YXIgdG9wICA9IDAsXG4gICAgICAgICAgICBsZWZ0ID0gMDtcblxuICAgICAgICBpZihvYmoub2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgdG9wICArPSBvYmoub2Zmc2V0VG9wO1xuICAgICAgICAgICAgICAgIGxlZnQgKz0gb2JqLm9mZnNldExlZnQ7XG4gICAgICAgICAgICB9IHdoaWxlIChvYmogPSBvYmoub2Zmc2V0UGFyZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyB0b3A6IHRvcCwgbGVmdDogbGVmdCB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAqIEFkZGluZyBkeW5hbWljYWxseSBhIG5ldyBleHRlcm5hbCBzdHlsZSBpbnRvIHRoZSBodG1sXG4gICAgICpcbiAgICAgKiAjIyMgRXhhbXBsZXM6XG4gICAgICpcbiAgICAgKiAgICAgdXRpbC5leHRyYV9zdHlsZSgnaHR0cDovL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2ZvbnQtYXdlc29tZS80LjAuMy9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnKTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0aGUgYWN0dWFsIHVybCAobG9jYWwgb3IgaHR0cClcbiAgICAgKi9cbiAgICBleHRyYV9zdHlsZTogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHZhciBsaW5rX2NzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG4gICAgICAgIGxpbmtfY3NzLnNldEF0dHJpYnV0ZShcInJlbFwiLCBcInN0eWxlc2hlZXRcIik7XG4gICAgICAgIGxpbmtfY3NzLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgdXJsKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKGxpbmtfY3NzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiBMb29waW5nIHRocm91Z2ggRE9NIE5vZGVMaXN0XG4gICAgICpcbiAgICAgKiAjIyMgRXhhbXBsZXM6XG4gICAgICpcbiAgICAgKiAgICAgZm9yRWFjaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLCBmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7IGNvbnNvbGUubG9nKGluZGV4LCB2YWx1ZSk7IH0pO1xuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheSwgRnVuY3Rpb24sIFNjb3BlfVxuICAgICAqL1xuICAgIGZvckVhY2g6IGZ1bmN0aW9uIChhcnJheSwgY2FsbGJhY2ssIHNjb3BlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY2FsbGJhY2suY2FsbChzY29wZSwgaSwgYXJyYXlbaV0pO1xuICAgICAgICB9XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgKiBBSkFYXG4gICAgICpcbiAgICAgKiAjIyMgRXhhbXBsZXM6XG4gICAgICpcbiAgICAgKiAgICAgIHV0aWxzLmFqYXguZ2V0KHtcbiAgICAgKiAgICAgICAgICB1cmw6ICAgICAnL3Rlc3QucGhwJyxcbiAgICAgKiAgICAgICAgICBkYXRhOiAgICB7Zm9vOiAnYmFyJ30sXG4gICAgICogICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7IC8vIHdoYXQgdG8gZG8gb24gc3VjY2VzczsgfSxcbiAgICAgKiAgICAgICAgICBlcnJvcjogICBmdW5jdGlvbigpIHsgLy8gd2hhdCB0byBkbyBvbiBlcnJvcjsgfVxuICAgICAqICAgICAgfSk7XG4gICAgICpcbiAgICAgKiBUT0RPXG4gICAgICogICAgICBERUxFVEUgYW5kIFVQREFURSAobWV0aG9kcylcbiAgICAgKiAgICAgIHNlbmQgVFlQRVxuICAgICAqICAgICAgcmV0dXJuIFRZUEVcbiAgICAgKi9cbiAgICBhamF4OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGh0dHBfcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCksXG4gICAgICAgICAgICBnZXRfZm4gICA9IG51bGwsXG4gICAgICAgICAgICBwb3N0X2ZuICA9IG51bGwsXG4gICAgICAgICAgICBzZW5kX2ZuICA9IG51bGw7XG5cbiAgICAgICAgc2VuZF9mbiA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgbWV0aG9kLCBzdWNjZXNzX2ZuLCBlcnJvcl9mbiwgc3luYykge1xuICAgICAgICAgICAgdmFyIHggPSBodHRwX3JlcTtcbiAgICAgICAgICAgIHgub3BlbihtZXRob2QsIHVybCwgc3luYyk7XG4gICAgICAgICAgICB4Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICh4LnJlYWR5U3RhdGUgPT0gNCkge1xuICAgICAgICAgICAgICAgICAgICBpZih4LnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzX2ZuKHgucmVzcG9uc2VUZXh0KVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JfZm4oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZihtZXRob2QgPT09ICdQT1NUJykge1xuICAgICAgICAgICAgICAgIHguc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeC5zZW5kKGRhdGEpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGdldF9mbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgdmFyIHF1ZXJ5ID0gW107XG5cbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIG9iai5kYXRhKSB7XG4gICAgICAgICAgICAgICAgcXVlcnkucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmouZGF0YVtrZXldKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgdXJsICAgICAgICAgICAgICBkYXRhICBtZXRob2QgICAgc3VjY2Vzc19mbiAgICAgZXJyb3JfZm4gICAgICAgIHN5bmNcbiAgICAgICAgICAgIHNlbmRfZm4ob2JqLnVybCArICc/JyArIHF1ZXJ5LmpvaW4oJyYnKSwgbnVsbCwgJ0dFVCcsIG9iai5zdWNjZXNzLCBvYmouZXJyb3IsIG9iai5zeW5jKTtcbiAgICAgICAgfTtcblxuICAgICAgICBwb3N0X2ZuID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnkgPSBbXTtcblxuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gb2JqLmRhdGEpIHtcbiAgICAgICAgICAgICAgICBxdWVyeS5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9iai5kYXRhW2tleV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgIHVybCAgICAgICAgIGRhdGEgICAgICAgICBtZXRob2QgICAgc3VjY2Vzc19mbiAgICAgZXJyb3JfZm4gICAgICAgIHN5bmNcbiAgICAgICAgICAgIHNlbmRfZm4ob2JqLnVybCwgcXVlcnkuam9pbignJicpLCAnUE9TVCcsIG9iai5zdWNjZXNzLCBvYmouZXJyb3IsIG9iai5zeW5jKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge2dldDogZ2V0X2ZuLCBwb3N0OiBwb3N0X2ZufTtcbiAgICB9XG59OyJdfQ==
