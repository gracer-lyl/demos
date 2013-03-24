<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">




<#assign waps=JspTaglibs["/WEB-INF/tld/wap-tags.tld"]>
<head>
<title>点评团${currentCity.cityName}站</title>
<style>
@charset "utf-8";
/* CSS Document */
body,ul,ol,li,form{margin:0;padding:0;}
ul,ol{list-style:none;}
ul{ list-style:}
img{border:none;max-width:100%;}
body{background:#fff;font-family:Helvetica,Tahoma,sans-serif;/*font-size:medium;*/ font-size:14px;color:#333;}
h1,h2,h3,div,li,p{margin:0;padding:0;font-size:100%;font-weight:normal;}
a{color:#08c;text-decoration:none;}
a:hover,a:focus,a.current{background:#08c;color:#fff;}

p{ padding:1px 0;}
.red{ color:#f00}
.gray{ color:#999;}
.center{text-align:center;}
.r{text-align:right;}
.tit{font-size:16px;}
.btn{border:1px solid #db7c00;background:#ff9409;width:100%;font-size:16px;font-weight:bold;color:#FFF;padding:5px 20px;cursor:pointer;}
.f-btn{border:1px solid #db7c00;background:#ff9409;width:auto;font-size:16px;font-weight:bold;color:#FFF;padding:5px 20px;cursor:pointer;}
.s-btn{border:1px solid #db7c00;background:#ff9409;width:auto;font-size:12px; line-height:18px;font-weight:bold;color:#FFF;padding:1px 10px; cursor:pointer;}
.btn-over{border:1px solid #c3c3c3;background:#d0d0d0;width:100%;font-size:16px;font-weight:bold;color:#FFF;padding:5px 20px;}
.f-btn-over{border:1px solid #c3c3c3;background:#d0d0d0;width:100%;font-size:16px;font-weight:bold;color:#FFF;padding:5px 20px;}
.ip{ padding:2px; font-size:16px; font-weight:bold;}
.tip{ color:#666;}
.tbox{ color:#c00; background-color:#fff2f2; border:1px solid #fe8081; padding:2px 10px;}

.doc{padding:0;}
/*.hd{padding:0;}*/
.top{padding:13px 5px 5px; height:27px; position:relative;font-size:14px; line-height:21px;}

/*add by guangcai.zhang 2011-12-14*/
.top .home{font-weight:bold;position:absolute; height:27px; top:12px; left:5px;}
.top .home a{ background-color:#fff;}

.top .city{ text-align:right;}
.nav{background:#e3e3e3; border:1px solid #dbdbdb;padding:3px 10px;/* height:24px;*/ color:#ccc;font-size:14px; line-height:22px;}
.nav a{ color:#333;}
.nav a.this{ color:#f60;}
.nav a:hover,.nav a.this:hover{ background-color:#ff9409; color:#fff;}
.dl{ background-color:#f5f5f5; border-bottom:1px solid #d7d7d7; /*height:21px;*/ padding:5px 10px;font-size:14px; line-height:21px; color:#f60;}
.dln{height:21px; padding:5px 10px; border-bottom:1px solid #d7d7d7;font-size:14px; line-height:21px;}


.ct{ padding:10px; background-color:#f5f5f5; line-height:22px;}

.bd{line-height:24px;}
.detail{padding-top:20px;}
.box{padding:10px;border-bottom:1px solid #dfdfdf;}
.boxn{padding:10px;}
.boxnn{padding:10px 0;}
.boxc{padding:10px;border-bottom:1px solid #dfdfdf;text-align:center;}
.boxt{ padding: 0 10px 10px;border-bottom:1px solid #dfdfdf;}
.mdot{ padding-bottom:10px;border-bottom:1px dotted #999;}
.tdot{padding:10px 0;border-bottom:1px dotted #999;}
.title{text-align:left; margin-bottom:5px;}
.tab{ margin-bottom:5px; text-align:left; color:#666; font-size:12px; line-height:22px; /*width:100%;*/}
.tab .img{ vertical-align:top; /*width:114px;*/ height:71px;padding-right:10px;}
.tab .price{ font-size:16px;}
.mtab{text-align:left; color:#666; line-height:24px;/*width:100%;*/}
.mtab .img{ vertical-align:top; /*width:162px;*/ height:100px;padding-right:10px;}
.mtab .now{ font-size:26px; line-height:39px;}
.tktab{text-align:left; color:#000; line-height:24px;width:100%;}
.tktab .img{ vertical-align:top; width:81px; height:50px;padding-right:10px;}
.rtab{ width:}
.rtab .radio{ width:30px; padding-top:3px;}
.rtab .text{ width:190px;}
.rtab .j{ padding:0 30px;}
.pl{ padding-left:10px;}

.fl{margin:0 30px 0 0;padding:0;display:inline-block;}
.sn{ font-size:20px;}
.city a{margin:0 10px 0 0;padding:0;display:inline-block;}
.textarea{ width:100%;}


/*.syserr{padding:0 5px;border:1px solid #ffed00;background:#fffcaa;}*/

.price{color:#f60;}
.value{text-decoration:line-through;}
.buy{ background-color:#f5f5f5; border-bottom:1px solid #d7d7d7; padding:10px;}
.btab .time{ width:180px;}
</style>
</head>
<body>
<div class="bd">
<div class="box"><div class="mdot">
<p class="title">${dealGroup.titleAbstract}<br/>
${dealGroup.titleDesc}</p>
<table class="mtab" cellpadding="0" cellspacing="0"><tbody><tr>
<td class="img"><img width="162" height="100" alt="图片载入中……" src="<@waps.PictureUrlFormat url="${dealGroup.imageUrl}" sub="1" />" /></td>
<td valign="middle" class="text">
<p class="now"><strong class="price">${dealGroup.price?string.computer}</strong></p>
<p>原价<span class="value">${dealGroup.marketPrice?string.computer}</span></p>
<p>${dealGroup.realTimeInfoDTO.currentJoin}人已购买</p></td></tr></tbody></table></div>
<#if importantPoint?exists><p><div class="boxnn">${importantPoint}</div></p></#if>
<div class="boxnn">${dealGroupInfo}</div>
<#if (specialPoint != "")><div class="boxnn">${specialPoint}</div></#if>

<p></p>
<p></p>
<p></p>
<p></p>
快速购买，请浏览<a href="${mtBase}/deal/${dealGroupId}">手机网页版</a><br>
<#if clientPlatform != null && isappinstalled == 0 >
	<font color="#FF9933">点评团购客户端，秒杀，抽奖，超值团购抢到爽，随时随地想团就团！</font>
	<#if clientPlatform == "android">
		<a href="http://android.dianping.com/tuan/"><input type="button" class="btn" value="立即下载"/></a>
	</#if>	
	<#if clientPlatform == "iphone">
		<a href="https://itunes.apple.com/cn/app/id550111418"><input type="button" class="btn" value="立即下载"/></a>
	</#if>
<#elseif clientPlatform != null && isappinstalled == 1 >
	<font color="#FF9933">想立即抢购？想查看更多图片和商户点评？打开点评团购，随时随地想团就团！</font>
	<#if clientPlatform == "android">
		<a href="dptuan://tuandeal?id=${dealGroupId}"><input type="button" class="btn" value="打开点评团购"/></a>
	</#if>
	<#if clientPlatform == "iphone">
		<a href="dptuan://tuandeal?id=${dealGroupId}"><input type="button" class="btn" value="打开点评团购"/></a>
	</#if>
</#if>
</div>
</body>
</html>