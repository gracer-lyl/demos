// 申请延期列表交互
DP.define(['io/ajax'], function(D, require){

	var $=D.DOM,
		AJAX = require('io/ajax');
		
	function initList () {
		var tuanList = $.all('.yan-table tr');
		tuanList.forEach(function(item) {
			item = $(item);
			var showMutiBtn = item.one('.J_showMuti');
			if(showMutiBtn.count()) {
				showMutiBtn.on('click', function(e) {
					e && e.prevent();
					var self = $(this),
						id = self.attr('data-id');
					// 验证...
					
					new AJAX({
						method:"POST",
						data:{
							dealgroupid: id
						},
						dataType:'json',
						url: '/tuangou/ajax/ajaxGetDealGroupDelayDetail'
					}).on('success',function(json){
						if (json.code === 200) {
							 // code, msg, dealgroupTitle,beginTime,dealList:[{dealId: '12302',dealName:'name',currentEndDate: 'time1',originalEndDate: 'time2',logList:[xxx,xxx,xxx]}]
							var dealLists = json.dealList,
								dealHTML = '';
							dealLists.forEach(function (item) {
								var logLists = item.logList,
									logLength = logLists.length,
									logHTML = '';
								if(logLength == 0) {
									logHTML = '无';
								} else {
									logLists.forEach(function (lg) {
										logHTML += lg + '</br>';
									});
								}
								dealHTML += '<tr>\
									<td class="delay-td">' + item.dealId + '</td>\
									<td class="delay-td delay-td-fl">' + item.dealName + '</td>\
									<td class="delay-td">' + item.originalEndDate + '</td>\
									<td class="delay-td">' + (item.currentEndDate ? item.currentEndDate : '--') + '</td>\
									<td class="delay-td">' + logHTML + '</td>\
								</tr>';
							});
							var dialogHTML = '<div class="tuan-delay">\
								<p><label>团购ID：</label><span>' + id + '</span></p>\
								<p><label>团购名称：</label><span>' + json.dealgroupTitle + '</span></p>\
								<p><label>上线日期：</label><span>' + json.beginTime + '</span></p>\
								</div>\
								<div class="flow-table"><table width="100%" cellspacing="0" cellpadding="0" class="c-tab" style="border:1px solid #E4E4E4;">\
										<tbody>\
											<tr>\
												<th class="delay-th" width="13%">套餐号</th>\
												<th class="delay-th" width="35%">套餐名称</th>\
												<th class="delay-th" width="16%">初始有效期</th>\
												<th class="delay-th" width="16%">最新有效期</th>\
												<th class="delay-th" width="20%">延期记录</th>\
											</tr>' + dealHTML + '\
									 </tbody>\
								</table></div>';
							D.provide(["Tuangou::common/mbox"],function(D,Mbox){
								var closeBtn = $.create("a",{"class":"m-btn-yelo"}).html('<button class="btn-txt">关闭</button>').css("margin-right","0");
								var buttons = [closeBtn];
								var dialogue = new Mbox({
									size:{ x: 620, y: 550 },
									closable:true,
									url:{
										dialog:Mbox.dialog('<p>套餐详情</p>','<div class="DialogContent">' + dialogHTML + '</div>', buttons).dialog
									}
								});
								closeBtn.on("click",function(){
									dialogue.close();
								});
								dialogue.open();
							});
						}
					}).send();
					
					
				});
			}
		});
	}
	
	function main () {
		
		initList();
		
	}

	return {
		init:D.ready(main)
	};
	
});
