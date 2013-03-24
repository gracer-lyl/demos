<#assign title="大众点评团-大众点评网团购" />
<#assign pageID=171008 />
<#include "/WEB-INF/pages/common/header.ftl">

<body>
<!--顶部-->
<header>选择城市</header>

<!--顶部 end-->

<!--内容-->
<div class="this-city"></div>
<div class="Box">
		<h4 class="city-tit">热门城市</h4>
		<div class="hot-city">
				<ul>
				<li><a href="/tuan/shanghai" title="" >上海</a></li>
				<li><a href="/tuan/beijing" title="" >北京</a></li>
				<li><a href="/tuan/hangzhou" title="" >杭州</a></li>
				<li><a href="/tuan/guangzhou" title="" >广州</a></li>
				<li><a href="/tuan/nanjing" title="" >南京</a></li>
				<li><a href="/tuan/suzhou" title="" >苏州</a></li>
				<li><a href="/tuan/shenzhen" title="" >深圳</a></li>
				<li><a href="/tuan/chengdu" title="" >成都</a></li>
				<li><a href="/tuan/chongqing" title="" >重庆</a></li>
				<li><a href="/tuan/tianjin" title="" >天津</a></li>
				<li><a href="/tuan/wuhan" title="" >武汉</a></li>
				<li><a href="/tuan/xian" title="" >西安</a></li>
				</ul>
		</div>
</div>
<#--
<#assign x = "0">
<#list cityList as city>
	<#assign y = city.cityAbbrCode?upper_case?substring(0, 1)>
	<#if x != y>
		<#if x != "0">
				</ul>
			</div>
		</div>	
		</#if>
		<#assign x = y>
		<div class="Box">
			<h4 class="city-tit">${x}</h4>
			<div class="city-list">
				<ul>
	</#if>
					<li><a href="/tuan/${city.cityEnName}" title="" >${city.cityName}</a></li>
</#list>
				</ul>
			</div>
		</div>  -->
	<#assign privateChar = 'A'>
	<#list cityList as city>
		<#assign indexChar = city.cityAbbrCode?upper_case?substring(0, 1)>
		<#if privateChar != indexChar>
			<div class="Box">
				<h4 class="city-tit">${indexChar}</h4>
				<div class="city-list">
					<ul>
						<li><a href="/tuan/${city.cityEnName}">${city.cityName}</a></li>
					</ul>
				
			</div>
			<#assign privateChar = indexChar>
		<#else>
			<div class="city-list">
				<ul>
					<li><a href="/tuan/${city.cityEnName}">${city.cityName}</a></li>
				</ul>
			</div>
		</#if>
	
	</#list>
	
		
	<#include "/WEB-INF/pages/common/footer.ftl">
	<script type="text/javascript">
	$(document).ready(function(){
		DP.app.locCity();
	});
	</script>
<script type="text/javascript">pageTracker._trackPageview('citylist');</script>
</body>	
