
var DHCP_OFFER_CODE=2;var DHCP_NO_OFFER_WAIT=55;var DHCP_DETECT_TIME=100;var PPPOE_PADO_CODE=2;var PPPOE_NO_PADO_WAIT=70;var PPPOE_DETECT_TIME=120;var PPTP_PADS_CODE=3;var PPTP_NO_PADO_WAIT=70;var PPTP_DETECT_TIME=120;var PPTP_FIX_DETECT_TIME=60;var FIX_DETECT_TIME=60;var WAIT_MODEM_SYNC=120;<%CGI_INCLUDE(/tmp/ispdet);%>;/*JS_PACKER*/

var G_DUT_DET_TIMER=3;var G_ST_DUT_ALIVE=1;var G_ST_DUT_DEAD=0;var G_ST_DUT_OK=0;var G_ST_DUT_ERR=1;var G_load_pg=[];function localize(){try{$("*[tid]").each(function(index){if(!$(this).data("tok")){var s=getLangM($(this).attr("tid"));if(s){if($(this).is(":button")||$(this).is(":submit")){$(this).val(s);}else{$(this).html(s);}
$(this).data("tok",1);}}});}catch(e){};};function preLoadPages(){getMainContainerObj();LoadModalPage(null,"800.htm");addModalID("p800 p801 p802 p803 p804");LoadContainerPage("GUISupport4","Support4.htm");LoadContainerPage("GUISupport5","Support5.htm");LoadModalPage("serviceCard","serviceCard.htm");};function preLoadLogin(){LoadModalPage(null,"password.htm",null,function(){$('#d_loginfrm').submit(function(){$('#p1210a005').click();return false;});$('#p1210a005').click(function(){var f=document.loginfrm;var pwd=getFieldValue(f.ui_pws);HidealertM("#errpwdempt");HidealertM("#errpwderr");if(pwd.length==0){ShowalertM("#errpwdempt");return false;}
DisableObject("p1210Password");DisableObject("p1210a005");DisableObject("p1210a006");do_Login(pwd,function(){ShowalertM("#errpwderr");EnableObject("p1210Password");EnableObject("p1210a005");EnableObject("p1210a006");});return false;});$('#p1210a006').click(function(){Autologout(1);top.G_prog=0;if(cPage!=MAIN_PG)
JumpTo(MAIN_PG,0);else
CloseModalURL();return false;});$('#d_pwsfrm').submit(function(){$('#p1201a003').click();return false;});$('#p1201a003').click(function(){var f=document.pwsfrm;var pwd=getFieldValue(f.ui_pws);if(pwd.length==0){ShowalertM("#errsetempt");return false;}
HidealertM("#errsetempt");DisableObject("p1201Password");DisableObject("p1201a003");DisableObject("p1201a004");do_setLogin(pwd,function(){do_Logout(function(){if((cPage!=MAIN_PG)&&(cPage!="tl_sys.htm")){JumpTo(MAIN_PG,0);}else{JumpTo("tl_sys.htm",0);}});});return false;});$('#p1201a004').click(function(){Autologout(1);top.G_prog=0;$('#p1201').hide();CloseModalURL();return false;});setIdVal("adminip",top.G_adminip);$('#p1220a001').click(function(){Autologout(1);if(cPage!=MAIN_PG)
JumpTo(MAIN_PG,0);else
CloseModalURL();return false;});$('d_rpwdfrm').submit(function(){$('#p1240a005').click();return false;});$('#p1240a005').click(function(){var f=document.rpwdfrm;var pwd=getFieldValue(f.ui_pws);if(pwd.length==0){HidealertM("#errpwdrerror");ShowalertM("#errpwdrempt");return false;}
HidealertM("#errpwdrempt");DisableObject("p1240Password");DisableObject("p1240a005");DisableObject("p1240a006");do_Removepwd(pwd,function(){ShowalertM("#errpwdrerror");EnableObject("p1240Password");EnableObject("p1240a005");EnableObject("p1240a006");});return false;});$('#p1240a006').click(function(){Autologout(1);top.G_prog=0;$('#passwordRemove').hide();CloseModalURL();return false;});});addModalID("p1201 p1210 p1220 passwordRemove");}
function ShowObscured(_pwd){var k=_pwd.charAt(0);if(isLogin()==LOGIN_ALREADY){k=_pwd;}else{for(var i=0;i<8;i++)k+="&bull;";}
return k;}
var G_showband=0;function Show_BandPasswd(){if("undefined"==typeof(G_key))return;var obs=0;var k=G_key[G_showband];if("undefined"==typeof(G_BBS))k=ShowObscured(k,1);$("#dhSSID").text(G_ssid[G_showband]);if("undefined"!=typeof(G_BBS)||isLogin()==LOGIN_ALREADY)
$("#BandPasswd").text(k);else
$("#BandPasswd").html(k);}
function ToggleSSID(id){if("undefine"==typeof(id)){}else{G_showband=id;}
if(id==0){$("#dhToggle5").removeClass("selected");$("#dhToggle24").addClass("selected");}
else if(id==1){$("#dhToggle24").removeClass("selected");$("#dhToggle5").addClass("selected");}
Show_BandPasswd();return false;}
function Login_init(){if(!document.loginfrm)return;EnableObject("p1210Password");EnableObject("p1210a005");EnableObject("p1210a006");SetFieldValue(document.loginfrm.ui_pws,'');HidealertM("#errpwdempt");HidealertM("#errpwderr");EnableObject("p1201Password");EnableObject("p1201a003");EnableObject("p1201a004");SetFieldValue(document.pwsfrm.ui_pws,'');HidealertM("#errsetempt");addCGI();}
function sync_PICStatus(){if("undefined"==typeof(RouterStatus)){dev_debug("Not get RouterStatus!");return;}
top.G_ntp=RouterStatus.ntp;top.G_pic=RouterStatus.pic;}
function printContent(div_id){var wl_key={'gt24SSID':G_ssid[0],'gt24PSK':G_key[0],'gt24Sec':G_sc[0],'gt50SSID':G_ssid[1],'gt50PSK':G_key[1],'gt50Sec':G_sc[1],'gtGuestSSID':G_ssid[2],'gtGuestPSK':G_key[2],'gtGuestSec':G_sc[2]};if(top.G_prog!=0||top.G_lock)return false;try{$("*[tid]").each(function(index){var id=$(this).attr("tid");var info=wl_key[id];if(info){$(this).html(info);}});}catch(e){};var servcard=$("#"+div_id).html();var html='<!DOCTYPE html>'+'<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->'+'<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->'+'<!--[if IE 8]><html class="no-js lt-ie9" lang="en"> <![endif]-->'+'<!--[if gt IE 8]><!--><html lang="en" class="gt-ie8"><!--<![endif]-->'+'<head>'+'<link href="stylesheets/app.css?t=20140212" rel="stylesheet" type="text/css" />'+'<!--[if lt IE 9]><link rel="stylesheet" href="stylesheets/ie.css"/><![endif]-->'+'<link href="stylesheets/serviceCard.css?_t=1234567" rel="stylesheet" type="text/css" />'+'</head><body style=\"background:#ffffff;\">'+
servcard+'</body></html>';var WindowObject=window.open("","PrintWindow","width=900,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes");WindowObject.document.writeln(html);WindowObject.document.close();WindowObject.focus();WindowObject.print();return false;}
function ShowTopBanner(detobj,first){var tid=WANLNKST[''+detobj.wanst][1];var msg=getLangM(tid);var cs2=WANLNKST[''+detobj.wanst][0];var obj;var st_cor="";var seg=0;$(".status").each(function(index){if(top.m_ap_mode){this.style.cssText='display:none !important;';return;}
var css=$(this).attr('class').split(" ");css[1]=cs2;$(this).attr('class',css.join(' '));if(seg==1){st_cor=$(this).css('backgroundColor');$(this).children().attr('tid',tid);$(this).children().html(msg);}
seg++;});if($.browser.msie){obj=document.getElementById("IE_WANST");if(top.m_ap_mode){obj.style.display='none';}else{obj.fillcolor=st_cor;obj.strokecolor=st_cor;}}
if(first||(G_wan_st!=detobj.wanst)){if(typeof(updateWanSt)=='function')updateWanSt(detobj.wanst);}
G_wan_st=detobj.wanst;top.G_nosec=detobj.nosec;sync_PICStatus();var st=detobj.login;if((confirmsec==0)&&(cPage=="qos_statistics.htm"))
{top.G_nosec=1;top.G_login=st;}
G_adminip=detobj.admin;if(isAutologout()&&(top.G_login!=-99)&&(top.G_login!=st)&&(st<=0)){do_Logout(null);top.G_login=st;return 1;}
top.G_login=st;if("undefined"!=typeof(Show_BandPasswd))Show_BandPasswd();st=(st>=1)?1:((isLogin()==LOGIN_ALREADY)?1:0);msg=getLangM(ADMINST[''+st][1]);cs2=ADMINST[''+st][0];obj=$('.settings');obj.children().html(msg);if(isLogin()!=LOGIN_ALREADY)
obj.removeClass('unlocked');else
obj.addClass('unlocked');}
var try_state=0;function before_init(){try_state++;if((try_state<20)&&(("undefined"==typeof(G_BBS))&&(cPage!=MAIN_PG)&&(isLogin()==LOGIN_UNKNOW))){setTimeout("before_init()",200);}else{localize();Show_BandPasswd();sync_PICStatus();init();if("undefined"!=typeof(hyper_bind))hyper_bind();}}
function loadpage_task(_done){var pg=G_load_pg.pop();if(!pg){if(_done)_done();}else{var _jid=pg.id;var _url=pg.url;var _divid=pg.subdiv;var _cb=pg.callback;$.ajax(_url,{cache:false,success:function(data,textStatus,jqXHR){$("#"+_jid).html(data);localize();var h=$('#'+_jid).html();if(_divid){h=$(_divid).html();}
$('#'+_jid).html(h);if(_cb)_cb();loadpage_task(_done);},dataType:"html"});}}
function ReplaceDemo(_h){if(document.URL.indexOf("file:")==-1){return _h;}
var p="";if("undefined"==typeof(G_BBS)){p="../";}
_h=_h.replace(/[\/]images[\/]/g,p+'images/');return _h;}
function HideAllInfo(_info,_gui_id){var id=(_gui_id)?_gui_id:"?";var info=(_info=="ContainerInfo")?G_CONTAINERINFO:G_MODALINFO;for(var x in info){if(info[x]&&(info[x]!=id)){HiddenObject(info[x]);}}}
function LoadContainerPage(_gui_id,_URL,_cb){var mainobj=getMainContainerObj();var _callback=(_cb)?_cb:null;var jid=Math.floor(Math.random()*10000);if(_gui_id){jid=_gui_id;}
var newContainer=document.getElementById(jid);if(!newContainer){newContainer=document.createElement("div");if(_gui_id){newContainer.id=jid;}
newContainer.style.display="none";mainobj.before(newContainer);addContainerID(_gui_id);G_load_pg[G_load_pg.length]={url:pg_dir+_URL,id:jid,callback:_callback,subdiv:null};}}
function ShowContainerInfo(_gui_id,_cb){HideAllInfo("ContainerInfo",_gui_id);if($('#'+_gui_id).css('display')=="none")dev_debug(_gui_id);$('#'+_gui_id).show();if(_cb)_cb();};function addContainerID(_id){if(_id){var id=_id.split(" ");for(var y in id){for(var x in G_CONTAINERINFO){if(G_CONTAINERINFO[x]==id[y])return;}
G_CONTAINERINFO[G_CONTAINERINFO.length]=id[y];}}}
function LoadModalPage(_gui_id,_URL,_divid,_cb){var URL=pg_dir+_URL;var _div=(_divid)?_divid:null;var _callback=(_cb)?_cb:null;var jid=Math.floor(Math.random()*10000);if(_gui_id){jid=_gui_id;}
var newModalElem=document.getElementById(jid);if(!newModalElem){newModalElem=document.createElement("div");newModalElem.id=jid;if(_gui_id){newModalElem.style.display="none";}
$('#progploader').append(newModalElem);addModalID(_gui_id);G_load_pg[G_load_pg.length]={url:pg_dir+_URL,id:jid,callback:_callback,subdiv:_div};}}
function addModalPage(_gui_id,_txt,_cb){var jid=Math.floor(Math.random()*10000);if(_gui_id){jid=_gui_id;}
var newModalElem=document.getElementById(jid);if(!newModalElem){newModalElem=document.createElement("div");newModalElem.id=jid;newModalElem.innerHTML=_txt;if(_gui_id){newModalElem.style.display="none";}
$('#progploader').append(newModalElem);addModalID(_gui_id);if(_cb)_cb();}}
function addModalID(_id){if(_id){var id=_id.split(" ");for(var y in id){for(var x in G_MODALINFO){if(G_MODALINFO[x]==id[y])return;}
G_MODALINFO[G_MODALINFO.length]=id[y];}}}
function ShowModalInfo(_gui_id,_cb,_opt){var opt={animation:'fade',animationspeed:100};var loaderid=(_gui_id)?"#progploader":'#null_modal';if(_opt)opt=_opt;HideAllInfo("ModalInfo",_gui_id);if(_gui_id){if($('#'+_gui_id).css('display')=="none")dev_debug(_gui_id);$('#'+_gui_id).show();}
window.scrollTo(0,0);if($(loaderid).css('visibility')=='hidden'){$(loaderid).reveal(opt);}
if(_cb)_cb();};function ShowModalURL(_gui_id,_URL,_pg_id,_cb){if(!_gui_id){return;}
LoadModalPage(_gui_id,_URL,_pg_id,null);loadpage_task(function(){ShowModalInfo(_gui_id,_cb);});};function CloseModalURL(){if($('#progploader').css('visibility')!='hidden'){$('#progploader').trigger('reveal:close');setTimeout(function(){HideAllInfo("ModalInfo",null);},200);}
$("#null_modal").trigger('reveal:close');}
var G_CLK_S=0;var G_CLK_WAIT=0;var WAN_ST_CONNECTING=0;var WAN_ST_CONNECTED=1;var WAN_ST_CABLE_ERR=-1;var WAN_ST_ICC_ERR=-2;var WAN_ST_DNS_NULL=-3;var WAN_ST_DNS_ERR=-4;var WAN_ST_SES_ERR=-5;function getWANConnectST(_cb_done,_cb_err){$.getScript("api/WANConnect.js").done(function(script,textStatus){var WANST={connect:parseInt(WANConnect.Connect,10),cable:parseInt(WANConnect.Cable,10),session:parseInt(WANConnect.Session,10),status:parseInt(WANConnect.Status,10),connlong:parseInt(WANConnect.ConnLong,10),trylink:parseInt(WANConnect.TryLink,10)};var st=0;if(WANST.connlong==0)WANST.trylink=0;if(WANST.connect==1){st=WAN_ST_CONNECTED;}else{if(WANST.cable==0){st=WAN_ST_CABLE_ERR;}else{if(WANST.status==WAN_ST_CONNECTED){WANConnect.DNS=WANConnect.DNS.replace(/[\%]2E/g,".");if((WANConnect.DNS.length==0)||(WANConnect.DNS=="0.0.0.0")){st=WAN_ST_DNS_NULL;}else if(WANConnect.DNSok!="1"){st=WAN_ST_DNS_ERR;}else{st=WAN_ST_ICC_ERR;}}else{st=WAN_ST_CONNECTING;}}}
if(_cb_done)_cb_done(st,WANST);}).fail(function(jqxhr,settings,exception){if(_cb_err)_cb_err();});}
function getPPPSverST(_cb_done){$.getScript("api/PPPDetect.js").done(function(script,textStatus){var st=parseInt(PPPSver.Status,10);if(_cb_done)_cb_done(st);}).fail(function(jqxhr,settings,exception){if(_cb_done)_cb_done(0);});}
function addLang(lang)
{$.ajax({url:pg_dir+'lang.js?LANG='+pg_lang+'&LST='+lang,dataType:"script",scriptCharset:pg_charset,success:function(){localize();}});}
function addCGI()
{var cgi=arguments;var isLoaded;var _cgis=[];for(var i=0;i<cgi.length;i++){isLoaded=0;for(j in CGIs)
{if(CGIs[j]==cgi[i]){isLoaded=1;break;}}
if(isLoaded)continue;CGIs.push(cgi[i]);_cgis.push(cgi[i]);}
$.getScript(URLTimeStamp(pg_dir+'cgis.js?LST='+_cgis.join(',')));}
var G_MAIN_CONTAINER=null;var G_CONTAINERINFO=[];var G_MODALINFO=[];function getMainContainerObj(){if(!G_MAIN_CONTAINER){G_MAIN_CONTAINER=$('.main.container').first();addContainerID($('.main.container').attr('id'));}
return G_MAIN_CONTAINER;}
var devwnd=null;function toggle_debug(flag){var en=GetCookie('dev');if(flag){if(en&&en==0){en=1;}else{try{devwnd.close();}catch(e){};en=0;}
SetCookie('dev',en);}
$("#devflag").html((en==1)?"on":"+");return false;}
function dev_debug(msg){var d=new Date();var ds=d.toUTCString();var en=GetCookie('dev');if(en==1){if(!devwnd){devwnd=window.open("","dev","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,width=400,height=400,resizable=1,top=0,left=0");}
if(!msg)return;var elm=document.createElement("div");elm.innerHTML=ds+": "+msg;try{var h=devwnd.document.body.innerHTML;if(h.length==0){elm.innerHTML=ds+': Open debug window <br>'+
ds+': <b>appCodeName:</b>'+navigator.appCodeName+'<br>'+
ds+': <b>appName:</b>'+navigator.appName+'<br>'+
ds+': <b>appVersion:</b>'+navigator.appVersion+'<br>'+
ds+': <b>userAgent:</b>'+navigator.userAgent+'<br>'+
ds+': <b>platform:</b>'+navigator.platform+'<br>'+
ds+": "+msg;}
devwnd.document.body.appendChild(elm);}catch(e){try{h+=elm.outerHTML;devwnd.document.body.innerHTML=h;}catch(e){}};}}
function doc_top(){return($.browser.msie)?$('html,body').scrollTop():$(document).scrollTop();}
var isMobile={Android:function(){return navigator.userAgent.match(/Android/i);},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i);},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera:function(){return navigator.userAgent.match(/Opera Mini/i);},Windows:function(){return navigator.userAgent.match(/IEMobile/i);},any:function(){return(isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Opera()||isMobile.Windows());}};$(document).ready(function(){var isIOS=navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i);var isAndroid=navigator.userAgent.match(/(android)/i);var isWindows=navigator.platform.match(/(win)/i);var isOSX=navigator.platform.match(/(mac)/i);if(isIOS){$("body").addClass("ios");}
if(isAndroid){$("body").addClass("android");}
if(isWindows){$("body").addClass("win");}
if(isOSX){$("body").addClass("osx");}
function pad(num,size){var s="000000000"+num;return s.substr(s.length-size);}
toggle_debug();G_load_pg=[];if("undefined"==typeof(G_NO_LOGIN)){preLoadLogin();}
if("undefined"==typeof(G_NO_APPLY)){preLoadPages();}
if("undefined"==typeof(G_NO_WAN_ST)){ShowWANState(0,1);$("#dhLockToggle").click(function(){return do_loginout();});$("#dhLockToggle2").click(function(){return do_loginout();});}
if("undefined"!=typeof(G_BBS)){SetTitle(getLangM("gtBBSTitle"));}
if("undefined"!=typeof(getWLANInfo))getWLANInfo();dev_debug(cPage);if("undefined"!=typeof(pre_init)){pre_init();}
if(G_load_pg.length==0){localize();Show_BandPasswd();init();if("undefined"!=typeof(hyper_bind))hyper_bind();}else{loadpage_task(before_init);}
(function(f,h,c){var a='placeholder'in h.createElement('input'),d='placeholder'in h.createElement('textarea'),i=c.fn,j;if(a&&d){j=i.placeholder=function(){return this};j.input=j.textarea=true}else{j=i.placeholder=function(){return this.filter((a?'textarea':':input')+'[placeholder]').not('.placeholder').bind('focus.placeholder',b).bind('blur.placeholder',e).trigger('blur.placeholder').end()};j.input=a;j.textarea=d;c(function(){c(h).delegate('form','submit.placeholder',function(){var k=c('.placeholder',this).each(b);setTimeout(function(){k.each(e)},10)})});c(f).bind('unload.placeholder',function(){c('.placeholder').val('')})}function g(l){var k={},m=/^jQuery\d+$/;c.each(l.attributes,function(o,n){if(n.specified&&!m.test(n.name)){k[n.name]=n.value}});return k}function b(){var k=c(this);if(k.val()===k.attr('placeholder')&&k.hasClass('placeholder')){if(k.data('placeholder-password')){k.hide().next().show().focus().attr('id',k.removeAttr('id').data('placeholder-id'))}else{k.val('').removeClass('placeholder')}}}function e(){var o,n=c(this),k=n,m=this.id;if(n.val()===''){if(n.is(':password')){if(!n.data('placeholder-textinput')){try{o=n.clone().attr({type:'text'})}catch(l){o=c('<input>').attr(c.extend(g(this),{type:'text'}))}o.removeAttr('name').data('placeholder-password',true).data('placeholder-id',m).bind('focus.placeholder',b);n.data('placeholder-textinput',o).data('placeholder-id',m).before(o)}n=n.removeAttr('id').hide().prev().attr('id',m).show()}n.addClass('placeholder').val(n.attr('placeholder'))}else{n.removeClass('placeholder')}}}(this,document,jQuery));$('input, textarea').placeholder();(function($){$('a[data-reveal-id]').live('click',function(event){event.preventDefault();var modalLocation=$(this).attr('data-reveal-id');$('#'+modalLocation).reveal($(this).data());});$.fn.reveal=function(options){var defaults={animation:'fadeAndPop',animationSpeed:300,closeOnBackgroundClick:true,dismissModalClass:'close-reveal-modal'};var options=$.extend({},defaults,options);return this.each(function(){var modal=$(this),topMeasure=parseInt(modal.css('top')),topOffset=modal.height()+topMeasure,locked=false,modalBg=$('.reveal-modal-bg');if(modalBg.length==0){modalBg=$('<div class="reveal-modal-bg" />').insertAfter(modal);modalBg.fadeTo('fast',0.8);}
function openAnimation(){modalBg.unbind('click.modalEvent');$('.'+options.dismissModalClass).unbind('click.modalEvent');if(!locked){lockModal();if(options.animation=="fadeAndPop"){modal.css({'top':$(document).scrollTop()-topOffset,'opacity':0,'visibility':'visible'});modalBg.fadeIn(options.animationSpeed/2);modal.delay(options.animationSpeed/2).animate({"top":$(document).scrollTop()+topMeasure+'px',"opacity":1},options.animationSpeed,unlockModal);}
if(options.animation=="fade"){modal.css({'opacity':0,'visibility':'visible','top':$(document).scrollTop()+topMeasure});modalBg.fadeIn(options.animationSpeed/2);modal.delay(options.animationSpeed/2).animate({"opacity":1},options.animationSpeed,unlockModal);}
if(options.animation=="none"){modal.css({'visibility':'visible','top':$(document).scrollTop()+topMeasure});modalBg.css({"display":"block"});unlockModal();}}
modal.unbind('reveal:open',openAnimation);}
modal.bind('reveal:open',openAnimation);function closeAnimation(){if(!locked){lockModal();if(options.animation=="fadeAndPop"){modalBg.delay(options.animationSpeed).fadeOut(options.animationSpeed);modal.animate({"top":$(document).scrollTop()-topOffset+'px',"opacity":0},options.animationSpeed/2,function(){modal.css({'top':topMeasure,'opacity':1,'visibility':'hidden'});unlockModal();});}
if(options.animation=="fade"){modalBg.delay(options.animationSpeed).fadeOut(options.animationSpeed);modal.animate({"opacity":0},options.animationSpeed,function(){modal.css({'opacity':1,'visibility':'hidden','top':topMeasure});unlockModal();});}
if(options.animation=="none"){modal.css({'visibility':'hidden','top':topMeasure});modalBg.css({'display':'none'});}}
modal.unbind('reveal:close',closeAnimation);}
modal.bind('reveal:close',closeAnimation);modal.trigger('reveal:open');function unlockModal(){locked=false;}
function lockModal(){locked=true;}});};})(jQuery);});/*END_JS_PACKER*/
