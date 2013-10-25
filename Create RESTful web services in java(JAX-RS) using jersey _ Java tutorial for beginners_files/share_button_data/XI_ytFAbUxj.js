/*1368539099,173217045*/

if (self.CavalryLogger) { CavalryLogger.start_js(["2RpZE"]); }

__d("PluginShareButton",["DOMEvent","DOMEventListener","PluginResize","PopupWindow","UserAgent"],function(a,b,c,d,e,f){var g=b('DOMEvent'),h=b('DOMEventListener'),i=b('PluginResize'),j=b('PopupWindow'),k=b('UserAgent'),l={listen:function(m,n){var o=m.href;h.add(m,'click',function(p){new g(p).kill();j.open(o,340,670);});},resize:function(m){var n=k.firefox()||k.ie()>=9?1:0;new i(function(){return m.offsetWidth+m.offsetLeft+n;},function(){return m.offsetHeight+m.offsetTop;}).resize().auto();}};e.exports=l;});