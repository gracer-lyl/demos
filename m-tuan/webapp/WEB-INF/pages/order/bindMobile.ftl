<#assign title="绑定手机-大众点评团${currentCity.cityName}站" />
<#assign pageID=171015 />
<#include "/WEB-INF/pages/common/header.ftl">
<#include "/WEB-INF/pages/macro/hideMobileNo.ftl">

<body>
	<header>
		<a href="javascript:void(0)"<#if dealId??> onclick="_gaq.push(['_trackEvent', 'buy_order', 'click', ''])"<#else> onclick="_gaq.push(['_trackEvent', 'home_menu', 'click', ''])"</#if> class="noDirect return returnBack"><span class="return-txt"><#if dealId??>提交订单<#else>首页</#if></span></a>绑定手机号
	</header>
	<!--内容-->
	<style type="text/css">
	.s-btn input, .s-rbtn input {
		border:0 none;
		background-color:transparent;
		height: 28px;
		line-height: 28px;
		padding: 0px;
		font-family: "Microsoft YaHei";
		font-weight:bold;
	}
	.s-btn input {
		color:#FFF;
	}
	.s-rbtn input {
		color:#A3A3A3;
	}
	</style>
	<section>
		<div class="Box">
			<h5>为保障团购安全，请绑定手机号</h5>
			<div class="order-list">
				<ul>
				    <li>手机号&nbsp;<span class="infor"><input id="J_phoneNum" class="phone-input" <#if (currentUser.mobileNoStatus == 2) && (currentUser.mobile != "") >value="${(currentUser.mobile)}"<#else>placeholder="请输入手机号"</#if> type="text" name="mobile"></span>
					  <a id="J_getCaptcha" class="noDirect s-btn Right" title="获取验证码" href="javascript:void()"><input type="button" value="获取验证码" /></a>
				    </li>
				<li>
					验证码&nbsp;<span><input id="J_code" class="phone-input" placeholder="请输入验证码" type="text" name="mobile"></span>
				</li>
				</ul>
			</div>
		</div>
	    <div class="Box"><a id="J_bindBtn" class="noDirect tg-btn"  title="" href="javascript:void(0)">提交</a></div>
	</section>    
		
	<#--footer end-->
	<#include "/WEB-INF/pages/common/footer.ftl">
	<script type="text/javascript">
	$(document).ready(function(){
		DP.bindmobile.init();
	});
	</script>
	<script type="text/javascript">pageTracker._trackPageview('mobilebinding/${currentCity.cityName}');</script>
</body>
