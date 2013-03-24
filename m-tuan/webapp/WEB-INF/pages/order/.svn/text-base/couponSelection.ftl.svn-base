<#assign title="抵用券-大众点评团${currentCity.cityName}站" />
<#assign pageID=171012 />
<#include "/WEB-INF/pages/common/header.ftl">

<body>
<header>
	<a href="javascript:void(0)" title="确认订单" onclick="_gaq.push(['_trackEvent', 'order_pay', 'click', ''])" class="noDirect return returnBack"><span class="return-txt">确认订单</span></a>选择优惠类型
</header>
<section>
	<#include "/WEB-INF/pages/order/errBox.ftl">
	<@s.form name="couponList" action="${mtBase}/usediscount"  onclick="_gaq.push(['_trackEvent', 'couponlist_item', 'click', ''])" method="post">
	<div class="Box">
		<h5>选择您要使用的优惠，无效抵用券将不会显示</h5>
		<div class="package-list">
			<ul id="J_couponList">
            <li>
            <a class="noDirect dz" href="javascript:void(0);" data-couponid="cpnone">
            	<table cellpadding="0" cellspacing="0" width="100%">
	                <tr>
	                	<td><label for="cpnone">不使用优惠</label></td>
	                    <td width="30" align="right" valign="middle">
	                    	<input id="cpnone" name="couponIDString" type="radio" checked="checked" value="none">
	                    </td>
	                </tr>
                </table>
            </a>
            </li>
            <#list couponList as coupon>
            <#if coupon.isEnable()>
            <li>
            <a class="noDirect dz" href="javascript:void(0);" data-couponid="cp${coupon.couponID}">
            	<table cellpadding="0" cellspacing="0" width="100%">
	                <tr>
	                	<td>
	                		<span>${couponBiz.formatTitle(coupon)}</span>
	                		<span class="tip">${couponBiz.formatDesc(coupon)}</span>
	                	</td>
	                    <td width="30" align="right" valign="middle">
	                    	<input id="cp${coupon.couponID}" name="couponIDString" type="radio" value="${coupon.couponID}">
						</td>
	                </tr>
                </table>
            </a>
            </li>
            </#if>
            </#list>
            <li>
            <a class="noDirect dz" href="javascript:void(0);">
            	<table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                	<td><input id="couponcode" type="text" placeholder="填写优惠代码" class="test-input" name="couponCode"></td>
                    <td width="30" align="right" valign="middle">
	                    <input id="cpcode" name="couponIDString" type="radio" value="cpcode">
                    </td>
                </tr>
                </table>
            </a>
            </li>
        </div>
	</div>
    <div class="Box">
        <input type="submit" class="tg-btn" name=""  value="确定" style="width:100%" />
		<@s.hidden name="dealID" value="${dealID}"/>
    </div>
    </@s.form>
</section>
<#include "/WEB-INF/pages/common/footer.ftl">
<script type="text/javascript">
$(document).ready(function(){
	DP.order.selectCoupon();
	DP.order.showWarning();
});
</script>
<script type="text/javascript">pageTracker._trackPageview('usediscount/${currentCity.cityName}');</script>
</body>
