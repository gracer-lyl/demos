/*
* 手机触屏版命名空间
* DP namespace
*/
var DP = window.DP || {};
DP.namespace = function(){
  var a=arguments, o=null, i, j, d;
  for (i=0; i<a.length; ++i){
    d=a[i].split('.');
    o=DP;
    for (j=(d[0] === 'DP') ? 1 : 0; j<d.length; ++j){
      o[d[j]]=o[d[j]] || {};
      o=o[d[j]];
    }
  }
  return o;
};

DP.namespace('util');
DP.namespace('Cookie');

DP.util = {
  uniqArray: function(arr) {
      var a = [], o = {}, i, v,
          len = arr.length;
      if (len < 2) {
          return arr;
      }
      for (i = 0; i < len; i++) {
          v = arr[i];
          if (o[v] !== 1) {
              a.push(v);
              o[v] = 1;
          }
      }
      return a;
  },
  isGeolocationSupported: function () {
    return navigator.geolocation ? true : false;
  },
  isLocalStorageSupported: function () {
      try {
          return 'localStorage' in window && window['localStorage'] !== null;
      } catch (e) {
          return false;
      }
  }
};

DP.Cookie = {
  set: function(name, value, expire) {
      var exp  = new Date();
      exp.setTime(exp.getTime() + expire * 60 * 1000);
      document.cookie = name + "="+ encodeURIComponent(value) + ";expires=" + exp.toGMTString();
  },
  get: function (name){
      var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
      if(arr != null) return decodeURIComponent(arr[2]); return null;
  }
};


//fgnass.github.com/spin.js#v1.2.7
!function(window, document, undefined) {

  /**
   * Copyright (c) 2011 Felix Gnass [fgnass at neteye dot de]
   * Licensed under the MIT license
   */

  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
    , animations = {} /* Animation rules keyed by their name */
    , useCssAnimations

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div')
      , n

    for(n in prop) el[n] = prop[n]
    return el
  }

  /**
   * Appends children and returns the parent.
   */
  function ins(parent /* child1, child2, ...*/) {
    for (var i=1, n=arguments.length; i<n; i++)
      parent.appendChild(arguments[i])

    return parent
  }

  /**
   * Insert a new stylesheet to hold the @keyframe or VML rules.
   */
  var sheet = function() {
    var el = createEl('style', {type : 'text/css'})
    ins(document.getElementsByTagName('head')[0], el)
    return el.sheet || el.styleSheet
  }()

  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation(alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha*100), i, lines].join('-')
      , start = 0.01 + i/lines*100
      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
      , pre = prefix && '-'+prefix+'-' || ''

    if (!animations[name]) {
      sheet.insertRule(
        '@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:' + z + '}' +
        start + '%{opacity:' + alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
        '100%{opacity:' + z + '}' +
        '}', sheet.cssRules.length)

      animations[name] = 1
    }
    return name
  }

  /**
   * Tries various vendor prefixes and returns the first supported property.
   **/
  function vendor(el, prop) {
    var s = el.style
      , pp
      , i

    if(s[prop] !== undefined) return prop
    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    for(i=0; i<prefixes.length; i++) {
      pp = prefixes[i]+prop
      if(s[pp] !== undefined) return pp
    }
  }

  /**
   * Sets multiple style properties at once.
   */
  function css(el, prop) {
    for (var n in prop)
      el.style[vendor(el, n)||n] = prop[n]

    return el
  }

  /**
   * Fills in default values.
   */
  function merge(obj) {
    for (var i=1; i < arguments.length; i++) {
      var def = arguments[i]
      for (var n in def)
        if (obj[n] === undefined) obj[n] = def[n]
    }
    return obj
  }

  /**
   * Returns the absolute page-offset of the given element.
   */
  function pos(el) {
    var o = { x:el.offsetLeft, y:el.offsetTop }
    while((el = el.offsetParent))
      o.x+=el.offsetLeft, o.y+=el.offsetTop

    return o
  }

  var defaults = {
    lines: 12,            // The number of lines to draw
    length: 6,            // The length of each line
    width: 3,             // The line thickness
    radius: 7,           // The radius of the inner circle
    rotate: 7,            // Rotation offset
    corners: 1,           // Roundness (0..1)
    color: '#555',        // #rgb or #rrggbb
    speed: 1,             // Rounds per second
    trail: 100,           // Afterglow percentage
    opacity: 1/4,         // Opacity of the lines
    fps: 20,              // Frames per second when using setTimeout()
    zIndex: 2e9,          // Use a high z-index by default
    className: 'spinner', // CSS class to assign to the element
    top: 'auto',          // center vertically
    left: 'auto',         // center horizontally
    position: 'relative'  // element position
  }

  /** The constructor */
  var Spinner = function Spinner(o) {
    if (!this.spin) return new Spinner(o)
    this.opts = merge(o || {}, Spinner.defaults, defaults)
  }

  Spinner.defaults = {}

  merge(Spinner.prototype, {
    spin: function(target) {
      this.stop()
      var self = this
        , o = self.opts
        , el = self.el = css(createEl(0, {className: o.className}), {position: o.position, width: 0, zIndex: o.zIndex})
        , mid = o.radius+o.length+o.width
        , ep // element position
        , tp // target position

      if (target) {
        target.insertBefore(el, target.firstChild||null)
        tp = pos(target)
        ep = pos(el)
        css(el, {
          left: (o.left == 'auto' ? tp.x-ep.x + (target.offsetWidth >> 1) : parseInt(o.left, 10) + mid) + 'px',
          top: (o.top == 'auto' ? tp.y-ep.y + (target.offsetHeight >> 1) : parseInt(o.top, 10) + mid)  + 'px'
        })
      }

      el.setAttribute('aria-role', 'progressbar')
      self.lines(el, self.opts)

      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var i = 0
          , fps = o.fps
          , f = fps/o.speed
          , ostep = (1-o.opacity) / (f*o.trail / 100)
          , astep = f/o.lines

        ;(function anim() {
          i++;
          for (var s=o.lines; s; s--) {
            var alpha = Math.max(1-(i+s*astep)%f * ostep, o.opacity)
            self.opacity(el, o.lines-s, alpha, o)
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000/fps))
        })()
      }
      return self
    },

    stop: function() {
      var el = this.el
      if (el) {
        clearTimeout(this.timeout)
        if (el.parentNode) el.parentNode.removeChild(el)
        this.el = undefined
      }
      return this
    },

    lines: function(el, o) {
      var i = 0
        , seg

      function fill(color, shadow) {
        return css(createEl(), {
          position: 'absolute',
          width: (o.length+o.width) + 'px',
          height: o.width + 'px',
          background: color,
          boxShadow: shadow,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360/o.lines*i+o.rotate) + 'deg) translate(' + o.radius+'px' +',0)',
          borderRadius: (o.corners * o.width>>1) + 'px'
        })
      }

      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute',
          top: 1+~(o.width/2) + 'px',
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, i, o.lines) + ' ' + 1/o.speed + 's linear infinite'
        })

        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), {top: 2+'px'}))

        ins(el, ins(seg, fill(o.color, '0 0 1px rgba(0,0,0,.1)')))
      }
      return el
    },

    opacity: function(el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
    }

  })

  /////////////////////////////////////////////////////////////////////////
  // VML rendering for IE
  /////////////////////////////////////////////////////////////////////////

  /**
   * Check and init VML support
   */
  ;(function() {

    function vml(tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
    }

    var s = css(createEl('group'), {behavior: 'url(#default#VML)'})

    if (!vendor(s, 'transform') && s.adj) {

      // VML support detected. Insert CSS rule ...
      sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

      Spinner.prototype.lines = function(el, o) {
        var r = o.length+o.width
          , s = 2*r

        function grp() {
          return css(
            vml('group', {
              coordsize: s + ' ' + s,
              coordorigin: -r + ' ' + -r
            }),
            { width: s, height: s }
          )
        }

        var margin = -(o.width+o.length)*2 + 'px'
          , g = css(grp(), {position: 'absolute', top: margin, left: margin})
          , i

        function seg(i, dx, filter) {
          ins(g,
            ins(css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx}),
              ins(css(vml('roundrect', {arcsize: o.corners}), {
                  width: r,
                  height: o.width,
                  left: o.radius,
                  top: -o.width>>1,
                  filter: filter
                }),
                vml('fill', {color: o.color, opacity: o.opacity}),
                vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
              )
            )
          )
        }

        if (o.shadow)
          for (i = 1; i <= o.lines; i++)
            seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')

        for (i = 1; i <= o.lines; i++) seg(i)
        return ins(el, g)
      }

      Spinner.prototype.opacity = function(el, i, val, o) {
        var c = el.firstChild
        o = o.shadow && o.lines || 0
        if (c && i+o < c.childNodes.length) {
          c = c.childNodes[i+o]; c = c && c.firstChild; c = c && c.firstChild
          if (c) c.opacity = val
        }
      }
    }
    else
      useCssAnimations = vendor(s, 'animation')
  })()

  if (typeof define == 'function' && define.amd)
    define(function() { return Spinner })
  else
    DP.Spinner = Spinner

}(window, document);

/*@author: yongliang.li
 *@date: 2012/12/27
 *@todo: mbox
 */
(function (window, document, $) {

    function mbox (options) {
        this._options = $.extend({
            mode: "msg",
            text: "提示信息",
            useTap: false,
            useBtns: false,
            useClose: false
        }, options || {});

        this._init();
    }

    $.extend(mbox.prototype, {

        _init: function () {

            var _this = this,
                options = _this._options,
                winEle = $(window)
                htmlEle = $('<div class="pop-main"><div class="pop-con"><div class="warn"></div><div class="pop-btn"><button class="ok">确定</button><button class="del">取消</button></div></div></div>'),
                closeEle = $('<div class="close icon-close"><div class="icon-plus-circle"></div><div class="icon-plus-line-1"></div><div class="icon-plus-line-2"></div></div>'),
                warnEle = htmlEle.find('.warn'),
                btnsEle = htmlEle.find('.pop-btn'),
                sureEle = htmlEle.find('.pop-btn .ok'),
                cancelEle = htmlEle.find('.pop-btn .del'),

                sureText = options.sureText,
                content = options.content,
                mode = options.mode,
                text = options.text,
                cb = options.callback,
                useBtns = options.useBtns,
                useClose = options.useClose,
                bkColor = options.background,
                action = options.useTap ? 'tap': 'click',
                oldClassText = htmlEle.attr('class'),
                newClassText = oldClassText.replace(/(msg|alert|confirm)Mode/i, mode + 'Mode')

            htmlEle.attr('class', newClassText);
            bkColor && htmlEle.css('background', bkColor);
            text && warnEle.html(text);
            content && warnEle.append(content);
            useBtns && btnsEle.css('display', 'block');
            sureText && sureEle.text(sureText);

            if(useClose) {
                htmlEle.append(closeEle);
                closeEle.on('click', function (e) {
                    _this.close();
                });
            } else {
                htmlEle.children().eq(0).css('padding-right', 15);
            }
            $('body').append(htmlEle);

            // Event binding
            sureEle.on('click',
                function(e) {
                    $.extend(options, { text: warnEle, content: content });
                    cb && cb.call(_this, options, true);
            });
            cancelEle.on('click',
                function(e) {
                    _this.close();
            });
            winEle.on('resize',
                function() {
                    setTimeout(function() {
                        _this._pos();
                    },
                500)
            });

        },
        _pos: function () {

            var doc = document,
                docEle = doc.documentElement,
                bodyEle = doc.body

            if (!this.isHide()) {
                htmlEle.css({
                    top: bodyEle.scrollTop + (docEle.clientHeight - htmlEle.height()) / 2,
                    left: bodyEle.scrollLeft + (docEle.clientWidth - htmlEle.width()) / 2
                })
            }

        },

        _cbShow: function () {
            var toShow = this._options.onShow;
            htmlEle.css('opacity', '1').addClass('show');
            toShow && toShow.call(this)
        },
        _cbHide: function () {
            var toHide = this._options.onHide;
            this._options.useClose && closeEle.css('opacity', '0');
            htmlEle.css('opacity', '0').addClass('hide');
            toHide && toHide.call(this);
        },

        show: function() {

            var _this = this;

            if(_this.isShow()) {
                _this._cbShow();
            } else {

                htmlEle.css('opacity', '0').removeClass('hide');

                _this._pos();

                setTimeout(function() {
                    _this._cbShow();
                }, 300)

                setTimeout(function() {
                    htmlEle.animate({
                        opacity: '1'
                    },
                    300, 'linear');      
                }, 1)

            }
        },

        hide: function() {
            var _this = this;

            if (_this.isHide()) {
                _this._cbHide();
            } else {

                htmlEle.css('opacity', '1').removeClass('show');

                setTimeout(function() {
                    _this._cbHide();
                }, 300);

                setTimeout(function () {
                    htmlEle.animate({
                        opacity: '0'
                    }, 300, 'linear');
                }, 1)
            }
        },

        flash: function(time) {
            var _this = this,
                opt = _this._options;
            opt.onShow = function() {
                setTimeout(function() {
                    _this.close();
                    },
                time);
            };

            _this.show();

        },

        isShow: function() {
            return htmlEle.hasClass('show');
        },

        isHide: function () {
            return htmlEle.hasClass('hide');
        },

        close: function () {
            htmlEle.remove();
        }

    });

    // 实例化
    function floatNotify () {

        // flashBox
        this.flashBox = function (text, time) {
          var mBox = new mbox({
            mode: 'msg',
            text: text
          });
          mBox.flash(time || 2E3);
          return mBox;
        };

        // ajaxBox
        this.ajaxBox = function (text, isClose) {
          var mBox = new mbox({
            mode: 'msg',
            text: text,
            useClose: isClose
          });
          mBox.show();
          return mBox;
        };
        // formBox
        this.formBox = function(text, opt) {
            var msgBox = new mbox($.extend({
                mode: 'msg',
                text: text
            }, opt || {}));
            msgBox.show();
            return msgBox;
        };
    }

    DP.Notification = new floatNotify();

})(window, document, Zepto);

Zepto(function($){

    var rightTab = {
        contShow : $('#swipeTop'),
        swipeTabCont : $('#swipeTopCont'),
        bodyCont : $('body'),
        rightCate : $('#rightCate'),
        category : $('#J_category'),
        left : -290,
        height :  $('#contShow').height(),
        bodyH : $('#bodyCont').height(),

        init:function(){
            var that = this;
            that.contShow.find('.nearby-distance a').each(function(target,index){
                $(index).click(function(){
                    $(this).addClass('distance-cur').siblings().removeClass('distance-cur');
                    $('#swipeCont-' + (target+1)).show().siblings().hide();
                    that.refresh();
                })
                
            })
        },

        start: function (num) {
            var self = this;
            $('#type-search-' + num).size() && $('#type-search-' + num).removeClass('hide').siblings().addClass('hide');
            $('#swipeCont-' + num).show().siblings().hide();
        },

        showLeft:function(){

            var that = this;
            // some extra code
            var naviBlock = $('#J_navi'),
            	togglerBar = $('#J_togglerBar');
            if (togglerBar.attr('data-status') == 'on') {
            	togglerBar.attr('data-status', 'off');
	  	        $('.slide').each(function(index, item) {
	  		        that.translation(item,{x: 0, duration:'0.6s'},function(){
	  		        	naviBlock.attr('style', 'height: 100%; left:0; ');
	  		            $(item).attr('style', '');
	  		        });
	  	         });
	  	         that.translation(naviBlock[0],{x: -250, duration:'0.6s'},function(){
	  	        	$('.slide').unbind();
	  	         });
            }
            
            window.scroll(0,0);
            
            that.rightCate.show();

            that.contShow.css({
                '-webkit-backface-visibility':'hidden',
                '-webkit-prespective':'1000',
                '-webkit-transform-style': 'preserve-3d'                
                
            });
            
            that.bodyCont.css({
                'min-height':that.swipeTabCont.height() + 200

            })
            
            that.rightCate.css({
                'height':that.bodyCont.height()
            })
            
            // that.bodyCont.append('<div id="leftmask" class="right-mask"></div>');
            that.bodyCont.append('<div id="leftmask" class="right-mask"><div class="infor"><div class="cont"><span class="l"></span><span class="r"></span></div></div></div>');
            that.translation(that.contShow[0],{x:0, duration:'0.4s'},function(){
                $('#leftmask').css('height',that.bodyCont.height());
            })
        },

        hideLeft:function(){
            var that = this;
            window.scroll(0,0)
            that.category.removeClass('on').addClass('hide')
            that.translation(that.rightCate[0],{x:275 ,duration:'0.4s'},function(){
                $('#leftmask').remove();
                that.rightCate.hide();               
                that.bodyCont.attr('style','position:relative');
                that.rightCate.attr('style','');
                that.contShow.attr('style','');
                that.onHide();
            })
        },

        refresh:function(){
            var that = this,
                timer = null;

            timer = setTimeout(function(){
                var swipeTabH = that.swipeTabCont.height() + 200;

                that.bodyCont.css({
                    'min-height':swipeTabH
                });

                that.rightCate.css({
                    'min-height':swipeTabH
                });
                
            },500)              
        },

        translation : function(el, options, callback) {
            var opt = $.extend({
                    duration : '0.4s',
                    origin : '0 0'
                }, options || {}),
                style = el.style;
            
            !style['webkitTransitionProperty'] &&
                (style['webkitTransitionProperty'] = '-webkit-transform');
                    
            style['webkitTransitionDuration'] !== opt.duration && 
                (style['webkitTransitionDuration'] = opt.duration);
            
            style['webkitTransformOrigin'] !== opt.origin && 
                (style['webkitTransformOrigin'] = opt.origin);
            
            style['webkitBackfaceVisibility'] !== 'hidden' &&
                (style['webkitBackfaceVisibility'] = 'hidden');
            
            style['webkitTransformStyle'] !== 'preserve-3d' &&
                (style['webkitTransformStyle'] = 'preserve-3d');
            
            if (opt.x != null || opt.y != null) {
                style['webkitTransform'] = 'translate(' + 
                        (opt.x ? opt.x + 'px,' : '0,') + 
                        (opt.y ? opt.y + 'px' : '0') + ')';
                setTimeout(callback, parseFloat(opt.duration) * 200);
            }    
        },
        onHide: function(){},
        onShow: function(){}
    };

    DP.overlay = rightTab;
    
});

DP.namespace('app');
DP.namespace('order');
/*
 * 金额变化
 * Example: new DP.changeAmount() or new DP.order.changeAmount();
 * */
(function (window, $) {
  function changeAmount (options) {
    this._options = $.extend({
      'price': $('#J_price'),
      'amount': $('#J_amount'),
      'totalPrice': $('#J_totalPrice'),
      'minusBtn': $('.minus'),
      'plusBtn': $('.plus')
    }, options || {});
    this._init();
  }
  $.extend(changeAmount.prototype, {
    _init: function () {
      var self = this,
        options = self._options;
      self._plus(options);
      self._minus(options);
    },
    _plus: function (opt) {
      var amountEle = opt.amount,
        priceEle = opt.price,
        priceVal = parseFloat(priceEle.text());
        totalPriceEle = opt.totalPrice;
      opt.plusBtn.bind('click', function (e) {
        e && e.preventDefault();
        var amount = parseInt(amountEle.val()),
          canAmount = parseInt($(this).attr('data-max')),
          maxAmount = parseInt($(this).attr('data-maxperuser'));
        if((canAmount && amount < canAmount) || !maxAmount) {
          amountEle.val(amount + 1);
          totalPriceEle.text((priceVal * (amount + 1)).toFixed(2));
		  if(amount == canAmount - 1) {
			opt.plusBtn.css('background-color', '#D6D6D6');
		  } else {
			opt.minusBtn.css('background-color', '#909090');
		  }
        } else {
          DP.Notification.flashBox('本单每人限购' + maxAmount + '份，您还能购买' + canAmount + '份', 1000);
          return;
        }
      });
    },
    _minus: function (opt) {
      var amountEle = opt.amount,
        priceEle = opt.price,
        priceVal = parseFloat(priceEle.text());
        totalPriceEle = opt.totalPrice;
      opt.minusBtn.bind('click', function(e) {
        e && e.preventDefault();
        var amount = parseInt(amountEle.val()),
          minAmount = parseInt($(this).attr('data-min')),
          filledVal = 0;
        if(amount > minAmount) {
          filledVal = amount - 1;
		  if (amount == minAmount + 1) {
			opt.minusBtn.css('background-color', '#D6D6D6');
		  } else {
			opt.plusBtn.css('background-color', '#909090');
		  }
        } else {
          filledVal = minAmount;
          DP.Notification.flashBox('本单至少购买' + minAmount + '份', 1000);
          return;
        }
        amountEle.val(filledVal);
        totalPriceEle.text((priceVal * filledVal).toFixed(2));
      });
    }
  });

  window.DP.order.changeAmount = window.DP.changeAmount = changeAmount;

})(window, Zepto);
/* 绑定手机 */
(function (window, $) {

  DP.order.bindmobile = DP.bindmobile = {

    captcha: $('#J_getCaptcha'),
    phone: $('#J_phoneNum'),
    code: $('#J_code'),
    submitBtn: $('#J_bindBtn'),

    init: function () {
      var self = this,
        captchaBtn = self.captcha,
        submitBtn = self.submitBtn,
        code = self.code;

      captchaBtn.bind('click', function(e) {
        e && e.preventDefault();
        self._getCaptcha(this);
      });

      submitBtn.bind('click', function(e){
        e && e.preventDefault();
        var codeVal = $.trim(code.val());
        if(codeVal === '') {
          DP.Notification.flashBox('验证码为空', 1000);
          return;
        }
        if (!/^[0-9a-zA-Z]+$/.test(codeVal)) {
          DP.Notification.flashBox('请填写正确的验证码', 1000);
          return;
        }

        self._bindAction(self.phone.val(), codeVal);

      });

    },
    _getCaptcha: function (btn) {
      var self = this,
        phoneNum = self.phone.val();
      if (phoneNum == '') {
    	  DP.Notification.flashBox('手机号码不能为空', 1000);
    	  return;
      }
      if (!/^(1[3-9][0-9])\d{8}$/.test(phoneNum)) {
    	  DP.Notification.flashBox('请输入正确的手机号码', 1000);
    	  return;
      }
      $.ajax({
        type: 'POST',
        url: '/tuan/ajax/bindMobile',
        data: { "mobile":　phoneNum },
        dataType: 'json',
        beforeSend: function () { },
        success: function (rt) {
          if(rt.code === 200) {
            console.log(rt.msg.message);
            self._countDown(btn, 59);
          } else if (rt.code === 500) {
        	DP.formBox && DP.formBox.close();
        	DP.Notification.flashBox(rt.msg, 1000);
          } else if (rt.code === 501) {
        	  window.location.href = '/tuan/errorMsg?errorMsg=' + rt.msg;
          }
        }
      });
    },
    _countDown: function (ele, tm) {
      if (!ele) return;
      ele = $(ele);
      var getChaBtn = ele.find('input');
      var count = function () {
        getChaBtn.val('再次获取(' + tm + 's)');
        tm -= 1;
        tm > 0 ? window.setTimeout(count, 1000) : btnChange(ele);
      },
      btnChange = function (elem) {
        getChaBtn.removeAttr('disabled');
        ele.removeClass('s-rbtn').addClass('s-btn');
        getChaBtn.val('获取验证码');
      };
      getChaBtn.attr('disabled', 'disabled');
      ele.removeClass('s-btn').addClass('s-rbtn');
      window.setTimeout(count, 1000);
    },
    _bindAction: function (mobi, code, r) {
      var self = this,
      	  postData = { "code": code, "mobile": mobi };
      if (r) {
    	  postData = $.extend(postData, {"isForce": 1 });
      }
      $.ajax({
        type: 'POST',
        url: '/tuan/ajax/saveMobile',
        data: postData,
        dataType: 'json',
        success: function (rt) {
          if(rt.code === 200) {
        	DP.formBox && DP.formBox.close();
            DP.Notification.flashBox('绑定手机成功', 1000);
            window.setTimeout(function() {
            	window.location.href = '/tuan/buy/' + DP.Cookie.get('tg_dealid');
            }, 1500);
          } else if (rt.code === 202) {
        	  DP.formBox && DP.formBox.close();
        	  DP.formBox = DP.Notification.formBox('<p style="text-align:center;">' + rt.msg + '</p>', {
        			content:'', 
        			useBtns: true, 
					sureText: '确定',
        			callback: function (opt) {
        		  		self._bindAction(mobi, code, true);
        			}
        		});
          } else if (rt.code === 500) {
        	DP.formBox && DP.formBox.close();
        	DP.Notification.flashBox(rt.msg, 1000);
          } else if (rt.code === 501) {
        	  window.location.href = '/tuan/errorMsg?errorMsg=' + rt.msg;
          }
        },
        error: function (xhr, type) {
        }
      });
    }
  }
  
  DP.order.verifymobile = DP.verifymobile = {

	    captcha: $('#J_getCaptcha'),
	    code: $('#J_code'),
	    submitBtn: $('#J_bindBtn'),

	    init: function () {
	      var self = this,
	        captchaBtn = self.captcha,
	        submitBtn = self.submitBtn,
	        code = self.code;

	      captchaBtn.bind('click', function(e) {
	        e && e.preventDefault();
	        self._getCaptcha(this);
	      });

	      submitBtn.bind('click', function(e){
	        e && e.preventDefault();
	        var codeVal = $.trim(code.val());
	        if(codeVal === '') {
	          DP.Notification.flashBox('验证码为空', 1000);
	          return;
	        }
	        if (!/^[0-9a-zA-Z]+$/.test(codeVal)) {
	          DP.Notification.flashBox('请填写正确的验证码', 1000);
	          return;
	        }

	        self._bindAction(codeVal);

	      });

	    },
	    _getCaptcha: function (btn) {
	      var self = this;
	      $.ajax({
	        type: 'POST',
	        url: '/tuan/ajax/verifyMobile',
	        dataType: 'json',
	        success: function (rt) {
	          if(rt.code === 200) {
	            self._countDown(btn, 59);
	          } else if (rt.code === 500) {
	        	  DP.Notification.flashBox(rt.msg, 1000);
		          return;
	          } else if (rt.code === 501) {
	        	  window.location.href = '/tuan/errorMsg?errorMsg=' + rt.msg;
	          }
	        },
	        error: function (xhr, type) {
	        }
	      });
	    },
	    _countDown: function (ele, tm) {
	      if (!ele) return;
	      ele = $(ele);
	      var getChaBtn = ele.find('input');
	      var count = function () {
	        getChaBtn.val('再次获取(' + tm + 's)');
	        tm -= 1;
	        tm > 0 ? window.setTimeout(count, 1000) : btnChange(ele);
	      },
	      btnChange = function (elem) {
	        getChaBtn.removeAttr('disabled');
	        ele.removeClass('s-rbtn').addClass('s-btn');
	        getChaBtn.val('获取验证码');
	      };
	      getChaBtn.attr('disabled', 'disabled');
	      ele.removeClass('s-btn').addClass('s-rbtn');
	      window.setTimeout(count, 1000);
	    },
	    _bindAction: function (code) {
	      $.ajax({
	        type: 'POST',
	        url: '/tuan/ajax/validateCode',
	        data: { "code": code },
	        dataType: 'json',
	        success: function (rt) {
	          if(rt.code === 200) {
	            DP.Notification.flashBox(rt.msg, 1000);
	            window.location.href = '/tuan/buy/' + DP.Cookie.get('tg_dealid');
	          } else if (rt.code === 500) {
	            DP.Notification.flashBox(rt.msg, 1000);
	            return;
	          } else if (rt.code === 501) {
	        	  window.location.href = '/tuan/errorMsg?errorMsg=' + rt.msg;
	          }
	        },
	        error: function (xhr, type) {
	        }
	      });
	    }
	  }

})(window, Zepto);

/* 地址联动 */
DP.order.addressSelector = function () {
  var provinceEle = $('#J_province'),
      cityEle = $('#J_city'),
      districtEle = $('#J_district'),
      optionHtml = '<option value="0">--请选择--</option>',
      isSpecialCity = function (id) {
        return (id == 1) || (id == 2) || (id == 9) || (id == 22);
      };
  provinceEle.on('change', function (e) {
        var _self = $(this),
            val = _self.val();
        if (val > 0) {
            $.ajax({
                type: 'POST',
                url: '/tuan/ajax/getCityList',
                data: { 'provinceId': val },
                dataType: 'json',
                beforeSend: function () { },
                success: function (rt) {
                  if(rt.code === 200) {
                    var cityList = rt.cityList,
                         specialCityId;
                    cityEle.empty().append(optionHtml);
                    if (isSpecialCity(val)) {
                      cityEle.empty();
                    }
                    cityList.forEach(function(item) {
                        cityEle.append('<option value="' + item.id + '">' + item.name + '</option>');
                        if (isSpecialCity(val)) {
                          specialCityId = item.id;
                        }
                    });
                    if (isSpecialCity(val)) {
                      getRegions(specialCityId);
                    } else {
                      districtEle.empty().append(optionHtml);
                    }
                  } else if (rt.code === 500) {
                    console.log('many type of errors');
                  }
                },
                error: function (xhr, type) {
                }
            });
        } else {
            cityEle.empty().append(optionHtml);
            districtEle.empty().append(optionHtml);
        }
    });
    var getRegions = function (v) {
      if (v > 0) {
            $.ajax({
                type: 'POST',
                url: '/tuan/ajax/getDistrictList',
                data: { 'cityId': v },
                dataType: 'json',
                beforeSend: function () { },
                success: function (rt) {
                  if(rt.code === 200) {
                    var districtList = rt.districtList;
                    districtEle.empty().append(optionHtml);
                    districtList.forEach(function(item) {
                        districtEle.append('<option value="' + item.id + '">' + item.name + '</option>');
                    });
                  } else if (rt.code === 500) {
                	districtEle.empty().append(optionHtml);
                  }
                },
                error: function (xhr, type) {
                }
            });
        } else {
            districtEle.empty().append(optionHtml);
        }
    };
    // city select
    cityEle.on('change', function(e) {
        var self = $(this),
            val = self.val();
        getRegions(val);
    });
}

DP.order.validateAddr = function () {
  var form = $('#dealform'),
    submitBtn = $('#J_submit'),
    province = $('#J_province'),
    city = $('#J_city'),
    district = $('#J_district'),

    detailAddr = $('#J_detailAddr'),
    postcode = $('#J_postcode'),
    consignee = $('#J_consignee'),
    telphone = $('#J_telphone');

  submitBtn.on('click', function(e) {
    e && e.preventDefault();
    if (province.val() == 0) {
      DP.Notification.flashBox('省份不能为空', 1000);
      return;
    }
    if (city.val() == 0) {
      DP.Notification.flashBox('城市不能为空', 1000);
      return;
    }
    if (detailAddr.val() == '') {
      DP.Notification.flashBox('详细地址不能为空', 1000);
      return;
    }
    if (postcode.val() == '') {
      DP.Notification.flashBox('邮编不能为空', 1000);
      return;
    }
    if (!/^\d{6}$/.test(postcode.val()) || /000000/.test(postcode.val())) {
      DP.Notification.flashBox('请输入正确的邮编', 1000);
      return;
    }
    if (consignee.val() == '') {
      DP.Notification.flashBox('收货人不能为空', 1000);
      return;
    }
    if (telphone.val() == '') {
      DP.Notification.flashBox('电话号码不能为空', 1000);
      return;
    }
    if (!/^((1\d{10})|0[\w\W]*)$/.test(telphone.val())) {
      DP.Notification.flashBox('请输入正确的电话号码', 1000);
      return;
    }

    form.submit();

  });
}

/* 提交订单 */
DP.order.submitOrder = function () {
  var submitBtn = $('#J_submit'),
      amount = $('#J_amount'),
      form = $('#checkOurForm'),
      minCount,
      maxCount;
  if(amount.size()) {
	  minCount = parseInt(amount.prev().attr('data-min'));
      maxCount = parseInt(amount.next().attr('data-max'));
  }
  submitBtn.on('click', function(e) {
    e.preventDefault();
    _gaq.push(['_trackEvent', 'buy_order', 'click', '']);
    if(amount.size()) {
    	var amountVal = amount.val().trim();
        if (amountVal == '') {
          DP.Notification.flashBox('购买数量不能为空', 1000);
          return;
        }
        if (!/^[0-9]{1,}$/.test(amountVal)) {
          DP.Notification.flashBox('购买数量必须为数字', 1000);
          return;
        }
        amountVal = parseInt(amountVal);
        if (amountVal < minCount) {
          DP.Notification.flashBox('本单至少购买' + minCount  + '份', 1000);
          return;
        }
        if (amountVal > maxCount) {
          DP.Notification.flashBox('您还能购买' + maxCount  + '份', 1000);
          return;
        }
    }
    $.ajax({
        type: 'POST',
        url: '/tuan/ajax/validateCheckOut',
        dataType: 'json',
        data: { 'quantity': amount.size() ? amountVal : -1 },
        success: function (rt) {
          if(rt.code === 200) {
            form.submit();
          } else if (rt.code === 500) {
            DP.Notification.flashBox(rt.msg, 1000);
            if (rt.userMax) {
        		amount.next().attr('data-max', rt.userMax);
        		$('#J_textBuy').text('（可购买' + rt.userMax + '份）');
        	}
            return;
          } else if (rt.code === 501) {
        	  window.location.href = '/tuan/errorMsg?errorMsg=' + rt.msg;
          } else if(rt.code === 502) {
        	  window.location.href = rt.msg;
          }
        }
    });
  });
}

DP.order.selectCoupon = function () {
  var couponList = $('#J_couponList li');
  couponList.click(function(e) {
    var self = $(this);
    self.find('input[type=radio]')[0].checked = true;
  });
}

DP.order.selectPayMethod = function () {
	var payMethodList = $('.pay-method li');
	payMethodList.click(function(e) {
		var self = $(this);
		_gaq.push(['_trackEvent', 'order_paychannel', 'click', '']);
		self.find('input[type=radio]')[0].checked = true;
	});
}

DP.order.showWarning = function () {
	var warnEle = $('.warning');
	if(warnEle.size() > 0) {
		DP.Notification.flashBox(warnEle.text(), 1500);
		return;
	}
}

DP.user = {
  getMoreReceipt: function () {
    var moreBtn = $('#J_moreBtn'),
         receiptList = $('#J_recepitList');
    moreBtn.on('click', function (e) {
      e && e.preventDefault();
      var self = $(this),
           currentNum = self.attr('data-current');
      $.ajax({
              type: 'POST',
              url: '/tuan/ajax/moreReceiptList',
              data: { 'currentPage': currentNum },
              dataType: 'json',
              beforeSend: function () { 
                // var loadingHtml = '<li><div id="J_spin" style="width:100%;height:83px;"></div></li>';
                // receiptList.append(loadingHtml);
                // var spin = new DP.Spinner().spin($('#J_spin')[0]);
              },
              success: function (rt) {
                if(rt.code === 200) {
                  var receiptArr = rt.receiptList;
                  self.attr('data-current', rt.currentPage);
                  if (receiptArr.length > 0) {
                    receiptArr.forEach(function(item) {
                        var receiptHtml = '<li>'
                        + '<a class="item" onclick="_gaq.push([\'_trackEvent\', \'couponlist_item\', \'click\', \'\'])" title="" href="javascript:window.location.href=\'/tuan/receiptdetail/' + item.receiptId + '\'">'
                        + '<table width="100%" cellpadding="0" cellspacing="0">'
                        + '<tbody><tr>'
                                + '<td width="60" valign="top"><div class="surplus">剩余<br><strong>' + item.remainDays + '</strong>&nbsp;天</div></td>'
                                + '<td>'
                                + '<div class="infor">'
                                + '<h3 class="title">' + item.dealName + '</h3>'
                                + '<p class="Fix"><span class="phone">' + item.serialNumber + '</span><span class="time">' + item.endTime + '过期</span></p>'
                                + '</div>'
                                + '</td>'
                            + '</tr>'
                            + '</tbody></table>'
                          + '</a>'
                        + '</li>';
                        receiptList.append(receiptHtml);
                    });
                  }
                  if(rt.currentPage >= rt.pageCount) {
                	  self.addClass('more-default-btn').html('<i class="icon-more"></i>已经到底啦').unbind('click');
                  }
                } else if (rt.code === 500) {
                  console.log('many type of errors');
                }
              },
              error: function (xhr, type) {
              }
          });

    });
  }
};

DP.app = {
  hidePhoneAddrBar: function () {
    setTimeout(function() {
      window.scrollTo(0, 1);
    }, 100);
  },
  
  webAppLink: function() {
      $('a').click(function(e) {
          if (!$(e.target).hasClass('noDirect')) {
              window.location = this.getAttribute("href");
              return false;
          }
      });
  },
  
  goSearch: function () {
	var searchToggler = $('#J_search_toggler'),
  	searchButton = $('#J_search_btn');
	searchToggler.focus(function () {
		window.location.href = '/tuan/search';
	});
	searchButton.click(function () {
		if($.trim(searchToggler.val()) === '') {
      	DP.Notification.flashBox('请输入搜索关键字');
      	return;
    	}
	});
  },
  fixedBuyBar: function () {
	var ok;
	function isFixed() {
		var check = false;
		if(navigator.userAgent.match(/iPhone/i)) {
			check = Boolean(navigator.userAgent.match(/OS [5-9]_\d[_\d]* like Mac OS X/i));
		}
		if(navigator.userAgent.match(/Android/i)) {
			check = true;
		}
		return check;
	}
	ok = isFixed();
	if(ok) {
		var inforEle = $('#J_slideBar'),
			imgHeight = $('#J_img').height(),
			sectionEle = $('#J_section');
		$(window).on('scroll', function() {
			setTimeout(function() {
				if(window.scrollY >= 43 + imgHeight) {
					!inforEle.hasClass('position-fixed') && inforEle.addClass('position-fixed');
					sectionEle.css('margin-top', '64px');
				} else {
					inforEle.hasClass('position-fixed') && inforEle.removeClass('position-fixed');
					sectionEle.css('margin-top', '0px');
				}
			}, 0);
		});
	}
  },
  search: function (show) {
	  if(!DP.util.isLocalStorageSupported()) return;
	    
    var searchInput = $('#J_search_input'),
    	searchBtn = $('#J_search_btn'),
    	searchList = $('#J_search_ul'),
    	searchForm = $('#searchForm'),
    	KEYSTRING = 'searchstorage';
    
    function setStorage (key, keyword) {
      var keywords = localStorage.getItem(key),
          keyArray = keywords ? keywords.split(',') : [];
      keyArray.push(keyword);
      keyArray = DP.util.uniqArray(keyArray);
      keyArray.length = keyArray.length < 25 ? keyArray.length : 25;
      localStorage.setItem(key, keyArray.join(','));
    }
	
	function showHistory () {
      var historyItems = localStorage.getItem(KEYSTRING),
          itemArray,
          itemLength = 0;
      searchList.empty();
      if(historyItems) {
        itemArray = historyItems.split(',');
        itemLength = itemArray.length;
        if(itemLength === 0) return;
        if(itemLength > 5) {
        	for(var i = itemLength - 5; i < itemLength; i++) {
        		$('<li><a class="noDirect J_history" href="javascript:void(0)">' + itemArray[i] + '</a></li>').prependTo(searchList).find('.J_history').click(function(e) {
	                e && e.preventDefault();
	                var text = $(this).text();
	                searchInput.val(text);
	                _gaq.push(['_trackEvent', 'search_history', 'click', '']);
	                searchForm.submit();
	              });
        	}
        } else {
        	itemArray.forEach(function(item, index) {
                $('<li><a class="noDirect J_history" href="javascript:void(0)">' + item + '</a></li>').prependTo(searchList).find('.J_history').click(function(e) {
                  e && e.preventDefault();
                  var text = $(this).text();
                  searchInput.val(text);
                  _gaq.push(['_trackEvent', 'search_history', 'click', '']);
                  searchForm.submit();
                });
              });
        }
        $('<li><a id="J_clearHistory" class="noDirect last" href="javascript:void(0)">清除搜索记录</a></li>').appendTo(searchList).find('#J_clearHistory').click(function(e){
          e && e.preventDefault();
          localStorage.removeItem(KEYSTRING);
          searchList.empty();
          searchInput.val('');
        });
      }
    }
	
	searchInput.focusin(function (e) {
		show && showHistory();
    });
	var oldKeyword = '';
    function searchAction () {
		var searchHolder = $('#J_search_input'), 
			newKeyword = $.trim(searchHolder.val());
    	if(newKeyword === '') {
    		oldKeyword = '';
    		searchList.empty();
    		show && showHistory();
	    } else if (oldKeyword != newKeyword) {
	    	$.ajax({
	        type: 'POST',
	        url: '/tuan/ajax/searchSuggestion',
	        data: { 'keyword': newKeyword },
	        dataType: 'json',
	        success: function (data) {
	          var temArr = [];
	          searchList.html('');
	          oldKeyword = newKeyword;
	          if(data.code === 200) {
	            temArr = data.suggestionList;
		        temArr.forEach(function (item, index) {
                  $('<li><a class="noDirect" href="javascript:;">' + item.keyword + '</a><span class="fruit-numb">约' + item.num + '个结果</span></li>').prependTo(searchList).find('a').on('click', function(e) {
                    e && e.preventDefault();
                    var txt = $(this).text();
                    searchHolder.val(txt);
                    _gaq.push(['_trackEvent', 'search_suggest', 'click', '']);
                    setStorage(KEYSTRING, txt);
                    searchForm.submit();
                  });
                });
	          } else {
	        	  searchList.prepend('<li>查找“' + newKeyword + '”</li>');
	          }
	        }
	      });
	    }
	    setTimeout(function() { searchAction(); }, 500);
    }
    
    searchAction();
    
    searchBtn.click(function (e) {
      e && e.preventDefault();
      var keyword = $.trim(searchInput.val());
      if(keyword === '') {
        DP.Notification.flashBox('请输入搜索关键字');
        return;
      } else {
        setStorage(KEYSTRING, keyword);
        searchForm.submit();
      }
    });
  },
  // 单纯就是为了首页定位，植入cookie而作
  posCity: function () {
	  if(!DP.util.isGeolocationSupported()) return;
	  var options = {
	      enableHighAccuracy:true, 
	      maximumAge:30000,
	      timeout: 5000
	    };
	  var getPositionSuccess =  function (position) {
	      var lat = position.coords.latitude;
	      var lng = position.coords.longitude;
	      $.ajax({
	        type: 'POST',
	        url: '/tuan/locate',
	        data: { 'lat': lat, 'lng': lng },
	        dataType: 'json',
	        success: function (data) {
	          if(data.code === 200) {
	            var cityName = data.cname, 
	            	cityPinYin = data.ename;
	            DP.Cookie.set('locallat', lat, 10);
	            DP.Cookie.set('locallng', lng, 10);
	            console.log(cityName);
	          } else if(data.code === 500) {
	            console.log('无法获取您的位置信息');
	          }
	        },
	        error: function (xhr, type) {
	        	console.log('无法获取您的位置信息');
	        }
	      });
	    },
	    getPositionError =  function (error) {
	      switch(error.code) {
	        case error.TIMEOUT :
	          console.log('链接超时');
	          break;
	        case error.PERMISSION_DENIED:
	          console.log('您拒绝了使用位置共享服务，查询已取消');
	          break;
	        case error.POSITION_UNAVAILABLE: 
	          console.log('定位失败');
	          break;
	      }
	    };
	    if (!DP.Cookie.get('locallat') || !DP.Cookie.get('locallng')) {
	    	navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionError, options);
	    }
  },
  
  locCity: function () {
	var cityWrapEle = $('.this-city');
    if(!DP.util.isGeolocationSupported()) return;
    var options = {
      enableHighAccuracy:true, 
      maximumAge:30000,
      timeout: 5000
    };
    var getPositionSuccess =  function (position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      $.ajax({
        type: 'POST',
        url: '/tuan/locate',
        data: { 'lat': lat, 'lng': lng },
        dataType: 'json',
        beforeSend: function () {
          cityWrapEle.html('<p>正在定位...</p>');
        },
        success: function (data) {
          if(data.code === 200) {
            var cityName = data.cname, 
            	cityPinYin = data.ename;
            DP.Cookie.set('locallat', lat, 10);
            DP.Cookie.set('locallng', lng, 10);
            cityWrapEle.html('<a href="javascript:window.location.href=\'/tuan/' + cityPinYin + '\'" title="" class="city-links">当前定位城市<strong>' + cityName + '</strong><i class="arrow-ent"></i></a>');
          } else if(data.code === 500) {
            cityWrapEle.html('<p>无法获取您的位置信息&nbsp; <a class="gray-btn" onclick="DP.app.locCity();">重试</a></p>');
          }
        },
        error: function (xhr, type) {
          cityWrapEle.html('<p>无法获取您的位置信息 &nbsp;<a class="gray-btn" onclick="DP.app.locCity();">重试</a></p>');
        }
      });
    },
    getPositionError =  function (error) {
      switch(error.code) {
        case error.TIMEOUT :
          cityWrapEle.html('<p>链接超时，请重试&nbsp;<a class="gray-btn" onclick="DP.app.locCity();">重试</a></p>');
          break;
        case error.PERMISSION_DENIED:
          cityWrapEle.html('<p>您拒绝了使用位置共享服务，查询已取消</p>');
          break;
        case error.POSITION_UNAVAILABLE: 
          cityWrapEle.html('<p>定位失败&nbsp;<a class="gray-btn" onclick="DP.app.locCity();">重试</a></p>');
          break;
      }
    };
	navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionError, options);
  },
  dealOverlay: function () {
	  
	  var togglerEles = $('.toggler-bar');
		togglerEles.each(function (i, t) {
			var self = $(t),
			  nextEle = self.next(),
			  hiddenCont = nextEle.next();
			self.click(function () {
			  self.parent().siblings().find('i').removeClass('nearby-up').addClass('nearby-down');
			  self.parent().siblings().find('.distan-tab').addClass('hide');
			  if (nextEle.attr('class') === 'nearby-down') {
				nextEle.removeClass('nearby-down').addClass('nearby-up');
			  } else {
				nextEle.removeClass('nearby-up').addClass('nearby-down');
			  }
			  hiddenCont.hasClass('hide') ? hiddenCont.removeClass('hide') : hiddenCont.addClass('hide');
			  
			});
		  });
	  $('.shop-search li').each(function (index, item) {
        var self = $(item);
        self.on('click', function () {
            DP.overlay.start(index + 1);
            DP.overlay.showLeft();
            $('body > div').click(function(event) {
              var t = event.target || event.srcElement;
              if(t.nodeName.toUpperCase() === "DIV" && $(t).attr('id') == 'leftmask') {
                  DP.overlay.hideLeft();
                  window.scroll(0, 0);
              }
          });
          $('#leftmask .infor').click(function() {
          	   DP.overlay.hideLeft();
              window.scroll(0, 0);
          });
        });
      });
  },
  moreDeal: function () {
    var getDealBtn = $('#J_getMoreDeal'),
      dealList = $('#J_dealList'),
      selectList = $('.shop-search li'),
      keyword = $('#J_keyword'),
      isToday = $('#J_isToday'),
      getStatus = function (status) {
        if(status == 0) {
          return '';
        } else  if(status == 1) {
          return '<div class="sub-icon soon"></div>';
        } else if (status == 2){
          return '<div class="sub-icon sold"></div>';
        } else if (status == 3) {
          return '<div class="sub-icon new"></div>';
        }
      };
	function splitWord(str) {
		if(str.length > 3) {
			str =  str.substring(0, 3) + '...';
		}
		return str;
	}
    getDealBtn.on('click', function(e) {
      e && e.preventDefault();
      var self = $(this),
      	gaStr = 'search',
      	rootCategory = selectList.eq(0).attr('data-root'),
      	subCategory = selectList.eq(0).attr('data-sub'),
      	rootRegion = selectList.eq(1).attr('data-root'),
      	subRegion = selectList.eq(1).attr('data-sub'),
      	sort = selectList.eq(2).attr('data-sort'),
        curPage = self.attr('data-cur'),
      	postData = { 'currentPage': curPage, 'rootCategory': rootCategory, 'subCategory': subCategory, 'rootRegion': rootRegion, 'subRegion':subRegion, 'sort': sort };
        if (keyword.size() > 0) {
        	$.extend(postData, { 'keyword': keyword.val() });
        	gaStr = 'home';
        }
        if (isToday.size() > 0) {
        	$.extend(postData, {'isToday': (isToday.val() == 3) ? 3 : 0 });
        }
      	$.ajax({
            type: 'POST',
            url: '/tuan/ajax/moreDealGroupList',
            data: postData,
            dataType: 'json',
            beforeSend: function () {
              // var loadingHtml = '<li><div id="J_spin" style="width:100%;height:95px;"></div></li>';
              // dealList.append(loadingHtml);
              // var spin = new DP.Spinner().spin($('#J_spin')[0]);
              self.addClass('more-default-btn').html('加载中');
            },
            success: function (rt) {
              if(rt.code === 200) {
                var list = rt.dealGroupList;
                list.forEach(function(item) {
                  var distanceHtml = '', dealHtml = '', regionHtml = '';
                  if(parseInt(item.distance) > 0) {
                	  distanceHtml = '<span class="jl">' + item.distance + '</span>';
                  }
				  if(item.regionPrefix != '') {
					  regionHtml = '<span class="dz">' + splitWord(item.regionPrefix) + '</span>';
				  }
                  dealHtml = '<li>'
                    + '<a onclick="_gaq.push([\'_trackEvent\', \'' + gaStr + '_item\', \'click\', \'\'])" href="javascript:window.location.href=\'/tuan/deal/' + item.id + '\'" class="item">'
                    +  '<table width="100%" cellspacing="0" cellpadding="0" class="deal-tab">'
                    +  '<tbody><tr>'
                    +    '<td width="100" valign="top"><img src="' + item.imageUrl + '" class="pic-box"></td>'
                    +    '<td valign="top">'
                    +    '<div class="infor">'
                    +      '<h3 class="title">' + item.titleAbstract + '</h3>'
                    +      '<div class="price"><span class="now">¥' + item.price + '</span><span class="old">¥' + item.marketPrice + '</span></div>'
                    +      '<div class="Fix">'
                    +        '<span class="num">' + item.currentJoin + '人</span>'
					+        regionHtml
                    +       distanceHtml
                    +      '</div></div>'
                    +    '</td>'
                    +  '</tr></tbody></table>' + getStatus(item.status)
                    + '</a></li>';
                  dealList.append(dealHtml);
                });
                curPage = parseInt(curPage) + 1;
                self.attr('data-cur', curPage);
                if (curPage < rt.pageCount) {
                  self.removeClass('more-default-btn').html('<i class="icon-more"></i>查看更多');
                } else {
                  self.addClass('more-default-btn').html('<i class="icon-more"></i>已经到底啦').unbind('click');
                }
              }
            },
            error: function (xhr, type) {
            }
        });
    });
  },
  
  getMoreMerchant: function () {
		var shopList = $('#J_shopList'),
			moreBtn = $('#J_moreBtn');
		moreBtn.on('click', function(e) {
		  e && e.preventDefault();
		  var self = $(this),
			 curPage = self.attr('data-current'),
			 shopId = self.attr('data-id'),
			 lat = 0,
			 lng = 0;
		  
		  lat = DP.Cookie.get('locallat');
		  lng = DP.Cookie.get('locallng');
		  
		  !lat && (lat = 0.0);
		  !lng && (lng = 0.0);
		  
		  $.ajax({
				  type: 'POST',
				  url: '/tuan/getShops',
				  data: { 'p': curPage, 'id': shopId, 'lat': lat, 'lng': lng },
				  dataType: 'json',
				  beforeSend: function () { 
					// var loadingHtml = '<div class="Box nom-box shop-box"><div id="J_spin" style="width:100%;height:83px;"></div></div>';
					// shopList.append(loadingHtml);
					// var spin = new DP.Spinner().spin($('#J_spin')[0]);
					self.addClass('more-default-btn').html('加载中');
				  },
				  success: function (rt) {
					if(rt.code === 200) {
					  var shopArr = rt.shopList;
					  if (shopArr.length > 0) {
						shopArr.forEach(function(item) {
							var shopHtml = '<div class="Box nom-box shop-box">'
							+ '<h3 class="title">' + item.name + '</h3><span class="distance">' + item.distance + '</span>'
							+ '<table width="100%" cellpadding="0" cellspacing="0">'
							+ '<tr>'
							+      '<td>'
							+     '<div class="infor">'
							+         '<div class="score Fix"><span class="item-rank-rst irr-star' + item.power + '">评分:五星商户</span></div>'
							+         '<p><a href="tel:' + item.phone + '">' + item.phone + '</a></p>'
							+         '<p>' + item.businessHours + '</p>'
							+         '<p>' + item.address + '</p>'
							+      '</div>'
							+     '</td>'
							+      '<td width="55" align="center" valign="middle">'
							+     '<a class="go" href="#"><i class="arrow-ent"></i></a>'
							+      '</td>'
							+ '</tr>'
							+ '</table>'
							+ '</div>';
							shopList.append(shopHtml);
						});
					  }
					  curPage = parseInt(curPage) + 1;
					  self.attr('data-current', curPage);
					  if (curPage < rt.pageCount) {
		                self.removeClass('more-default-btn').html('<i class="icon-more"></i>查看更多');
		              } else {
		                // self.remove();
		            	self.addClass('more-default-btn').html('<i class="icon-more"></i>已经到底啦').unbind('click');
		              }
					} else if (rt.code === 500) {
					  console.log('many type of errors');
					}
				  },
				  error: function (xhr, type) {
				  }
			  });
		});
	},
	slideNavi: function () {
	    var togglerBar = $('#J_togglerBar'),
	    	naviBlock = $('#J_navi');
	    function translation (el, options, callback) {
	            var opt = $.extend({
	                    duration : '0.4s',
	                    origin : '0 0'
	                }, options || {}),
	                style = el.style;
	            
	            !style['webkitTransitionProperty'] &&
	                (style['webkitTransitionProperty'] = '-webkit-transform');
	                    
	            style['webkitTransitionDuration'] !== opt.duration && 
	                (style['webkitTransitionDuration'] = opt.duration);
	            
	            style['webkitTransformOrigin'] !== opt.origin && 
	                (style['webkitTransformOrigin'] = opt.origin);
	            
	            style['webkitBackfaceVisibility'] !== 'hidden' &&
	                (style['webkitBackfaceVisibility'] = 'hidden');
	            
	            style['webkitTransformStyle'] !== 'preserve-3d' &&
	                (style['webkitTransformStyle'] = 'preserve-3d');
	            
	            if (opt.x != null || opt.y != null) {
	                style['webkitTransform'] = 'translate(' + 
	                        (opt.x ? opt.x + 'px,' : '0,') + 
	                        (opt.y ? opt.y + 'px' : '0') + ')';
	                setTimeout(callback, parseFloat(opt.duration) * 500);
	            }    
	        }
	    togglerBar.on('click', function(e) {
	      e && e.preventDefault();
	      var self = $(this),
	           status = self.attr('data-status');
	
	      if (status == 'off') {
	           self.attr('data-status', 'on');
	           naviBlock.css('min-height', '514px');
	           translation(naviBlock[0],{x: 0, duration:'0.4s'},function(){
               });
	           $('.slide').each(function(index, item) {
	        translation(item,{x: 250, duration:'0.4s'},function(){
	        	
            });
	            });
	      } else if (status == 'on') {
	          self.attr('data-status', 'off');
	          $('.slide').each(function(index, item) {
		        translation(item,{x: 0, duration:'0.4s'},function(){
		            naviBlock.attr('style', 'height: 100%; left:0; ');
		            $(item).attr('style', '');
		        });
	          });
	          translation(naviBlock[0],{x: -250, duration:'0.4s'},function(){
	        	 
	          });
	      }
	      
	      $('.slide').bind('touchstart touchmove touchend', function(e) {
	    	  e && e.preventDefault();
	    	  self.attr('data-status', 'off');
	          $('.slide').each(function(index, item) {
		        translation(item,{x: 0, duration:'0.4s'},function(){
		            naviBlock.attr('style', 'height: 100%; left:0; ');
		            $(item).attr('style', '');
		        });
	          });
	          translation(naviBlock[0],{x: -250, duration:'0.4s'},function(){
	        	  $('.slide').unbind();
	          });
          });
	      
	    });
	    
	  },
	  
	  dealDetails: function () {
		  var dealBtn = $('#J_dealDetail');
		  dealBtn.bind('click', function(e) {
			  var self = $(this);  
			  _gaq.push(['_trackEvent', 'deal_more', 'click', '']);
			  var formBox = DP.Notification.formBox('<p style="text-align:center;">图文详情页图片较多，<br/>可能消耗较多网络流量，是否继续？</p>', {
		  			content:'', 
		  			useBtns: true, 
		  			sureText: '确定',
		  			callback: function (opt) {
						this.close();
				  		window.location.href = '/tuan/deal/moreinfo/' + self.attr('data-id');
		  			}
		  	   });
		  });
	  },
	  returnBack: function (btn) {
		  btn.size() && btn.click(function(e) {
	    	e && e.preventDefault();
	    	var prevLink = document.referrer;
	    	if(prevLink != '' && /(m.alpha.dp|m.51ping.com|m.dianping.com)/.test(document.referrer)) {
	    		window.history.back();
	    	} else {
	    		window.location.href = '/tuan';
	    	}
	    });
	  }
	  
};
