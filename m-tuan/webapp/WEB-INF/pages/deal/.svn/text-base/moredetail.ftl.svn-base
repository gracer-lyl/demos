<#assign title="${dealGroup.titleAbstract}团购详情-大众点评团${currentCity.cityName}站">
<#assign pageID=171020 />
<#include "/WEB-INF/pages/common/header.ftl">

<body>
<!--顶部-->
<header>
	<a href="javascript:void(0)" class="noDirect return returnBack"><span class="noDirect return-txt">返回</span></a>图文详情
</header>

<!--顶部 end-->

<!--内容-->
<div class="deal-box more-details">
${dealGroup.detailDTO.info}
<br />
${dealGroup.detailDTO.specialPoint}
<br />
${dealGroup.detailDTO.productInfo}
</div>
<div class="deal-box">
<div class="infor">
   	<#if dealGroup.isSoldOut()>
		<span class="price">￥${dealGroup.price?string.computer}</span><span class="old-price">￥${dealGroup.marketPrice?string.computer}</span><a class="over-btn Right" title="" href="#">卖光了</a>
	<#elseif isExpired>
		<span class="price">￥${dealGroup.price?string.computer}</span><span class="old-price">￥${dealGroup.marketPrice?string.computer}</span><a class="over-btn Right" title="" href="#">已过期</a>
	<#elseif beginReady>
		<span class="price">￥${dealGroup.price?string.computer}</span><span class="old-price">￥${dealGroup.marketPrice?string.computer}</span><a class="over-btn Right" title="" href="#">即将开始</a>    		
	<#else>
		<span class="price">￥${dealGroup.price?string.computer}</span><span class="old-price">￥${dealGroup.marketPrice?string.computer}</span><a onclick="_gaq.push(['_trackEvent', 'dealdetail_buy', 'click', ''])" class="<#if disableByUser || disableByDeal>over-btn Right<#else>buy-btn Right</#if>" title="" href="<#if ! disableByUser && ! disableByDeal><#if (dealGroup.dealDTOs.size() > 1)>/tuan/dealselect/${dealGroup.id}<#elseif (dealGroup.dealDTOs.size() == 1)>/tuan/buy/${dealGroup.dealDTOs.get(0).dealId}</#if></#if>">立即购买</a>
	</#if>
</div></div>
<#include "/WEB-INF/pages/common/footer.ftl">
<script type="text/javascript">_gaq.push(['_trackPageview', 'dealdetail/${currentCity.cityName}']);</script>
</body>