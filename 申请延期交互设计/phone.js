// 申请延期列表交互
DP.define(['io/ajax'], function(D, require){

	var $=D.DOM,
		AJAX = require('io/ajax');
	
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
	
	var phoneVerify = {

		sendVerifyBtn: $('#J_sendVerifyBtn'),
		txtCode: $('#txtCode'),
		codeErr: $('#J_codeErr'),
		watchVerifyBtn: $('#J_sureBtn'),

		init: function () {
			var _this = this;

			_this.sendVerifyBtn.on('click', function(e) {
				e && e.prevent();
				_this.sendVerifyCode();
			});

			_this.txtCode.on('focus', function(e) {
				console.log(11);
				_this.codeErr.css('visibility', 'hidden').one('span').text('');
			});
			
			_this.txtCode.on('keyup', function(e) {

				if(e.code==46 || (e.code > 36 && e.code < 41)){
 					return false;
 				}
			
 				var val = sectionFormat(_this.txtCode.val(),3,' ');
				
				if(e.code===8 && val.substr(val.length-1) === ' '){
					val=val.substr(0,val.length-1);
				}
				
 				_this.txtCode.val(val);
				
				if(val.trim()) {
					_this.watchVerifyBtn.removeClass('btn-ash').addClass('btn-yel').attr('disabled', false);
				} else {
					_this.watchVerifyBtn.removeClass('btn-yel').addClass('btn-ash').attr('disabled', true);
				}
 				
			});

			_this.watchVerifyBtn.on('click', function(e) {
				e && e.prevent();
				new AJAX({
					method:"POST",
					data:{
						code: _this.txtCode.val().replace(/\s+/g, '')
					},
					dataType:'json',
					url: '/tuangou/ajax/ajaxValidateCodeResult'
				}).on('success',function(json){
					if (json.code === 200) {
						// window.location.href = '/';
					} else if(json.code === 500) {
						_this.codeErr.css('visibility', 'visible').one('span').text(json.msg);
					}
				}).send();
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
	                _ele.attr('disabled', false);
	                _ele.removeClass('btn-ash');
					_ele.addClass('btn-epico');
	                holder.text('发送验证码');
	            };
	        _ele.attr('disabled', true);
	        _ele.addClass('btn-ash');
			_ele.removeClass('btn-epico');
	        window.setTimeout(count, 1000);
	    },

		sendVerifyCode: function () {

			var _this = this;

			new AJAX({
				method:"GET",
				data:{
					mobile: '13120815755'
				},
				dataType:'json',
				url: '/tuangou/ajax/ajaxSendValidateCode'
			}).on('success',function(json){
				if (json.code === 200) {
					_this.txtCode.attr('disabled', false);
					_this.txtCode.val('');
					
					_this.countdown(29, _this.sendVerifyBtn);

				}
			}).send();

		}
	};
	
	function main () {
		
		phoneVerify.init();
		
	}

	return {
		init:D.ready(main)
	};
	
});
