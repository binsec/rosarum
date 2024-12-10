
var MAX_PIC_NUM=200;var DEVO_IP=0;var DEVO_MAC=1;var DEVO_MANU=2;var DEVO_TYPE=3;var DEVO_NAME=4;var MAX_PIC_HOST=200;var PIC_ST_NONE=0;var PIC_ST_ALLOW=1;var PIC_ST_BLOCK=2;var PIC_ST_ACTION=-1;var PIC_MAC=0;var PIC_SCH=1;var PIC_MANU=2;var PIC_SN_ST=3;var PIC_SN_ED=4;var PIC_WE_ST=5;var PIC_WE_ED=6;var PIC_HOST=7;var PIC_IDX=10;var SCH_time={'00:00':'gtmidnight','01:00':'gt1am','02:00':'gt2am','03:00':'gt3am','04:00':'gt4am','05:00':'gt5am','06:00':'gt6am','07:00':'gt7am','08:00':'gt8am','09:00':'gt9am','10:00':'gt10am','11:00':'gt11am','12:00':'gtNoon','13:00':'gt1pm','14:00':'gt2pm','15:00':'gt3pm','16:00':'gt4pm','17:00':'gt5pm','18:00':'gt6pm','19:00':'gt7pm','20:00':'gt8pm','21:00':'gt9pm','22:00':'gt10pm','23:00':'gt11pm'};function gen_empty_PICM(){var PICM=['','0','0','00:00','00:00','00:00','00:00',''];PICM[PIC_IDX]=-1;return PICM;}
function get_PICM(idx){if(idx>MAX_PIC_NUM)return null;var PICM=getCfgAry("pic_lst"+idx);if(!PICM||(PICM.length<8)||PICM[PIC_MAC]==''){PICM=gen_empty_PICM();}else{PICM[PIC_IDX]=idx;}
return PICM;}
function get_PIC(idx){if(idx>MAX_PIC_NUM)return null;var DEVM;var dev_mac;var dev;if(cgi_devs_list){dev=cgi_devs_list[idx-1];}
if(!dev)return null;var PICM=findPICMByMac(unescape(dev[DEVO_MAC]));var pic_sn_st=PICM[PIC_SN_ST];var pic_sn_ed=PICM[PIC_SN_ED];var pic_we_st=PICM[PIC_WE_ST];var pic_we_ed=PICM[PIC_WE_ED];var pic_issched=parseInt(PICM[PIC_SCH],10);var pic_mac=unescape(dev[DEVO_MAC]);var pic_hostname=unescape(dev[DEVO_NAME]);var pic_label=fixHostLabel(pic_mac,pic_hostname);var pic_block=parseInt(PICM[PIC_MANU],10);var pic_force=pic_block;if(pic_block!=PIC_ST_ACTION){pic_block=findPICBlock(pic_mac);}
var PIC={idx:PICM[PIC_IDX],host:pic_label,hostlabel:pic_label,mac:pic_mac.toUpperCase(),block:pic_block,force:pic_force,sn_st:pic_sn_st,sn_ed:pic_sn_ed,we_st:pic_we_st,we_ed:pic_we_ed,issched:pic_issched,inedit:0,inprogress:0,is_null:(PICM[PIC_IDX]==-1)?1:0};return PIC;}
function set_PICM(PIC){var idx=PIC.idx;if(idx==-1)idx=findEmptyPICMidx();if(idx<1||idx>MAX_PIC_NUM)return-1;var temp,t_acc;var PICM=getCfgAry("pic_lst"+idx);if(!PICM)PICM=[];PICM[PIC_HOST]=(getLangM('PIC_S1t012')==PIC.host)?'':PIC.host;PICM[PIC_MAC]=PIC.mac;PICM[PIC_SCH]=PIC.issched;PICM[PIC_MANU]=PIC.force;PICM[PIC_SN_ST]=PIC.sn_st;PICM[PIC_SN_ED]=PIC.sn_ed;PICM[PIC_WE_ST]=PIC.we_st;PICM[PIC_WE_ED]=PIC.we_ed;setCfgAry("pic_lst"+idx,PICM);return 0;}
function fixHostLabel(mac,hostname){if(hostname.length==0){hostname=findArpHostName(mac);if(hostname.length==0){hostname='';}}
return hostname;}
function findPICByMac(mac){var PIC;var c_mac=mac.toUpperCase();for(var i=1;i<=MAX_PIC_NUM;i++){if(!(PIC=get_PIC(i)))break;if((PIC.mac==c_mac))break;}
return PIC;}
function findPICMByMac(mac){var PICM;var c_mac=mac.toUpperCase();for(var i=0;i<=MAX_PIC_NUM;i++){PICM=get_PICM(i);if(PICM[PIC_IDX]<0)continue;if((PICM[PIC_MAC].toUpperCase()==c_mac)){return PICM;}}
PICM=get_PICM(-1);return PICM;}
function findEmptyPICMidx(){for(var i=1;i<=MAX_PIC_NUM;i++){PICM=getCfgAry("pic_lst"+i);if(!PICM||PICM.length<8||PICM[PIC_MAC]==''){return i;}}
return-1;}
function findArpHostName(mac){var pc;var pcs=0;if(!ARPentry)return;while((pc=ARPentry(pcs++))){if(pc.mac=="")continue;if(pc.mac!==mac)continue;return pc.host;}
return"";}
function findPICBlock(mac){var pc,c_mac;if(!mac||mac.length==0)return 0;c_mac=mac.toUpperCase();for(var x in host_block){pc=host_block[x];if(!pc)break;pc=HTML2str(pc[0]);if(pc.toUpperCase()==c_mac){return 1;}}
return 0;}<%CFG_MAP(pic_enable,PIC_CTRL_EN);%><%CFG_MAP(pic_mod,PIC_CTRL_MOD);%><%CFG_MAP_ARY(pic_lst,PIC_CTRL_MEMB,50,1);%>var host_block=[<%CFG_ARY(STS_PIC_BLOCK,200);%>null];setCfg("pic_enable",1);