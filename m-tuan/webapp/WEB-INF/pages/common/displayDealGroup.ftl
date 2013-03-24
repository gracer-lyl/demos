<ul id="J_dealList">
	<#list dealGroupList as dealGroup>
		<li>
			<a href="${mtBase}/deal/${dealGroup.id}" 
				<#if keyword == null>
					onclick="_gaq.push(['_trackEvent', 'home_item', 'click', ''])"
				<#else>
					onclick="_gaq.push(['_trackEvent', 'search_item', 'click', ''])"
				</#if>
			class="item">
				<table width="100%" cellspacing="0" cellpadding="0" class="deal-tab">
					<tbody>
						<tr>
							<td width="100" valign="top">
			            		<img class="pic-box" width="100" height="70" src="${dealGroup.imageUrl}"/>
			            	</td>
			            	
							<td valign="top">
								<div class="infor">
									<h3 class="title">${dealGroup.titleAbstract}</h3>
									<div class="price">
										<span class="now">¥${dealGroup.price?string.computer}</span>
										<span class="old">¥${dealGroup.marketPrice?string.computer}</span>
									</div>
									<div class="Fix">
										<span class="num">${dealGroup.realTimeInfoDTO.currentJoin?c}人</span>
										<span class="dz"><@shortenStr s=dealGroup.regionPrefix /></span>
										<#if dealGroup.destinationPrefix != null >
											<span class="jl">${dealGroup.destinationPrefix}</span>
										</#if>
									</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<#if dealGroup.isToday>
					<div class="sub-icon new"></div>
				<#elseif (dealGroup.maxJoin>0) && (dealGroup.realTimeInfoDTO.currentJoin>=dealGroup.maxJoin)>
					<div class="sub-icon sold"></div>
				<#elseif dealGroup.status == 1>
					<div class="sub-icon soon"></div>
				</#if>
				
			</a>
		</li>
	</#list>
</ul>