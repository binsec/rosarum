
var DHCP_DYNAMIC=0;var DHCP_FIXED=1;var DHCP_IF=0;var DHCP_FROM=1;var DHCP_IP=2;var DHCP_HOST=3;var DHCP_MAC=4;var DHCP_TYPE=5;var DHCP_LEASE=6;function DHCPentry(idx){if(cgi_dhcp_list[idx]){a=cgi_dhcp_list[idx];var DHCP={ifn:HTML2str(a[DHCP_IF]),from:parseInt(a[DHCP_FROM],10),ip:HTML2str(a[DHCP_IP]),host:HTML2str(a[DHCP_HOST]),mac:HTML2str(a[DHCP_MAC]),typ:parseInt(HTML2str(a[DHCP_TYPE]),10),lease:parseInt(a[DHCP_LEASE],10)}
return DHCP;}
return null;}
function searh_DHCPHost(mac){var i=0;var host=null;var mac=mac.toUpperCase();while(1){DHCP=DHCPentry(i++);if(!DHCP)break;if(DHCP.typ!=0)continue;if(DHCP.mac.toUpperCase()==mac){host={ifn:DHCP.ifn,host:DHCP.host};break;}}
return host;}
function searh_DHCP(mac){var i=0;var host=null;var mac=mac.toUpperCase();while(1){DHCP=DHCPentry(i++);if(!DHCP)break;if(DHCP.mac.toUpperCase()==mac){host=DHCP;break;}}
return host;}
var cgi_dhcp_list=[<%CFG_ARY(STS_DHCPD_PCS,255);%>null];