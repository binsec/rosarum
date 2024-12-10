
var LOG_DATE=0;var LOG_USER=1;var LOG_ERROR=2;var LOG_MSG=3;var LOG_OK=2;function SysLOGentry(idx,LOG_ARY){var h,cnt,st,ed,len;var pat=[3,1,2,0];if(LOG_ARY[idx]){var a=LOG_ARY[idx];if(a[LOG_OK]!=1){h=HTML2str(a[0]);len=h.length;st=ed=0;for(var i=0;i<pat.length;i++){cnt=0;st=ed;while(cnt<pat[i]){while((h.charAt(++ed)==" ")&&(ed<len));while((h.charAt(++ed)!=" ")&&(ed<len));cnt++;}
if(st==ed)ed=h.length;a[i]=h.substring(st,ed);}
a[LOG_OK]=1;}
return a;}
return null;}
var cgi_sys_log=[<%CFG_ARY(STS_LOG_SYS,200);%>null];var cgi_fw_log=[<%CFG_ARY(STS_LOG_FW,200);%>null];var backup_log_name='<% CFG_GET(STS_LOG_FNAME);%>';cgi_sys_log.pop();cgi_fw_log.pop();