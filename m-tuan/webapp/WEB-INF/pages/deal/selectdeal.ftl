<#assign title="套餐选择-大众点评团${currentCity.cityName}站" />
<#assign pageID=171007 />
<#include "/WEB-INF/pages/common/header.ftl">

<body>
<!--顶部-->
<header>
	<a href="javascript:void(0)" title="美食" class="noDirect return returnBack"><span class="noDirect return-txt">返回</span></a>选择套餐
</header>

<!--顶部 end-->

<!--内容-->
<section>
		<div class="package-list">
			<ul>
                                <#list dealGroup.dealDTOs as deal>
                                        <#assign soldOut=(deal.maxJoin == deal.currentJoin)>
                                        <#if soldOut>
                                                <li class="sold-out">
                                                	<a href="javascript:void(0);"><span class="tip">[卖光了]</span>${deal.shortTitle}<span class="price">￥${deal.price?string.computer}</span></a>
                                                </li>
                                        <#else>
                                                <li>
                                                        <a href="/tuan/buy/${deal.dealId}">${deal.shortTitle}<span class="price">￥${deal.price?string.computer}</span><i class="arrow-ent"></i></a>
                                                </li>
                                        </#if>
                                </#list>
			
			</ul>
		</div>
</section>
<#include "/WEB-INF/pages/common/footer.ftl">
<script type="text/javascript">_gaq.push(['_trackPageview', 'dealselect/${currentCity.cityName}']);</script>
</body>
</html>
<!--内容 end-->