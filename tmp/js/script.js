(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./dev/js/app.js":[function(require,module,exports){
/*!#############################
#                              #
#      by Claudiu Limban       #
#  http://sofuxro.elance.com   #
#                              #
################################*/


'use strict';


/**
* A utility object helping with vanilla javascript (trying to mimic jQuery)
 */
var util = require('./util.js');


/** =======================================================================================
* Where everything happens
 */
document.addEventListener("DOMContentLoaded", function() {

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


    /**
    * Go up (from the footer)
     */

    document.querySelector('footer [data-role="go_up"]').addEventListener('click', function(e) {
        $('html, body').animate({'scrollTop': '0px'}, 500);
        e.preventDefault();
    });

});
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
    offset : function(obj) {
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
    extra_style : function(url) {
        var link_css = document.createElement("link");

        link_css.setAttribute("rel", "stylesheet");
        link_css.setAttribute("href", url);
        document.getElementsByTagName("head")[0].appendChild(link_css);
    }
};
},{}]},{},["./dev/js/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jbGF1ZGl1bGltYmFuL1dvcmsvZ2xvYmFsX25ld3MvZ2l0X2Zyb250X2VuZC9zaXRlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuL2Rldi9qcy9hcHAuanMiLCIvVXNlcnMvY2xhdWRpdWxpbWJhbi9Xb3JrL2dsb2JhbF9uZXdzL2dpdF9mcm9udF9lbmQvc2l0ZS9kZXYvanMvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qISMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI1xuIyAgICAgIGJ5IENsYXVkaXUgTGltYmFuICAgICAgICNcbiMgIGh0dHA6Ly9zb2Z1eHJvLmVsYW5jZS5jb20gICAjXG4jICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMqL1xuXG5cbid1c2Ugc3RyaWN0JztcblxuXG4vKipcbiogQSB1dGlsaXR5IG9iamVjdCBoZWxwaW5nIHdpdGggdmFuaWxsYSBqYXZhc2NyaXB0ICh0cnlpbmcgdG8gbWltaWMgalF1ZXJ5KVxuICovXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbC5qcycpO1xuXG5cbi8qKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiogV2hlcmUgZXZlcnl0aGluZyBoYXBwZW5zXG4gKi9cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgKiBBZGRpbmcgRm9udCBBd2Vzb21lIGFuZCBtb3N0IHVzZWQgZ29vZ2xlIGZvbnQgT3BlbiBTYW5zXG4gICAgICovXG4gICAgdXRpbC5leHRyYV9zdHlsZSgnaHR0cDovL25ldGRuYS5ib290c3RyYXBjZG4uY29tL2ZvbnQtYXdlc29tZS80LjAuMy9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnKTtcbiAgICB1dGlsLmV4dHJhX3N0eWxlKCdodHRwOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1PcGVuK1NhbnMnKTtcblxuXG4gICAgLyoqXG4gICAgKiBNZW51IHNob3dpbmcgLyBoaWRkaW5nIG9uIHNtYWxsIHNjcmVlbnMgKDw3NjhweCkgLSBpbiBhZGRpdGlvbiB3aXRoIHRoZSBjc3NcbiAgICAgKiBhbmQgYSBzdGFuZGFyZCBodG1sIHN0cnVjdHVyZSAobmF2ID4gYnV0dG9uICsgYSpuKVxuICAgICAqL1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJvbGU9XCJtYWluX21lbnVcIl0gYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRoaXMucGFyZW50Tm9kZS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG5cbiAgICAvKipcbiAgICAqIEdvIHVwIChmcm9tIHRoZSBmb290ZXIpXG4gICAgICovXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb290ZXIgW2RhdGEtcm9sZT1cImdvX3VwXCJdJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsnc2Nyb2xsVG9wJzogJzBweCd9LCA1MDApO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbn0pOyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICAvKipcbiAgICAqIEdldHRpbmcgdGhlIG9mZnNldCBvZiBhIERPTSBlbGVtZW50XG4gICAgICpcbiAgICAgKiAjIyMgRXhhbXBsZXM6XG4gICAgICpcbiAgICAgKiAgICAgdXRpbC5vZmZzZXQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm15X2VsZW1lbnQnKSk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZG9tIGVsZW1lbnQgKG5vdCBqcXVlcnkgZWxlbWVudClcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGEgdG9wIC8gbGVmdCBvYmplY3RcbiAgICAgKi9cbiAgICBvZmZzZXQgOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgdmFyIHRvcCAgPSAwLFxuICAgICAgICAgICAgbGVmdCA9IDA7XG5cbiAgICAgICAgaWYob2JqLm9mZnNldFBhcmVudCkge1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIHRvcCAgKz0gb2JqLm9mZnNldFRvcDtcbiAgICAgICAgICAgICAgICBsZWZ0ICs9IG9iai5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgfSB3aGlsZSAob2JqID0gb2JqLm9mZnNldFBhcmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgdG9wOiB0b3AsIGxlZnQ6IGxlZnQgfTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiBBZGRpbmcgZHluYW1pY2FsbHkgYSBuZXcgZXh0ZXJuYWwgc3R5bGUgaW50byB0aGUgaHRtbFxuICAgICAqXG4gICAgICogIyMjIEV4YW1wbGVzOlxuICAgICAqXG4gICAgICogICAgIHV0aWwuZXh0cmFfc3R5bGUoJ2h0dHA6Ly9uZXRkbmEuYm9vdHN0cmFwY2RuLmNvbS9mb250LWF3ZXNvbWUvNC4wLjMvY3NzL2ZvbnQtYXdlc29tZS5taW4uY3NzJyk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdGhlIGFjdHVhbCB1cmwgKGxvY2FsIG9yIGh0dHApXG4gICAgICovXG4gICAgZXh0cmFfc3R5bGUgOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgdmFyIGxpbmtfY3NzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cbiAgICAgICAgbGlua19jc3Muc2V0QXR0cmlidXRlKFwicmVsXCIsIFwic3R5bGVzaGVldFwiKTtcbiAgICAgICAgbGlua19jc3Muc2V0QXR0cmlidXRlKFwiaHJlZlwiLCB1cmwpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQobGlua19jc3MpO1xuICAgIH1cbn07Il19
