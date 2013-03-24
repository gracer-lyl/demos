<#assign title="我的团购券-大众点评团${currentCity.cityName}站" />
<#assign pageID=171004 />
<#include "/WEB-INF/pages/common/header.ftl">
<body>

	<#-- 顶部 -->
	<header class="slide">
		<a id="J_togglerBar" data-status="off" href="javascript:;" class="noDirect action-bar"></a>我的团购券
	</header>

	<nav class="nav-list" class="slide">
		<p class="tips">仅显示可用团购券</p>
	</nav>
	
		
	<#-- 滑动导航栏 -->
	<#include "/WEB-INF/pages/common/navigation.ftl">
	
	
	<#-- 展示团购券列表 -->
	<#include "/WEB-INF/pages/receipt/receiptListBody.ftl">


	<#include "/WEB-INF/pages/common/footer.ftl">
	<script type="text/javascript">
	$(document).ready(function(){
		DP.user.getMoreReceipt();
		DP.app.slideNavi();
	});
	</script>
	<script type="text/javascript">pageTracker._trackPageview('couponlist/${currentCity.cityName}');</script>
</body>