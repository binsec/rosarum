
var MAX_DEV_NUM=200;var DEVO_IP=0;var DEVO_MAC=1;var DEVO_MANU=2;var DEVO_TYPE=3;var DEVO_NAME=4;var DEV_MAC=0;var DEV_RESV_IP=1;var DEV_ISRESV=2;var DEV_TYPE=3;var DEV_NAME=4;var DEV_IDX=10;var devType=['laptop','netcam','phone','printer','tablet','tv','settop','wemo','game','generic'];function gen_empty_DEVM(){var DEVM=['','0','0','0',''];DEVM[DEV_IDX]=-1;return DEVM;}
function get_DEVM(idx){if(idx>MAX_DEV_NUM)return null;var DEVM=getCfgAry("pc_lst"+idx);if(!DEVM||(DEVM.length<2)||DEVM[DEV_MAC]==''){DEVM=gen_empty_DEVM();}else{DEVM[DEV_IDX]=idx;}
return DEVM}
function get_DEV(idx){if(idx>MAX_DEV_NUM)return null;var DEVM;var dev_mac;var dev;if(cgi_devs_list){dev=cgi_devs_list[idx-1];}
if(dev){DEVM=findDEVMByMac(unescape(dev[DEVO_MAC]));}else{return null;}
var dev_mac=unescape(dev[DEVO_MAC]);var dev_manufact=unescape(dev[DEVO_MANU]);var dev_ip=unescape(dev[DEVO_IP]);var res_ip=DEVM[DEV_RESV_IP];var dev_hostname=unescape(dev[DEVO_NAME]);var dev_type=unescape(dev[DEVO_TYPE]);var dev_label=dev_hostname;var dev_reserv=parseInt(DEVM[DEV_ISRESV]);var DEV={idx:idx-1,DEVM_idx:DEVM[DEV_IDX],host:dev_hostname,manuf:dev_manufact,hostlabel:dev_label,mac:dev_mac.toUpperCase(),ip:dev_ip,res_ip:res_ip,isReserv:dev_reserv,type:parseInt(dev_type),is_null:(DEVM[DEV_IDX]==-1)?1:0};return DEV;}
function findDEVByMac(mac,host){var DEV;var c_mac=mac.toUpperCase();for(var i=1;i<=MAX_DEV_NUM;i++){DEV=get_DEV(i);if(DEV.idx==-1)break;if((DEV.mac==c_mac))break;}
return DEV;}
function set_DEVM(DEV){var idx=DEV.DEVM_idx;if(idx==-1)idx=findEmptyDEVMidx();if(idx<1||idx>MAX_DEV_NUM)return-1;var DEVM=getCfgAry("pc_lst"+idx);if(!DEVM)DEVM=[];DEVM[DEV_NAME]=DEV.host;DEVM[DEV_TYPE]=DEV.type;DEVM[DEV_MAC]=DEV.mac;DEVM[DEV_RESV_IP]=DEV.res_ip;DEVM[DEV_ISRESV]=DEV.isReserv;setCfgAry("pc_lst"+idx,DEVM);return idx;}
function findDEVMByMac(mac){var DEVM;var c_mac=mac.toUpperCase();for(var i=1;i<=MAX_DEV_NUM;i++){DEVM=get_DEVM(i);if(DEVM[DEV_IDX]<0)continue;if((DEVM[DEV_MAC].toUpperCase()==c_mac)){return DEVM;}}
return gen_empty_DEVM();}
function findEmptyDEVMidx(){for(var i=1;i<=MAX_DEV_NUM;i++){DEVM=get_DEVM(i);if(DEVM[DEV_IDX]<0){return i;}}
return-1;}
function str2Type(s){for(var x in devType)
if(devType[x]==s)return x;return 0;}
function type2Str(x){if(x<0)x=9;return devType[x];}
function nextType(x){return(x+1)%devType.length;}
function fixHostLabel(mac,hostname){if(hostname.length==0){hostname=findArpHostName(mac);if(hostname.length==0){}}
return hostname;}
function findArpHostName(mac){var pc;var pcs=0;if(!ARPentry)return;while((pc=ARPentry(pcs++))){if(pc.mac=="")continue;if(pc.mac!==mac)continue;return pc.host;}
return"";}<%CFG_MAP_ARY(pc_lst,LAN_LEASES,50,1);%>