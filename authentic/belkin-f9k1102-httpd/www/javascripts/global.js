
/*JS_PACKER*/var LOGIN_NEED=0;var LOGIN_ALREADY=1;var LOGIN_UNKNOW=-1;var LOGIN_ERR=-2;var LOGIN_DUPLICATE=-3;var SUBMIT_c={'p800':0,'p801':0,'p802':0,'p803':0,'p804':0,'Support4':1,'Support5':1,'p1201':0,'p1210':0};var confirmsec=0;var RouterST_API="api/RouterStatus.js";var RouterStatus={"Status":"1","link":'0',"cable":'0',"login":'-1',"nosec":'1',"timout":'100',"admin":'192.168.2.1',"ntp":'0',"pic":'0'};var Frm_F={"radio":'INPUT',"checkbox":'INPUT',"select-one":'SELECT',"select-multiple":'SELECT',"password":'INPUT',"textarea":'TEXTAREA',"text":'INPUT',"hidden":'INPUT',"file":'INPUT'};function getFormField(f){var h='<FORM NAME="'+f.name+'" METHOD='+f.method+'" ACTION="'+f.action+'" TARGET="'+f.target+'">\n';var s;for(var x=0;x<f.elements.length;x++){var obj=f.elements[x];if(obj&&obj.type){op='';s=1;switch(obj.type){case"radio":case"checkbox":if(!obj.checked){s=0;break;}
case"select-one":case"select-multiple":case"password":case"textarea":case"text":case"file":case"hidden":break;default:s=0;break;}
if(s){h+='<'+Frm_F[obj.type]+' TYPE="'+obj.type+'" '+' NAME="'+obj.name+'" VALUE="'+obj.value+'" '+op+' />\n';}}}
h+='</FORM>';return h;}
var sAscii=" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ";var sAscii=sAscii+"[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";var sHex="0123456789abcdef";function hex(i){h="";for(j=0;j<=3;j++){h+=sHex.charAt((i>>(j*8+4))&0x0F)+
sHex.charAt((i>>(j*8))&0x0F);}
return h;}
function add(x,y){return(((x&0x7FFFFFFF)+(y&0x7FFFFFFF))^(x&0x80000000)^(y&0x80000000));}
function R1(A,B,C,D,X,S,T){q=add(add(A,(B&C)|(~B&D)),add(X,T));return add((q<<S)|((q>>(32-S))&(Math.pow(2,S)-1)),B);}
function R2(A,B,C,D,X,S,T){q=add(add(A,(B&D)|(C&~D)),add(X,T));return add((q<<S)|((q>>(32-S))&(Math.pow(2,S)-1)),B);}
function R3(A,B,C,D,X,S,T){q=add(add(A,B^C^D),add(X,T));return add((q<<S)|((q>>(32-S))&(Math.pow(2,S)-1)),B);}
function R4(A,B,C,D,X,S,T){q=add(add(A,C^(B|~D)),add(X,T));return add((q<<S)|((q>>(32-S))&(Math.pow(2,S)-1)),B);}
function calcMD5(sInp){wLen=(((sInp.length+8)>>6)+1)<<4;var X=new Array(wLen);j=4;for(i=0;(i*4)<sInp.length;i++){X[i]=0;for(j=0;(j<4)&&((j+i*4)<sInp.length);j++){X[i]+=(sAscii.indexOf(sInp.charAt((i*4)+j))+32)<<(j*8);}}
if(j==4){X[i++]=0x80;}else{X[i-1]+=0x80<<(j*8);}
for(;i<wLen;i++){X[i]=0;}
X[wLen-2]=sInp.length*8;a=0x67452301;b=0xefcdab89;c=0x98badcfe;d=0x10325476;for(i=0;i<wLen;i+=16){aO=a;bO=b;cO=c;dO=d;a=R1(a,b,c,d,X[i+0],7,0xd76aa478);d=R1(d,a,b,c,X[i+1],12,0xe8c7b756);c=R1(c,d,a,b,X[i+2],17,0x242070db);b=R1(b,c,d,a,X[i+3],22,0xc1bdceee);a=R1(a,b,c,d,X[i+4],7,0xf57c0faf);d=R1(d,a,b,c,X[i+5],12,0x4787c62a);c=R1(c,d,a,b,X[i+6],17,0xa8304613);b=R1(b,c,d,a,X[i+7],22,0xfd469501);a=R1(a,b,c,d,X[i+8],7,0x698098d8);d=R1(d,a,b,c,X[i+9],12,0x8b44f7af);c=R1(c,d,a,b,X[i+10],17,0xffff5bb1);b=R1(b,c,d,a,X[i+11],22,0x895cd7be);a=R1(a,b,c,d,X[i+12],7,0x6b901122);d=R1(d,a,b,c,X[i+13],12,0xfd987193);c=R1(c,d,a,b,X[i+14],17,0xa679438e);b=R1(b,c,d,a,X[i+15],22,0x49b40821);a=R2(a,b,c,d,X[i+1],5,0xf61e2562);d=R2(d,a,b,c,X[i+6],9,0xc040b340);c=R2(c,d,a,b,X[i+11],14,0x265e5a51);b=R2(b,c,d,a,X[i+0],20,0xe9b6c7aa);a=R2(a,b,c,d,X[i+5],5,0xd62f105d);d=R2(d,a,b,c,X[i+10],9,0x2441453);c=R2(c,d,a,b,X[i+15],14,0xd8a1e681);b=R2(b,c,d,a,X[i+4],20,0xe7d3fbc8);a=R2(a,b,c,d,X[i+9],5,0x21e1cde6);d=R2(d,a,b,c,X[i+14],9,0xc33707d6);c=R2(c,d,a,b,X[i+3],14,0xf4d50d87);b=R2(b,c,d,a,X[i+8],20,0x455a14ed);a=R2(a,b,c,d,X[i+13],5,0xa9e3e905);d=R2(d,a,b,c,X[i+2],9,0xfcefa3f8);c=R2(c,d,a,b,X[i+7],14,0x676f02d9);b=R2(b,c,d,a,X[i+12],20,0x8d2a4c8a);a=R3(a,b,c,d,X[i+5],4,0xfffa3942);d=R3(d,a,b,c,X[i+8],11,0x8771f681);c=R3(c,d,a,b,X[i+11],16,0x6d9d6122);b=R3(b,c,d,a,X[i+14],23,0xfde5380c);a=R3(a,b,c,d,X[i+1],4,0xa4beea44);d=R3(d,a,b,c,X[i+4],11,0x4bdecfa9);c=R3(c,d,a,b,X[i+7],16,0xf6bb4b60);b=R3(b,c,d,a,X[i+10],23,0xbebfbc70);a=R3(a,b,c,d,X[i+13],4,0x289b7ec6);d=R3(d,a,b,c,X[i+0],11,0xeaa127fa);c=R3(c,d,a,b,X[i+3],16,0xd4ef3085);b=R3(b,c,d,a,X[i+6],23,0x4881d05);a=R3(a,b,c,d,X[i+9],4,0xd9d4d039);d=R3(d,a,b,c,X[i+12],11,0xe6db99e5);c=R3(c,d,a,b,X[i+15],16,0x1fa27cf8);b=R3(b,c,d,a,X[i+2],23,0xc4ac5665);a=R4(a,b,c,d,X[i+0],6,0xf4292244);d=R4(d,a,b,c,X[i+7],10,0x432aff97);c=R4(c,d,a,b,X[i+14],15,0xab9423a7);b=R4(b,c,d,a,X[i+5],21,0xfc93a039);a=R4(a,b,c,d,X[i+12],6,0x655b59c3);d=R4(d,a,b,c,X[i+3],10,0x8f0ccc92);c=R4(c,d,a,b,X[i+10],15,0xffeff47d);b=R4(b,c,d,a,X[i+1],21,0x85845dd1);a=R4(a,b,c,d,X[i+8],6,0x6fa87e4f);d=R4(d,a,b,c,X[i+15],10,0xfe2ce6e0);c=R4(c,d,a,b,X[i+6],15,0xa3014314);b=R4(b,c,d,a,X[i+13],21,0x4e0811a1);a=R4(a,b,c,d,X[i+4],6,0xf7537e82);d=R4(d,a,b,c,X[i+11],10,0xbd3af235);c=R4(c,d,a,b,X[i+2],15,0x2ad7d2bb);b=R4(b,c,d,a,X[i+9],21,0xeb86d391);a=add(a,aO);b=add(b,bO);c=add(c,cO);d=add(d,dO);}
return hex(a)+hex(b)+hex(c)+hex(d);}
function FMW_date_conv(_s){var month=new Array("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec");var b=_s.indexOf("(");var e=_s.lastIndexOf(")");var now=new Date(_s.substring(b+1,e));var d_s=month[now.getMonth()]+" "+now.getDate()+", "+now.getFullYear();return(_s.substring(0,b)+"("+d_s+")");}
var ErrMsg={"-99":"submit_err_unknow","-8":"submit_err_fmt","-7":"submit_err_fmw","-6":"submit_err_fmw","-5":"submit_err_fmw","-4":"submit_err_fmw","-3":"submit_err_fmw","-2":"submit_err_fmw","-1":"submit_err_sver","0":"submit_ok","1":"submit_ok","2":"submit_ok","4":"submit_rsok","8":"submit_fmwok"};function submit_again(){$('#p800ProgBar').show();$("#submit_again").hide();CloseModalURL();SubForm_Next(1);}
function RouterDetect(_cb_wait,_cb_done,_wait){rtobj=this;rtobj.cb_wait=(_cb_wait)?_cb_wait:null;rtobj.cb_done=(_cb_done)?_cb_done:null;rtobj.wait=_wait;rtobj.st=-1;rtobj.login=0;rtobj.loginescape=0;rtobj.admin='';rtobj.wanst=0;rtobj.timer=null;rtobj.timeouter=null;rtobj.nosec=0;rtobj.do_wait=function(err){if(rtobj.cb_wait)
return(rtobj.cb_wait(rtobj.st,err));else
return 0;};rtobj.stop=function(){rtobj.doing=0;clearTimeout(rtobj.timeouter);clearInterval(rtobj.timer);rtobj.timeouter=rtobj.timer=null;};rtobj.done=function(){rtobj.stop();if(rtobj.cb_done)rtobj.cb_done(rtobj.st);};rtobj.doing=1;rtobj.err=1;rtobj.startcheck=function(){try{$.getScript(pg_dir+RouterST_API,function(data,textStatus,jqxhr){rtobj.st=parseInt(RouterStatus.Status,10);rtobj.login=parseInt(RouterStatus.login,10);rtobj.loginescape=parseInt(RouterStatus.timout,10);rtobj.admin=RouterStatus.admin;if(parseInt(RouterStatus.cable,10)==0){rtobj.wanst=0;}else if(parseInt(RouterStatus.link,10)==0){rtobj.wanst=1;}else{rtobj.wanst=2;}
rtobj.nosec=parseInt(RouterStatus.nosec,10);rtobj.err=0;}).fail(function(jqxhr,settings,exception){});}catch(e){}
if(rtobj.doing)setTimeout(function(){rtobj.startcheck()},4*1000);};rtobj.docheck=function(){if(!rtobj.err&&rtobj.do_wait(rtobj.err)==1){rtobj.done();}};rtobj.run=function(){if(!rtobj.timer){rtobj.startcheck();}
rtobj.timer=setInterval(function(){rtobj.docheck();},1*1000);rtobj.timeouter=setTimeout(function(){if(rtobj.timeouter){rtobj.done();}},1000*rtobj.wait);};return rtobj;}
var detobj=null;function DUT_Alive(_done,_wait){if(detobj)detobj.stop();detobj=new RouterDetect(function(st,err){return((st==1)?1:0);},_done,_wait);detobj.run();}
var GUI802timer=null;function CheckDUTAlive(){if(access_from!=3){Show801();}else{if(top.G_option.cmd.indexOf("WIFI_SSID")!=-1){Show803();}else{Show802();}}}
function Show800(){ShowModalInfo('p800',function(){$("#p800Progress").css({width:'0'});var myclk=new Date();var checkstat=setInterval(function(){var o;var nowclk=new Date();var secs=top.G_option.wait-Math.ceil((nowclk-myclk)/1000);if(top.G_prog==99){var err=top.G_err;o=ErrMsg[''+err];if(!o){err=-99;ErrMsg[''+err];}
if(err<0){$('#p800ProgBar').hide();$("#p800Progress").stop();$("#submit_prg").hide();$("#submit_again").show();clearInterval(checkstat);}
if(access_from!=2&&top.G_svrip!=top.G_ip){pg_dir='http://'+top.G_ip+'/';top.G_URL=pg_dir;}}},1000);$("#p800Progress").animate({width:'100%'},top.G_option.wait*1000,function(){{if(top.G_err>=0){CheckDUTAlive();}}});subForm_T();});}
function Show801(){ShowModalInfo('p801',function(){setTimeout(function(){DUT_Alive(function(st){if(st==1){SubForm_Next(0);}else{setTimeout("Show801()",1*1000);}},15);},3*1000);});}
function Show802(){ShowModalInfo('p802',function(){SetWiFiSSID();setTimeout(function(){DUT_Alive(function(st){clearTimeout(GUI802timer);if(st==1){SubForm_Next(0);}else{Show804(0);}},30);},3*1000);});}
function Show803(){ShowModalInfo('p803',function(){SetWiFiSSID();setTimeout(function(){DUT_Alive(function(st){if(st==1){SubForm_Next(0);}else{Show804(1);}},30);},3*1000);});}
function Show804(flag){ShowModalInfo('p804',function(){SetWiFiSSID();DUT_Alive(function(st){if(st==1){SubForm_Next(0);}else{if(flag){ShowSUP5();}else{ShowSUP4();}}},30);});}
function ShowSUP4(){ShowContainerInfo("GUISupport4");var mainobj=getMainContainerObj();mainobj.hide();$('#Support4TryAgain').click(function(){window.scrollTo(0,0);Show802();});SetWiFiSSID();CloseModalURL();}
function ShowSUP5(){ShowContainerInfo("GUISupport5");var mainobj=getMainContainerObj();mainobj.hide();$('#Support5TryAgain').click(function(){window.scrollTo(0,0);Show803();});SetWiFiSSID();CloseModalURL();}
var rowcls=["","",""];function Table_add_row(tableid,rowary,_flag){var aCell,aRow,i,imgH;var aCols=parseInt(rowary[0][0],10);var aRowid=parseInt(rowary[0][1],10);var clsid=aRowid%2;var aRowF=parseInt(rowary[0][2],10)+aRowid;var rowcnt=0;var flag=1;var tb=document.getElementById(tableid);if("undefined"!=typeof(_flag))flag=_flag;if(null==tb){alert("ER:"+tableid);return 0;}
tb=tb.getElementsByTagName("tbody")[0];if(aRowF>tb.rows.length){aRowF=tb.rows.length;}
aRow=tb.insertRow(aRowF+rowcnt);for(i=0;i<rowary[1].length;i++){if(!rowary[1][i][0])break;aCell=aRow.insertCell(-1);if(rowary[1][i][0]!=1)
aCell.setAttribute("colSpan",rowary[1][i][0]);if(flag==1){aCell.className=rowcls[clsid];}
if(rowary[1][i].length>2){for(var x in rowary[1][i][2]){if(x=="className"){aCell.className=rowary[1][i][2][x];}else if(x.substr(0,6)=="style."){eval('aCell.'+x+'="'+rowary[1][i][2][x]+'"');}else{aCell.setAttribute(x,rowary[1][i][2][x]);}}}
aCell.innerHTML=rowary[1][i][1];}
rowcnt++;return rowcnt;}
function Table_del_row(tableid,rowidx,rowcount,_flag){var tb=document.getElementById(tableid);if(null==tb){alert("ER:"+tableid);return 0;}
tb=tb.getElementsByTagName("tbody")[0];if(_flag){while(tb.rows.length>rowidx){tb.deleteRow(-1);}}else{for(var i=0;i<rowcount,tb.rows.length>rowidx;i++)
tb.deleteRow(rowidx);}}
function Table_get_rows(tableid){var tb=document.getElementById(tableid);if(null==tb)return 0;return tb.getElementsByTagName("tbody")[0].rows.length;}
function Table_del_rowid(tableid,rowid){var tbobj=document.getElementById(tableid);if(!tbobj)return;for(var x=0;x<tbobj.rows.length;x++){if(tbobj.rows[x]&&tbobj.rows[x].id&&(tbobj.rows[x].id==rowid)){tbobj.deleteRow(x);break;}}}
var WANLNKST={'2':['online','gtOnline'],'1':['offline2','gtOffline'],'0':['offline','gtDisconnected']};var ADMINST={'0':['locked','gtLocked'],'1':['unlocked','gtUnlocked']};function ShowWANState(flag,first){var my_wait=10;if(top.G_wan_timer){clearTimeout(top.G_wan_timer);top.G_wan_timer=null;}
if(((top.G_prog==0)&&(top.G_boot==0))||flag){var detobj=RouterDetect(function(st,err){if(err){return 1;}
ShowTopBanner(detobj,first);return 1;},null,10);detobj.run();my_wait=5;}
if(!flag)
top.G_wan_timer=setTimeout("ShowWANState()",my_wait*1000);}
function isLogin(){if(top.G_login>=1){return LOGIN_ALREADY;}else if(top.G_login==LOGIN_DUPLICATE){return LOGIN_DUPLICATE;}else if(top.G_login!=-99){if(top.G_nosec==1){return LOGIN_ALREADY;}
return LOGIN_NEED;}else{return LOGIN_UNKNOW;}}
function isEmptyPass(){return top.G_nosec;}
var G_auto=1;function Autologout(flag){G_auto=flag;}
function isAutologout(){return G_auto;}
function showLogin(_url){window.scrollTo(0,0);top.G_prog=1;top.G_option.next=_url;Autologout(0);ShowModalInfo('p1210',function(){Login_init();$("#p1210Password").focus();});}
var G_login_Err=null;var G_login_done=null;var G_logout_done=null;function do_Login(_pwd,_errcb,_done){var pwd=calcMD5(_pwd);var newElem=document.getElementById("OUTLogin");if(!newElem){newElem=document.createElement("div");newElem.id="OUTLogin";newElem.innerHTML='<form action="/cgi-bin/login.exe" method="post" name="dologin" target="OUTfrm">'+'<input type="hidden" name="GO" value="loginok.htm">'+'<INPUT type="hidden" name="CSRFID" value="'+mmm+'">'+'<input type="hidden" name="pws" value="">'+'</form>';document.body.appendChild(newElem);}
top.G_login=-99;var f=document.dologin;f.action="/login.cgi";f.pws.value=pwd;if(document.URL.indexOf("file:")!=-1){f.action=f.GO.value;}
G_login_Err=_errcb;G_login_done=_done;if(("undefined"!=typeof(DBGf))&&DBGf){var dbg=getFormField(f);if(!confirm(dbg))return false;}
f.submit();setTimeout("chk_loginOk()",2*1000);return false;}
function chk_loginOk(){top.G_prog=0;if(isLogin()==LOGIN_UNKNOW){setTimeout("chk_loginOk()",1*1000);}
if(isLogin()!=LOGIN_ALREADY){top.G_login=-1;if(G_login_Err){G_login_Err();G_login_Err=null;}}else{if(G_login_done){G_login_done();G_login_done=null;}else{JumpTo(top.G_option.next);}}}
var G_remove_Err=null;var G_remove_done=null;var errflag=null;function do_Removepwd(_pwd,_errcb,_done){var pwd=calcMD5(_pwd);$.post("removepwd.cgi",{pws:pwd,CSRFID:mmm},chk_removepwdOk,"Script");G_remove_Err=_errcb;G_remove_done=_done;return false;}
function chk_removepwdOk(){if((errflag==1)&&G_remove_Err)
{G_remove_Err();G_remove_Err=null;}
else if(errflag==0)
{if(G_remove_done)
{G_remove_done();G_remove_done=null;}
else
JumpTo("tl_sys.htm",0);}}
function do_Logout(_okcb){if(isLogin()!=LOGIN_ALREADY)return false;HideMainBody();var newElem=document.getElementById("OUTLogout");if(!newElem){newElem=document.createElement("div");newElem.id="OUTLogin";newElem.innerHTML='<form action="/cgi-bin/logout.exe" method="post" name="dologout" target="OUTfrm">'+'<input type="hidden" name="GO" value="loginpserr.htm">'+'</form>';document.body.appendChild(newElem);}
top.G_login=-99;var f=document.dologout;f.action="/logout.cgi";if(document.URL.indexOf("file:")!=-1){f.action=f.GO.value;}
G_logout_done=_okcb;if(("undefined"!=typeof(DBGf))&&DBGf){var dbg=getFormField(f);if(!confirm(dbg))return false;}
f.submit();setTimeout("chk_logoutOk()",3*1000);return false;}
function chk_logoutOk(){top.G_prog=0;if(isLogin()==LOGIN_UNKNOW){setTimeout("chk_logoutOk()",1*300);}
if(G_logout_done){G_logout_done();G_logout_done=null;}else{JumpTo(MAIN_PG,0);}}
function showSetPasswd(){window.scrollTo(0,0);top.G_prog=1;Autologout(0);ShowModalInfo('p1201',function(){Login_init();$("#p1201Password").focus();});}
function showRemovePasswd(){window.scrollTo(0,0);top.G_prog=1;Autologout(0);ShowModalInfo('passwordRemove',function(){$('#errpwdrempt,#errpwdrerror').hide();$("#p1240Password").val('').focus();});}
function do_setLogin(_pwd,_cb){addCfg("usrpwd",usrky,'xx');setCfg("usrpwd",calcMD5(_pwd));var newElem=document.getElementById("OUTSetpwd");if(!newElem){newElem=document.createElement("div");newElem.id="OUTSetpwd";newElem.innerHTML='<form name="dosetpwd"></form>';document.body.appendChild(newElem);}
var f=document.dosetpwd;return subForm({frm:f,cmd:"CONF_PASWD",wait:4,wizard:1,done:function(){top.G_prog=0;Autologout(1);ShowWANState(1);_cb();}});}
function chk_islogin(){var chk=isLogin();if((chk==LOGIN_DUPLICATE)||(chk!=LOGIN_ALREADY)){if(("undefined"==typeof(G_BBS))&&(cPage!=MAIN_PG)){SetDefPg(cPage);SetNLogin();window.location=MAIN_PG;return 0;}else{showLogin(cPage);return 0;}}
return 1;}
function do_loginout(){if(isLogin()==LOGIN_DUPLICATE){showDuplicate();}else if(isLogin()==LOGIN_ALREADY){if(top.G_nosec==1){showSetPasswd();}else{do_Logout(null);}}else{showLogin(cPage);}
return false;}
function showDuplicate(){window.scrollTo(0,0);setIdVal("adminip",G_adminip);ShowModalInfo('p1220');Autologout(0);}
/*END_JS_PACKER*/