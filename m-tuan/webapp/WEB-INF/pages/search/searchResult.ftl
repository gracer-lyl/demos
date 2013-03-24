<#assign title="${keyword}团购-大众点评团${currentCity.cityName}站" />
<#include "/WEB-INF/pages/common/header.ftl">



<body>

	<header>
		<div class="header-box">
			<div class="search-mode">
				<div class="search">
				<form autocomplete="off" action="${mtBase}/search" method="post" id="searchForm">
					 <input type="text" autocomplete="off" autocapitalize="off" autocorrect="off" class="default" placeholder="输入团购商户名、类别、商区等关键字" name="keyword" id="J_search_input">
					 <button type="submit" class="search-icon" title="搜索" id="J_search_btn"></button>
				</form>
				</div>
				<input id="J_keyword" type="hidden" value="${keyword}" />
				<a href="javascript:void(0)" onclick="_gaq.push(['_trackEvent', 'search_back', 'click', ''])" title="返回" class="noDirect search-cancel returnBack">返回</a>
			</div>
		</div>
	</header>
	
	
	<div class="main">
		<div class="search-list">
			<ul id="J_search_ul">
			</ul>
		</div>
	</div>
	
	<#-- 搜索结果展示-->
	<#if (dealGroupList?exists && dealGroupList?size > 0)>
		<nav class="nav-list">
			<p class="tips">找到${searchResultCount}个"${keyword}"相关的团购</p>
		</nav>
		
		<section class="main">
			<#-- 筛选条件栏 -->
			<#include "/WEB-INF/pages/common/selection.ftl">   
			
			<div class="index-list">
				<#-- 团购单展示 -->
			   	<#include "/WEB-INF/pages/common/displayDealGroup.ftl">
		   	</div>
		</section>
	
		<#-- 查看更多按钮显示 -->
		<#include "/WEB-INF/pages/common/viewMore.ftl">
		
		<#-- 滑动筛选条件 -->
		<#include "/WEB-INF/pages/search/seachSelection.ftl">
		
	<#else>
		<div class="search-jg-box">
			<p class="tit">没有找到<span class="jg">"${keyword}"</span>相关的团购，您可以：</p>
			<p class="tip"><strong>·</strong> 确认关键词是否正确</p>
			<p class="tip"><strong>·</strong> 尝试相近关键词</p>
			<p class="tip"><strong>·</strong> 看看<a href="${mtBase}/${currentCity.getCityEnName()}">今日团购</a></p>
		</div>
		
		<#if recommendList?exists && recommendList?size != 0>
			<#-- 无结果推荐列表 -->
			<#include "/WEB-INF/pages/search/recommendList.ftl">
		</#if>
	</#if>
	<#include "/WEB-INF/pages/common/footer.ftl">
	<script type="text/javascript">
	$(document).ready(function(){
		DP.app.dealOverlay();
		DP.app.moreDeal();
		DP.app.search(false);
	});
	</script>
	<script type="text/javascript">pageTracker._trackPageview('search/${keyword}/${currentCity.cityName}');</script>
</body>

