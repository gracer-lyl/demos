<#assign title="${currentCity.cityName}团购-大众点评团${currentCity.cityName}站" />
<#assign pageID=171001 />
<#include "/WEB-INF/pages/common/header.ftl">

<body>
	
	<header class="slide">
		<a id="J_togglerBar" data-status="off" href="javascript:;" class="noDirect action-bar"></a>
		点评团 • <a href="${mtBase}/citylist" onclick="_gaq.push(['_trackEvent', 'home_city', 'click', ''])">${currentCity.cityName}<b class="drop-down"></b></a>
		<a href="${mtBase}/search" onclick="_gaq.push(['_trackEvent', 'home_search', 'click', ''])" class="search-icon"></a>
		<input id="J_isToday" type="hidden" value="${isToday}"/>
	</header>
	
	<section class="main slide">
		<#-- 筛选条件栏 -->
		<#include "/WEB-INF/pages/common/selection.ftl">
	    
	    <div class="index-list">
	    <#if (dealGroupList?exists && dealGroupList?size > 0)>
	    	<#-- 团购单展示 -->
	    	<#include "/WEB-INF/pages/common/displayDealGroup.ftl">
	    <#else>
	    	<div class="ticket-none-box">
	    		没找到你要的团购<br>
	    		试试别的筛选条件吧>_<
	    	</div>
	    </#if>
	    </div>
	</section>
	
	<#-- 查看更多按钮显示 -->
	<#include "/WEB-INF/pages/common/viewMore.ftl">
	
	
	<#-- 滑动导航栏 -->
	<#include "/WEB-INF/pages/common/navigation.ftl">
	
	
	<#-- 滑动筛选条件  -->
	<#include "/WEB-INF/pages/index/dynamicSelect.ftl">
	
	
	<#include "/WEB-INF/pages/common/footer.ftl">
	<script type="text/javascript">
	$(document).ready(function(){
		DP.app.posCity();
		DP.app.dealOverlay();
		DP.app.moreDeal();
		DP.app.slideNavi();
	});
	</script>
	<script type="text/javascript">pageTracker._trackPageview('list/${currentCategoryName}|${currentRegionName}|${currentSortName}/${currentCity.cityName}');</script>
</body>
