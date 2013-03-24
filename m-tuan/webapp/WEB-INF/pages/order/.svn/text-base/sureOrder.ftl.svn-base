<#assign title="确认订单-大众点评团${currentCity.cityName}站" />
<#assign pageID=171010 />
<#include "/WEB-INF/pages/common/header.ftl">

<body>
<header>
	<a href="javascript:void(0)" title="提交订单" onclick="_gaq.push(['_trackEvent', 'buy_order', 'click', ''])" class="noDirect return returnBack"><span class="return-txt">提交订单</span></a>确认订单
</header>
<section>
	<#include "/WEB-INF/pages/order/errBox.ftl">
	<div class="Box">
		<h5>订单信息</h5>
		<div class="order-list">
			<ul>
			<li class="item-cls">
				项目：<a href="${mtBase}/deal/${thisDealGroup.id}" onclick="_gaq.push(['_trackEvent', 'deal_buy', 'click', ''])">${thisDealGroup.shortTitle}</a>
			</li>
			<#if thisDeal.shortTitle?? && thisDeal.shortTitle.length() gt 0>
			<li>
				套餐：<span class="infor">${thisDeal.shortTitle}</span>
			</li>
			</#if>
            <li>
				单价：<span class="infor"><@currencyFormat showAmount=thisDeal.price?string /></span>
			</li>
            <li>
				数量：<span class="infor">${numQuantity}</span>
			</li>
            <li>
				总价：<strong class="price"><@currencyFormat showAmount=(thisDeal.price*numQuantity)?string /></strong>
			</li>
			</ul>
		</div>
	</div>
	<#if thisDeal.isDeliver>
    <div class="Box">
		<h5>物流配送</h5>
        <div class="order-list">
			<ul>
			<li>
				<span class="Left">收货地址：</span><span class="infor Left">${thisDeliver.consignee}&nbsp;&nbsp;${thisDeliver.phoneNo}<br>${thisDeliver.showAddress}<br>${thisDeliver.postCode}</span>
			</li>
            <li>
				时间：<span class="infor"><@deliverType type=thisDeliver.deliverTime!1 /></span>
			</li>
			<#if thisDeliver.memo?? && thisDeliver.memo.length() gt 0>
            <li>
				<span class="Left">附言：</span><span class="infor Left">${thisDeliver.memo}</span>
			</li>
			</#if>
			<#if thisDeliver.invoiceTitle?? && thisDeliver.invoiceTitle.length() gt 0>
			<li>
				<span class="Left">发票抬头：</span><span class="infor Left">${thisDeliver.invoiceTitle}</span>
			</li>
			</#if>
			</ul>
		</div>
	</div>
	</#if>
    
    <div class="Box">
    	<h5>账户信息</h5>
        <div class="package-list">
			<ul>
            <li>
            	<div class="dz">
            		<span class="tip">账户余额：</span>
            		<span class="infor"><@currencyFormat showAmount=account.availableBalance?string /></span>
            		<span class="err Right">
            		<#if dpUserAccountDisable>
            		本单不可用余额
					<#else>
						<#if chargeAmount gt 0>
						余额不足
						</#if>
					</#if>
					</span>
				</div>
            </li>
			<li>
				<#if thisDealGroup.isCanUseCoupon==1>
				<a href="${mtBase}/usediscount">
					<span class="tip">使用优惠：</span>
					<#if couponID gt 0>
					${couponBiz.formatTitle(thisCoupon)}
					<#else>
					<span class="Right">选择优惠类型</span>
					</#if>
					<i class="arrow-ent"></i>
				</a>
				<#else>
				<a href="javascript:void(0);">
					<span class="tip">使用优惠：不可使用</span>
				</a>
				</#if>
			</li>
            <li><div class="dz"><span class="tip">还需支付：</span><strong class="price Clear"><@currencyFormat showAmount=chargeAmount?string /></strong></div></li>
        	</ul>
        </div>
    </div>
	<@s.form name="couponList" action="${mtBase}/success" method="post">
    <#if chargeAmount gt 0>
    <div class="Box">
		<h5>支付方式</h5>
		<div class="package-list">
			<ul class="pay-method">
            <li>
            <a href="javascript:void(0);" class="noDirect dz">
            	<table width="100%" cellspacing="0" cellpadding="0">
                <tbody><tr>
                	<td>支付宝网页支付</td>
                    <td width="30" valign="middle" align="right"><input type="radio" name="cashierCode" value="" checked="true"></td>
                </tr>
                </tbody></table>
            </a>
            </li>
            <li>
            <a href="javascript:void(0);" class="noDirect dz">
            	<table width="100%" cellspacing="0" cellpadding="0">
                <tbody><tr>
                	<td>信用卡直接支付</td>
                    <td width="30" valign="middle" align="right"><input type="radio" name="cashierCode" value="CREDITCARD"></td>
                </tr>
                </tbody></table>
            </a>
            </li>
            <li>
            <a href="javascript:void(0);" class="noDirect dz">
            	<table width="100%" cellspacing="0" cellpadding="0">
                <tbody><tr>
                	<td>借记卡直接支付</td>
                    <td width="30" valign="middle" align="right"><input type="radio" name="cashierCode" value="DEBITCARD"></td>
                </tr>
                </tbody></table>
            </a>
            </li>
        </ul></div>
	</div>
    </#if>
    <div class="Box">
    	<input onclick="_gaq.push(['_trackEvent', 'order_pay', 'click', ''])" type="submit" class="tg-btn" name="" value="确认订单，付款" style="width:100%" />
		<@s.hidden name="dealID" value="${dealID}"/>
		<@s.hidden name="quantity" value="${quantity}"/>
		<@s.hidden name="orderID" value="${orderID}"/>
		<@s.hidden name="deliverStr" value="${deliverStr}"/>
	</div>
    </@s.form>
    
</section>
<#include "/WEB-INF/pages/common/footer.ftl">
<script type="text/javascript">
$(document).ready(function(){
	DP.order.addressSelector();
	DP.order.selectPayMethod();
});
</script>
<script type="text/javascript">pageTracker._trackPageview('order/${currentCity.cityName}');</script>
</body>
