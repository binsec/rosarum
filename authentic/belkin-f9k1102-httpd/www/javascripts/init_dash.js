















var OFF_WAN=0;var OFF_PIC=1;var OFF_NTP=2;var OFF_FMW=3;var OFF_QOS=4;var OFF_PWD=5;var OFF_TZ=6;var OFF_USB=7;var OFF_UPD=8;var offer_msg=[[0,null],[0,'Show_PICBlock'],[0,'Show_NTP'],[0,'Show_FMW'],[0,'Show_QOS'],[1,'Show_setPWD'],[0,'Show_TZ'],[0,"Show_USB"],[0,null]];var last_off=0;var Enable_Msg=[];function Show_Off_Msg(){if(G_wan_st==2){old_off=last_off;last_off=0;for(var i=1;i<offer_msg.length;i++){if(!offer_msg[i][1])continue;if(offer_msg[i][0]==1){last_off=i;break;}}
if(last_off!=old_off){if(offer_msg[old_off][1])
eval(offer_msg[old_off][1]+'(0)');if(offer_msg[last_off][1])
eval(offer_msg[last_off][1]+'(1)');}}else{if(offer_msg[last_off][1])
eval(offer_msg[last_off][1]+'(0)');last_off=0;}
setTimeout("Show_Off_Msg()",1*1000);}
function ShowWANInfo(){if(top.m_ap_mode==1){var obj=$I("wan_info");var parentN=obj.parentNode;parentN.removeChild(obj);return;}
var wan_type_s=getLangAM([690,692,694,0,0,696,698,0,0,699]);setIdVal("u_wan_type",wan_type_s[getCfgInt("u_wan_type")]);var MAC_clone_s=["","(Clone Mac)"];var h;h=getCfgInt("clone_mod")==0?getCfg("u_wan_mac"):getCfg("wan_mac");h+=MAC_clone_s[getCfgInt("clone_mod")];setIdVal("u_wan_mac",h);if(top.m_from_wan)
NoHyperLink("a_wan_mac");var ip;var ip1;ip1=ip=getCfg("u_wan_ip");if(ip=="1.0.0.1"||ip=="0.0.0.0")ip="";setIdVal("u_wan_ip",ip);ip=getCfg("u_wan_msk");if(ip=="255.0.0.0"||ip=="0.0.0.0"||ip1=="1.0.0.1")ip="";setIdVal("u_wan_msk",ip);ip=getCfg("u_wan_gw");if(ip=="1.0.0.1"||ip=="0.0.0.0"||ip1=="1.0.0.1")ip="";setIdVal("u_wan_gw",ip);ip=getCfg("u_wan_dns").replace(" ","<br>");if(ip=="0.0.0.0")ip="";setIdVal("u_wan_dns",ip);}
function ShowLANInfo(){setIdVal("u_lan_mac",getCfg("lan_mac"));setIdVal("u_lan_msk",getCfg("lan_mask"));if(getCfg("rt_en")=="0")
setIdVal("u_lan_ip",getCfg("ap_ip"));else
setIdVal("u_lan_ip",getCfg("lan_ip"));if((top.m_ap_mode==1)||(getCfgInt("dhcp_enable")==0)||(getCfgInt("rt_en")==0)){h=Enable_Msg[0];}else{h=Enable_Msg[1];}
setIdVal("u_dhcp_en",h);if(top.m_ap_mode){NoHyperLink("a_lan_ip");NoHyperLink("a_lan_msk");NoHyperLink("a_lan_main");}}
function ShowWlanInfo(){var en,h;getWLANInfo();var G_key0=G_key[0].substr(0,32);var G_key1=G_key[0].substr(32,32);var G_key2=G_key[1].substr(0,32);var G_key3=G_key[1].substr(32,32);$("#u_2G_ssid").text(G_ssid[0]);if(isLogin()==LOGIN_ALREADY)
{$("#u_2G_pwd1").text(ShowObscured(G_key0));$("#u_2G_pwd2").text(ShowObscured(G_key1));}
else
$("#u_2G_pwd1").html(ShowObscured(G_key0));if(WIFI_BAND){$("#u_5G_ssid").text(G_ssid[1]);if(isLogin()==LOGIN_ALREADY)
{$("#u_5G_pwd1").text(ShowObscured(G_key2));$("#u_5G_pwd2").text(ShowObscured(G_key3));}
else
$("#u_5G_pwd1").html(ShowObscured(G_key2));}else{Table_del_rowid("wifi_info","tr_5G_ssid");Table_del_rowid("wifi_info","tr_5G_pwd");}
setIdVal("u_wifi_mode",getWLAN_sc(0));setIdVal("u_wsc_en",((getCfg("wps_en")=="0"&&getCfg("wps_en1")=="0")?Enable_Msg[0]:Enable_Msg[1]));var _mode=getCfg("guest_mode");var _key="";$("#u_guest_ssid").text(getCfg("guest_ssid"));if(_mode=='2')
_key=ShowObscured(getCfg("guest_wep"));else if(_mode=='0'||_mode=='1')
_key=ShowObscured(getCfg("guest_psk"));else
_key="";if(isLogin()==LOGIN_ALREADY)
$("#u_guest_pwd").text(_key);else
$("#u_guest_pwd").html(_key);if(top.m_ap_mode){Table_del_rowid("wifi_info","tr_GuestNa");Table_del_rowid("wifi_info","tr_GuestKy");}}
function ShowSYSInfo(){setIdVal("u_run_ver",FMW_date_conv(u_run_ver));setIdVal("u_boot_ver",u_boot_ver);setIdVal("u_hw_sn",u_hw_sn);setIdVal("u_hw_name",u_hw_name);setIdVal("u_model",u_hw_model+' ('+u_hw_ver+')');en=getCfgInt("qos_en");h=((en==1)?Enable_Msg[1]:Enable_Msg[0]);setIdVal("u_qos",h);if(top.m_ap_mode){Table_del_rowid("system_info","tr_qos");}}
var cgi_devs_list=[];function Show_PCS(){var pcs=0;var pcs_cnt=0;var h,pc,pcslist=$("#pc_list");var devs_list=[];if(top.m_ap_mode)return;var sz=cgi_devs_list.length-1;while((pc=ARPentry(pcs++))){var devicetype=-1;if(pc.mac=="")continue;pcs_cnt++;h='';if(pc.host.length!=0)
h+=pc.host;else
h+=pc.mac;for(var i=0;i<=sz;i++)
{if(cgi_devs_list[i])
{var dev_mac=unescape(cgi_devs_list[i][1]);if(dev_mac==pc.mac)
devicetype=unescape(cgi_devs_list[i][3]);}}
var elm=document.createElement('li');elm.className='device '+type2Str(devicetype);elm.innerHTML=h;pcslist.append(elm);if(pcs_cnt>=3)break;}
if(ARPentry(pcs)!=null){var elm=document.createElement("li");elm.className="device";elm.innerHTML=getLangM('gtMoreEllip');pcslist.append(elm);}}
function Show_FMW(flag){if("undefined"!=typeof(flag)){if(flag&&(offer_msg[OFF_FMW][0]==1))
DisplayObject('p1100');else
HiddenObject('p1100');}else{if(top.G_wan_st!=2){return setTimeout("Show_TZ()",400);}
GetFMWInfo(function(verinfo){if(verinfo){if(verinfo.status==FMW_CHK_IS_NEW){offer_msg[OFF_FMW][0]=1;if(isLogin()==LOGIN_ALREADY){$("#u_upgrade").show();}}else{offer_msg[OFF_FMW][0]=0;}}
setTimeout("Show_TZ()",400);});}}
function getCurrent_TZ(){var timezone=jstz.determine_timezone();var dst=timezone.dst();return(timezone.belkin_id()-1);}
function Show_TZ(flag){if("undefined"!=typeof(flag)){if(flag&&(offer_msg[OFF_TZ][0]==1))
DisplayObject('p1500');else
HiddenObject('p1500');}else{var pc_tz=getCurrent_TZ();var cfgtz=getCfgInt("ntp_tzone");if(cfgtz!=pc_tz){var h=getLangM("p1500t002");var tz_info=getLangM(ntp_zone_array[pc_tz]);h=h.replace('{TZ}',tz_info);$('#p1500p002').html(h);offer_msg[OFF_TZ][0]=1;}else{offer_msg[OFF_TZ][0]=0;}}}
function Show_QOS(flag){if(top.m_ap_mode==1){offer_msg[OFF_QOS][0]=0;return;}
if("undefined"!=typeof(flag)){if(flag&&(offer_msg[OFF_QOS][0]==1))
DisplayObject("p1300");else
HiddenObject('p1300');}else{var bwdObj=getBwRst();if((bwdObj.qos_en==0)||(bwdObj.recDate.length==0)){if(!getNoQoS()){offer_msg[OFF_QOS][0]=1;}else{offer_msg[OFF_QOS][0]=0;}
$("#pStatsQoS").remove();}else{$("#bwdet_date").html(formatDate(bwdObj.recDate));$("#bwdet_down").html(formatSpeed(bwdObj.recDownload));$("#bwdet_up").html(formatSpeed(bwdObj.recUpload));offer_msg[OFF_QOS][0]=0;}}}
function formatDate(s){return s;}
function formatSpeed(s){return parseFloat(s,10).toFixed(1);}
function Show_USB(flag){var dlna_rd=getCfgInt("dlna_ready");var usb_cn=getCfgInt("dlna_USB");if("undefined"!=typeof(flag)){if(flag&&(offer_msg[OFF_USB][0]==1))
DisplayObject("p1400");else
HiddenObject('p1400');}else{if((dlna_rd==1)&&(usb_cn==1))
{if(!getNoUSB()){offer_msg[OFF_USB][0]=1;}else{offer_msg[OFF_USB][0]=0;}}else{offer_msg[OFF_USB][0]=0;}}}
function do_bwdet_test(){var f=document.tFbwdet;setCfg("bwdet_ctrl",3);return subForm({frm:f,cmd:"BWDET_CONF",wait:1,wizard:1,done:function(){JumpTo("qos_bwdet.htm");}});}
function Show_setPWD(flag){if("undefined"!=typeof(flag)){if(flag&&(offer_msg[OFF_PWD][0]==1))
DisplayObject("p1200");else
HiddenObject("p1200");}else{if(isEmptyPass()){if(getNoPWD()){offer_msg[OFF_PWD][0]=0;}else{offer_msg[OFF_PWD][0]=1;}}else{offer_msg[OFF_PWD][0]=0;}}}
function showRouterInfo(){ShowWANInfo();ShowLANInfo();ShowWlanInfo();ShowSYSInfo();}
function Show_NTP(flag){if("undefined"!=typeof(flag)){if(flag&&(offer_msg[OFF_NTP][0]==1))
DisplayObject("pNoTime");else
HiddenObject('pNoTime');}else{if(top.G_ntp==2){offer_msg[OFF_NTP][0]=1;setTimeout("Show_NTP()",1000);}else
offer_msg[OFF_NTP][0]=0;}}
function Show_PICBlock(flag){if("undefined"!=typeof(flag)){if(flag&&(offer_msg[OFF_PIC][0]==1))
DisplayObject("PIC_blocked");else
HiddenObject('PIC_blocked');}else{if(top.G_pic==1){offer_msg[OFF_PIC][0]=1;}else{offer_msg[OFF_PIC][0]=0;}
setTimeout("Show_PICBlock()",1000);}}
function show_Norton(){HiddenObject('pStatsFilterHigh');HiddenObject('pStatsFilterMedium');HiddenObject('pStatsFilterLow');HiddenObject('pStatsFilterNoFilter');switch(getCfg('dns_type')){case'3':DisplayObject("pStatsFilterHigh");break;case'2':DisplayObject("pStatsFilterMedium");break;case'1':DisplayObject("pStatsFilterLow");break;case'0':default:DisplayObject("pStatsFilterNoFilter");break;}}
function evaltF_Lang(){var f=document.tFLANG;var id=getFieldIntVal(f.lang_id);HideMainBody();setCfg("langid",id);SetFieldValue(f.lang,id);f.action="langchg.cgi";form2Cfg(f);return subForm({frm:f,cmd:"LANG_CONF",wait:3,wizard:1,genfrm:0,done:function(){if(top.G_err>0){SetLang(id);}
window.location.reload(true);}});}
function pre_init(){Show_PCS();}
function init(){Enable_Msg=getLangAM([375,374]);var rc=ShowNews("div_news");if(rc==0){HiddenObject('feature_div');}else{DisplayObject('feature_div');}
ShowMainBody();var f=document.tFLANG;var s,tmpElem=document.createElement("div");for(var i in Lang_List){var x=findLangIdx(Lang_List[i]);if(x>=0){tmpElem.innerHTML=Lang[x][1];s=tmpElem.innerHTML;f.lang_id.options.add(new Option(s,x));}}
tmpElem=null;var v=Co_LANG;addCfg("lang_id",0,v);cfg2Form(f);$("#pmainf0001").change(function(){return evaltF_Lang();});DisplayObject("LangNav");$('#reconnect2').click(function(e){e.preventDefault();$('#reconnect').reveal({animation:'fade',animationspeed:100});});Show_FMW();$('#p1100a003').click(function(){SetTags("#310");return JumpTo("tl_sys_f.htm");});$('#p1500a001').click(function(){var pc_tz=getCurrent_TZ();setCfg("ntp_tzone",pc_tz);return subForm({frm:document.tF,cmd:"NTP_CONF",wait:3});});$('#p1500a002').click(function(){JumpTo("tl_sys.htm#timezone");});Show_USB();$('#p1400a003').click(function(){return JumpTo("opt_sw.htm");});$('#p1400a004').click(function(){setNoUSB();offer_msg[OFF_USB][0]=0;HiddenObject("p1400");return false;});Show_setPWD();$('#p1200a003').click(function(){showSetPasswd();return false;});$('#p1200a004').click(function(){setNoPWD();offer_msg[OFF_PWD][0]=0;HiddenObject("p1200");return false;});Show_QOS();$("#dhRetest").click(function(){return JumpTo("qos_bwdet.htm");});$("#p1300a003").click(function(){return JumpTo("qos_bwdet.htm");});$("#p1300a004").click(function(){setNoQoS();offer_msg[OFF_QOS][0]=0;HiddenObject("p1300");return false;});show_Norton();SetTitle(getLangM("tDashboard"));var tags=GetTagObj();SetTags("");if(tags.is("#601")){DisplayObject('p601');}
if(tags.is("#321")){DisplayObject("dhSuccessFW");}
if(tags.is("#601")){DisplayObject('p601');}
$("#adoupgrade").click(function(){return JumpTo("tl_sys_f.htm");});var do_login=GetNLogin();var do_url=GetDefPg();if(do_login&&do_url){if(isLogin()==LOGIN_DUPLICATE){setTimeout('showDuplicate()',500);}else{setTimeout('showLogin("'+do_url+'")',500);}}
if(top.m_ap_mode)HiddenObject("pStats");showRouterInfo();Show_Off_Msg();DisplayObject('routerinfo');setTimeout(function(){menu_ShowIAMenu("links",0);},500);if(GetMenuexp()){menu_ShowIAMenu("links",1);DisplayObject('links');}
$('#links_toggle').click(function(){if($('#links').is(":hidden")){$("#expandoArrow").rotate({animateTo:90,duration:600});menu_ShowIAMenu("links",1);$('#links').slideDown();SetMenuexp(1);}else{$("#expandoArrow").rotate({animateTo:0,duration:600});$('#links').slideUp();SetMenuexp(0);}});if(!$('#links').is(":hidden")){$("#expandoArrow").rotate({animateTo:90,duration:1});}else
$("#expandoArrow").rotate({animateTo:0,duration:1});Show_NTP();Show_PICBlock();}
function updateWanSt(wanst){if(top.m_ap_mode)return;if(wanst==0){$("#pStats").hide();$("#p1020").hide();$("#p1010").show();}else if(wanst==1){$("#pStats").hide();$("#p1010").hide();$("#p1020").show();}else{$("#pStats").show();$("#p1010").hide();$("#p1020").hide();}}
/*END_JS_PACKER*/