<#macro hideMobileNo sourceMobileNo>
<#if sourceMobileNo?length gt 8>${sourceMobileNo?substring(0,sourceMobileNo?length-8)+"****"+sourceMobileNo?substring(sourceMobileNo?length-4)}
<#else>${sourceMobileNo}
</#if>
</#macro>