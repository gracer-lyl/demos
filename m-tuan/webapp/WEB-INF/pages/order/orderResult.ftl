<#assign title="购买成功-大众点评团${currentCity.cityName}站" />
<#assign pageID=171011 />
<#include "/WEB-INF/pages/common/header.ftl">

<body>
<header>提示</header>
<section>
	<div class="Box">
		<div class="suc-box">
			<#if orderStatus==1>
        	<p class="tit"><i class="icon-suc"></i>购买成功！</p>
    		<#if thisDeal.isDeliver>
        	<p class="tip">配送信息跟踪可通过点评团电脑版查看。</p>
        	<#else>
        	<p class="tip">团购券稍有延迟，请耐心等待: )</p>
        	</#if>
            <#elseif orderStatus==3>
            <p class="tit"><i class="icon-err"></i>支付成功，购买失败！</p>
        	<p class="tip">您可以在网站上我的订单中申请退款。</p>
			<#elseif orderStatus==0>
			<p class="tit"><i class="icon-err"></i>您所查看的订单未付款或不存在！</p>
			<#else>
			<p class="tit"><i class="icon-err"></i>购买失败！</p>
			</#if>
        </div>
		<div class="package-list">
			<ul>
			<#if orderStatus==1&&!thisDeal.isDeliver>
			<li>
				<a href="${mtBase}/receiptlist" onclick="_gaq.push(['_trackEvent', 'paysuccess_coupon', 'click', ''])">查看团购券<i class="arrow-ent"></i></a>
			</li>
			</#if>
			<#if orderStatus!=1&&thisDealGroup??>
			<li>
				<a href="${mtBase}/deal/${thisDealGroup.id}" onclick="_gaq.push(['_trackEvent', 'deal_buy', 'click', ''])">返回团购详情<i class="arrow-ent"></i></a>
			</li>
			</#if>
			<li>
				<a href="${mtBase}" onclick="_gaq.push(['_trackEvent', 'paysuccess_home', 'click', ''])">返回今日团购<i class="arrow-ent"></i></a>
			</li>
        	</ul>
        </div>
	</div>
    
</section>
<#include "/WEB-INF/pages/common/footer.ftl">
<script type="text/javascript">pageTracker._trackPageview('paysuccess/${currentCity.cityName}');</script>
</body>