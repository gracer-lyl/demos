<style type="text/css">
.user-lay { -webkit-transform: translate(-250px, 0); }
</style>

<div style="height:100%; left:0; " class="user-lay" id="J_navi">

	<div class="hd">
        <div class="search">
        <form autocomplete="off" action="${mtBase}/search" method="post" id="searchForm">
             <input type="text" autocomplete="off" autocapitalize="off" autocorrect="off" class="default" placeholder="搜索关键词" name="keyword" id="J_search_input">
             <button type="submit" class="search-icon" title="搜索" id="J_search_btn" onclick="_gaq.push(['_trackEvent', 'home_search', 'click', ''])"></button>
        </form>
        </div>
    </div>
    
    <div class="user-operating">
    	<ul class="user-list">
        	<li><a href="${mtBase}/${currentCity.cityEnName}" onclick="_gaq.push(['_trackEvent', 'home_menu', 'click', '首页'])">首页</a></li>
        	<li data-today="${isToday}"><a href="${mtBase}/${currentCity.cityEnName}?isToday=3" onclick="_gaq.push(['_trackEvent', 'home_menu', 'click', '新单'])">今日新单</a></li>
        	<#if (userId > 0 && userAccountDTO != null)>
        	<li>
        		<a href="/logout?redir=${mtBase}/${currentCity.cityEnName}" onclick="_gaq.push(['_trackEvent', 'home_menu', 'click', '退出'])">${userAccountDTO.userNickName}<span class="tips">退出<i class="arrow-ent"></i></span></a>
        	<li>
        	<#else>
        		<li><a href="/login?redir=${mtBase}/${currentCity.cityEnName}" onclick="_gaq.push(['_trackEvent', 'home_menu', 'click', '登录'])">登录</a></li>
        		<li><a href="/reg?redir=${mtBase}/${currentCity.cityEnName}" onclick="_gaq.push(['_trackEvent', 'home_menu', 'click', '注册'])">注册</a></li>
        	</#if>
            <li><a href="${mtBase}/receiptlist" onclick="_gaq.push(['_trackEvent', 'home_menu', 'click', '团购券'])">我的团购券</a></li>
            <li><a href="${mtBase}/citylist" onclick="_gaq.push(['_trackEvent', 'home_menu', 'click', '切换城市'])">点评团${currentCity.cityName}站<span class="tips">切换城市<i class="arrow-ent"></i></span></a></li>
            <li><a href="http://m.dianping.com" onclick="_gaq.push(['_trackEvent', 'home_menu', 'click', '回主站'])">大众点评网</a></li>
        </ul>
    </div>
    
</div>