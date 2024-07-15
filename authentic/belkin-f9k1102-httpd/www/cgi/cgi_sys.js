
var UI_ECO=1;<%CFG_MAP(http_pwd,SYS_PASSWD);%><%CFG_MAP(idletimeout,SYS_IDLET);%><%CFG_MAP(upnp_en,UPNP_EN);%><%CFG_MAP(auto_fmw,SYS_FMW_AUTO);%><%CFG_MAP(rm_en,SYS_RM_EN);%><%CFG_MAP(rm_ip,SYS_RM_IP);%><%CFG_MAP(rm_port,SYS_RM_PORT);%><%CFG_MAP(current_wan_ip,SYS_WAN_IP);%><%CFG_MAP(hw_nat_en,NAT_HW_EN);%><%CFG_MAP(nat_type,NAT_TYPE);%>var cgi_timeString='<% CFG_GET(STS_CUR_TIME);%>';var ap_mode_hidden=parseInt('0'+'<% CFG_GET(WIFI_AP_MODE);%>');function getIFsec(){if(getCfg("http_pwd")=="")
confirmsec=0;else
confirmsec=1;}