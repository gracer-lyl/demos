<#macro currencyFormat showAmount>
<#if showAmount??>&#165;${showAmount}
<#else>&#165;0
</#if>
</#macro>

<#macro deliverType type>
	<#switch type>
		<#case 1>工作日、节假日收货
		<#break>
		<#case 2>只工作日收货
		<#break>
		<#case 3>只节假日收货
		<#break>
	</#switch>
</#macro>

<#macro shortenStr s l=4>
<#if s.length() gt l>${s.substring(0, l-1)}...
<#else>${s}
</#if>
</#macro>