
/*JS_PACKER*/

function parseIP(strIP)
{var val1,val2,val3,val4;var IP=strIP.split(/\./);val1=new Number(IP[0]);val2=new Number(IP[1]);val3=new Number(IP[2]);val4=new Number(IP[3]);return(val1.valueOf()+'.'+val2.valueOf()+'.'+val3.valueOf()+'.'+val4.valueOf())}
function isValid_Zero_IP(addr)
{var sub_addr;var net_id;var host_id;if(addr.search(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)==-1)
return false;sub_addr=addr.split(/\./);if(sub_addr[0]>0xff||sub_addr[1]>0xff||sub_addr[2]>0xff||sub_addr[3]>0xff)
return false;if(sub_addr[0]==0&&sub_addr[1]==0&&sub_addr[2]==0&&sub_addr[3]==0)
return true;if(sub_addr[0]<128)
{if(sub_addr[0]==0||sub_addr[0]==127)
return false;host_id=sub_addr[1]*0x10000+sub_addr[2]*0x100+sub_addr[3]*0x1;if(host_id==0||host_id==0xffffff)
return false;}
else if(sub_addr[0]<192)
{host_id=sub_addr[2]*0x100+sub_addr[3]*0x1;if(host_id==0||host_id==0xffff)
return false;}
else if(sub_addr[0]<224)
{host_id=sub_addr[3]*0x1;if(host_id==0||host_id==0xff)
return false;}
else
{return false;}
return true;}
function PORT_RANGE(){this.mult=0;this.b_port=0;this.e_port=0;};function IP_RANGE(){this.ip="";this.count=0;}
function parsePortValueRange(ports){var sub_value,sub_range,val1,val2;var i;var range=new PORT_RANGE();if(ports==null||ports.length==0)return null;sub_value=ports.split("-");if(sub_value.length==1){val1=sub_value[0];if(!isInteger(val1))return null;range.b_port=range.e_port=parseInt(val1,10);range.mult=0;}else if(sub_value.length==2){val1=sub_value[0];val2=sub_value[1];if(!isInteger(val1)||!isInteger(val2))return null;range.b_port=parseInt(val1,10);range.e_port=parseInt(val2,10);range.mult=1;}else{}
return range;}
/*END_JS_PACKER*/
