(function(e,t){typeof exports=="object"&&exports?module.exports=t():typeof define=="function"&&define.amd?define("rules",["rules"],t()):e.Rules=t()})(this,function(){var e,t={};return e={get:function(){return t},add:function(e,n){if(e in t){console.log("Rules.add::exception","Duplicated method",e);return}t[e]=n},test:function(e,n,r){return n in t?t[n].call(null,e,r):(console.log("Rules.test::exception","There is no method",n),!1)},validate:function(e,t,n){var r=!0,i=this;return $.each(t.rules,function(t,r){i.test(e.element,t,r)||(e.rules[t]=r,e.is_valid=!1,n?n.call(null,e,t):null)}),r}},e}),function(e,t){typeof exports=="object"&&exports?module.exports=t():typeof define=="function"&&define.amd?define("messages",["messages"],t()):e.Messages=t()}(this,function(){function n(e){return function(){return e}}var e,t;return t={"default":"No message defined for: "},e={add:function(e,n){t[e]=n},add_all:function(e){t=e},write:function(e,n){return t[e]?t[e].call?t[e].call(null,element):t[e]:t.default+e},write_all:function(e,t){var n=this;$.each(e.rules,function(r){var i;t.messages&&(i=t.messages[r])?e.messages.map[r]=i.call?i.call(null,e):i:e.messages.map[r]=n.write(r,e),e.messages.list.push(e.messages.map[r])})}},e}),function(e,t){typeof exports=="object"&&exports?module.exports=t():typeof define=="function"&&define.amd?define("plugins",["plugins"],t()):e.Plugins=t()}(this,function(){function r(e,t){$.each(n,function(){this.each_elements(e,t)})}function i(e,t,r){$.each(n,function(i){i in t&&n[i].initialize($(e),t[i],r)})}function s(e,t){$.each(e,function(e,t){i(e,t)})}function o(){return this.initialize=this.initialize||function(){},this.each_elements=this.each_elements||function(){},this}var e,t,n={};return e=o.apply({initialize:function(e,t,n){return n?i(n,t,e):s(t,e)},add:function(e,t){n[e]=o.apply(t)},get:function(e){return n[e]},each_elements:function(e,t){r(e,t)}}),e}),function(e,t){typeof exports=="object"&&exports?module.exports=t(require("rules"),require("messages"),require("plugins")):typeof define=="function"&&define.amd?define("validator",["rules","messages","plugins"],t):(e.Validator=t(e.Rules,e.Messages,e.Plugins),delete e.Rules,delete e.Messages,delete e.Plugins)}(this,function(e,t,n){function i(e,t){return{element:e.get?e.get(0):e,rules:$.extend({},t.rules),messages:$.extend({map:{},list:[]},{map:t.messages}),is_valid:!0}}function s(r,s,o,u){var a=i(r,s);return e.validate(a,s,l(o)),o.list.length&&t.write_all(a,s),n.each_elements(a,s),a}function o(e,t){var n={list:[],map:{}};return $.each(e,a(t,n)),n}function u(e){return function(t,n){e(n)}}function a(e,t){return function(n,r){$(n,e).each(f(r,t,e))}}function f(e,t,n){return function(r,i){s(i,e,t,n)}}function l(e){return function(t,n){e.list.push(t),e.map[n]=e.map[n]||[],e.map[n].push(t)}}var r={_class:function(e){function a(e,t){t?t(i):null}var t,r={},i=this;t=e&&e.holder&&e.holder.length?e.holder:$("<div />"),t.on("validator.instance",a),this.test=function(e,t){return s(e,{rules:t},{list:[],map:{}})},this.get=function(e){return r[e]},this.put=function(e){t.append(e)},this.on=function(e,n){t.on(e,u(n))},this.add=function(e,i){return r[e]=i,n.initialize(t,i,e),t.trigger("validator.add",t,i,e),this},this.add_all=function(e){return r=e,n.initialize(t,e),t.trigger("validator.add",t,e),this},this.remove=function(e){delete r[e],t.trigger("validator.remove",e)},this.validate=function(){var e=o(r,t);return e.list.length?t.trigger("validator.error",e):t.trigger("validator.success"),!e.list.length},this.is_valid=function(){return!o(r,t).list.length}},internal:function(r){return{Rule:e,Message:t,Plugin:n}[r]},create:function(e){return new this._class(e)}};return r});