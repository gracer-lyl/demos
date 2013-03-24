<#if (receiptList?exists && receiptList?size > 0) >
	<section class="main slide">
		<div class="ticket-list">
			<ul id="J_recepitList">
				<#list receiptList as receipt>
		    	<li>
		            <a class="item" title="" href="${mtBase}/receiptdetail/${receipt.receiptID?c}" onclick="_gaq.push(['_trackEvent', 'couponlist_item', 'click', ''])">
		            	<table width="100%" cellpadding="0" cellspacing="0">
		                <tr>
		                    <td width="60" valign="top">
		                    	<div class="surplus">
			           		        <#assign day = receipt.status/>
			         		     	<#if (day >= 0) >
										剩余<br><strong>${day}</strong>&nbsp;天
			                    	<#else> 
			                    		<strong>过期</strong>
			                    	</#if>   
		                    	</div>
		                    </td>
		                    <td>
			                    <div class="infor">
			                        <h3 class="title">
			                        		${receipt.dealDTO.title}
			                        </h3>
			                        <p class="Fix">
			                        <span class="phone">${receipt.serialNumber}</span>
			                        <span class="time">${receipt.dealReceiptEndDate?string("yyyy-MM-dd")}过期</span>
			                        </p>
			                    </div>
		                    </td>
		                </tr>
		                </table>
		            </a>
		        </li>
		        </#list>    
		    </ul>
		</div>
    </section>
    
    <#if (pageCount > 1) >
	    <div class="btn-box slide Fix">
	    	<a id="J_moreBtn" data-current="1" class="noDirect more-btn Left" title="" href="javascript:void(0);"><i class="icon-more"></i>查看更多</a>
	    	<a class="noDirect more-btn Right" title="" href="javascript:window.scroll(0, 0);"><i class="icon-top"></i>返回顶部</a>
	    </div>
	</#if>
<#else>
	<section class="main slide">
		<div class="ticket-none-box">没有可使用的团购券</div>
	</section>	
</#if>