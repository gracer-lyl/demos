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
	        	<p class="tit"><i class="icon-err"></i>短信好像没发成功= =</p>
	        </div>
	        <form action="${mtBase}/receiptsms/${receiptID?c}" method="post">
	        	<input type="hidden" name="phoneNumber" value="${phoneNumber}"/>
	        	<input type="hidden" name="pageFlag" value="1"/>
	        	<div class="Box">
					<input type="submit" class="tg-btn" name="" value="重新发送" style="width:100%" />
				</div>
	        </form>
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
