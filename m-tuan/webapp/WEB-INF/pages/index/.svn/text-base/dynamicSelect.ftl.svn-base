<div id="rightCate" class="shop-lay hide">
	<div class="shop-nearby" id="swipeTop">
		<#if rootCategoryList?? && rootCategoryList.size() gt 0>
		<div id="swipeTopCont" class="distance-list">
			<ul id="swipeCont-1">
				<li>
					<a href="/tuan/${currentCity.cityEnName}?rootCategory=0&subCategory=0&rootRegion=${rootRegion}&subRegion=${subRegion}&sort=${sort}&isToday=${isToday}" onclick="_gaq.push(['_trackEvent', 'home_category', 'click', '全部分类'])">全部分类</a>
				</li>
				<#list rootCategoryList as rootDealCategory>
				<#if (rootDealCategory.count > 0)>
				<li>
					<a href="javascript:void(0);" onclick="_gaq.push(['_trackEvent', 'home_category', 'click', '${rootDealCategory.categoryName!""}'])" class="noDirect toggler-bar">${rootDealCategory.categoryName!""}<span class="num">(${rootDealCategory.count})</span></a>
					<i class="nearby-down"></i>
					<div class="distan-tab hide">
						<table width="100%" cellspacing="0" cellpadding="0"><tbody>
							<!-- damn table, 3 cells per row -->
							<tr>
								<td><a href="/tuan/${currentCity.cityEnName}?rootCategory=${rootDealCategory.categoryId}&subCategory=0&rootRegion=${rootRegion}&subRegion=${subRegion}&sort=${sort}&isToday=${isToday}" onclick="_gaq.push(['_trackEvent', 'home_category', 'click', '全部分类'])">全部<span class="num">(${rootDealCategory.count})</span></a></td>
								<#assign i = 1 />
								<#if rootDealCategory.subDealCategoryList??>
								<#list rootDealCategory.subDealCategoryList as subDealCategory>
									<td><a href="/tuan/${currentCity.cityEnName}?rootCategory=${rootDealCategory.categoryId}&subCategory=${subDealCategory.categoryId}&rootRegion=${rootRegion}&subRegion=${subRegion}&sort=${sort}&isToday=${isToday}" onclick="_gaq.push(['_trackEvent', 'home_category', 'click', '${subDealCategory.categoryName!""}'])">${subDealCategory.categoryName!""}<span class="num">(${subDealCategory.count})</span></a></td>
									<#if i % 3 == 2>
									</tr><tr>
									</#if>
									<#assign i = i + 1 />
								</#list>
								</#if>
							</tr>
						</tbody></table>
					</div>
				</li>
				</#if>
				</#list>
			</ul>
			
			<ul id="swipeCont-2">
				<li>
					<a href="/tuan/${cityname}?rootCategory=${rootCategory}&subCategory=${subCategory}&rootRegion=0&subRegion=0&sort=${sort}&isToday=${isToday}" onclick="_gaq.push(['_trackEvent', 'home_region', 'click', '全部地区'])">全部地区</a>
				</li>
				<#list rootRegionList as rootDealRegion>
				<#if (rootDealRegion.count > 0)>
				<li>
					<a href="javascript:void(0);" title="" class="noDirect toggler-bar" onclick="_gaq.push(['_trackEvent', 'home_region', 'click', '${rootDealRegion.regionName!""}'])">${rootDealRegion.regionName!""}<span class="num">(${rootDealRegion.count})</span></a>
					<i class="nearby-down"></i>
					<div class="distan-tab hide">
						<table width="100%" cellspacing="0" cellpadding="0"><tbody>
							<!-- damn table, 3 cells per row -->
							<tr>
								<td><a href="/tuan/${currentCity.cityEnName}?rootCategory=${rootCategory}&subCategory=${subCategory}&rootRegion=${rootDealRegion.regionId}&subRegion=0&sort=${sort}&isToday=${isToday}" onclick="_gaq.push(['_trackEvent', 'home_region', 'click', '全部地区'])">全部<span class="num">(${rootDealRegion.count})</span></a></td>
								<#assign i = 1 />
								<#if rootDealRegion.subDealRegionList??>
								<#list rootDealRegion.subDealRegionList as subDealRegion>
									<td><a href="/tuan/${currentCity.cityEnName}?rootCategory=${rootCategory}&subCategory=${subCategory}&rootRegion=${rootDealRegion.regionId}&subRegion=${subDealRegion.regionId}&sort=${sort}&isToday=${isToday}" onclick="_gaq.push(['_trackEvent', 'home_region', 'click', '${subDealRegion.regionName!""}'])">${subDealRegion.regionName!""}<span class="num">(${subDealRegion.count})</span></a></td>
									<#if i % 3 == 2>
									</tr><tr>
									</#if>
									<#assign i = i + 1 />
								</#list>
								</#if>
							</tr>
						</tbody></table>
					</div>
				</li>
				</#if>
				</#list>
			</ul>
			
			<ul id="swipeCont-3">
				<li>
					<a href="/tuan/${currentCity.cityEnName}?rootCategory=${rootCategory}&subCategory=${subCategory}&rootRegion=${rootRegion}&subRegion=${subRegion}&sort=0&isToday=${isToday}" onclick="_gaq.push(['_trackEvent', 'home_sort', 'click', '默认'])">默认排序</a>
				</li>
				<li>
					<a href="/tuan/${currentCity.cityEnName}?rootCategory=${rootCategory}&subCategory=${subCategory}&rootRegion=${rootRegion}&subRegion=${subRegion}&sort=1&isToday=${isToday}" onclick="_gaq.push(['_trackEvent', 'home_sort', 'click', '距离'])">距离最近</a>
				</li>
				<li>
					<a href="/tuan/${currentCity.cityEnName}?rootCategory=${rootCategory}&subCategory=${subCategory}&rootRegion=${rootRegion}&subRegion=${subRegion}&sort=2&isToday=${isToday}" onclick="_gaq.push(['_trackEvent', 'home_sort', 'click', '购买人数'])">按购买人数排序</a>
				</li>
				<li>
					<a href="/tuan/${currentCity.cityEnName}?rootCategory=${rootCategory}&subCategory=${subCategory}&rootRegion=${rootRegion}&subRegion=${subRegion}&sort=3&isToday=${isToday}" onclick="_gaq.push(['_trackEvent', 'home_sort', 'click', '价格从低到高'])">价格升序</a>
				</li>
				<li>
					<a href="/tuan/${currentCity.cityEnName}?rootCategory=${rootCategory}&subCategory=${subCategory}&rootRegion=${rootRegion}&subRegion=${subRegion}&sort=4&isToday=${isToday}" onclick="_gaq.push(['_trackEvent', 'home_sort', 'click', '价格从高到低'])">价格降序</a>
				</li>
				<li>
					<a href="/tuan/${currentCity.cityEnName}?rootCategory=${rootCategory}&subCategory=${subCategory}&rootRegion=${rootRegion}&subRegion=${subRegion}&sort=5&isToday=${isToday}" onclick="_gaq.push(['_trackEvent', 'home_sort', 'click', '最新发布'])">最新发布</a>
				</li>
				<li>
					<a href="/tuan/${currentCity.cityEnName}?rootCategory=${rootCategory}&subCategory=${subCategory}&rootRegion=${rootRegion}&subRegion=${subRegion}&sort=6&isToday=${isToday}" onclick="_gaq.push(['_trackEvent', 'home_sort', 'click', '即将结束'])">即将结束</a>
				</li>
			</ul>
		</div>
		</#if>
	</div>
</div>




