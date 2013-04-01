// Comment
;
DP.define(['io/ajax'], function(D, require){
	var $=D.DOM,
		AJAX = require('io/ajax');
	
	var singleVerifyURL='/tuangou/ajax/verify',
		multipleVerifyURL='/tuangou/ajax/batchverify',
		queryVerifyURL='/tuangou/ajax/ajaxCheckReceipt',
		sendMobileURL = '/tuangou/ajax/ajaxSendMobileCode',
		showVerifyURL = '/tuangou/ajax/ajaxShowReceiptByMobileCode',
		petchVerifyURL = '/tuangou/ajax/ajaxMobileReceiptVerify';

	function _alert(msg,callback){
   	 D.provide(["Tuangou::common/mbox"],function(D,Mbox){
   			var sureBtn=$.create("a",{"class":"m-btn-yelo"}).html('<button class="btn-txt">确定</button>').css("margin-right","0"),
   				cancelBtn = $.create("a",{ "class":"m-btn" }).html('<button class="btn-txt">取消</button>').css("margin-right", "0");
   			var buttons=[sureBtn, cancelBtn];
   			var dialogue=new Mbox({
   				size:{ x:300},
   				closable:true,
   				url:{
   					dialog:Mbox.dialog('<p>提示</p>','<div class="DialogContent" style="padding:5px;font-size:14px;">'+msg+'</div>',buttons).dialog
   				}
   			});
   			sureBtn.on("click",function(){
   				dialogue.close();
   				callback && callback();
   			});
   			cancelBtn.on('click',function(){
            	dialogue.close();
            	return false;
            });
   			dialogue.open();
   	 });
   }


   function phoneFormat(phoneNum, preFixNum, sectionNum, seperator) {
	    if (typeof phoneNum === 'undefined' || (phoneNum.constructor !== Number && phoneNum.constructor !== String)) {
	        return '';
	    }
	    if (typeof sectionNum === 'undefined' || sectionNum.constructor !== Number || sectionNum < 1) {
	        sectionNum = 3;
	    }
	    if (typeof seperator === 'undefined' || (seperator.constructor !== String && seperator.constructor !== Number)) {
	        seperator = '';
	    }
	    var actualLength = phoneNum.replace(/\s+/g, '').length,
	    	dataArr = phoneNum.toString().split(''),
	    	resultArr = [],
	    	preIndex = 0,
	    	sepIndex = 0;
	    for (var i = 0, len = dataArr.length; i < len; i++) {
	        if (dataArr[i] === seperator) { continue; }
	        resultArr.push(dataArr[i]);
	        ++preIndex;
	        if ((preIndex > preFixNum - 1) && (sepIndex < actualLength - preFixNum)) {
	            if ((sepIndex++) % sectionNum === 0) {
	                resultArr.push(seperator);
	            }
	        }
	    }
	    return resultArr.join('');
	}
    // phoneFormat('13120815755', 3, 4, ' ');

    // code Format
    function sectionFormat (originalData,sectionNumber,seperator) {
		if(typeof originalData==='undefined'||(originalData.constructor!==Number&&originalData.constructor!==String)){return '';}
		if(typeof sectionNumber==='undefined'||sectionNumber.constructor!==Number||sectionNumber<1){sectionNumber=3;}
		if(typeof seperator==='undefined'||(seperator.constructor!==String&&seperator.constructor!==Number)){seperator='';}
		var dataArr=originalData.toString().split('');
		var resultArr=[],elemIndex=0;
		for(var i=0,len=dataArr.length;i<len;i++){
			if(dataArr[i]===seperator){continue;}
			resultArr.push(dataArr[i]);
			if(++elemIndex%sectionNumber===0){
				resultArr.push(seperator);
			}
		}
		return resultArr.join('');
	}

	// -----------------------------------------
	function Slider(navs, sliders, handlers) {
        this.navs = navs
        this.sliders = sliders
        this.size = this.sliders.count()
        this.leftHandler = $(handlers.el(0))
        this.rightHandler = $(handlers.el(1))
        this.index = - 1
        this.bindEvent()
        this.changeIndex(0)
    }

    Slider.prototype.bindEvent = function () {
        var that = this
        this.navs.all('a').forEach(function (el, index) {
            $(el).on('click', function (evt) {
                evt.stop()
                that.changeIndex(index)
            })
        })
        this.leftHandler.on('click', function (evt) {
            evt.stop()
            if (that.index - 1 >= 0) {
                that.changeIndex(that.index - 1)
            }
        })
        this.rightHandler.on('click', function (evt) {
            evt.stop()
            if (that.index + 1 <= that.size - 1) {
                that.changeIndex(that.index + 1)
            }
        })
    }

    Slider.prototype.changeIndex = function (index) {
        if (this.index !== index) {
            this.index = index
            this.navs.removeClass('menu-on')
            $(this.navs.el(this.index)).addClass('menu-on')
            this.sliders.removeClass('show-on')
            $(this.sliders.el(this.index)).addClass('show-on')
            if (this.index === 0) {
                this.leftHandler.removeClass('active').addClass('disac-pre')
                this.rightHandler.addClass('active')
            } else if (this.index === this.size - 1) {
                this.leftHandler.removeClass('disac-pre')
                this.rightHandler.removeClass('active').addClass('disac-pre')
            } else {
                this.leftHandler.removeClass('disac-pre').addClass('active')
                this.rightHandler.removeClass('disac-pre').addClass('active')
            }
        }
    }

	var phoneVerify = {

		sendVerifyBtn: $('#J_sendVerifyBtn'),
		txtPhone: $('#txtPhone'),
		txtCode: $('#txtCode'),
		phoneErr: $('#J_phoneErr'),
		codeErr: $('#J_codeErr'),
		watchVerifyBtn: $('#J_watchVerifyBtn'),
		patchBtn: $('#J_patchValidateBtn'),

		init: function () {
			var _this = this;
			D.provide(['Tuangou::placeholder'], function(DP, Placeholder) {
				new Placeholder($('#txtPhone'));
				new Placeholder($('#txtCode'));
			});
			
			D.provide(['util/cookie'],function(D, Cookie){
				var goPetchBtn = $('#J_goPetch');
				goPetchBtn.count() && goPetchBtn.on('click', function(e) {
					e && e.prevent();
					if(/batchVerify/.test(window.location.href)) {
						Cookie.write('show_single_or_multi', 2, { domain: '.' + document.domain });
					}
					setTimeout(function() {
						window.location.href = '/tuangou/verify';
					}, 200);
				});
			});
			
			// phone format
			_this.txtPhone.on('keyup',function(e) {

 				if(e.code===8 || e.code==46 || (e.code > 36 && e.code < 41)){
 					return false;
 				}
 				var val = phoneFormat(_this.txtPhone.val(),3, 4,' ');	
 				_this.txtPhone.val(val);

 				if(e.code===13){
 					_this.sendVerifyCode();
 				}
 			});

			_this.sendVerifyBtn.on('click', function(e) {
				e && e.prevent();
				_this.sendVerifyCode();
			});


			_this.txtCode.on('keyup', function(e) {

				if(e.code===8 || e.code==46 || (e.code > 36 && e.code < 41)){
 					return false;
 				}

 				var val = sectionFormat(_this.txtCode.val(),3,' ');
 				_this.txtCode.val(val);
 				
 				_this.watchVerifyBtn.removeClass('butn-disable').attr('disabled', false);
 				
 				if(e.code===13){
 					_this.searchResult();
 				}
			});

			_this.watchVerifyBtn.on('click', function(e) {
				e && e.prevent();
				_this.searchResult();
			});


			_this.patchValidate();
			
			D.provide(["Tuangou::common/mbox"],function(D,Mbox){
				
				var dialogHTML = '<div class="tuan-delay">\
				<p><label>团购ID：</label><span>123456</span></p>\
				<p><label>团购名称：</label><span>大光明电影院双人观影套餐]仅售74元,价值240元双人观影套餐!</span></p>\
				<p><label>上线日期：</label><span>2013-03-22</span></p>\
				</div>\
				<div class="flow-table"><table width="100%" cellspacing="0" cellpadding="0" class="c-tab" style="border:1px solid #E4E4E4;">\
						<tbody>\
							<tr>\
								<th class="delay-th" width="13%">套餐号</th>\
								<th class="delay-th" width="35%">套餐名称</th>\
								<th class="delay-th" width="16%">初始有效期</th>\
								<th class="delay-th" width="16%">最新有效期</th>\
								<th class="delay-th" width="20%">延期记录</th>\
							</tr>\
							<tr>\
								<td class="delay-td">567832</td>\
								<td class="delay-td delay-td-fl">大光明电影院双人观影套餐]仅售74元,价值240元双人观影套餐!</td>\
								<td class="delay-td">2013-03-22</td>\
								<td class="delay-td">2013-03-24</td>\
								<td class="delay-td">2013-03-24&nbsp;操作</td>\
							</tr>\
							<tr>\
								<td class="delay-td">567832</td>\
								<td class="delay-td delay-td-fl">大光明电影院双人观影套餐]仅售74元,价值240元双人观影套餐!</td>\
								<td class="delay-td">2013-03-22</td>\
								<td class="delay-td">2013-03-24</td>\
								<td class="delay-td">2013-03-24&nbsp;操作</td>\
							</tr>\
							<tr>\
								<td class="delay-td">567832</td>\
								<td class="delay-td delay-td-fl">大光明电影院双人观影套餐]仅售74元,价值240元双人观影套餐!</td>\
								<td class="delay-td">2013-03-22</td>\
								<td class="delay-td">2013-03-24</td>\
								<td class="delay-td">2013-03-24&nbsp;操作</td>\
							</tr>\
					 </tbody>\
				</table></div>';
			
				/*
				var dialogHTML = '<div class="sure-delay">\
				<p class="sure-date">团购券有效期将延至：<strong>2013-04-30</strong></p>\
				<p>“本商户确认本次团购方案的有效期变更系本商户的真实意思表示。本商户承诺将按照变更后的有效期向消费者提供服务，否则，本商户承诺向大众点评网（包括其关联公司）以及相对应的消费者承担违约责任。”</p>\
				</div>';
				*/
				
				/*
				var dialogHTML = '<div class="flow-table" style="height:384px;"><table width="100%" cellspacing="0" cellpadding="0" class="c-tab spe-tab" style="border:none;">\
						<tbody>\
							<tr>\
								<th class="delay-th delay-th-nobg" width="66%">套餐名称</th>\
								<th class="delay-th delay-th-nobg" width="34%">有效期延至</th>\
							</tr>\
							<tr>\
								<td class="delay-td delay-td-fl">大光明电影院双人观影套餐]仅售74元,价值240元双人观影套餐!</td>\
								<td class="delay-td font-bold">2013-03-25</td>\
							</tr>\
							<tr>\
								<td class="delay-td delay-td-fl">大光明电影院双人观影套餐]仅售74元,价值240元双人观影套餐!</td>\
								<td class="delay-td font-bold">2013-03-25</td>\
							</tr>\
							<tr>\
								<td class="delay-td delay-td-fl">大光明电影院双人观影套餐]仅售74元,价值240元双人观影套餐!</td>\
								<td class="delay-td font-bold">2013-03-25</td>\
							</tr>\
					 </tbody>\
				</table></div>\
				<p class="sure-delay" style="margin: 6px 40px;">“本商户确认本次团购方案的有效期变更系本商户的真实意思表示。本商户承诺将按照变更后的有效期向消费者提供服务，否则，本商户承诺向大众点评网（包括其关联公司）以及相对应的消费者承担违约责任。”</p>';
				*/
				var sureBtn=$.create("a",{"class":"m-btn-yelo"}).html('<button class="btn-txt">确定</button>').css("margin-right","0");
				var cancelBtn=$.create("a",{"class":"m-btn"}).html('<button class="btn-txt">取消</button>').css("margin-right","0");
				var buttons=[sureBtn, cancelBtn];
				var dialogue=new Mbox({
					size:{ x: 620, y: 550 },
					// size:{ x: 490 },
					// size:{ x: 490, y: 550 },
					closable:true,
					url:{
						dialog:Mbox.dialog('<p>提交申请延期</p>','<div class="DialogContent">' + dialogHTML + '</div>',buttons).dialog
					}
				});
				sureBtn.on("click",function(){
					dialogue.close();
					// callback && callback();
				});
				dialogue.open();

				var userBookingPhoneSlider = new Slider($.all('.product-show .menu-tit li'), $.all('.product-show .show-wrap li'), $.all('.product-show .show-wrap > a'));

			});

		},
		countdown: function (time, _ele) {
	        if (!time) return;

	        var holder = _ele,
	            count = function () {
	                holder.count() > 0 && holder.text('' + time + '秒后发送');
	                time -= 1;
	                time > 0 ? window.setTimeout(count, 1000) : btnChange();
	            },
	            btnChange = function () {
	                // _ele.css('opacity', 1);
	                _ele.attr('disabled', false);
	                _ele.removeClass('butn-disable');
	                holder.text('发送验证码');
	            };
	        // _ele.css('opacity', 0.4);
	        _ele.attr('disabled', true);
	        _ele.addClass('butn-disable');
	        window.setTimeout(count, 1000);
	    },

	    checkPhone: function (ele) {
	    	var _this = this,
				phoneVal = ele.val().replace(/\s+/g, ''),
				placeholderWords = ele.attr('placeholder'),
				check = true;

			if (!phoneVal || !phoneVal.replace(placeholderWords, '')) {
				ele.el(0).focus();
				check = false;
			} else if (!/^(1[3-9][0-9])\d{8}$/.test(phoneVal)) {
				ele.el(0).focus();
				_this.phoneErr.css('visibility', 'visible').html('<span>手机号格式错误，请重新输入！</span>');
				check = false;
			} else {
				_this.phoneErr.css('visibility', 'hidden').empty();
			}
			return check;
	    },

		sendVerifyCode: function () {

			var _this = this,
				phoneNum = _this.txtPhone,
				phoneVal = phoneNum.val().replace(/\s+/g, '');

			if(!_this.checkPhone(phoneNum)) { return; }

			new AJAX({
				method:"GET",
				data:{
					mobile: phoneVal
				},
				dataType:'json',
				url: sendMobileURL
			}).on('success',function(json){
				if (json.code === 200) {
					_this.txtCode.attr('disabled', false);
					_this.txtCode.val('');
					D.provide(['Tuangou::placeholder'], function(DP, Placeholder) {
						new Placeholder(_this.txtCode);
					});
					// data example : {"code":200,"msg":"发送验证码成功！"}
					var showStage = $('.product-show'),
					      noStage = $('.no-branch');

					showStage.count() && showStage.dispose();
					noStage.count() && noStage.dispose();

					if(!_this.patchBtn.hasClass('branch-disable')) {
						_this.patchBtn.addClass('branch-disable').one('.btn-txt').attr('disabled', true);
					}

					_this.countdown(29, _this.sendVerifyBtn);

				} else if (json.code === 500) {
					_this.phoneErr.css('visibility', 'visible').html('<span>' + json.msg + '</span>');
				}
			}).send();

		},

		searchResult: function () {

			var _this = this,
				phoneEle = _this.txtPhone,
				phoneVal = phoneEle.val().replace(/\s+/g, ''),
				codeEle = _this.txtCode,
				codeVal = codeEle.val().replace(/\s+/g, ''),
				codePlaceholder = codeEle.attr('placeholder');

			// validate phone input box
			if(!_this.checkPhone(phoneEle)) { return; }

			// only user's enter operation(phone number in)
			if (!codeVal || !codeVal.replace(codePlaceholder, '')) {
				codeEle.el(0).focus();
				return;
			}
			
			_this.codeErr.css('visibility', 'hidden').empty();

			$('.product-show').count() && $('.product-show').dispose();
			$('.no-branch').count() && $('.no-branch').dispose();

			new AJAX({
				method:"GET",
				data:{
					mobile: phoneVal,
					verifyCode: codeVal
				},
				dataType:'json',
				url: showVerifyURL
			}).on('success',function(json){
				if (json.code === 200) {
					var showStage = $('.product-show'),
						noStage = $('.no-branch'),
						helpEle = $('#J_help');

					//{"code":200,"msg":"发送验证码成功！", "dealList":[{"name": "仅售26元，价值50元抵用券1张！5店可选，可累计使用，新鲜食材，精心熬煮，粥香味悠长，煲出健康好滋味！", "receiptList":[{"serial": "123456", "id": "1"}, {"serial": "123789", "id": "2"}, {"serial": "456789", "id": "3"} ]}, {"name": "肯德基，健康好滋味！", "receiptList":[{"serial": "20000", "id": "4"}, {"serial": "145200", "id": "5"}]}]}
					var dealList = json.dealList,
						dealLength = dealList.length,
						patchHTML = '';

					showStage.count() && showStage.dispose();
					noStage.count() && noStage.dispose();

					if (dealLength === 0) {
						// 如果没有该店的有效团购券
						$.create('div', {'class': 'no-branch'}).html('<p>抱歉，没有适用于该店的有效团购券。</p>').inject(helpEle, 'after');
						if(!_this.patchBtn.hasClass('branch-disable')) {
							_this.patchBtn.one('.btn-txt').attr('disabled', true);
						}

					} else {
						// 遍历展示列表，渲染页面
						dealList.forEach(function(item) {
							var deal = '',
								receiptLists = item.receiptListBean;
							deal += '<dl class="phone-list"><dt><input autocomplete="off" name="" type="checkbox" />' + item.dealName + '</dt>';
							receiptLists.forEach(function(receipt) {
								deal += '<dd><input name="" data-serial="' + receipt.serialNo + '" autocomplete="off" type="checkbox" value="' + receipt.receiptId + '">' + receipt.serialNo + '</dd>';
							});
							deal += '</dl>';
							patchHTML += deal;
						});
						var productEle = $.create('div', {'class': 'product-show'}).html(patchHTML).inject(helpEle.parent(), 'after');

						if(_this.patchBtn.hasClass('branch-disable')) {
							_this.patchBtn.removeClass('branch-disable').one('.btn-txt').attr('disabled', false);
						}

						var checkAllEle = productEle.all('.phone-list dt input'),
							checkOneEle = productEle.all('.phone-list dd input');

						checkAllEle.count() && checkAllEle.on('click', function() {
							var self = $(this),
								receiptCheckbox = self.parent().parent().all('dd input');

							if (self.el(0).checked) {
								receiptCheckbox.attr('checked', true);
							} else {
								receiptCheckbox.attr('checked', false);
							}
							
						});

						checkOneEle.count() && checkOneEle.on('click', function () {

				            var _self = this,
				                isCheckd = _self.checked,
				                tempEle = $(_self).parent().parent(),
				                allOnes = tempEle.all('dd input'),
				                allDt = tempEle.one('dt input'),
				                allLen = allOnes.count(),
				                selectLen = 0;

				            allOnes.forEach(function (item) {
				                item.checked && selectLen++;
				            });

				            if (isCheckd) {
				                if (selectLen == allLen) {
				                    allDt.el(0).checked = true;
				                }
				            } else {
				                if (selectLen == allLen - 1) {
				                    allDt.el(0).checked = false;
				                }
				            }
				        });

						// _this.patchValidate(productEle);

					}
				} else if (json.code === 500) {
					_this.codeErr.css('visibility', 'visible').html('<span>' + json.msg.message + '</span>');
				}
			}).send();

		},

		patchValidate: function () {
			// 用户选择操作
			var self  = this;

			// 用户批量验证操作
			self.patchBtn.on('click', function(e) {
				e && e.prevent();
				var serialArr = [],
					idArr = [],
					len = 0,
					phoneNumber = self.txtPhone.val().replace(/\s+/g, '');
				$('.product-show').all('.phone-list dd input').forEach(function(ck) {
					var ckEle = $(ck);
					if (ck.checked) {
						serialArr.push(ckEle.attr('data-serial'));
						idArr.push(ckEle.val());
					}
				});

				len = serialArr.length;

				if (len === 0) {
					// 错误提示?
					return;
				} else {
					_alert('<div class="sure-branch">您已选中<strong>' + len + '</strong>张团购券，确认消费？</div>', function() {
						
						new AJAX({
							method:"GET",
							data:{
								serialNumStr: serialArr.join(','),
								receiptIDStr: idArr.join(','),
								mobile: phoneNumber
							},
							dataType:'json',
							url: petchVerifyURL
						}).on('success',function(json){
							if (json.code === 200) {
								D.provide(["Tuangou::common/mbox"],function(D,Mbox){
									var showHTML, list;
									if (json.successCount == len) {
										showHTML = '<div class="sure-branch"><i class="icon-suc-big"></i><strong>' + json.successCount + '</strong>张团购券消费成功！</div>';
									} else if (parseInt(json.successCount) < len) {
										showHTML = '<div class="sure-branch"><strong>' + json.successCount + '</strong>张团购券消费成功！<p><strong>' + json.failCount + '</strong><span class="err">张消费失败！</span></p></div>';
									}

									var closeBtn = $.create('span', {'class': 's-btn-yelo sure-mrgn'}).html('<button class="btn-txt" type="button">关闭</button>');
						   			var sureBtn= $.create('span',{'class':'s-btn-yelo'}).html('<button class="btn-txt" type="button">查看消费记录</button>');
						   			var buttons=[closeBtn, sureBtn];
						   			var dialogue = new Mbox({
						   				size:{ x:300},
						   				closable:true,
						   				url:{
						   					dialog:Mbox.dialog('','<div class="DialogContent" style="padding:5px;font-size:14px;">' + showHTML + '</div>', buttons).dialog
						   				}
						   			});
						   			closeBtn.on("click",function(){
						   				dialogue.close();
						   				pageTracker._trackPageview('dp_bc_tuangou_receiptverify_batchconsume_mobile_close');
						   			});
						   			sureBtn.on('click', function(){
										dialogue.close();
										pageTracker._trackPageview('dp_bc_tuangou_receiptverify_batchconsume_mobile_enterconsumelist');
						   				window.location.href = json.consumeURL;
						   			});
						   			dialogue.open();
									if (json.successCount <= len) {
										list = json.receiptList;
										list.forEach(function(item) {
											$('.product-show').all('.phone-list dd input').forEach(function(t) {
												t = $(t);
												if (t.val() == item) {
													var prt = t.parent().parent();
													if(prt.all('dd input').count() == 1) {
														prt.dispose();
														if($('.product-show').all('.phone-list dt input').count() == 0) {
															$('.product-show').dispose();
															self.patchBtn.addClass('branch-disable').one('.btn-txt').attr('disabled', true);
														}
													} else {
														t.parent().dispose();
													}
												}
											});
										});
									}
							   	 });
							}
						}).send();

					});
					
				}
			});

		}
	};

	function main () {
		phoneVerify.init();
	}

	return {
		init:D.ready(main)
	};
	
});
