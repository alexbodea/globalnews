(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';


var utils         = require('./util.js');


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
},{"./util.js":2}],2:[function(require,module,exports){
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiLi9kZXYvanMvYWRtaW4uanMiLCJNOi9Xb3JrL3d3dy9wcm9qZWN0cy9jb2ZmZWUybmV3cy5jb20vZnJvbnRfZW5kL2Rldi9qcy91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG5cclxudmFyIHV0aWxzICAgICAgICAgPSByZXF1aXJlKCcuL3V0aWwuanMnKTtcclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcclxuICAgIHZhciB0ZXh0YXJlYV9pbmRleCA9IDAsXHJcblxyXG4gICAgICAgIGR1cGxpY2F0ZSA9IGZ1bmN0aW9uKHJvdykge1xyXG4gICAgICAgICAgICB2YXIgbmV3X3RleHRhcmVhID0gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RleHRhcmVhJylbcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RleHRhcmVhJykubGVuZ3RoIC0gMV0uY2xvbmVOb2RlKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgbmV3X3RleHRhcmVhLm5hbWUgPSAnaW5zZXJ0XycgKyB0ZXh0YXJlYV9pbmRleCArICdfJyArIG5ld190ZXh0YXJlYS5uYW1lLnNsaWNlKC0yKTtcclxuICAgICAgICAgICAgbmV3X3RleHRhcmVhLnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChuZXdfdGV4dGFyZWEpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgIHV0aWxzLmZvckVhY2goZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbmF2IGJ1dHRvbicpLCBmdW5jdGlvbiAoaW5kZXgsIGJ1dHRvbikge1xyXG4gICAgICAgIHZhciBidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbmF2IGJ1dHRvbicpO1xyXG5cclxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGNsaWNrZWRfYnRuID0gdGhpcztcclxuICAgICAgICAgICAgaWYoIWNsaWNrZWRfYnRuLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXIuYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCduYXYgYnV0dG9uLmFjdGl2ZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXIuYWN0aXZlJykuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjbGlja2VkX2J0bi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb250YWluZXInKVtBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChidXR0b25zKS5pbmRleE9mKGNsaWNrZWRfYnRuKSArIDFdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZF9uZXdfcGhyYXNlJykpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkX25ld19waHJhc2UnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdXRpbHMuZm9yRWFjaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubmV3X3BocmFzZV93cmFwcGVyIC5yb3cgPiBkaXYnKSwgZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgZHVwbGljYXRlKHZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRleHRhcmVhX2luZGV4Kys7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIC8qKlxuICAgICogR2V0dGluZyB0aGUgb2Zmc2V0IG9mIGEgRE9NIGVsZW1lbnRcbiAgICAgKlxuICAgICAqICMjIyBFeGFtcGxlczpcbiAgICAgKlxuICAgICAqICAgICB1dGlsLm9mZnNldChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXlfZWxlbWVudCcpKTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkb20gZWxlbWVudCAobm90IGpxdWVyeSBlbGVtZW50KVxuICAgICAqIEByZXR1cm4ge09iamVjdH0gYSB0b3AgLyBsZWZ0IG9iamVjdFxuICAgICAqL1xuICAgIG9mZnNldDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHZhciB0b3AgID0gMCxcbiAgICAgICAgICAgIGxlZnQgPSAwO1xuXG4gICAgICAgIGlmKG9iai5vZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICB0b3AgICs9IG9iai5vZmZzZXRUb3A7XG4gICAgICAgICAgICAgICAgbGVmdCArPSBvYmoub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIH0gd2hpbGUgKG9iaiA9IG9iai5vZmZzZXRQYXJlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHRvcDogdG9wLCBsZWZ0OiBsZWZ0IH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICogQWRkaW5nIGR5bmFtaWNhbGx5IGEgbmV3IGV4dGVybmFsIHN0eWxlIGludG8gdGhlIGh0bWxcbiAgICAgKlxuICAgICAqICMjIyBFeGFtcGxlczpcbiAgICAgKlxuICAgICAqICAgICB1dGlsLmV4dHJhX3N0eWxlKCdodHRwOi8vbmV0ZG5hLmJvb3RzdHJhcGNkbi5jb20vZm9udC1hd2Vzb21lLzQuMC4zL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzcycpO1xuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRoZSBhY3R1YWwgdXJsIChsb2NhbCBvciBodHRwKVxuICAgICAqL1xuICAgIGV4dHJhX3N0eWxlOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgdmFyIGxpbmtfY3NzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cbiAgICAgICAgbGlua19jc3Muc2V0QXR0cmlidXRlKFwicmVsXCIsIFwic3R5bGVzaGVldFwiKTtcbiAgICAgICAgbGlua19jc3Muc2V0QXR0cmlidXRlKFwiaHJlZlwiLCB1cmwpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQobGlua19jc3MpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAqIExvb3BpbmcgdGhyb3VnaCBET00gTm9kZUxpc3RcbiAgICAgKlxuICAgICAqICMjIyBFeGFtcGxlczpcbiAgICAgKlxuICAgICAqICAgICBmb3JFYWNoKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyksIGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHsgY29uc29sZS5sb2coaW5kZXgsIHZhbHVlKTsgfSk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5LCBGdW5jdGlvbiwgU2NvcGV9XG4gICAgICovXG4gICAgZm9yRWFjaDogZnVuY3Rpb24gKGFycmF5LCBjYWxsYmFjaywgc2NvcGUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNjb3BlLCBpLCBhcnJheVtpXSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAqIEFKQVhcbiAgICAgKlxuICAgICAqICMjIyBFeGFtcGxlczpcbiAgICAgKlxuICAgICAqICAgICAgdXRpbHMuYWpheC5nZXQoe1xuICAgICAqICAgICAgICAgIHVybDogICAgICcvdGVzdC5waHAnLFxuICAgICAqICAgICAgICAgIGRhdGE6ICAgIHtmb286ICdiYXInfSxcbiAgICAgKiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpIHsgLy8gd2hhdCB0byBkbyBvbiBzdWNjZXNzOyB9LFxuICAgICAqICAgICAgICAgIGVycm9yOiAgIGZ1bmN0aW9uKCkgeyAvLyB3aGF0IHRvIGRvIG9uIGVycm9yOyB9XG4gICAgICogICAgICB9KTtcbiAgICAgKlxuICAgICAqIFRPRE9cbiAgICAgKiAgICAgIERFTEVURSBhbmQgVVBEQVRFIChtZXRob2RzKVxuICAgICAqICAgICAgc2VuZCBUWVBFXG4gICAgICogICAgICByZXR1cm4gVFlQRVxuICAgICAqL1xuICAgIGFqYXg6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaHR0cF9yZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSxcbiAgICAgICAgICAgIGdldF9mbiAgID0gbnVsbCxcbiAgICAgICAgICAgIHBvc3RfZm4gID0gbnVsbCxcbiAgICAgICAgICAgIHNlbmRfZm4gID0gbnVsbDtcblxuICAgICAgICBzZW5kX2ZuID0gZnVuY3Rpb24odXJsLCBkYXRhLCBtZXRob2QsIHN1Y2Nlc3NfZm4sIGVycm9yX2ZuLCBzeW5jKSB7XG4gICAgICAgICAgICB2YXIgeCA9IGh0dHBfcmVxO1xuICAgICAgICAgICAgeC5vcGVuKG1ldGhvZCwgdXJsLCBzeW5jKTtcbiAgICAgICAgICAgIHgub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHgucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHguc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NfZm4oeC5yZXNwb25zZVRleHQpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcl9mbigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmKG1ldGhvZCA9PT0gJ1BPU1QnKSB7XG4gICAgICAgICAgICAgICAgeC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB4LnNlbmQoZGF0YSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZ2V0X2ZuID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnkgPSBbXTtcblxuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gb2JqLmRhdGEpIHtcbiAgICAgICAgICAgICAgICBxdWVyeS5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9iai5kYXRhW2tleV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICB1cmwgICAgICAgICAgICAgIGRhdGEgIG1ldGhvZCAgICBzdWNjZXNzX2ZuICAgICBlcnJvcl9mbiAgICAgICAgc3luY1xuICAgICAgICAgICAgc2VuZF9mbihvYmoudXJsICsgJz8nICsgcXVlcnkuam9pbignJicpLCBudWxsLCAnR0VUJywgb2JqLnN1Y2Nlc3MsIG9iai5lcnJvciwgb2JqLnN5bmMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHBvc3RfZm4gPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgIHZhciBxdWVyeSA9IFtdO1xuXG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBvYmouZGF0YSkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5LnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQob2JqLmRhdGFba2V5XSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgdXJsICAgICAgICAgZGF0YSAgICAgICAgIG1ldGhvZCAgICBzdWNjZXNzX2ZuICAgICBlcnJvcl9mbiAgICAgICAgc3luY1xuICAgICAgICAgICAgc2VuZF9mbihvYmoudXJsLCBxdWVyeS5qb2luKCcmJyksICdQT1NUJywgb2JqLnN1Y2Nlc3MsIG9iai5lcnJvciwgb2JqLnN5bmMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7Z2V0OiBnZXRfZm4sIHBvc3Q6IHBvc3RfZm59O1xuICAgIH1cbn07Il19
