
function set_guest_wifi_authcfg(_mod,_key)
{var sc_mod=0;var i=0;switch(_mod)
{case 3:default:setCfg("wifi_guest_authmode","OPEN");setCfg("wifi_guest_encryptype","NONE");break;case 2:setCfg("wifi_guest_authmode",'WEPAUTO');setCfg("wifi_guest_encryptype",'WEP');if(_key.length==26){setCfg("wifi_guest_wep_keyidx",'1');setCfg("wifi_guest_wep_key"+"1",_key);for(i=2;i<=4;i++){setCfg("wifi_guest_wep_key"+i,'');}}else{var cut=0;setCfg("wifi_guest_wep_keyidx",'1');for(i=1;i<=4;i++){cut=(i-1)*10;setCfg("wifi_guest_wep_key"+i,_key.substring(cut,cut+10));}}
break;case 1:var wpa_mod=parseInt(3,10);if(parseInt(1,10)==1){if(wpa_mod==1)
setCfg("wifi_guest_authmode","WPAPSK");else if(wpa_mod==2)
setCfg("wifi_guest_authmode","WPA2PSK");else
setCfg("wifi_guest_authmode","WPAPSKWPA2PSK");}else{if(wpa_mod==1)
setCfg("wifi_guest_authmode","WPA");else if(wpa_mod==2)
setCfg("wifi_guest_authmode","WPA2");else
setCfg("wifi_guest_authmode","WPAWPA2");}
setCfg("wifi_guest_encryptype","TKIPAES");setCfg("wifi_guest_wpa_key",_key);}}<%CFG_MAP(guest_en,WIFI_GUEST_EN);%><%CFG_MAP(guest_mode,WIFI_GUEST_TYPE);%><%CFG_MAP(guest_ssid,WIFI_GUEST_SSID);%><%CFG_MAP(guest_wep,WIFI_GUEST_WEP);%><%CFG_MAP(guest_psk,WIFI_GUEST_PASWD);%><%CFG_MAP(wifi_guest_authmode,WIFI_GUEST_AUTHMODE);%><%CFG_MAP(wifi_guest_encryptype,WIFI_GUEST_ENCRYPTYPE);%><%CFG_MAP(wifi_guest_wep_keyidx,WIFI_GUEST_KEYIDX);%><%CFG_MAP_ARY(wifi_guest_wep_key,WIFI_GUEST_WEP_KEY,4,1);%><%CFG_MAP(wifi_guest_wpa_key,WIFI_GUEST_WPA_KEY);%>var SSID_ChkSpecialChar=0;