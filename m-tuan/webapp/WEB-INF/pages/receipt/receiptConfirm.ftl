<#assign title="发送短信-大众点评团${currentCity.cityName}站" />
<#assign pageID=171005 />
<#include "/WEB-INF/pages/common/header.ftl">


<body>

	<#-- 顶部 -->
	<header>
		<a class="return" title="团购券详情" href="${mtBase}/receiptdetail/${receiptID?c}"><span class="return-txt">团购券详情</span></a>发送短信
	</header>
	
	
	<#-- 内容 -->
	<section>
		<form action="${mtBase}/receiptsms/${receiptID?c}" method="post">
		    <div class="Box">
		    	<h5>为避免团购券损失，请确保手机号码完全正确</h5>
		        <div class="nom-box">
		        	<input type="text" name="phoneNumber" 
		        	<#if errorPhoneNumberTip != null> placeholder="${errorPhoneNumberTip}"
		        	<#else> placeholder="请填写手机号" 
		        	</#if>
		        	class="test-input">
		        </div>
		        <input type="hidden" name="pageFlag" value="1"/>
		    </div>
		    <div class="Box">
				  <input type="submit" class="tg-btn" name="" value="确认发送" style="width:100%" />
			</div>
		</form>
	</section>
	<#include "/WEB-INF/pages/common/footer.ftl">
	<script type="text/javascript">pageTracker._trackPageview('couponsms/${currentCity.cityName}');</script>
</body>

