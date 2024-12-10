
/*JS_PACKER*/

function isInteger(_s){var s=''+_s;if(s.search(/^[0-9]+$/)!=-1)
return true;else
return false;}
function isBlank(_s){var c;var s=''+_s;for(var i=0;i<s.length;i++)
{c=s.charAt(i);if((c!=' ')&&(c!='\n')&&(c!='\t'))return false;}
return true;}
function isBlank_Zero(_s){var c;var s=''+_s;for(var i=0;i<s.length;i++){c=s.charAt(i);if((c!=' ')&&(c!='\n')&&(c!='\t')&&(c!='0'))return false;}
return true;}
function isNValidInt(_s){var c;var s=''+_s;for(var i=0;i<s.length;i++){c=s.charCodeAt(i);if((c<48)||(c>57))
return true;}
return false;}
function isNegInt(s){if(parseInt(s,10)<0)
return true;else
return false;}
function isNValidNum(_s){return((isBlank(''+_s))||(isNaN(''+_s))||(isNValidInt(_s))||(isNegInt(_s)))}
function isNValidRange(_s,_from,_to){if(isNValidNum(_s))return true;var s=parseInt(_s,10);var f=parseInt(_from,10);var t=parseInt(_to,10);return((s<f)||(s>t));}
function isNValidIP(_s){var s=parseInt(_s,10);if((isBlank(_s))||(isNaN(_s))||(isNValidInt(_s))||(isNegInt(_s))||(s<0||s>255))
return true;else
return false;}
function isNValidFirstIP(_s){var s=parseInt(_s,10);if((isBlank(_s))||(isNaN(_s))||(isNValidInt(_s))||(isNegInt(_s))||(s<1||s>223))
return true;else
return false;}
function isNValidLastIP(_s){var s=parseInt(_s,10);if((isBlank(_s))||(isNaN(_s))||(isNValidInt(_s))||(isNegInt(_s))||(s<1||s>254))
return true;else
return false;}
function isNValidAddress(_obj){var ip=[];if("string"==typeof(_obj)){ip=_obj.split(".");}else if("object"==typeof(_obj)){for(var i=0;i<_obj.length;i++){ip[i]=_obj[i].value;}}else{ip=_obj;}
if(ip.length!=4){return 1;}
if(isNValidFirstIP(ip[0])){return 1;}
if(isNValidIP(ip[1])){return 2;}
if(isNValidIP(ip[2])){return 3;}
if(isNValidLastIP(ip[3])){return 4;}
return 0;}
function isNValidMask(_s){var s=parseInt(_s,10);if(!isInteger(_s))
return true;if((s==255)||(s==254)||(s==252)||(s==248)||(s==240)||(s==224)||(s==192)||(s==128)||(s==0))
return false;return true;}
function isNValidLastMask(_s){var s=parseInt(_s,10);if(!isInteger(_s))
return true;if((s==252)||(s==248)||(s==240)||(s==224)||(s==192)||(s==128)||(s==0))
return false;return true;}
function IP2long(){var ip=[];var obj=IP2long.arguments;if(obj.length==1){if("string"==typeof(obj[0])){ip=obj[0].split(".");}else if("object"==typeof(obj)){if(obj[0].length!=4)return-1;for(var i=0;i<4;i++){ip[i]=(obj[0][i].value)?obj[0][i].value:obj[0][i];}}else{return-1;}}else{ip=obj;}
if(ip.length!=4)return-1;for(var i=0;i<4;i++){ip[i]=parseInt(ip[i],10);}
var iplong=(Number(ip[0])*0x1000000)+(Number(ip[1])*0x10000)+(Number(ip[2])*0x100)+Number(ip[3]);return iplong;}
function BrocastLong(_ip,_msk){var ip=_ip.split(".");var msk=_msk.split(".");if((ip.length!=4)||(msk.length!=4))return 0;for(var i=0;i<4;i++)ip[i]=ip[i]|(~msk[i]&0xFF);return IP2long(ip[0],ip[1],ip[2],ip[3]);}
function SubnetLong(_ip,_msk){var ip=_ip.split(".");var msk=_msk.split(".");if((ip.length!=4)||(msk.length!=4))return-1;for(var i=0;i<4;i++)ip[i]=ip[i]&msk[i];return IP2long(ip[0],ip[1],ip[2],ip[3]);}
function isNValidSubnetMask(_obj){var msk=[];if("string"==typeof(_obj)){msk=_obj.split(".");}else if("object"==typeof(_obj)){for(var i=0;i<_obj.length;i++){msk[i]=(_obj[i].value)?_obj[i].value:_obj[i];}}else{msk=_obj;}
if(msk.length!=4){return 1;}
for(var i=0;i<4;i++){if(isNValidInt(msk[i])){return(i+1);}}
var ulMask=IP2long(msk[0],msk[1],msk[2],msk[3]);var j=0;var ok=0;if(Number(msk[0])!=255)return 1;if(isNValidMask(msk[1]))return 2;if(isNValidMask(msk[2]))return 3;if(isNValidLastMask(msk[3]))return 4;for(var i=31;i>=0;i--){j=j+Math.pow(2,i);if(ulMask==j)ok=1;}
return(ok)?0:1;}
function is2Hex(_s){var j,x=0;var s=''+_s;for(var i=0;i<s.length;i++){var c=s.charAt(i);j=parseInt(c,16);if((j>=0)&&(j<=16)){if(x==1)return true;x=1;}}
return false;}
function isHex(_s){var j,x=0;var s=''+_s;for(var i=0;i<s.length;i++){var c=s.charAt(i);j=parseInt(c,16);if(!((j==0)||(j==1)||(j==2)||(j==3)||(j==4)||(j==5)||(j==6)||(j==7)||(j==8)||(j==9)||(j==10)||(j==11)||(j==12)||(j==13)||(j==14)||(j==15))){x=1;}
if(x==1)return false;}
return true;}
function isNValid(s){if(isBlank(''+s)||is2Hex(''+s))
return true;else
return false;}
function isValidMacAddress(address){var c='';var i=0,j=0;if(address.toUpperCase()=='FF:FF:FF:FF:FF:FF')return 1;if(address=='00:00:00:00:00:00'||address=='0:0:0:0:0:0')return 1;addrParts=address.split(':');if(addrParts.length!=6)return 1;for(i=0;i<6;i++){if(addrParts[i].length!=2)return(i+1);for(j=0;j<addrParts[i].length;j++){c=addrParts[i].toLowerCase().charAt(j);if((c>='0'&&c<='9')||(c>='a'&&c<='f'))
continue;else
return(i+1);}}
return 0;}
function isValidIP(addr,_nobypass){var sub_addr;var net_id;var host_id;var nobypass=_nobypass;if(addr.search(/^\d{1,3}\.\d{1,3}\.\d{1,3}\./)==-1)
return false;sub_addr=addr.split(/\./);if(sub_addr.length!=4)return false;if(sub_addr[3]=="*")
sub_addr[3]="1";else
{if(isNaN(sub_addr[3])==true)return false;}
if(sub_addr[0]>0xff||sub_addr[1]>0xff||sub_addr[2]>0xff||sub_addr[3]>0xff)
return false;if(sub_addr[0]<128){if(sub_addr[0]==0||sub_addr[0]==127)
return false;host_id=sub_addr[1]*0x10000+sub_addr[2]*0x100+sub_addr[3]*0x1;if(!nobypass&&(host_id==0||host_id==0xffffff))
return false;}else if(sub_addr[0]<192){host_id=sub_addr[2]*0x100+sub_addr[3]*0x1;if(!nobypass&&(host_id==0||host_id==0xffff))
return false;}else if(sub_addr[0]<224){host_id=sub_addr[3]*0x1;if(!nobypass&&(host_id==0||host_id==0xff))
return false;}else{return false;}
return true;}
function isValidIP_s(addr,_nobypass){var sub_addr;var net_id;var host_id;var nobypass=_nobypass;if(addr.search(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)==-1)
return 2;if(addr.search(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\./)!=-1)
return 2;sub_addr=addr.split(/\./);if(sub_addr.length!=4)return false;if(sub_addr[3]=="*")
sub_addr[3]="1";else
{if(isNaN(sub_addr[3])==true)return 2;}
if(sub_addr[0]<128){if(sub_addr[0]==0||sub_addr[0]==127)
return 2;host_id=sub_addr[1]*0x10000+sub_addr[2]*0x100+sub_addr[3]*0x1;if(!nobypass&&(host_id==0||host_id==0xffffff))
return 2;if(sub_addr[1]>0xff||sub_addr[2]>0xff||sub_addr[3]>0xff)
return 2;}else if(sub_addr[0]<192){host_id=sub_addr[2]*0x100+sub_addr[3]*0x1;if(!nobypass&&(host_id==0||host_id==0xffff))
return 2;if(sub_addr[1]>0xff||sub_addr[2]>0xff||sub_addr[3]>0xff)
return 2;}else if(sub_addr[0]<224){host_id=sub_addr[3]*0x1;if(!nobypass&&(host_id==0||host_id==0xff))
return 2;if(sub_addr[1]>0xff||sub_addr[2]>0xff||sub_addr[3]>0xff)
return 2;}else{return 3;}
return 1;}
function isValidIPAddress(_ip,_msk){var ip=_ip.split(".");var msk=_msk.split(".");var net_id,host_id,brocast_id;if(isNValidIP(ip[0])==true)return 1;if(isNValidIP(ip[1])==true)return 2;if(isNValidIP(ip[2])==true)return 3;if(isNValidIP(ip[3])==true)return 4;host_id=IP2long(_ip);net_id=SubnetLong(_ip,_msk);brocast_id=BrocastLong(_ip,_msk);if(net_id==-1){return 1;}
if(brocast_id==host_id){return 2;}
return 0;}
function isPrintable(_s,_lt){var c,len=_s.length-1;for(var i=0;i<=len;i++){c=_s.charCodeAt(i);if((c<32)||(c>126))return false;if(!_lt){if((i==0)&&(c==32))return false;if((i==len)&&(c==32))return false;}}
return true;}
function isNVaidSSIDChar(s){return!isPrintable(s,0);}
function isNVaidWPAChar(s){return!isPrintable(s,1);}
function isNLocalDomain(s){return!isPrintable(s,1)||(/[#]/.test(s));}
function isNHostName(s){return!isPrintable(s,1);}
function isNPPPoEname(s){return!isPrintable(s,1);}
function isNPPPoEpasswd(s){return!isPrintable(s,1);}
function isNPPPoEserver(s){return!isPrintable(s,1);}
/*END_JS_PACKER*/
