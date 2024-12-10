
var FMW_NOTES="release_notes_$s.html";var FMW_EULA="EULA_$s.txt";var FMW_VER="firmware_ver.txt";var FMW_SVR_SITE="fw.xbcs.net";var FMW_AUTO_SVR_SITE="networking.belkin.com";var REG_SVR_SITE="www.belkin.com";<%CGI_INCLUDE(/tmp/fmw_svr);%>;var FMW_AUTO_SVR="http://"+FMW_AUTO_SVR_SITE+"/update/files/F9K1102/v32/WW/version.html";var FMW_SVR="http://"+FMW_SVR_SITE+"/F9K1102/v32/WW/";CUR_FMW_VER='<% CFG_GET(FMW_VER);%>';REG_INFO="sku=F9K1102&HWver=v32&reg=WW&lang=$s&serial=<% CFG_GET(HW_SN);%>&FWver=<% CFG_GET(FMW_VER);%>";/*JS_PACKER*/function ProxyURL(_id,_url,_cb_st,_cb_done){var URL_GET="url="+_url;URL_GET='CSRFID='+mmm+'&'+URL_GET;var URL_CHK="chk&"+URL_GET;if(_cb_done)URL_CHK=URL_GET;if(document.URL.indexOf("file:")!=-1){URL_CHK=URL_GET=_url;}
$.get("proxy.cgi?"+URL_CHK,function(data){if((data.indexOf("returned error:")!=-1)||(data.indexOf("bad address")!=-1)||(data.length==0)){if(_cb_st)_cb_st(0);if(_cb_done)_cb_done("");}else{if(_cb_st)_cb_st(1);if(_id){$(_id).html(data);}
if(_cb_done)_cb_done(data);}}).error(function(){if(_cb_st)_cb_st(0);if(_cb_done)_cb_done("");});}
var FMW_CHK_NO_NEW=1;var FMW_CHK_IS_SAME=0;var FMW_CHK_IS_NEW=-1;function CheckFMWVersion(o,n){var v_o=o.split(".");var v_n=n.split(".");var j=v_n.length;var i=v_o.length;var o_d,n_d;var st=FMW_CHK_IS_SAME;for(var k=0;k<4;k++){o_d=parseInt((i>k)?v_o[k]:"");n_d=parseInt((j>k)?v_n[k]:"");if(o_d<n_d){st=FMW_CHK_IS_NEW;break;}
if(o_d>n_d){st=FMW_CHK_NO_NEW;break;}}
return st;}
function GetFMWInfo(_cb_ver){var URL_VER=FMW_SVR+FMW_VER;if(document.URL.indexOf("file:")!=-1){URL_VER="demo/"+URL_VER.replace(/^.*F9K1103[\/]/,'F9K1103/');}
dev_debug("FMW info="+URL_VER);ProxyURL(null,URL_VER,function(st){if(st==0){dev_debug(" Err:"+URL_VER);if(_cb_ver)_cb_ver(null);}},function(data){if(data.length==0){if(_cb_ver){_cb_ver(null);}
dev_debug(" Empty:"+URL_VER);return;}
var s=data.split("\n");if(s.length<4){if(_cb_ver){_cb_ver(null);}
dev_debug(" format incorrect:"+URL_VER+"<br>["+data+"]<br>total line:"+s.length);return;}
dev_debug("format info:"+s[1]+" "+s[3]+" "+s[2]);var st=CheckFMWVersion(CUR_FMW_VER,s[1]);dev_debug(" Current: "+CUR_FMW_VER+" "+((st==-1)?"<":">=")+" Firmware Site: "+s[1]);var verinfo={status:st,oldver:CUR_FMW_VER,newver:s[1],downurl:s[3],chksum:s[2]};if(_cb_ver)_cb_ver(verinfo);});}
var try_en=0;var lang_code=null;function FMW_getReleaseEULA(_cb_sucess,_cb_fail,_NOTE_div,_EULA_div){if(lang_code==null){lang_code=GetLangISO();try_en=0;}
var URL_NOTES=FMW_SVR+FMW_NOTES.replace("$s",lang_code);if(document.URL.indexOf("file:")!=-1){URL_NOTES="demo"+URL_NOTES.replace(/http:[\/][\/]/,'');}
dev_debug(" check Server's Release Note :"+URL_NOTES);ProxyURL("#"+_NOTE_div,URL_NOTES,function(st){if(st==0){if(try_en){dev_debug(" Err find :"+URL_NOTES);if(_cb_fail){_cb_fail();}
return;}
try_en++;lang_code="en";dev_debug(" No find :"+URL_NOTES+", try English now");return setTimeout(function(){FMW_getReleaseEULA(_cb_sucess,_cb_fail,_NOTE_div,_EULA_div);},400);}},function(s){if(!s.length)return;dev_debug(" get Server's Release Note OK");lang_code=GetLangISO();try_en=0;dev_debug(" check Server's EULA");FMW_getEULA(_cb_sucess,_cb_fail,_EULA_div);});}
function FMW_getEULA(_cb_sucess,_cb_fail,_EULA_div){var URL_EULA=FMW_SVR+FMW_EULA.replace("$s",lang_code);if(document.URL.indexOf("file:")!=-1){URL_EULA="demo"+URL_EULA.replace(/http:[\/][\/]/,'');}
dev_debug(" get Server's EULA :"+URL_EULA);ProxyURL("#"+_EULA_div,URL_EULA,function(st){if(st==0){if(try_en){dev_debug(" Err find :"+URL_EULA);if(_cb_fail){_cb_fail();}
return false;}
try_en++;lang_code="en";dev_debug(" No find :"+URL_EULA+", try English now");setTimeout(function(){FMW_getEULA(_cb_sucess,_cb_fail,_EULA_div);},400);}},function(s){if(!s.length)return;dev_debug(" get Server's EULA OK");if(_cb_sucess){_cb_sucess();}
return false;});}
var fmw_prg=-1;var fake_cnt=0;function Check_FMW_Download(_cb_sucess,_cb_fail,_prog_div){var progress=$('#'+_prog_div);var factor=(fmw_wait/2);if(fmw_prg==-1){progress.stop().clearQueue();progress.css('width','0%');progress.animate({'width':'0%'},'fast');fmw_prg=0;}
$.getScript("api/FMWLoad.js",function(){var Status=['0','0','0%'];if(FMWLoad.Status.length){Status=FMWLoad.Status.split(";");}else{setTimeout(function(){Check_FMW_Download(_cb_sucess,_cb_fail,_prog_div);},1000);return;}
var prog_st=(Status[0]<0)?Status[0]:Status[2];var prog=parseInt(prog_st,10);if(fake_cnt>prog){prog_st=fake_cnt+"%";}else{fake_cnt=prog;}
switch(true){default:case((prog>=0)&&(prog<=99)):dev_debug("1 prog :"+prog);progress.animate({'width':prog_st},'slow');setTimeout(function(){Check_FMW_Download(_cb_sucess,_cb_fail,_prog_div);},1000*2);break;case(prog>=100):dev_debug("2 prog :"+prog);progress.animate({'width':'100%'},'fast');dev_debug("download firmware ok");if(prog==999){dev_debug("Firmware Check ok");if(_cb_sucess){_cb_sucess();}
fmw_prg=0;return;}
setTimeout(function(){Check_FMW_Download(_cb_sucess,_cb_fail,_prog_div);},1000*2);break;case(prog<0):if(prog!=-99){dev_debug("Firmware error:"+prog);if(_cb_fail){_cb_fail(prog);}
progress.stop().clearQueue();fmw_prg=0;return;}else{setTimeout(function(){Check_FMW_Download(_cb_sucess,_cb_fail,_prog_div);},1000*2);}
break;}}).fail(function(){progress.stop().clearQueue();fmw_prg=0;dev_debug("download firmware fail");if(_cb_fail){_cb_fail(-1);}
return;});}
function GetRegFormContent(_id,_cb_st,_cb_done,flag){var REG_PARAM=REG_INFO.replace("$s",GetLangISO());var REG_FRM="http://"+REG_SVR_SITE+"/ws/reg/getRegForm.aspx?"+REG_PARAM;if(flag)REG_FRM+="&loadExisting=true";dev_debug("RegForm="+REG_FRM);if(document.URL.indexOf("file:")!=-1){REG_FRM="demo"+REG_FRM.replace(/^.*ws[\/]/,'/ws/');}
ProxyURL(_id,REG_FRM,_cb_st,_cb_done);}
function RegisterAction(_info,_done){var REG_PARAM=REG_INFO.replace("$s",GetLangISO());var submitURL='';submitURL="https://"+REG_SVR_SITE+"/ws/reg/register.aspx?"+_info;dev_debug("Register="+submitURL);if(document.URL.indexOf("file:")!=-1){submitURL="demo"+(submitURL.replace(/^.*ws[\/]/,'/ws/'));}
var retryRequest=$.ajax({type:"GET",contentType:"application/json; charset=utf-8",dataType:"jsonp",timeout:8000,url:submitURL,crossDomain:true,error:function(jqXHR,textStatus,errorThrown){setCfg("regist_info",submitURL);return subForm({cmd:"SYS_CONF",wizard:1,wait:1,done:_done});}}).done(function(msg){setCfg("regist_ok","1");setCfg("regist_info",submitURL);return subForm({cmd:"SYS_CONF,REGIST_ACT",wizard:1,wait:1,done:_done});});}
function UnregisterAction(_done){var submitURL=getCfg("regist_info").replace(/\bregister\.aspx\b/,'unregister.aspx');if(submitURL==''||getCfg("regist_ok")!=1){if(_done)_done("");return false;}
if(document.URL.indexOf("file:")!=-1){submitURL="demo"+(submitURL.replace(/^.*ws[\/]/,'/ws/'));}
dev_debug("Unregister="+submitURL);var retryRequest=$.ajax({type:"GET",contentType:"application/json; charset=utf-8",dataType:"jsonp",timeout:8000,url:submitURL,crossDomain:true,error:function(jqXHR,textStatus,errorThrown){if(_done)_done();}}).done(function(msg){setCfg("regist_ok","0");return subForm({cmd:"SYS_CONF",wizard:1,wait:1,done:_done});});}
function CheckOptionContent(_cb){var REG_PARAM=REG_INFO.replace("$s",GetLangISO());var OPT_FRM="http://"+REG_SVR_SITE+"/ws/reg/getOptSW.aspx?"+REG_PARAM;if(document.URL.indexOf("file:")!=-1){OPT_FRM="demo"+(OPT_FRM.replace(/^.*ws[\/]/,'/ws/'));}
ProxyURL(null,OPT_FRM,_cb,null);return false;}
function GetOptionContent(_id,_cb_st,_cb_done){var REG_PARAM=REG_INFO.replace("$s",GetLangISO());var OPT_FRM="http://"+REG_SVR_SITE+"/ws/reg/getOptSW.aspx?"+REG_PARAM;if(document.URL.indexOf("file:")!=-1){OPT_FRM="demo"+(OPT_FRM.replace(/^.*ws[\/]/,'/ws/'));}
ProxyURL(_id,OPT_FRM,_cb_st,_cb_done);return false;}
/*END_JS_PACKER*/