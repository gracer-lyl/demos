// 申请延期列表交互
DP.define(['io/ajax'], function(D, require){

	var $=D.DOM,
		AJAX = require('io/ajax');
	
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
	
	
	function initAction () {
		var timeInput = $('#J_time'),
			submitBtn = $('#J_submit'),
			errHolder = $('#J_err');
		
		timeInput.on('focus', function (e) {
		
			// 弹出日历
			e && e.prevent();
			var self = $(this),
				beginTime = self.attr('data-begintime'),
				endTime = self.attr('data-endtime');
			errHolder.css('visibility', 'hidden').one('span').text('');
			
			console.log(beginTime);
			console.log(endTime);
			
		});
		
		submitBtn.on('click', function(e) {
			e && e.prevent();
			
			if(!timeInput.val().trim()) {
				errHolder.css('visibility', 'visible').one('span').text('请填写需要延期的时间！');
			} else {
				
				function sendAjaxAction (time) {
					new AJAX({
						method:"POST",
						data:{
							dealgroupid: time.attr('data-id'),
							newEndTime: time.val()
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
			
				D.provide(["Tuangou::common/mbox"],function(D,Mbox){
					var dialogHTML = '<div class="sure-delay">\
				<p class="sure-date">团购券有效期将延至：<strong>' + timeInput.val() + '</strong></p>\
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
						sendAjaxAction(timeInput);
					});
					dialogue.open();
				});
			}
		});
	}
	
	function main () {
	
		initAction();
		
	}

	return {
		init:D.ready(main)
	};
	
});
