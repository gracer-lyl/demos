<#assign title="发送短信-大众点评团${currentCity.cityName}站" />
<#include "/WEB-INF/pages/common/header.ftl">


<body>
	<header>
		提示
	</header>
	
	
	<#-- 内容 -->
	<section>
		<div class="Box">
			<div class="suc-box">
	        	<p class="tit"><i class="icon-suc"></i>团购券已发送至${phoneNumber}</p>
	            <p class="tip">网络繁忙时可能稍有延迟，请耐心等待: )</p>
	        </div>
			<div class="package-list">
				<ul>
				<li>
					<a href="${mtBase}/receiptdetail/${receiptID?c}">返回团购券详情<i class="arrow-ent"></i></a>
				</li>
	            <li>
					<a href="${mtBase}/receiptlist">返回团购券列表<i class="arrow-ent"></i></a>
				</li>
	        	</ul>
	        </div>
		</div>    
	</section>
	
	<#include "/WEB-INF/pages/common/footer.ftl">

</body>

