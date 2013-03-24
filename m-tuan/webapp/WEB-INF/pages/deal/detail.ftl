<#assign title="${dealGroup.titleAbstract}团购-大众点评团${currentCity.cityName}站" />
<#assign pageID=171006 />
<#include "/WEB-INF/pages/common/header.ftl">
<body>
<!--顶部-->
<header>
	<a href="javascript:void(0)" class="return returnBack"><span class="noDirect return-txt">返回</span></a>团购详情
</header>


<!--顶部 end-->

<!--内容-->
<div class="deal-box">
	<div class="img" id="J_img">
    	<img src="<@waps.PictureUrlFormat url="${dealGroup.imageUrl}" sub="3" />" />
        <div class="deal-tit">
			<h1>${dealGroup.titleAbstract}</h1>
		</div>
    </div>
    <div id="J_slideBar" class="infor">
       	<#if dealGroup.isSoldOut()>
    		<span class="price">￥${dealGroup.price?string.computer}</span><span class="old-price">￥${dealGroup.marketPrice?string.computer}</span><a class="over-btn Right" title="" href="#">卖光了</a>
    	<#elseif isExpired>
    		<span class="price">￥${dealGroup.price?string.computer}</span><span class="old-price">￥${dealGroup.marketPrice?string.computer}</span><a class="over-btn Right" title="" href="#">已过期</a>
    	<#elseif beginReady>
    		<span class="price">￥${dealGroup.price?string.computer}</span><span class="old-price">￥${dealGroup.marketPrice?string.computer}</span><a class="over-btn Right" title="" href="#">即将开始</a>    		
    	<#else>
            <span class="price">￥${dealGroup.price?string.computer}</span><span class="old-price">￥${dealGroup.marketPrice?string.computer}</span><a onclick="_gaq.push(['_trackEvent', 'deal_buy', 'click', ''])" class="<#if disableByUser || disableByDeal>over-btn Right<#else>buy-btn Right</#if>" title="" href="<#if ! disableByUser && ! disableByDeal><#if (dealGroup.dealDTOs.size() > 1)>/tuan/dealselect/${dealGroup.id}<#elseif (dealGroup.dealDTOs.size() == 1)>/tuan/buy/${dealGroup.dealDTOs.get(0).dealId}</#if></#if>">立即购买</a>
    	</#if>
    </div>
</div>
<section id="J_section" style="margin-top:0px;">
	<div class="Box">
    	<div class="order-list">
            <ul>
            <li>
            	<#if dealGroup.isAutoRefund>
                	<span class="support Left"><i class="icon-s"></i>支持随时退</span><span class="support Right padding-cls"><i class="icon-s"></i>支持过期退</span>
                <#else>
                	<span class="support Left"><i class="icon-e"></i>不支持随时退</span><span class="support Right padding-cls"><i class="icon-e"></i>不支持过期退</span>
                </#if>
            </li>
            <li>
                <#if isExpired>
                        <span>结束于${dealGroup.endDate?string("yyyy年MM月dd日")}</span>
                <#elseif beginReady>
                        <span>开始时间 ${dealGroup.beginDate?string("yyyy年MM月dd日 HH:mm")}</span>
                <#else>
                        <span>剩余<@waps.RemainTimeFormat endTime="${dealGroup.endDate.time}" /></span>
                </#if>
                <#if ! beginReady>
                	<span class="Right">${dealGroup.realTimeInfoDTO.currentJoin}人已购买<#if (dealGroup.realTimeInfoDTO.remain > 0) >，仅剩${dealGroup.realTimeInfoDTO.remain}个</#if></span>
               	</#if>
            </li>
            </ul>
        </div>

    </div>
    
    
	<#if (dealGroup.shopList ?? && dealGroup.shopList.size() == 1)>
		<div class="Box nom-box shop-box">
	    	<#assign shop=dealGroup.shopList.get(0)> 
	    	<h3 class="title">${shop.shopName}</h3><span class="distance">${distance}</span>
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
				<a class="go" onclick="_gaq.push(['_trackEvent', 'deal_shop', 'click', ''])" href="http://m.dianping.com/shop/${shop.shopId}"><i class="arrow-ent"></i></a>
	            </td>
	        </tr>
	        </table>
	    </div>
    <#elseif (dealGroup.shopList ?? && dealGroup.shopList.size() > 1)>
    	<div class="Box more-shop-cls"><a class="more-btn" onclick="_gaq.push(['_trackEvent', 'deal_shoplist', 'click', ''])" title="" href="/tuan/shoplist/${dealGroup.id}">查看全部${dealGroup.shopList.size()}家适用商户</a></div>
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
    
    <div class="Box"><a id="J_dealDetail" onclick="_gaq.push(['_trackEvent', 'deal_more', 'click', ''])" class="noDirect more-btn" data-id="${dealGroup.id}" title="更多图文详情" href="javascript:;">更多图文详情</a></div>
</section>
<#include "/WEB-INF/pages/common/footer.ftl">
<script type="text/javascript">
$(document).ready(function(){
	DP.app.dealDetails();
	DP.app.fixedBuyBar();
});
</script>
<script type="text/javascript">_gaq.push(['_trackPageview', 'deal/${currentCity.cityName}']);</script>
</body>
<!--内容 end-->
</html>
