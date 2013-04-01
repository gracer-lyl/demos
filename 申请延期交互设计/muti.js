// 申请延期列表交互
DP.define(['io/ajax', 'Tuangou::common/calendars/superdatepicker'], function(D, require){

	var $=D.DOM,
		AJAX = require('io/ajax'),
		SuperDatePicker = require('Tuangou::common/calendars/superdatepicker');
	
	function _alert(msg,callback){
   	 D.provide(["Tuangou::common/mbox"],function(D,Mbox){
   			var sureBtn=$.create("a",{"class":"m-btn-yelo"}).html('<button class="btn-txt">确定</button>').css("margin-right","0");
   			var buttons=[sureBtn];
   			var dialogue=new Mbox({
   				size:{ x:300 },
   				closable:true,
   				url:{
   					dialog:Mbox.dialog('','<div class="DialogContent" style="padding:5px;font-size:14px;">' + msg + '</div>',buttons).dialog
   				}
   			});
   			sureBtn.on("click",function(){
   				dialogue.close();
   				callback && callback();
   			});
   			dialogue.open();
   	 });
   }
	
	
	function initTab () {
		
		D.provide("switch/core", function (D, Switch) {
            new Switch().plugin('tabSwitch').init({
                CSPre: '#J_tabs',
                itemCS: '.tab-panel',
                itemOnCls: 'tab-panel-on',
                triggerCS: '.tab li',
                triggerOnCls: 'current',
                triggerType: 'click'
            });
		});
	}
	
	function initAction () {
	
		$.all('.J_time').forEach(function(item) {
			item = $(item);
			var datepicker = new SuperDatePicker(item, {
				isDouble: true,
				disable: {
					begin: new Date(item.attr('data-beginTime')),
					end: new Date(item.attr('data-endTime'))
				}
			});
		});
	
		// dealgroupid，newEndTime,dealList:  “1:2012-01-01,2:2013”
		// ajaxSubmitDealDelay
		var submitBtn = $('#J_submit'),
			comboList = $.all('.combo'),
			errHolder = $('#J_err');
		
		function sendAjaxAction (id, val) {
			new AJAX({
				method:"POST",
				data:{
					dealgroupid: id,
					newEndTime: val
				},
				dataType:'json',
				url: '/tuangou/ajax/ajaxSubmitDealDelay'
			}).on('success',function(json){
				if (json.code === 200) {
					// window.location.href = '/';
					_alert('提交申请成功！</br><p>' + json.msg + '</p>');
				} else if(json.code === 500) {
				}
			}).send();
		}
		
		function sendAjaxAction2 (id, str) {
			new AJAX({
				method:"POST",
				data:{
					dealgroupid: id,
					dealList: str
				},
				dataType:'json',
				url: '/tuangou/ajax/ajaxSubmitDealDelay'
			}).on('success',function(json){
				if (json.code === 200) {
					// window.location.href = '/';
					_alert('提交申请成功！</br><p>' + json.msg + '</p>');
				} else if(json.code === 500) {
				}
			}).send();
		}
		
		submitBtn.on('click', function (e) {
			e && e.prevent();
			var self = $(this),
				grpId = self.attr('data-id'),
				isSingle = comboList.get(0).hasClass('tab-panel-on');
			if(isSingle) {
				// 全部套餐延期
				var sTime = $('.tab-panel-on .J_time');
				
				if(!sTime.val().trim()) {
					errHolder.css('visibility', 'visible').one('span').text('请填写需要延期的时间！');
				} else {
					D.provide(["Tuangou::common/mbox"],function(D,Mbox){
						var dialogHTML = '<div class="sure-delay">\
					<p class="sure-date">团购券有效期将延至：<strong>' + sTime.val() + '</strong></p>\
					<p>“本商户确认本次团购方案的有效期变更系本商户的真实意思表示。本商户承诺将按照变更后的有效期向消费者提供服务，否则，本商户承诺向大众点评网（包括其关联公司）以及相对应的消费者承担违约责任。”</p>\
					</div>';
						var sureBtn=$.create("a",{"class":"m-btn-yelo"}).html('<button class="btn-txt">确认</button>').css("margin-right","0");
						var cancelBtn=$.create("a",{"class":"m-btn"}).html('<button class="btn-txt">取消</button>').css("margin-right","0");
						var buttons = [sureBtn, cancelBtn];
						var dialogue = new Mbox({
							size:{ x: 490 },
							closable:true,
							url:{
								dialog:Mbox.dialog('<p>提交延期申请</p>','<div class="DialogContent">' + dialogHTML + '</div>', buttons).dialog
							}
						});
						cancelBtn.on("click",function(){
							dialogue.close();
						});
						sureBtn.on("click",function(){
							dialogue.close();
							sendAjaxAction(grpId, sTime.val());
						});
						dialogue.open();
					});
				}
				
			} else {
				// 分套餐延期
				var allTimes = $.all('.tab-panel-on .J_time'),
					dealData = [],
					dealTitle = [],
					dealTime = [],
					len = 0,
					dealLength = 0;
				allTimes.forEach(function(t) {
					t = $(t);
					if(t.val().trim() == '') {
						len++;
					} else {
						dealData.push(t.attr('data-sid') + ':' + t.val());
						dealTitle.push(t.parent().prev().prev().html());
						dealTime.push(t.val());
					}
				});
				dealLength = dealData.length;
				if(len === allTimes.count()) {
					_alert('您没有延长任何一个套餐的有效期哦！');
					return;
				} else {
					var dealHTML = '';
					for(var j = 0; j < dealLength; j++) {
						dealHTML += '<tr>\
							<td class="delay-td delay-td-fl">' + dealTitle[j] + '</td>\
							<td class="delay-td font-bold">' + dealTime[j] + '</td>\
						</tr>';
					}
					
					D.provide(["Tuangou::common/mbox"],function(D,Mbox){
						
						var dialogHTML = '<div class="flow-table" style="height:384px;"><table width="100%" cellspacing="0" cellpadding="0" class="c-tab spe-tab" style="border:none;">\
								<tbody>\
									<tr>\
										<th class="delay-th delay-th-nobg" width="66%">套餐名称</th>\
										<th class="delay-th delay-th-nobg" width="34%">有效期延至</th>\
									</tr>' + dealHTML + '\
							 </tbody>\
						</table></div>\
						<p class="sure-delay" style="margin: 6px 40px;">“本商户确认本次团购方案的有效期变更系本商户的真实意思表示。本商户承诺将按照变更后的有效期向消费者提供服务，否则，本商户承诺向大众点评网（包括其关联公司）以及相对应的消费者承担违约责任。”</p>';
						var sureBtn=$.create("a",{"class":"m-btn-yelo"}).html('<button class="btn-txt">确定</button>').css("margin-right","0");
						var cancelBtn=$.create("a",{"class":"m-btn"}).html('<button class="btn-txt">取消</button>').css("margin-right","0");
						var buttons=[sureBtn, cancelBtn];
						var dialogue=new Mbox({
							size:{ x: 490, y: 550 },
							closable:true,
							url:{
								dialog:Mbox.dialog('<p>提交申请延期</p>','<div class="DialogContent">' + dialogHTML + '</div>',buttons).dialog
							}
						});
						cancelBtn.on('click', function() {
							dialogue.close();
						});
						sureBtn.on("click",function(){
							dialogue.close();
							sendAjaxAction2(grpId, dealData.join(','));
						});
						dialogue.open();

					});
					
					
				}
			}
			
		});
	}
	
	function main () {
	
		initTab();
		initAction();
		
	}

	return {
		init:D.ready(main)
	};
	
});
