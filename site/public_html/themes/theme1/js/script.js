(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!#############################
#                              #
#      by Claudiu Limban       #
#  http://sofuxro.elance.com   #
#                              #
################################*/


'use strict';


var util         = require('./inc/utils.js'),    // A utility object helping with vanilla javascript (trying to mimic jQuery)
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
},{"./contact_form.js":2,"./filters.js":3,"./header.js":4,"./inc/utils.js":5}],2:[function(require,module,exports){
'use strict';


var utils = require('./inc/utils.js'),

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
        utils.ajax.post({
            url: '/admin/ajax_proces.php',
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
},{"./inc/utils.js":5}],3:[function(require,module,exports){
'use strict';

/**
* A utility object helping with vanilla javascript (trying to mimic jQuery)
 */
var util = require('./inc/utils.js'),
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
},{"./inc/utils.js":5}],4:[function(require,module,exports){
'use strict';


var util = require('./inc/utils.js');


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
},{"./inc/utils.js":5}],5:[function(require,module,exports){
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
     */
    ajax: (function() {
        var send_fn = function(url, data, method, success_fn, error_fn) {
                var x          = new XMLHttpRequest(),
                    success_fn = success_fn || function() {},
                    error_fn   = error_fn || function() {};

                x.open(method, url);
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
            },


            post_fn = function(obj) {
                var query = [];

                for(var key in obj.data) {
                    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj.data[key]));
                }
                //    url         data           method    success_fn     error_fn
                send_fn(obj.url, query.join('&'), 'POST', obj.success, obj.error);
            },


            get_fn = function(obj) {
                var query = [];

                for(var key in obj.data) {
                    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj.data[key]));
                }
                //              url                     data  method    success_fn     error_fn
                send_fn(obj.url + '?' + query.join('&'), null, 'GET', obj.success, obj.error);
            },


            put_fn = function(obj) {
                var query = [];

                for(var key in obj.data) {
                    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj.data[key]));
                }
                //       url         data         method  success_fn   error_fn
                send_fn(obj.url, query.join('&'), 'PUT', obj.success, obj.error);
            },


            delete_fn = function(obj) {
                var query = [];

                for(var key in obj.data) {
                    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj.data[key]));
                }
                //    url         data            method    success_fn     error_fn
                send_fn(obj.url, query.join('&'), 'DELETE', obj.success, obj.error);
            };

        return {post: post_fn, get: get_fn, put: put_fn, delete: delete_fn};
    })()
};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiLi9kZXYvanMvYXBwLmpzIiwiTTovV29yay93d3cvcHJvamVjdHMvY29mZmVlMm5ld3MuY29tL2Zyb250X2VuZC9kZXYvanMvY29udGFjdF9mb3JtLmpzIiwiTTovV29yay93d3cvcHJvamVjdHMvY29mZmVlMm5ld3MuY29tL2Zyb250X2VuZC9kZXYvanMvZmlsdGVycy5qcyIsIk06L1dvcmsvd3d3L3Byb2plY3RzL2NvZmZlZTJuZXdzLmNvbS9mcm9udF9lbmQvZGV2L2pzL2hlYWRlci5qcyIsIk06L1dvcmsvd3d3L3Byb2plY3RzL2NvZmZlZTJuZXdzLmNvbS9mcm9udF9lbmQvZGV2L2pzL2luYy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyohIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXG4jICAgICAgYnkgQ2xhdWRpdSBMaW1iYW4gICAgICAgI1xuIyAgaHR0cDovL3NvZnV4cm8uZWxhbmNlLmNvbSAgICNcbiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciB1dGlsICAgICAgICAgPSByZXF1aXJlKCcuL2luYy91dGlscy5qcycpLCAgICAvLyBBIHV0aWxpdHkgb2JqZWN0IGhlbHBpbmcgd2l0aCB2YW5pbGxhIGphdmFzY3JpcHQgKHRyeWluZyB0byBtaW1pYyBqUXVlcnkpXG4gICAgZmlsdGVycyAgICAgID0gcmVxdWlyZSgnLi9maWx0ZXJzLmpzJyksIC8vIGZpbHRlcmluZyB0aGUgbmV3c1xuICAgIGhlYWRlciAgICAgICA9IHJlcXVpcmUoJy4vaGVhZGVyLmpzJyksICAvLyBIZWFkIGFuZCBIZWFkZXIgZnVuY3Rpb25hbGl0eVxuICAgIGNvbnRhY3RfZm9ybSA9IHJlcXVpcmUoJy4vY29udGFjdF9mb3JtLmpzJyk7XG5cblxuLyoqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuKiBXaGVyZSBldmVyeXRoaW5nIGhhcHBlbnNcbiAqL1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgLyoqXG4gICAgKiBIZWFkIGFuZCBIZWFkZXIgZnVuY3Rpb25hbGl0eVxuICAgICAqL1xuICAgIGhlYWRlcigpO1xuXG5cbiAgICAvKipcbiAgICAqIEdvIHVwIChmcm9tIHRoZSBmb290ZXIpXG4gICAgICovXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9vdGVyIFtkYXRhLXJvbGU9XCJnb191cFwiXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7J3Njcm9sbFRvcCc6ICcwcHgnfSwgNTAwKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG5cbiAgICAvKipcbiAgICAqIEJvb3RzdHJhcCB0b29sdGlwXG4gICAgICovXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoKTtcblxuXG4gICAgLyoqXG4gICAgKiBGaWx0ZXJpbmcgbmV3c1xuICAgICAqL1xuICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXdzX3dyYXBwZXInKSkge1xuICAgICAgICBmaWx0ZXJzKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAqIEZpbHRlcmluZyBuZXdzXG4gICAgICovXG4gICAgdXRpbC5mb3JFYWNoKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5uZXdzJyksIGZ1bmN0aW9uKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyIGEnKS5ocmVmO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfSk7XG5cblxuICAgIC8qKlxuICAgICogSW5kaXZpZHVhbCBhcnRpY2xlXG4gICAgICovXG4gICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFydGljbGUnKSkge1xuICAgICAgICB2YXIgaGVpZ2h0ID0ge1xuICAgICAgICAgICAgdzogd2luZG93LmlubmVySGVpZ2h0LFxuICAgICAgICAgICAgaDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keSA+IGhlYWRlcicpLm9mZnNldEhlaWdodCxcbiAgICAgICAgICAgIGY6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHkgPiBmb290ZXInKS5vZmZzZXRIZWlnaHRcbiAgICAgICAgfTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXJ0aWNsZScpLnN0eWxlLmhlaWdodCA9IGhlaWdodC53IC0gaGVpZ2h0LmggLSBoZWlnaHQuZiAtIDYgKyAncHgnO1xuICAgIH1cblxuXG4gICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhY3RfZm9ybScpKSB7XG4gICAgICAgIGNvbnRhY3RfZm9ybSgpO1xuICAgIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL2luYy91dGlscy5qcycpLFxyXG5cclxuICAgIGZvcm0gICAgICAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhY3RfZm9ybSBmb3JtJyksXHJcbiAgICBpbnB1dF90ZXh0ICA9IGZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cInRleHRcIl0nKSxcclxuICAgIGlucHV0X2VtYWlsID0gZm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiZW1haWxcIl0nKSxcclxuICAgIHRleHRhcmVhICAgID0gZm9ybS5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpLFxyXG4gICAgc3VjY2VzcyAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdF9mb3JtIC5zdWNjZXNzX3RleHQnKSxcclxuXHJcbiAgICBjbG9zZV9mb3JtID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gcmVzZXRpbmdcclxuICAgICAgICBpbnB1dF90ZXh0LnZhbHVlICA9ICcnO1xyXG4gICAgICAgIGlucHV0X2VtYWlsLnZhbHVlID0gJyc7XHJcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgICAgPSAnJztcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdF9mb3JtJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIHN1Y2Nlc3Muc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIH07XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIC8vIE9wZW5pbmcgdGhlIGZvcm1cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvb3RlciAubWlzYyAuY29udGFjdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0X2Zvcm0nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy8gQ2xpY2tpbmcgb24gdGhlIGNsb3NlIGJ1dHRvblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhY3RfZm9ybSAuY2xvc2UnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBjbG9zZV9mb3JtKCk7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRmlsbGluZyB0aGUgZm9ybSBjb3JlY3RseSBhbmQgc3VibWl0aW5nIGl0XHJcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAvLyBBSkFYIGNhbGxcclxuICAgICAgICB1dGlscy5hamF4LnBvc3Qoe1xyXG4gICAgICAgICAgICB1cmw6ICcvYWRtaW4vYWpheF9wcm9jZXMucGhwJyxcclxuICAgICAgICAgICAgZGF0YTogICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogIGlucHV0X3RleHQudmFsdWUsXHJcbiAgICAgICAgICAgICAgICBlbWFpbDogaW5wdXRfZW1haWwudmFsdWUsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAgdGV4dGFyZWEudmFsdWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VfZm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgfSwgNDAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG59OyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4qIEEgdXRpbGl0eSBvYmplY3QgaGVscGluZyB3aXRoIHZhbmlsbGEgamF2YXNjcmlwdCAodHJ5aW5nIHRvIG1pbWljIGpRdWVyeSlcbiAqL1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL2luYy91dGlscy5qcycpLFxuICAgIG5ld3Nfd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXdzX3dyYXBwZXInKSxcblxuICAgIGZpbHRlcl90eXBlcyA9IFtcbiAgICAgICAge25hbWU6ICcuanNfZGF0ZScsICB0eXBlOiAnZGF0ZScsICB2YWx1ZTogJyd9LFxuICAgICAgICB7bmFtZTogJy5qc19tZWRpYScsIHR5cGU6ICdtZWRpYScsIHZhbHVlOiAnJ31cbiAgICBdLFxuXG5cbiAgICB0b2dnbGVfbmV3cyAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZpbHRlcl9zdHJpbmcgPSAnJztcbiAgICAgICAgLy8gaWYgd2UgbmVlZCB0byBoaWRlIHNvbWV0aGluZyB3ZSBmaXJzdCBzZXQgdGhlbSBBTEwgdG8gYmxvY2tcbiAgICAgICAgbmV3c193cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2VtcHR5Jyk7XG4gICAgICAgIHV0aWwuZm9yRWFjaChuZXdzX3dyYXBwZXIucXVlcnlTZWxlY3RvckFsbCgnLm5ld3MnKSwgZnVuY3Rpb24oaW5kZXgsIGVsKSB7XG4gICAgICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBmaWx0ZXJfdHlwZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGZpbHRlcl9zdHJpbmcgKz0gZmlsdGVyX3R5cGVzW2ldLnZhbHVlO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLyB3ZSBzaG93IG9ubHkgdGhlIG9uZXMgdGhhdCBmdWxmaWxsIHRoZSBmaWx0ZXIgY3JpdGVyaWFcbiAgICAgICAgY29uc29sZS5sb2cobmV3c193cmFwcGVyKTtcbiAgICAgICAgY29uc29sZS5sb2coJy5uZXdzJyArIGZpbHRlcl9zdHJpbmcpO1xuICAgICAgICBjb25zb2xlLmxvZyhuZXdzX3dyYXBwZXIucXVlcnlTZWxlY3RvckFsbCgnLm5ld3MnICsgZmlsdGVyX3N0cmluZykpO1xuICAgICAgICB1dGlsLmZvckVhY2gobmV3c193cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5uZXdzJyArIGZpbHRlcl9zdHJpbmcpLCBmdW5jdGlvbihpbmRleCwgZWwpIHtcbiAgICAgICAgICAgIG5ld3Nfd3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdlbXB0eScpO1xuICAgICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cblxuICAgIGZpbHRlcl9mbiA9IGZ1bmN0aW9uKGZpbHRlcl90eXBlKSB7XG4gICAgICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZmlsdGVyX3R5cGUubmFtZSkpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZmlsdGVyX3R5cGUubmFtZSArICcgLmRyb3Bkb3duLW1lbnUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVmYXVsdF90ZXh0ID0gJycsIGRhdGFfdmFsdWUgPSAnJywgc3Bhbl90ZXh0ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmKGUudGFyZ2V0ICYmIGUudGFyZ2V0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdhJykge1xuICAgICAgICAgICAgICAgICAgICBzcGFuX3RleHQgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGZpbHRlcl90eXBlLm5hbWUgKyAnID4gYnV0dG9uIC50ZXh0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRfdGV4dCA9IHNwYW5fdGV4dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dCcpO1xuICAgICAgICAgICAgICAgICAgICBkYXRhX3ZhbHVlICAgPSBlLnRhcmdldC5kYXRhc2V0LnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGFfdmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJfdHlwZS52YWx1ZSAgID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFuX3RleHQuaW5uZXJIVE1MID0gZGVmYXVsdF90ZXh0O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyX3R5cGUudmFsdWUgICA9ICdbZGF0YS1yYXctJyArIGZpbHRlcl90eXBlLnR5cGUgICsgJz1cIicgKyAgZGF0YV92YWx1ZSArICdcIl0nO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Bhbl90ZXh0LmlubmVySFRNTCA9IGRhdGFfdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVfbmV3cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IGZpbHRlcl90eXBlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBmaWx0ZXJfZm4oZmlsdGVyX3R5cGVzW2ldKTtcbiAgICB9XG5cbiAgICAvKmlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19kYXRlJykpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX2RhdGUgLmRyb3Bkb3duLW1lbnUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9ICcnO1xuXG4gICAgICAgICAgICBpZihlLnRhcmdldCAmJiBlLnRhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYScpIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0X3RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanNfZGF0ZSA+IGJ1dHRvbiAudGV4dCcpLmdldEF0dHJpYnV0ZSgnZGF0YS10ZXh0Jyk7XG5cbiAgICAgICAgICAgICAgICBpZihlLnRhcmdldC5kYXRhc2V0LnZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICB2YXJfZGF0ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanNfZGF0ZSA+IGJ1dHRvbiAudGV4dCcpLmlubmVySFRNTCA9IGRlZmF1bHRfdGV4dDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXJfZGF0ZSA9ICdbZGF0YS1yYXctZGF0ZT1cIicgKyAgZS50YXJnZXQuZGF0YXNldC52YWx1ZSArICdcIl0nO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanNfZGF0ZSA+IGJ1dHRvbiAudGV4dCcpLmlubmVySFRNTCA9IGRlZmF1bHRfdGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG9nZ2xlX25ld3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSAvLyBlbmQgb2YganNfZGF0ZVxuXG4gICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX21lZGlhJykpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX21lZGlhIC5kcm9wZG93bi1tZW51JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZihlLnRhcmdldCAmJiBlLnRhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYScpIHtcbiAgICAgICAgICAgICAgICBpZihlLnRhcmdldC5kYXRhc2V0LnZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICB2YXJfbWVkaWEgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX21lZGlhID4gYnV0dG9uIC50ZXh0JykuaW5uZXJIVE1MID0gJ0Nob29zZSBhIG1lZGlhJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXJfbWVkaWEgPSAnW2RhdGEtcmF3LW1lZGlhPVwiJyArICBlLnRhcmdldC5kYXRhc2V0LnZhbHVlICsgJ1wiXSc7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc19tZWRpYSA+IGJ1dHRvbiAudGV4dCcpLmlubmVySFRNTCA9IGUudGFyZ2V0LmRhdGFzZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvZ2dsZV9uZXdzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gLy8gZW5kIG9mIGpzX21lZGlhKi9cbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi9pbmMvdXRpbHMuanMnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIC8qKlxuICAgICogQWRkaW5nIEZvbnQgQXdlc29tZSBhbmQgbW9zdCB1c2VkIGdvb2dsZSBmb250IE9wZW4gU2Fuc1xuICAgICAqL1xuICAgIHV0aWwuZXh0cmFfc3R5bGUoJ2h0dHA6Ly9uZXRkbmEuYm9vdHN0cmFwY2RuLmNvbS9mb250LWF3ZXNvbWUvNC4zLjAvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzJyk7XG4gICAgdXRpbC5leHRyYV9zdHlsZSgnaHR0cDovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9T3BlbitTYW5zJyk7XG5cblxuICAgIC8qKlxuICAgICogTWVudSBzaG93aW5nIC8gaGlkZGluZyBvbiBzbWFsbCBzY3JlZW5zICg8NzY4cHgpIC0gaW4gYWRkaXRpb24gd2l0aCB0aGUgY3NzXG4gICAgICogYW5kIGEgc3RhbmRhcmQgaHRtbCBzdHJ1Y3R1cmUgKG5hdiA+IGJ1dHRvbiArIGEqbilcbiAgICAgKi9cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yb2xlPVwibWFpbl9tZW51XCJdIGJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLnBhcmVudE5vZGUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgLyoqXG4gICAgKiBHZXR0aW5nIHRoZSBvZmZzZXQgb2YgYSBET00gZWxlbWVudFxuICAgICAqXG4gICAgICogIyMjIEV4YW1wbGVzOlxuICAgICAqXG4gICAgICogICAgIHV0aWwub2Zmc2V0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5teV9lbGVtZW50JykpO1xuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRvbSBlbGVtZW50IChub3QganF1ZXJ5IGVsZW1lbnQpXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBhIHRvcCAvIGxlZnQgb2JqZWN0XG4gICAgICovXG4gICAgb2Zmc2V0OiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgdmFyIHRvcCAgPSAwLFxuICAgICAgICAgICAgbGVmdCA9IDA7XG5cbiAgICAgICAgaWYob2JqLm9mZnNldFBhcmVudCkge1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIHRvcCAgKz0gb2JqLm9mZnNldFRvcDtcbiAgICAgICAgICAgICAgICBsZWZ0ICs9IG9iai5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgfSB3aGlsZSAob2JqID0gb2JqLm9mZnNldFBhcmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgdG9wOiB0b3AsIGxlZnQ6IGxlZnQgfTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiBBZGRpbmcgZHluYW1pY2FsbHkgYSBuZXcgZXh0ZXJuYWwgc3R5bGUgaW50byB0aGUgaHRtbFxuICAgICAqXG4gICAgICogIyMjIEV4YW1wbGVzOlxuICAgICAqXG4gICAgICogICAgIHV0aWwuZXh0cmFfc3R5bGUoJ2h0dHA6Ly9uZXRkbmEuYm9vdHN0cmFwY2RuLmNvbS9mb250LWF3ZXNvbWUvNC4wLjMvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzJyk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdGhlIGFjdHVhbCB1cmwgKGxvY2FsIG9yIGh0dHApXG4gICAgICovXG4gICAgZXh0cmFfc3R5bGU6IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICB2YXIgbGlua19jc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuICAgICAgICBsaW5rX2Nzcy5zZXRBdHRyaWJ1dGUoXCJyZWxcIiwgXCJzdHlsZXNoZWV0XCIpO1xuICAgICAgICBsaW5rX2Nzcy5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHVybCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChsaW5rX2Nzcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICogTG9vcGluZyB0aHJvdWdoIERPTSBOb2RlTGlzdFxuICAgICAqXG4gICAgICogIyMjIEV4YW1wbGVzOlxuICAgICAqXG4gICAgICogICAgIGZvckVhY2goZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGknKSwgZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkgeyBjb25zb2xlLmxvZyhpbmRleCwgdmFsdWUpOyB9KTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXksIEZ1bmN0aW9uLCBTY29wZX1cbiAgICAgKi9cbiAgICBmb3JFYWNoOiBmdW5jdGlvbiAoYXJyYXksIGNhbGxiYWNrLCBzY29wZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2NvcGUsIGksIGFycmF5W2ldKTtcbiAgICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICogQUpBWFxuICAgICAqXG4gICAgICogIyMjIEV4YW1wbGVzOlxuICAgICAqXG4gICAgICogICAgICB1dGlscy5hamF4LmdldCh7XG4gICAgICogICAgICAgICAgdXJsOiAgICAgJy90ZXN0LnBocCcsXG4gICAgICogICAgICAgICAgZGF0YTogICAge2ZvbzogJ2Jhcid9LFxuICAgICAqICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCkgeyAvLyB3aGF0IHRvIGRvIG9uIHN1Y2Nlc3M7IH0sXG4gICAgICogICAgICAgICAgZXJyb3I6ICAgZnVuY3Rpb24oKSB7IC8vIHdoYXQgdG8gZG8gb24gZXJyb3I7IH1cbiAgICAgKiAgICAgIH0pO1xuICAgICAqL1xuICAgIGFqYXg6IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbmRfZm4gPSBmdW5jdGlvbih1cmwsIGRhdGEsIG1ldGhvZCwgc3VjY2Vzc19mbiwgZXJyb3JfZm4pIHtcbiAgICAgICAgICAgICAgICB2YXIgeCAgICAgICAgICA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzX2ZuID0gc3VjY2Vzc19mbiB8fCBmdW5jdGlvbigpIHt9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcl9mbiAgID0gZXJyb3JfZm4gfHwgZnVuY3Rpb24oKSB7fTtcblxuICAgICAgICAgICAgICAgIHgub3BlbihtZXRob2QsIHVybCk7XG4gICAgICAgICAgICAgICAgeC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHgucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih4LnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc19mbih4LnJlc3BvbnNlVGV4dClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JfZm4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYobWV0aG9kID09PSAnUE9TVCcpIHtcbiAgICAgICAgICAgICAgICAgICAgeC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHguc2VuZChkYXRhKTtcbiAgICAgICAgICAgIH0sXG5cblxuICAgICAgICAgICAgcG9zdF9mbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHZhciBxdWVyeSA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gb2JqLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmouZGF0YVtrZXldKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vICAgIHVybCAgICAgICAgIGRhdGEgICAgICAgICAgIG1ldGhvZCAgICBzdWNjZXNzX2ZuICAgICBlcnJvcl9mblxuICAgICAgICAgICAgICAgIHNlbmRfZm4ob2JqLnVybCwgcXVlcnkuam9pbignJicpLCAnUE9TVCcsIG9iai5zdWNjZXNzLCBvYmouZXJyb3IpO1xuICAgICAgICAgICAgfSxcblxuXG4gICAgICAgICAgICBnZXRfZm4gPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICB2YXIgcXVlcnkgPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIG9iai5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5LnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQob2JqLmRhdGFba2V5XSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgdXJsICAgICAgICAgICAgICAgICAgICAgZGF0YSAgbWV0aG9kICAgIHN1Y2Nlc3NfZm4gICAgIGVycm9yX2ZuXG4gICAgICAgICAgICAgICAgc2VuZF9mbihvYmoudXJsICsgJz8nICsgcXVlcnkuam9pbignJicpLCBudWxsLCAnR0VUJywgb2JqLnN1Y2Nlc3MsIG9iai5lcnJvcik7XG4gICAgICAgICAgICB9LFxuXG5cbiAgICAgICAgICAgIHB1dF9mbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHZhciBxdWVyeSA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gb2JqLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmouZGF0YVtrZXldKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vICAgICAgIHVybCAgICAgICAgIGRhdGEgICAgICAgICBtZXRob2QgIHN1Y2Nlc3NfZm4gICBlcnJvcl9mblxuICAgICAgICAgICAgICAgIHNlbmRfZm4ob2JqLnVybCwgcXVlcnkuam9pbignJicpLCAnUFVUJywgb2JqLnN1Y2Nlc3MsIG9iai5lcnJvcik7XG4gICAgICAgICAgICB9LFxuXG5cbiAgICAgICAgICAgIGRlbGV0ZV9mbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHZhciBxdWVyeSA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gb2JqLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmouZGF0YVtrZXldKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vICAgIHVybCAgICAgICAgIGRhdGEgICAgICAgICAgICBtZXRob2QgICAgc3VjY2Vzc19mbiAgICAgZXJyb3JfZm5cbiAgICAgICAgICAgICAgICBzZW5kX2ZuKG9iai51cmwsIHF1ZXJ5LmpvaW4oJyYnKSwgJ0RFTEVURScsIG9iai5zdWNjZXNzLCBvYmouZXJyb3IpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge3Bvc3Q6IHBvc3RfZm4sIGdldDogZ2V0X2ZuLCBwdXQ6IHB1dF9mbiwgZGVsZXRlOiBkZWxldGVfZm59O1xuICAgIH0pKClcbn07Il19
