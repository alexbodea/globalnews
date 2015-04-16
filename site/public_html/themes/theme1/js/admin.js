(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';


var utils         = require('./inc/utils.js');


document.addEventListener("DOMContentLoaded", function() {
    var textarea_index = 0,

        duplicate = function(row) {
            var new_textarea = row.querySelectorAll('textarea')[row.querySelectorAll('textarea').length - 1].cloneNode(true);

            new_textarea.name = 'insert_' + textarea_index + '_' + new_textarea.name.slice(-2);
            new_textarea.value = '';
            row.appendChild(new_textarea);
        };


    utils.forEach(document.querySelectorAll('nav button'), function (index, button) {
        var buttons = document.querySelectorAll('nav button');

        button.addEventListener('click', function() {
            var clicked_btn = this;
            if(!clicked_btn.classList.contains('active')) {
                if(document.querySelector('.container.active')) {
                    document.querySelector('nav button.active').classList.remove('active');
                    document.querySelector('.container.active').classList.remove('active');
                }
                clicked_btn.classList.add('active');
                document.querySelectorAll('.container')[Array.prototype.slice.call(buttons).indexOf(clicked_btn) + 1].classList.add('active');
            }
        });
    });


    if(document.querySelector('.add_new_phrase')) {
        document.querySelector('.add_new_phrase').addEventListener('click', function(e) {
            utils.forEach(document.querySelectorAll('.new_phrase_wrapper .row > div'), function (index, value) {
                duplicate(value);
            });
            textarea_index++;
            e.preventDefault();
        });
    }
});
},{"./inc/utils.js":2}],2:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiLi9kZXYvanMvYWRtaW4uanMiLCJNOi9Xb3JrL3d3dy9wcm9qZWN0cy9jb2ZmZWUybmV3cy5jb20vZnJvbnRfZW5kL2Rldi9qcy9pbmMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG5cclxudmFyIHV0aWxzICAgICAgICAgPSByZXF1aXJlKCcuL2luYy91dGlscy5qcycpO1xyXG5cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHRleHRhcmVhX2luZGV4ID0gMCxcclxuXHJcbiAgICAgICAgZHVwbGljYXRlID0gZnVuY3Rpb24ocm93KSB7XHJcbiAgICAgICAgICAgIHZhciBuZXdfdGV4dGFyZWEgPSByb3cucXVlcnlTZWxlY3RvckFsbCgndGV4dGFyZWEnKVtyb3cucXVlcnlTZWxlY3RvckFsbCgndGV4dGFyZWEnKS5sZW5ndGggLSAxXS5jbG9uZU5vZGUodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICBuZXdfdGV4dGFyZWEubmFtZSA9ICdpbnNlcnRfJyArIHRleHRhcmVhX2luZGV4ICsgJ18nICsgbmV3X3RleHRhcmVhLm5hbWUuc2xpY2UoLTIpO1xyXG4gICAgICAgICAgICBuZXdfdGV4dGFyZWEudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKG5ld190ZXh0YXJlYSk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgdXRpbHMuZm9yRWFjaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCduYXYgYnV0dG9uJyksIGZ1bmN0aW9uIChpbmRleCwgYnV0dG9uKSB7XHJcbiAgICAgICAgdmFyIGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCduYXYgYnV0dG9uJyk7XHJcblxyXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgY2xpY2tlZF9idG4gPSB0aGlzO1xyXG4gICAgICAgICAgICBpZighY2xpY2tlZF9idG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhaW5lci5hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ25hdiBidXR0b24uYWN0aXZlJykuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhaW5lci5hY3RpdmUnKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNsaWNrZWRfYnRuLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRhaW5lcicpW0FycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGJ1dHRvbnMpLmluZGV4T2YoY2xpY2tlZF9idG4pICsgMV0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkX25ld19waHJhc2UnKSkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRfbmV3X3BocmFzZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB1dGlscy5mb3JFYWNoKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5uZXdfcGhyYXNlX3dyYXBwZXIgLnJvdyA+IGRpdicpLCBmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBkdXBsaWNhdGUodmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGV4dGFyZWFfaW5kZXgrKztcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTsiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgLyoqXG4gICAgKiBHZXR0aW5nIHRoZSBvZmZzZXQgb2YgYSBET00gZWxlbWVudFxuICAgICAqXG4gICAgICogIyMjIEV4YW1wbGVzOlxuICAgICAqXG4gICAgICogICAgIHV0aWwub2Zmc2V0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5teV9lbGVtZW50JykpO1xuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRvbSBlbGVtZW50IChub3QganF1ZXJ5IGVsZW1lbnQpXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBhIHRvcCAvIGxlZnQgb2JqZWN0XG4gICAgICovXG4gICAgb2Zmc2V0OiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgdmFyIHRvcCAgPSAwLFxuICAgICAgICAgICAgbGVmdCA9IDA7XG5cbiAgICAgICAgaWYob2JqLm9mZnNldFBhcmVudCkge1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIHRvcCAgKz0gb2JqLm9mZnNldFRvcDtcbiAgICAgICAgICAgICAgICBsZWZ0ICs9IG9iai5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgfSB3aGlsZSAob2JqID0gb2JqLm9mZnNldFBhcmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgdG9wOiB0b3AsIGxlZnQ6IGxlZnQgfTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiBBZGRpbmcgZHluYW1pY2FsbHkgYSBuZXcgZXh0ZXJuYWwgc3R5bGUgaW50byB0aGUgaHRtbFxuICAgICAqXG4gICAgICogIyMjIEV4YW1wbGVzOlxuICAgICAqXG4gICAgICogICAgIHV0aWwuZXh0cmFfc3R5bGUoJ2h0dHA6Ly9uZXRkbmEuYm9vdHN0cmFwY2RuLmNvbS9mb250LWF3ZXNvbWUvNC4wLjMvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzJyk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdGhlIGFjdHVhbCB1cmwgKGxvY2FsIG9yIGh0dHApXG4gICAgICovXG4gICAgZXh0cmFfc3R5bGU6IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICB2YXIgbGlua19jc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuICAgICAgICBsaW5rX2Nzcy5zZXRBdHRyaWJ1dGUoXCJyZWxcIiwgXCJzdHlsZXNoZWV0XCIpO1xuICAgICAgICBsaW5rX2Nzcy5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHVybCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChsaW5rX2Nzcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICogTG9vcGluZyB0aHJvdWdoIERPTSBOb2RlTGlzdFxuICAgICAqXG4gICAgICogIyMjIEV4YW1wbGVzOlxuICAgICAqXG4gICAgICogICAgIGZvckVhY2goZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGknKSwgZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkgeyBjb25zb2xlLmxvZyhpbmRleCwgdmFsdWUpOyB9KTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXksIEZ1bmN0aW9uLCBTY29wZX1cbiAgICAgKi9cbiAgICBmb3JFYWNoOiBmdW5jdGlvbiAoYXJyYXksIGNhbGxiYWNrLCBzY29wZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2NvcGUsIGksIGFycmF5W2ldKTtcbiAgICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICogQUpBWFxuICAgICAqXG4gICAgICogIyMjIEV4YW1wbGVzOlxuICAgICAqXG4gICAgICogICAgICB1dGlscy5hamF4LmdldCh7XG4gICAgICogICAgICAgICAgdXJsOiAgICAgJy90ZXN0LnBocCcsXG4gICAgICogICAgICAgICAgZGF0YTogICAge2ZvbzogJ2Jhcid9LFxuICAgICAqICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCkgeyAvLyB3aGF0IHRvIGRvIG9uIHN1Y2Nlc3M7IH0sXG4gICAgICogICAgICAgICAgZXJyb3I6ICAgZnVuY3Rpb24oKSB7IC8vIHdoYXQgdG8gZG8gb24gZXJyb3I7IH1cbiAgICAgKiAgICAgIH0pO1xuICAgICAqL1xuICAgIGFqYXg6IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbmRfZm4gPSBmdW5jdGlvbih1cmwsIGRhdGEsIG1ldGhvZCwgc3VjY2Vzc19mbiwgZXJyb3JfZm4pIHtcbiAgICAgICAgICAgICAgICB2YXIgeCAgICAgICAgICA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzX2ZuID0gc3VjY2Vzc19mbiB8fCBmdW5jdGlvbigpIHt9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcl9mbiAgID0gZXJyb3JfZm4gfHwgZnVuY3Rpb24oKSB7fTtcblxuICAgICAgICAgICAgICAgIHgub3BlbihtZXRob2QsIHVybCk7XG4gICAgICAgICAgICAgICAgeC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHgucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih4LnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc19mbih4LnJlc3BvbnNlVGV4dClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JfZm4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYobWV0aG9kID09PSAnUE9TVCcpIHtcbiAgICAgICAgICAgICAgICAgICAgeC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHguc2VuZChkYXRhKTtcbiAgICAgICAgICAgIH0sXG5cblxuICAgICAgICAgICAgcG9zdF9mbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHZhciBxdWVyeSA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gb2JqLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmouZGF0YVtrZXldKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vICAgIHVybCAgICAgICAgIGRhdGEgICAgICAgICAgIG1ldGhvZCAgICBzdWNjZXNzX2ZuICAgICBlcnJvcl9mblxuICAgICAgICAgICAgICAgIHNlbmRfZm4ob2JqLnVybCwgcXVlcnkuam9pbignJicpLCAnUE9TVCcsIG9iai5zdWNjZXNzLCBvYmouZXJyb3IpO1xuICAgICAgICAgICAgfSxcblxuXG4gICAgICAgICAgICBnZXRfZm4gPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICB2YXIgcXVlcnkgPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvcih2YXIga2V5IGluIG9iai5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5LnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQob2JqLmRhdGFba2V5XSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgdXJsICAgICAgICAgICAgICAgICAgICAgZGF0YSAgbWV0aG9kICAgIHN1Y2Nlc3NfZm4gICAgIGVycm9yX2ZuXG4gICAgICAgICAgICAgICAgc2VuZF9mbihvYmoudXJsICsgJz8nICsgcXVlcnkuam9pbignJicpLCBudWxsLCAnR0VUJywgb2JqLnN1Y2Nlc3MsIG9iai5lcnJvcik7XG4gICAgICAgICAgICB9LFxuXG5cbiAgICAgICAgICAgIHB1dF9mbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHZhciBxdWVyeSA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gb2JqLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmouZGF0YVtrZXldKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vICAgICAgIHVybCAgICAgICAgIGRhdGEgICAgICAgICBtZXRob2QgIHN1Y2Nlc3NfZm4gICBlcnJvcl9mblxuICAgICAgICAgICAgICAgIHNlbmRfZm4ob2JqLnVybCwgcXVlcnkuam9pbignJicpLCAnUFVUJywgb2JqLnN1Y2Nlc3MsIG9iai5lcnJvcik7XG4gICAgICAgICAgICB9LFxuXG5cbiAgICAgICAgICAgIGRlbGV0ZV9mbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHZhciBxdWVyeSA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gb2JqLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmouZGF0YVtrZXldKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vICAgIHVybCAgICAgICAgIGRhdGEgICAgICAgICAgICBtZXRob2QgICAgc3VjY2Vzc19mbiAgICAgZXJyb3JfZm5cbiAgICAgICAgICAgICAgICBzZW5kX2ZuKG9iai51cmwsIHF1ZXJ5LmpvaW4oJyYnKSwgJ0RFTEVURScsIG9iai5zdWNjZXNzLCBvYmouZXJyb3IpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4ge3Bvc3Q6IHBvc3RfZm4sIGdldDogZ2V0X2ZuLCBwdXQ6IHB1dF9mbiwgZGVsZXRlOiBkZWxldGVfZm59O1xuICAgIH0pKClcbn07Il19
