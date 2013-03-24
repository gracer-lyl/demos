<div class="Box">
   <input type="hidden" name="quantity" value="1"/>
	<h5>订单信息</h5>
	<div class="order-list">
		<ul>
			<#if thisDealGroup.shortTitle?exists>
				<li class="item-cls">项目：<a href="${mtBase}/deal/${thisDealGroup.id}">${thisDealGroup.shortTitle}</a></li>
			</#if>
		</ul>
	</div>
</div>
 <div class="Box">
	<h5>您绑定的手机号</h5>
        <#if currentUser.mobileNoStatus == 2>
            <div class="nom-box"><@hideMobileNo sourceMobileNo=(currentUser.mobile)!""/></div>
  		<#else>
            <div class="package-list">
					<ul>
					   <li><a href="${mtBase}/mobileBinding">请绑定您的手机号码<i class="arrow-ent"></i></a></li>
					</ul>
				</div>
	    </#if>
</div>
	    