<#assign title="购买成功-大众点评团${currentCity.cityName}站" />
<#assign pageID=171011 />
<#include "/WEB-INF/pages/common/header.ftl">

<body>
<header>提示</header>
<section>
	<div class="Box">
		<div class="suc-box">
        	<p class="tit"><i class="icon-suc"></i>抽奖成功！</p>
            <p class="tip">抽奖号<strong class="num">
            	<#list lotteryNumbers as item>
            		<#if item_index gt 0>,</#if>
					${item.certificate?number?string("000000")}
				</#list>
            </strong>，抽奖详情可通过点评团电脑版查看</p>
        </div>
		<div class="package-list">
			<ul>
			<li>
				<a href="${mtBase}" onclick="_gaq.push(['_trackEvent', 'home_menu', 'click', ''])">返回今日团购<i class="arrow-ent"></i></a>
			</li>
        	</ul>
        </div>
	</div>
    
</section>
<#include "/WEB-INF/pages/common/footer.ftl">
<script type="text/javascript">pageTracker._trackPageview('paysuccess/${currentCity.cityName}');</script>
</body>