
$W=function(a){document.write(a);};$I=function(a){return document.getElementById(a);};var cgi_lang_list="EN NL FR ES DE IT CN TW TR PT RU EL SV NO DA FI BR MX CA";top.m_ap_mode=1-parseInt('0'+'<%CFG_GET(RT_EN);%>');var access_from=parseInt('0'+'<%CGI_ACCESS_FROM();%>');top.m_from_wan=(access_from==2);var pc_lang='<%CGI_LANG_ACCEPT();%> en-us';var usrky="<% CFG_ID(SYS_PASSWD);%>";var G_adminip="<%CGI_LOGIN_ADMIN(0);%>";var G_ip=G_svrip="<% CFG_GET(LAN_IP);%>";var lang_set='<% CFG_GET(SYS_LANG_ID);%>';var WIFI_BAND=1;var PPTP_SUPPORT=0;var PPTP_SUPPORT=1;var MAIN_PG="dashboard.htm";var MAIN_HELP="http://www.belkin.com/support/";/*JS_PACKER*/function GetCookie(c_name){var i,x,y,co=document.cookie.split(";");var clen=co.length;for(i=0;i<clen;i++){x=co[i].substr(0,co[i].indexOf("="));y=co[i].substr(co[i].indexOf("=")+1);x=x.replace(/^\s+|\s+$/g,"");if(x==c_name){return unescape(y);}}
return null;}
function SetCookie(name,value){var expires=new Date();var path="/";var domain=null;var secure=null;expires.setTime(expires.getTime()+(365*24*60*60*1000));document.cookie=name+"="+escape(value)+((expires==null)?"":("; expires="+expires.toGMTString()))+((path==null)?"":("; path="+path))+((domain==null)?"":("; domain="+domain));}
function DeleteCookie(name){exp=new Date();exp.setTime(exp.getTime()-1);var cval=GetCookie(name);document.cookie=name+"="+cval+"; expires="+exp.toGMTString();}
function SetMenuexp(_pg){SetCookie("menuexp",''+_pg);}
function GetMenuexp(){var _pg=GetCookie("menuexp")=='1'?1:0;return _pg;}
function SetDefPg(_pg){SetCookie("defpg",_pg);}
function GetDefPg(){var _pg=GetCookie("defpg");SetDefPg("");return _pg;}
function SetNLogin(_do){SetCookie("dologin",_do);}
function GetNLogin(){var _do=GetCookie("dologin");SetNLogin("");return _do;}
function SetTags(_tg){SetCookie("tag",_tg);}
function GetTagObj(){var _tg=GetCookie("tag");SetTags("");var obj={tag:(_tg=="")?null:_tg,is:function(_t){return(_t==this.tag);}};return obj;}
function GetUIObj(){var _tg=GetCookie("ui");var obj={tag:(_tg=="")?null:_tg,is:function(_t){return(_t==this.tag);}};SetUIObj('');return obj;}
function SetUIObj(_tg){SetCookie("ui",_tg);}
function setBoot(_boot){SetCookie("boot",_boot);}
function getBoot(){var _boot=GetCookie("boot");setBoot("");return(_boot=="")?null:_boot;}
function SetMode(_mod){SetCookie("mod",_mod);}
function GetMode(){var _mod=GetCookie("mod");return(_mod=="")?null:_mod;}
function SetHash(_f){SetCookie("hash",_f);}
function GetHash(){var _f=GetCookie("hash");SetHash("");return(_f=="")?null:_f;;}
function setNoQoS(){SetCookie("noqos",1);}
function getNoQoS(){var _qos=GetCookie("noqos");return(_qos=="")?null:_qos;}
function setWQoS(){SetCookie("noqos","");}
function setNoUSB(){SetCookie("usb_later_set",1);}
function getNoUSB(){var _usb=GetCookie("usb_later_set");return(_usb=="")?null:_usb;}
function setWUSB(){SetCookie("usb_later_set","");}
function setNoPWD(){SetCookie("nopwd","1");}
function getNoPWD(){var _pwd=GetCookie("nopwd");return(_pwd=="")?null:_pwd;}
function setWPWD(){SetCookie("nopwd","");}
function isDashboard(){return("undefined"==typeof(G_BBS));}
function inet_ntop(a){var i=0,m='',c=[];a+='';if(a.split(":").length==8){ktmp=a.replace(/((^|:)0{1,4}(?=:|$))+:?/g,function(t){m=(t.split(":").length>m.split(":").length)?t:m;return t;}).replace(m||'0000','::');return ktmp;}else{return null;}}
function inet_pton(a){var r,m,x,i,j,f=String.fromCharCode;m=a.match(/^(?:\d{1,3}(?:\.|$)){4}/);if(m){m=m[0].split('.');m=f(m[0])+f(m[1])+f(m[2])+f(m[3]);return m.length===4?m:false;}
r=/^((?:[\da-fA-F]{1,4}(?::|)){0,8})(::)?((?:[\da-fA-F]{1,4}(?::|)){0,8})$/;m=a.match(r);if(a.split(":").length<8&&a.search("::")==-1){return null;}
if(m){var tmplen=[];for(j=1;j<4;j++){if(j===2||m[j].length===0){tmplen[j]=0;continue;}
tmplen[j]=m[j].split(':').length;}
x=tmplen[1]+tmplen[3];if(x==8){return m[1]+m[3];}else if(x<8&&m[2].length>0){if(m[1]==0){return m[1]+(new Array(8-x+1)).join('0000:')+m[3];}else if(m[3]==0){return m[1]+(new Array(8-x+1)).join(':0000')+m[3];}else{return m[1]+(new Array(8-x+1)).join(':0000')+":"+m[3];}}}
return null;}
var CFG_SP=";";function Cfg(i,n,v){this.i=i;this.n=n;this.v=this.o=v;this.x=0;}
var CA=new Array();function addCfg(n,i,v){var idx=idxOfCfg(n);if(idx<0){CA[CA.length]=new Cfg(i,n,HTML2str(v));}else{CA[idx].o=CA[idx].v=HTML2str(v);}}
function idxOfCfg(kk){if(kk=='undefined'){alert("undefined");return-1;}
if(!CA){return-1;}
for(var i=0;i<CA.length;i++){if(CA[i].n!='undefined'&&CA[i].n==kk){return i;}}
return-1;}
function getCfg(n){var idx=idxOfCfg(n);var v="";if(idx>=0){v=CA[idx].v;}
return v;}
function syncCfg(n,v){var idx=idxOfCfg(n);if(idx>=0){var _v=CA[idx].v;if("undefined"!=typeof(v))_v=HTML2str(v);CA[idx].v=CA[idx].o=_v;}}
function getCfgInt(n){var v=getCfg(n);v=v?v:0;return parseInt(v,10);}
function getCfgFloat(n){var v=getCfg(n);v=v?v:0;return parseFloat(v);}
function getCfgIP(n){var ip=[0,0,0,0];var v=getCfg(n);if(v){ip=v.split(".");for(var i=0;i<4;i++){ip[i]=parseInt(ip[i],10);}}
return ip;}
function getCfgMAC(n){var mac=":::::";var v=getCfg(n);if(v){mac=v;}
return mac.split(":");}
function getCfgV6(n){var v=null,ip6=":::::::";var l=8;var idx=idxOfCfg(n);if(idx>=0){v=CA[idx].v;}
tmp=inet_pton(v);if((tmp!=null)&&(tmp.split(":").length==8)){ip6=tmp;l=tmp.length;}
CA[idx].x=1;return ip6;}
function setCfg(n,v){var idx=idxOfCfg(n);if(idx>=0){if("object"!=typeof(v)){if(CA[idx].x==1){setCfgV6(n,v);}else{CA[idx].v=''+v;}}else{CA[idx].v=v.join(CFG_SP);}
return CA[idx].v;}
return null;}
function setCfgV6(n,v){var idx=idxOfCfg(n);if(idx>=0){if("object"!=typeof(v)){var ip6Tmp=inet_ntop(v);if(ip6Tmp!=null){CA[idx].v=ip6Tmp;}else{CA[idx].v=''+v;}
CA[idx].x=1;}}}
function getCfgID(n){var idx=idxOfCfg(n);return(idx>=0)?CA[idx].i:0;}
function getCfgObj(n){var idx=idxOfCfg(n);return(idx>=0)?CA[idx]:null;}
function setCfgObj(n,cfgobj){var idx=idxOfCfg(n);if(idx>=0){CA[idx].i=cfgobj.i;CA[idx].n=cfgobj.n;CA[idx].v=cfgobj.v;CA[idx].o=cfgobj.o;CA[idx].x=cfgobj.x;}}
function cpyCfg(_frm,_to){var frm=idxOfCfg(_frm);var to=idxOfCfg(_to);if((frm>=0)&&(to>=0)){CA[to].i=CA[frm].i;CA[to].n=CA[frm].n;CA[to].v=CA[frm].v;CA[to].o=CA[frm].o;CA[to].x=CA[frm].x;}}
function getCfgAry(n,sz){var v=[];var s=getCfg(n);if(s){s=s.replace(/[\%]3B/g,";");v=s.split(CFG_SP);if(sz){s='';if(v.length>sz){for(var i=v.length-1;i>(sz-1);i--){s=';'+v[i]+s;v.splice(i);}
v[sz-1]+=s;}}
for(var i=0;i<v.length;i++){v[i]=unescape(v[i]);}
return v;}
return null;}
function setCfgAry(n,ar){var o=getCfg(n);var n=setCfg(n,ar);return(o==n)?0:1;}
function chkCfg(n){var idx=idxOfCfg(n);if(idx>=0)return(CA[idx].o!=CA[idx].v)?1:0;}
function combinIP2(d){if(d.length!=4)return d.value;var ip=d[0].value+"."+d[1].value+"."+d[2].value+"."+d[3].value;if(ip=="...")
ip="";return ip;}
function combinMAC2(m){var mac=m[0].value+":"+m[1].value+":"+m[2].value+":"+m[3].value+":"+m[4].value+":"+m[5].value;mac=mac.toUpperCase();if(mac==":::::")
mac="";return mac;}
function combinIPV6(d){var ip='';var a=0;var n=d.length;if((n!=4)&&(n!=8))return d.value;for(var i=0;i<n;i++){ip+=(i!=0)?":":"";if((d[i].value=="0000")||(d[i].value==""))a++;ip+=d[i].value;}
if(a==n)ip="";return ip;}
function cfg2Form(f){for(var i=0;i<CA.length;i++){try{var e=eval('f.'+CA[i].n);if(e){if(e.name=='undefined')continue;if(e.length&&e[0].type=='text'){if(e.length==4){if(decomIPv6(e,(CA[i].v))){CA[i].x=1;}else{decomIP2(e,CA[i].v);}}else if(e.length==6){decomMAC2(e,CA[i].v);}
else if(e.length==8){decomIPv6(e,(CA[i].v));CA[i].x=1;}}else if(e.length&&e[0].type=='radio'){setIdVal(0,CA[i].v,e);}else{setIdVal(0,(CA[i].v),e);}}}catch(e){};}}
function decomMAC2(ma,macs,nodef){var re=/^[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}$/;var d=['','','','','',''];if(re.test(macs)||macs==''){if(ma.length!=6){setIdVal(0,macs,ma);return true;}
if(macs!=''){d=macs.split(":");}
for(i=0;i<6;i++){setIdVal(0,d[i],ma[i]);}
return true;}
return false;}
function decomIP2(ipa,ips,nodef){var re=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;if(re.test(ips)){var d=ips.split(".");var i=0;for(i=3;i>=0;i--){setIdVal(0,d[i],ipa[i]);}
return true;}
return false;}
function decomIPv6(ipa,ips,nodef){var v;var d=ips.split(":");var n=d.length;if((n!=4)&&(n!=8))return false;var i=0;for(i=(n-1);i>=0;i--){if(d[i]=="")d[i]="0000";setIdVal(0,d[i],ipa[i]);}
return true;}
var frmExtraElm='';function addFormElm(n,v){var set1='<input type=hidden name='+n+' value="'+str2HTML(v)+'">\n';frmExtraElm+=set1;}
function form2Cfg(f){for(var i=0;i<CA.length;i++){if(CA[i].i==0)continue;try{var e=eval('f.'+CA[i].n);if(e){if(e.disabled)continue;if(e.length&&e[0].type=='text'){if(e.length==4){if(CA[i].x){CA[i].v=combinIPV6(e);}else{CA[i].v=combinIP2(e);}}
else if(e.length==6){CA[i].v=combinMAC2(e);}
else if(e.length==8){CA[i].v=combinIPV6(e);}}else if(e.length&&e[0].type=='radio'){for(var j=0;j<e.length;j++){if(e[j].checked){CA[i].v=e[j].value;break;}}}else if(e.type=='checkbox'){setCfg(e.name,(e.checked)?e.value:1-Number(e.value));}else{setCfg(e.name,e.value);}}}catch(e){}}}
function formChkCfg(f){for(var i=0;i<CA.length;i++){try{var e=f.elements[CA[i].n];if(e){if(e.disabled)continue;if(e.length&&e[0].type=='text'){if(e.length==4){if(CA[i].x){if(CA[i].o!=combinIPV6(e))return 1;}else{if(CA[i].o!=combinIP2(e))return 1;}}
else if(e.length==6){if(CA[i].o!=combinMAC2(e))return 1;}
else if(e.length==8){if(CA[i].o!=combinIPV6(e))return 1;}}else if(e.length&&e[0].type=='radio'){for(var j=0;j<e.length;j++){if(e[j].checked){if(CA[i].o!=e[j].value)return 1;}}}else if(e.type=='checkbox'){if(CA[i].o!=((e.checked)?e.value:1-Number(e.value)))return 1;}else{if(CA[i].o!=e.value)return 1;}}}catch(e){}}
return 0;}
var OUTF='';var OUTF_sub=0;var mmm=0;function frmHead(na,to,cmd,go){OUTF="<FORM name="+na+" action="+to+" target='OUTfrm' method=POST >\n"+"<INPUT type=hidden name='CMD' value='"+cmd+"'>\n"+"<INPUT type=hidden name='GO' value='"+go+"'>\n";}
function frmEnd(){OUTF+="</FORM>\n";}
function frmAdd(n,v){set1="<input type=hidden name='"+n+"' value=\"";v=v.replace(/\"/g,"&quot;");var r=new RegExp(set1+".*\n","g");if(OUTF.search(r)>=0)
OUTF=OUTF.replace(r,(set1+v+"\">\n"));else
OUTF+=(set1+v+"\">\n");}
function addFieldValue(f,v,n){var newElem=document.createElement("input");newElem.name=n;newElem.type="hidden";newElem.value=str2HTML(v);if(f.firstChild){f.insertBefore(newElem,f.firstChild);}else{f.appendChild(newElem);}}
function addSectionId(f){if(!f.CSRFID){addFieldValue(f,mmm,"CSRFID");}else{f.CSRFID.value=mmm;}}
function genForm(n,to,cmd,g){var sub=0;frmHead(n,to,cmd,g);for(var i=0;i<CA.length;i++){if(CA[i].i==0)continue;if(CA[i].v!=CA[i].o){frmAdd("SET"+sub,String(CA[i].i)+"="+str2HTML(CA[i].v));sub++;}}
OUTF_sub=sub;if(frmExtraElm.length){OUTF+=frmExtraElm;}
frmExtraElm='';frmEnd();return OUTF;}
function check_FrmUpdate(){var sub=0;for(var i=0;i<CA.length;i++){if(CA[i].i==0)continue;if(CA[i].v!=CA[i].o){sub++;}}
return sub;}
function subForm_T(){if(top.G_option.frm){top.G_option.frm.submit();top.G_option.frm=null;top.G_prog=3;}}
var G_en=[1,1,1];var G_ssid=['','',''];var G_key=['','',''];var G_sc=['','',''];var wifi_TID={"Network24SSID":"G_ssid[0]","Network24Passkey":"G_key[0]"};function SetWiFiSSID(){if(G_en[0]==0){for(var x in wifi_TID){wifi_TID[x]=wifi_TID[x].replace('0','1');}}
$("*[tid]").each(function(index){$(this).find("*[tid]").each(function(index){var tid=$(this).attr("tid");if(wifi_TID[tid]){$(this).text(eval(wifi_TID[tid]));}});});}
function SubForm_Next(flag){top.G_prog=0;top.G_option.wizard=0;if(flag){top.G_boot=0;return false;}else{if(top.G_URL){setTimeout(function(){top.location.href=top.G_URL;},1000);}else{if(top.G_option.done){top.G_option.done();}else{window.location=URLTimeStamp(top.G_option.next);}}}
return false;}
function subForm_Prog(){if(top.G_option.wizard!=1){Show800();}else{subForm_T();var checkstat=setInterval(function(){if(top.G_prog==99){clearInterval(checkstat);setTimeout("SubForm_Next(0)",top.G_option.wait*1000);}},1000);}}
top.G_option={next:'',genfrm:1,wizard:0,wait:0,cmd:"",done:null,frm:null,bypass:0};top.G_prog=0;top.G_boot=0;top.G_err=0;top.G_errmsg="";top.G_wan_st=-1;top.G_login=-99;top.G_ntp=0;top.G_pic=0;top.G_nosec=0;function subForm(_option){var msg="";var to="/apply.cgi";top.G_option.genfrm=1;top.G_option.wizard=0;top.G_option.wait=10;top.G_option.cmd="";top.G_option.next=cPage;top.G_option.done=null;top.G_option.frm=null;top.G_option.bypass=0;for(var x in _option){for(var y in top.G_option){if(y==x){top.G_option[y]=_option[x];break;}}}
if(document.URL.indexOf("file:")!=-1){to=pg_dir+"javascripts/do_cmd.htm";}
if(top.G_option.genfrm==1){msg=genForm('OUT',to,top.G_option.cmd,top.G_option.next);}else{OUTF_sub=1;}
top.G_err=0;var newElem=$I("OUTdiv");if(!newElem){newElem=document.createElement("div");newElem.id="OUTdiv";newElem.width="100%";document.body.appendChild(newElem);}
newElem.innerHTML=msg;if(top.G_option.genfrm){top.G_option.frm=document.OUT;}else{top.G_option.frm=top.G_option.frm;}
addSectionId(top.G_option.frm);top.G_prog=1;setTimeout("subForm_Prog()",400);return false;}
function getAttribVal(obj,att){var v=null;var n=att.toLowerCase();for(var x=0;x<obj.attributes.length;x++){if(obj.attributes[x].nodeName.toLowerCase()==n){return(obj.attributes[x].nodeValue);}}
return null;}
function getFieldValue(Obj){if(!Obj)return'';var typ=Obj.type;if(!typ&&Obj.length){typ=Obj[0].type;}
switch(typ){case"radio":case"checkbox":if(Obj.length){for(var j=0;j<Obj.length;j++){if(Obj[j].checked)return Obj[j].value;}}else{if(Obj.checked)return Obj.value;}
if(typ=="checkbox"){return getAttribVal(Obj,"nocheck");}
return null;break;case"select-one":case"select-multiple":for(var j=0;j<Obj.options.length;j++){if(Obj.options[j].selected){return(Obj.options[j].value);}}
return null;break;case"password":case"textarea":case"text":case"hidden":default:return Obj.value;break;}}
function getFieldIntVal(obj){var v=getFieldValue(obj);if(v!=null)
return parseInt(v,10);}
function setIdVal(_id,val,fieldObj,dbg){var ElemObj,cElemObj;var str,txt;if(fieldObj){ElemObj=fieldObj;var newElemObj=ElemObj.parentNode;var typ=ElemObj.type;if(!typ&&ElemObj.length){typ=ElemObj[0].type;newElemObj=ElemObj[0].parentNode;}
switch(typ){case"radio":case"checkbox":txt='';if(ElemObj.length){for(var j=0;j<ElemObj.length;j++){ElemObj[j].checked=ElemObj[j].defaultChecked=(ElemObj[j].value==val);if(ElemObj[j].checked){cElemObj=ElemObj[j];}}
if(!cElemObj)cElemObj=ElemObj[0];}else{ElemObj.checked=ElemObj.defaultChecked=(ElemObj.value==val);cElemObj=ElemObj;}
txt=ElemObj.innerHTML;_id=cElemObj.id;if(_id){str=getLangM(_id);if(str){txt=str;}}
break;case"select-one":case"select-multiple":var findIdx=0;txt='-';for(var j=0;j<ElemObj.options.length;j++){ElemObj.options[j].selected=ElemObj.options[j].defaultSelected=(ElemObj.options[j].value==val);if((ElemObj.options[j].value==val)==true){findIdx=1;ElemObj.options.selectedIndex=j;}}
if(!findIdx&&(ElemObj.options.length!=0)){ElemObj.options.selectedIndex=0;ElemObj.options[0].selected=ElemObj.options[0].defaultSelected=true;}
break;case"password":case"textarea":case"text":case"hidden":ElemObj.defaultValue=ElemObj.value=val;break;case"button":case"submit":ElemObj.value=val;break;default:ElemObj.innerHTML=val;break;case"file":break;}}else{if("object"==typeof(_id)){ElemObj=_id;}else{ElemObj=document.getElementById(_id);}
if(ElemObj){if(ElemObj.type=="button"||ElemObj.type=="submit"||ElemObj.type=="text"||ElemObj.type=="password"){ElemObj.value=val;}else{ElemObj.innerHTML=val;}}}
return 1;}
function SetFieldValue(ElemObj,val){setIdVal(0,val,ElemObj);}
function fromCfg(elm,cfg){SetFieldValue(elm,getCfg(cfg));}
function getQueryValue(name){var v=null;var query=location.search;if(name.charAt(0)=="#"){query=location.href;if(query.indexOf(name)!=-1){return 1;}
return 0;}
if(query=="")return"";if(query.charAt(0)=="?"){query=query.substring(1);}
var arr=query.split(/[\&]/);name=name+"=";var index;for(var x=0;x<arr.length;x++){index=arr[x].indexOf(name);if(index!=0)continue;return arr[x].substr(name.length,arr[x].length);}
return v;}
function getIntQueryValue(_name,_def){var r;var q=getQueryValue(_name);if(q=='')r=_def;else r=parseInt('0'+q,10);return r;}
function setQueryValue(_name,_val,_s)
{var q=location.search;if(null!=_s)q=_s;q=q.replace(/^.*[\?]/,"");return mergeQueryValue("?"+q,"?"+_name+"="+_val,0);}
function mergeQueryValue(_q1,_q2,_q1_first){var q1=_q1;var q2=_q2;var rtn="";var x,y;if((x=q1.indexOf("?"))!=-1){q1=q1.substr(x+1,q1.length);}else{q1="";}
if((x=q2.indexOf("?"))!=-1){q2=q2.substr(x+1,q2.length);}else{q2="";}
if((q1.length==0)||(q2.length==0))
return(q1+q2);var arr1=q1.split(/[\&]/);var arr2=q2.split(/[\&]/);var lookup={};if(_q1_first==0){for(x=0;x<arr1.length;x++){arr1[x]=arr1[x].split("=");lookup[arr1[x][0]]=arr1[x][1];}}
for(x=0;x<arr2.length;x++){arr2[x]=arr2[x].split("=");lookup[arr2[x][0]]=arr2[x][1];}
if(_q1_first==1)
{for(x=0;x<arr1.length;x++){arr1[x]=arr1[x].split("=");lookup[arr1[x][0]]=arr1[x][1];}}
rtn="";for(var x in lookup){rtn+="&"+x+"="+lookup[x];}
rtn=rtn.substring(1);return rtn;}
function HTML2str(_str){var v=_str.toString();v=v.replace(/\%/g,"%25");return unescape(decodeURI(v));}
var noC=[":",",",".","-",";"];function str2HTML(_str){var v=encodeURI(escape(_str));var h;for(var x in noC){h=(noC[x].charCodeAt(0)).toString(16);v=v.replace(eval("RegExp(/%"+h+"/ig)"),noC[x]);}
v=v.replace(eval("RegExp(/[\+]/ig)"),"%2B");v=v.replace(/\%25/g,"%");v=v.replace(/[\.]/g,"%2E");return v;}
function getObj(_obj,_attr,_val){var a={t:0,o:_obj};var ok=1;if("string"==typeof(_obj)){a={t:1,o:$('#'+_obj)};ok=(a.o&&a.o.length)?1:0;}
return(a.o&&ok)?a:null;}
function isDisplayObject(_obj){var e;if((e=getObj(_obj))){if(e.t)
return(e.o.css('display')!="none");else{return(e.o.style.display!="none");}}}
function DisplayObject(_obj){var e;if((e=getObj(_obj))){if(e.t)
e.o.show();else{e.o.style.display="";e.o.style.visibility="visible";}}}
function HiddenObject(_obj){var e;if((e=getObj(_obj))){if(e.t){e.o.hide();}else{e.o.style.display="none";e.o.style.visibility="hidden";}}}
function DisableObject(_obj){var e;if((e=getObj(_obj))){if(e.t){if(e.o.attr('href')){NoClick(_obj);}
e.o.attr('disabled','disabled');}else{e.o.disabled=true;}}}
function EnableObject(_obj){var e;if((e=getObj(_obj))){if(e.t){if(e.o.attr('href')){AllowClick(_obj);}
e.o.removeAttr('disabled');}else{e.o.disabled=false;}}}
function ReadOnly(_obj){var e;if((e=getObj(_obj))){if(e.t){if(e.o.attr('href')){NoClick(_obj);}
e.o.attr('readonly',true);}else{e.o.disabled=true;if(e.o.nodeName.toUpperCase()=="A"){NoClick(e.o.id);}else{if(e.o.type!="button"){e.o.style.backgroundColor="#ECEAE4";}}}}}
function WriteAllow(_obj){var e;if((e=getObj(_obj))){if(e.t){if(e.o.attr('href')){AllowClick(_obj)}
else{e.o.removeAttr("readonly")}}else{e.o.disabled=false;if(e.o.nodeName.toUpperCase()=="A"){AllowClick(e.o.id);}else if(e.o.type!="button"){e.o.style.backgroundColor="#ffffff";}}}}
function ShowMainBody(){if(!isDisplayObject("mainbody"))dev_debug(cPage);DisplayObject("mainbody");}
function HideMainBody(){HiddenObject("mainbody");}
function getFunctionName(fn){var rgx=/^function\s+([^\(\s]+)/;var matches=rgx.exec(fn.toString());return(matches?matches[1]:"(anonymous)");}
var NO_CLICK="no_HyperClick";function hyper_bind(){$('a').each(function(){var jobj=$(this);var exists=false;if(jobj.data('events')!=undefined){var event=jobj.data('events')['click'];if(event!==undefined){$.each(event,function(i,handler){if(getFunctionName(handler.handler)!=NO_CLICK){jobj.data('oclick',handler);jobj.unbind('click');jobj.bind('click',no_HyperClick);}});}}});}
function no_HyperClick(e){var fn,obj=$(this);if(obj.attr('disabled')){return false;}
if((fn=obj.data('oclick'))){this.myclick=fn.handler;this.myclick(e);}
return false;}
function NoHyperLink(_obj){var e;if((e=getObj(_obj))){if(e.t){e.o=$I(_obj);}
var obj=e.o.parentNode;var lnk=obj.getElementsByTagName('a');for(var i=lnk.length-1;i>=0;i--){var h=document.createElement("font");h.innerHTML=lnk[i].innerHTML;obj.replaceChild(h,lnk[i]);}}}
function NoClick(_obj){var e;if((e=getObj(_obj))){if("undefined"==typeof(e.o.attr('nohyper'))){if(e.o.attr('onclick')){e.o.attr('nohyper',e.o.attr('onclick'));}else{e.o.attr('nohyper','true');}
e.o.attr('onclick','return false;');}}}
function AllowClick(_obj){var e;if((e=getObj(_obj))){if(e.o.attr('nohyper')){e.o.attr('onclick',e.o.attr('nohyper'));e.o.removeAttr('nohyper');}}}
function URLTimeStamp(url){if(!url)return;var tt=new Date().getTime();var s="";var i=url.indexOf("?");if(i!=-1){s=url.substring(i);url=url.substring(0,i);}
url=url+"?"+setQueryValue("t",tt,s);return(url);}
function ConvertUrl(url){var timestamp=(new Date()).valueOf();if(url.indexOf("?")>=0)
{url=url+"&t="+timestamp;}
else
{url=url+"?t="+timestamp;}
return url;}
function JumpTo(_url,_chk){var do_chk=1;_url=ConvertUrl(_url);if("undefined"!=typeof(_chk))do_chk=_chk;if("undefined"!=typeof(G_NO_LOGIN))do_chk=0;if(top.G_nosec==1)do_chk=0;if(!do_chk||(isLogin()==LOGIN_ALREADY)){SetDefPg(_url);window.location=_url;}else{if(isLogin()==LOGIN_DUPLICATE){showDuplicate();}else{showLogin(_url);}}
return false;}
function ISPJump(_url){var k=1;var re=RegExp('([0-9]+)','i');if(re.test(_url)){var col=re.exec(_url);k=col[1];_url=_url.replace(k,'');}
SetHash(k);if(isDashboard())
_url='FWGUI_'+_url;JumpTo(_url);return false;}
var Lang_List=cgi_lang_list.split(" ");var LANG_ID=0;var LANG_DESC=1;var LANG_CHAR=2;var LANG_ACCP=3;var Lang={0:["EN",'English',"utf-8",["en"]],1:["NL",'Nederlands',"utf-8",["nl"]],2:["FR",'Fran&#xe7;ais (France)',"utf-8",["fr"]],3:["ES",'Espa&#xf1;ol',"utf-8",["es"]],4:["DE",'Deutsch',"utf-8",["de"]],5:["IT",'Italiano',"utf-8",["it"]],6:["CN",'&#x4e2d;&#x6587;&#xff08;&#x7b80;&#x4f53;&#xff09;',"utf-8",["zh-Hans","zh-cn","zh"]],7:["TW",'&#x4e2d;&#x6587;&#xff08;&#x7e41;&#x9ad4;&#xff09;',"utf-8",["zh-Hant","zh-tw","zh-hk","zh-mo"]],8:["JP",'&#26085;&#26412;&#35486;',"utf-8",["ja"]],9:["KO",'&#xD55C;&#xAD6D;&#xC758;',"euc-kr",["ko"]],10:["TR",'T&#xfc;rk',"utf-8",["tr"]],11:["PT",'Portugu&#xea;s',"utf-8",["pt"]],12:["RU",'&#1088;&#1091;&#1089;&#1089;&#1082;&#1080;&#1081;',"utf-8",["ru"]],13:["EL",'&#949;&#955;&#955;&#951;&#957;&#953;&#954;&#940;',"utf-8",["el"]],14:["SV",'Svenska',"utf-8",["sv"]],15:["NO",'Norske',"utf-8",["no"]],16:["DA",'Dansk',"utf-8",["da"]],17:["FI",'Suomi',"utf-8",["fi"]],18:["BR","Portugu&#xea;s (Brasil)","utf-8",["pt-BR"]],19:["MX",'Espa&#xf1;ol (M&#xe9;xico)',"utf-8",["es-MX","es-419","es-ar","es-bo","es-cl","es-co","es-cr","es-ec","es-sv","es-gt","es-hn","es-ni","es-pa","es-py","es-pe","es-pr","es-ve","es-do","es-uy","es-us"]],20:["CA",'Fran&#231;ais (Canada)',"utf-8",["fr-CA","fr-us"]]};function chkLang(_idx){if(!Lang[_idx]){for(var x in Lang){_idx=x;break;}}
for(var i in Lang_List){if(Lang[_idx][LANG_ID]==Lang_List[i]){return _idx;}}
return 0;}
function GetLang(_mod){var id=GetCookie("lang");id=(id)?id:0;id=chkLang(id);if(_mod)
return(Lang[id][LANG_ID]);else
return id;}
function GetLangISO(){var id=GetCookie("lang");id=(id)?id:0;id=chkLang(id);var iso=Lang[id][LANG_ACCP];if(iso){return iso[0];}else{return"en";}}
function GetAccpLangId(){var lang_a=pc_lang.split(" ");var xlang,idx,id;for(var x in lang_a){xlang=lang_a[x].toUpperCase();idx=findAccpLangIdx(xlang);id=Lang[idx][LANG_ID];for(var y in Lang_List){if(id==Lang_List[y])return idx;}}
return 0;}
function GetLangChar(){var id=GetLang(0);return(Lang[id][LANG_CHAR]);}
function findLangIdx(_lang){for(var i in Lang){if(Lang[i][0]==_lang){return i;}}
return-1;}
function findAccpLangIdx(_lang){for(var i in Lang){if(!i)break;var s=Lang[i][LANG_ACCP];if(s){for(var x in s){if(_lang==s[x].toUpperCase())return i;}}}
return 0;}
function findLang(_idx){var id=chkLang(_idx);return Lang[id][LANG_ID];}
function SetLang(_id){var idx=chkLang(_id);SetCookie("lang",idx);return(idx);}
function ConfirmM(_s){return confirm(getLangC(_s));}
function AlertM(_s){alert(getLangC(_s));}
function ShowalertM(_id,_s){if(_s){$(_id).html(getLangC(_s));}
$(_id).fadeTo(200,1);}
function HidealertM(_id){$(_id).hide();}
function getLangAM(_ar){var a=[];for(var x in _ar){a[x]=getLangC(_ar[x]);}
return a;}
function getLangM(_id,_no){if(LangM){for(var x=0;x<LangM.length;x++){try{if(LangM[x][_id]){if("undefined"==typeof(_no)){var tmpElem=document.createElement("div");tmpElem.innerHTML=LangM[x][_id];var s=tmpElem.innerHTML;tmpElem=null;return s;}else{return LangM[x][_id];}}}catch(e){}}}
return null;}
function getLangC(_id){var s=getLangM(_id);if(null==s)
return _id;else
return s;}
function SetTitle(_til){top.document.title=_til;}
var G_load_cgi={G_L_ready:0,G_L_ready_cb:0,G_L_timer:0};function reload_cgi_ready(st){if(st==1){G_load_cgi.G_L_ready_cb(1);}else{if(--G_load_cgi.G_L_ready<=0){clearTimeout(G_load_cgi.G_L_timer);G_load_cgi.G_L_ready_cb(0);}}}
function reload_cgi(_cgi_ar,_cb_ready,_wait){var _asc,_js,_nsc,_sc,_pn,_url;var _cgi=[];var _tim=("undefined"!=typeof(_wait))?_wait:30;var _all=(("undefined"==typeof(_cgi_ar))||!_cgi_ar||(_cgi_ar&&_cgi_ar.length==0))?1:0;G_load_cgi.G_L_ready_cb=_cb_ready;if(_all)_cgi_ar=CGIs;$.getScript('cgis.js?LST='+_cgi_ar.join(','),reload_cgi_ready);G_load_cgi.G_L_timer=setTimeout(function(){reload_cgi_ready(1);},_tim*1000);}
function getcPage(){return(window.location.toString().replace(/.*[\/]/,'').replace(/[#].*/,'').replace(/[\?].*/,''));}
function getcPageName(){var pg=window.location.toString();return pg.replace(/.*[\/]/,'').replace(/[\.].*$/,'');}
var LangM=[];if("undefined"==typeof(LangJ))LangJ=[];if("undefined"==typeof(CGIs))CGIs=[];var Co_LANG=GetLang(0);if("undefined"!=typeof(lang_set)){if(Co_LANG!=lang_set){SetLang(lang_set);Co_LANG=lang_set;}}
var pg_lang=GetLang(1).toLowerCase();var pg=getcPageName();var pg_charset=GetLangChar();var pg_dir=(((window.location.toString()).indexOf("dashboard/")!=-1)?"../":"");var pg_l_dir=pg_dir+"lang/"+pg_lang+"/";var cPage=getcPage();document.write('<scr'+'ipt type="text/javascript" charset="'+pg_charset+'" src="'+pg_dir+'lang.js?LANG='+pg_lang+'&LST='+LangJ.join(',')+'"></scr'+'ipt>');if("undefined"!=typeof(CGIs)){var i=CGIs.join("|");if(!/\bwifi_s\b/.test(i)){CGIs[CGIs.length]="wifi_s";}
if(!/\bst\b/.test(i)){CGIs[CGIs.length]="st";}
document.write('<scr'+'ipt type="text/javascript" src="'+URLTimeStamp(pg_dir+'cgis.js?LST='+CGIs.join(','))+'"></scr'+'ipt>');};/*END_JS_PACKER*/