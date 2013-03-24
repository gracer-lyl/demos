<#assign title="我的团购券-大众点评团${currentCity.cityName}站" />
<#assign pageID=171003 />
<#include "/WEB-INF/pages/common/header.ftl">


<body>

	<#-- 顶部 -->
	<header>
		<a class="noDirect return returnBack" href="javascript:void(0);"><span class="return-txt">返回</span></a>团购券详情
	</header>
	
	<#-- 内容 -->
	<section>
		<div class="Box">
	    	<table class="deal-tab" width="100%" cellpadding="0" cellspacing="0">
		        <tr>
		            <td width="100" valign="top">
		            	<img class="pic-box" width="110" height="70" src="<@waps.PictureUrlFormat url="${dealGroup.imageUrl}" sub="1" />" />
		            </td>
		            <td valign="top">
			            <div class="infor">
			                <h3 class="title">${dealGroup.titleAbstract}</h3>
			                <p class="time">${receipt.dealReceiptEndDate?string("yyyy-MM-dd")}过期</p>
			            </div>
		            </td>
		        </tr>
	        </table>
	    </div>
	    <div class="Box"><p class="serial-num">序列号：<strong class="num">${receipt.serialNumber}</strong></div>
	    <div class="Box"><a class="tg-btn" onclick="_gaq.push(['_trackEvent', 'couponlist_sms', 'click', ''])" href="${mtBase}/receiptsms/${receiptID?c}">发送团购券短信到手机</a></div>
	    
	    <#-- 团购单信息 -->
		<#if (dealGroup.shopList?? && dealGroup.shopList.size() == 1)>
	    	<div class="Box nom-box shop-box">
		    	<#assign shop=dealGroup.shopList.get(0)> 
		    	<h3 class="title">${shop.shopName}</h3>
		    	<#if distance != null  >
		    		<span class="distance">${distance}</span>
		    	</#if>
		        <table width="100%" cellpadding="0" cellspacing="0">
		        <tr>
		            <td>
			            <div class="infor">
			                <div class="score Fix"><span title="五星商户" class="item-rank-rst irr-star${shop.shopPower}">评分:五星商户</span></div>
			
			                <p><a href="tel:${shop.phoneNo}">${shop.phoneNo}</a></p>
			                <p>${shop.businessHours}</p>
			                <p>${shop.address}</p>
			            </div>
		            </td>
			            <td width="55" align="center" valign="middle">
			            <a class="go" href="http://m.dianping.com/shop/${shop.shopId}"><i class="arrow-ent"></i></a>
		            </td>
		        </tr>
		        </table>
		    </div>
	    <#elseif (dealGroup.shopList?? && dealGroup.shopList.size() > 1)>
	    	<div class="Box more-shop-cls"><a class="more-btn" title="" href="/tuan/shoplist/${dealGroup.id}">查看全部${dealGroup.shopList.size()}家适用商户</a></div>
        </#if>
        
	    
	    <#if detail?? && detail != "">
		    <div class="Box nom-box">
		    	<#if dealGroup.detailDTO.importantPoint?? && dealGroup.detailDTO.importantPoint != "">
					${dealGroup.detailDTO.importantPoint}<br> 
	    		</#if>
				${detail}
		    </div>
		</#if>
	    
	    <#if specialPoint?? && specialPoint != "">
		    <div class="Box nom-box">
				${specialPoint}
		    </div>
	    </#if>
	    
	    <div class="Box"><a id="J_dealDetail" class="noDirect more-btn" data-id="${dealGroup.id}" title="更多图文详情" href="javascript:void(0);" onclick="_gaq.push(['_trackEvent', 'couponlist_more', 'click', ''])">更多图文详情</a></div>
	</section>
	<#include "/WEB-INF/pages/common/footer.ftl">
	<script type="text/javascript">
	$(document).ready(function(){
		DP.app.dealDetails();
	});
	</script>
	<script type="text/javascript">pageTracker._trackPageview('coupondetail/${currentCity.cityName}');</script>
</body>
