//! old-browsers.js
//! version : 0.1.0
//! authors : Evgeniy Blinov <evgeniy_blinov@mail.ru>
//! license : MIT
//! https://github.com/EvgeniyBlinov/old-browsers

;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], function (){
            return factory(root);
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(root);
    } else {
        root.ApiComponent = factory(root);
    }
}(this, function (root, undefined) {
    'use strict';

    /**
     * String to DOM Elements
     *
     * @return DOMElements
     * @author Evgeniy Blinov <evgeniy_blinov@mail.ru>
     **/
    String.prototype.toDOM = function(){
        var d = document,
            i,
            a = d.createElement("div"),
            b = d.createDocumentFragment();
        a.innerHTML = this;
        while ( i = a.firstChild ) b.appendChild(i);
        return b;
    };

    var OldBrowsers = function (){};

    /**
     * @var Object config
     **/
    OldBrowsers.prototype.config = {
        imagePath: '/',
        //container: '',
        showBrowserMenu: function (){},
        querySelector: true,
        localStorage: true,
        addEventListener: true
    };

    /**
     * Configure
     *
     * @param Object config
     * @return OldBrowsers
     * @author Evgeniy Blinov <evgeniy_blinov@mail.ru>
     **/
    OldBrowsers.prototype.configure = function (config) {
        for (var property in config) {
            if (this.config.hasOwnProperty(property)) {
                this.config[property] = config[property];
            }
        }

        return this;
    };

    /**
     * Get template
     *
     * @return String
     * @author Evgeniy Blinov <evgeniy_blinov@mail.ru>
     **/
    OldBrowsers.prototype.getTemplate = function (){
        var config = this.config;
        return [
            //'<div class="scroll_fix_wrap" id="bad_browser" style="margin-bottom: 100px;position: absolute; z-index: 9999;">',
            //'    <div class="top_info_wrap">',
            //'        <div class="scroll_fix" style="width: 100%;">',
            //'            <div class="info">',
            //'                You are using an outdated browser.',
            //'                <a onclick="toggle(\'good_browsers\');">More »</a>',
            //'                <div id="good_browsers" style="display: block;">',
            //'                    To be able to use all of the site\'s functions, download and install one of the following browsers:',
            //'                    <div>',
            //'                        <a class="fl_l" style=\'background: url("{{ imagePath }}chrome.gif") no-repeat 50% 6px;\' href="http://www.google.com/chrome/" target="_blank">Google Chrome</a>',
            //'                        <a class="fl_l" style=\'background: url("{{ imagePath }}opera.gif") no-repeat 50% 7px;\' href="http://www.opera.com/" target="_blank">Opera</a>',
            //'                        <a class="fl_l" style=\'background: url("{{ imagePath }}safari.gif") no-repeat 50% 0px;\' href="http://www.apple.com/safari/" target="_blank">Safari</a>',
            //'                        <a class="fl_l" style=\'background: url("{{ imagePath }}firefox.gif") no-repeat 50% 7px;\' href="http://www.mozilla-europe.org/" target="_blank">Mozilla Firefox</a>',
            //'                    </div>',
            //'                </div>',
            //'            </div>',
            //'        </div>',
            //'    </div>',
            //'</div>',

            '<div id="old_browsers_info">',
            '        <div class="info">',
            '            <div id="good_browsers" >',
            '                    To be able to use all of the site\'s functions, download and install one of the following browsers:',
            '               <div class="icons-cont">',
            '                   <a  style=\'background: url("{{ imagePath }}chrome.gif") no-repeat 50% 6px;\' href="http://www.google.com/chrome/" target="_blank">Google Chrome</a>',
            '                   <a  style=\'background: url("{{ imagePath }}opera.gif") no-repeat 50% 7px;\' href="http://www.opera.com/" target="_blank">Opera</a>',
            '                   <a  style=\'background: url("{{ imagePath }}safari.gif") no-repeat 50% 0px;\' href="http://www.apple.com/safari/" target="_blank">Safari</a>',
            '                   <a  style=\'background: url("{{ imagePath }}firefox.gif") no-repeat 50% 7px;\' href="http://www.mozilla-europe.org/" target="_blank">Mozilla Firefox</a>',
            '               </div>',
            '            </div>',
            '        </div>',
            '</div>',
        ].join("\n")
        .replace(/\{\{\s*([\s\S]+?)\s*\}\}/g, function (m, key){
            return config.hasOwnProperty(key) ? config[key] : "";
        });
    };

    /**
     * Show old version
     *
     * @param Object options
     * @return void
     * @author Evgeniy Blinov <evgeniy_blinov@mail.ru>
     **/
    OldBrowsers.prototype.showOldVersion = function (options) {
        var showBrowserMenu = this.config.showBrowserMenu;
        if (showBrowserMenu) {
            if (typeof showBrowserMenu === 'function') {
                showBrowserMenu(this.config, this.getTemplate());
            } else {
                var body         = document.getElementsByTagName('body')[0],
                    firstElement = body.childNodes[0];

                body.insertBefore(this.getTemplate().toDOM(), firstElement);
                throw new Error('You browser has old version!');
            }
        }
    };

    /**
     * Validate
     *
     * @param Object options
     * @return void
     * @author Evgeniy Blinov <evgeniy_blinov@mail.ru>
     **/
    OldBrowsers.prototype.validate = function (options) {
        for (var property in this.config) {
            if (this.config[property] === false) 
                continue;
            switch (property) {
                case 'querySelector':
                    if (root.document.querySelector === undefined)
                        this.showOldVersion(options);
                    break;
                case 'localStorage':
                    if (root.localStorage === undefined)
                        this.showOldVersion(options);
                    break;
                case 'addEventListener':
                    if (root.addEventListener === undefined)
                        this.showOldVersion(options);
                    break;
            }
        }
    };

    return OldBrowsers;
}));
