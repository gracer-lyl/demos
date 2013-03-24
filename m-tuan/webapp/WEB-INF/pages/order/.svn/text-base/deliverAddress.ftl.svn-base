<#include "/WEB-INF/pages/macro/hideMobileNo.ftl">
<#assign title="配送地址-大众点评团${currentCity.cityName}站" />
<#assign pageID=171022 />
<#include "/WEB-INF/pages/common/header.ftl">

<body>
	<header>
		<a href="javascript:void(0)" onclick="_gaq.push(['_trackEvent', 'buy_order', 'click', ''])" class="noDirect return returnBack"><span class="return-txt">提交订单</span></a>收货地址列表
	</header>
	
	<!--内容-->
	<section>
	<form action="${mtBase}/buy/${dealId}" onclick="_gaq.push(['_trackEvent', 'buy_order', 'click', ''])" id="dealform" method="post">
		<div class="Box">
			<h5>请选择要使用的收货人地址</h5>
			<div class="package-list">
				<ul class="pay-method">
				    <#assign isFirstAddress = true/>				    
				    <#list deliverList as deliver>
				       <li>
				          <a class="noDirect dz" href="javascript:void(0)">
				             <table cellpadding="0" cellspacing="0" width="100%">
				                <tr>
				                	<td>${deliver.consignee}&nbsp;&nbsp;<@hideMobileNo sourceMobileNo=(deliver.phoneNo)!""/>
				                	   <br> <#if deliver.province != 1 && deliver.province != 2&& deliver.province != 9 && deliver.province != 22>
							                  <#if deliver.provinceName?exists>${deliver.provinceName}省&nbsp;&nbsp;</#if>
							                </#if>  
				                	   <#if deliver.cityName?exists>${deliver.cityName}市&nbsp;&nbsp;</#if>
				                	   <#if deliver.districtName?exists>${deliver.districtName}&nbsp;&nbsp;</#if>
				                	   ${deliver.address}<br>${deliver.postCode}
				                	</td>
				                    <td width="30" align="right" valign="middle">
				                       <input type="radio" name="address" value=${deliver.deliverAddressId?c}
				                          <#if isFirstAddress>checked<#assign isFirstAddress = false/></#if> 
				                          <#if (deliver.deliverAddressId == defaultDeliverId) && (isFirstAddress ==false) >checked</#if> >
				                    </td>
				                </tr>
				              </table>
				           </a>
		               </li>
				    </#list>          
		            
					<li>
						<a href="${mtBase}/addaddress">新地址<i class="arrow-ent"></i></a>
					</li>
		        </ul>
		     </div>
		  </div>
		  <div class="Box">
		    	<input type="submit" class="tg-btn"  name="" value="确认地址" style="width:100%" />
		  </div>
	    </form>
	</section>
	<!--内容 end-->
	<!--footer-->

	<!--footer end-->
	<#include "/WEB-INF/pages/common/footer.ftl">
	<script type="text/javascript">
	$(document).ready(function(){
		DP.order.selectPayMethod();
	});
	</script>
	<script type="text/javascript">pageTracker._trackPageview('address/${currentCity.cityName}');</script>
</body>
