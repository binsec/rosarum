
var ARP_IP=0;var ARP_HW_TYP=1;var ARP_FLAG=2;var ARP_MAC=3;var ARP_MASK=4;var ARP_IF=5;var ARP_WIFI=6;var ARP_HOST=7;function ARPentry(idx){if(cgi_arp_list[idx]){a=cgi_arp_list[idx];var ARP={idx:idx,ip:HTML2str(a[ARP_IP]),hwtyp:HTML2str(a[ARP_HW_TYP]),flag:HTML2str(a[ARP_FLAG]),mac:HTML2str(a[ARP_MAC]),mask:HTML2str(a[ARP_MASK]),ifna:HTML2str(a[ARP_IF]),host:HTML2str(a[ARP_HOST])}
if(ARP.mac=="00:00:00:00:00:00")ARP.mac="";ARP.mac=ARP.mac.toUpperCase();return ARP;}
return null;}
function addARPentry(mac,host){var lidx=cgi_arp_list.length;cgi_arp_list[lidx]=['','1','0',mac,'%2A','br0','0',host];return lidx;}
function findARPbyMAC(mac){var pc;var pcs=0;if(!ARPentry)return;while((pc=ARPentry(pcs++))){if(pc.mac=="")continue;if(pc.mac!==mac)continue;return pc;}
return null;}
var cgi_arp_list=[<%CFG_ARY(STS_RT_ARP_LST,255);%>null];var cgi_wan_if='<%CFG_GET(STS_WAN_IFNAME);%>';