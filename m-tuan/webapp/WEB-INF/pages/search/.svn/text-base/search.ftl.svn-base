<#assign title="${keyword}团购-大众点评团${currentCity.cityName}站" />
<#assign pageID=171021 />
<#include "/WEB-INF/pages/common/header.ftl">



<body>

	<header>
		<div class="header-box">
			<div class="search-mode">
				<div class="search">
				<form action="${mtBase}/search" method="post" id="searchForm" autocomplete="off">
					 <input type="text" autocomplete="off" autocapitalize="off" autocorrect="off" class="default" placeholder="输入团购商户名、类别、商区等关键字" name="keyword" id="J_search_input">
					 <button type="submit" class="search-icon" title="搜索" id="J_search_btn"></button>
				</form>
				</div>
				<a href="javascript:void(0)" onclick="_gaq.push(['_trackEvent', 'search_back', 'click', ''])" title="返回" class="noDirect search-cancel returnBack">返回</a>
			</div>
		</div>
	</header>


	<section class="main">
		<div class="search-list">
			<ul id="J_search_ul">
			</ul>
		</div>
	</section>
	<#include "/WEB-INF/pages/common/footer.ftl">
	<script type="text/javascript">
	$(document).ready(function(){
		DP.app.search(true);
	});
	</script>
	<script type="text/javascript">pageTracker._trackPageview('search/${keyword}/${currentCity.cityName}');</script>
</body>
