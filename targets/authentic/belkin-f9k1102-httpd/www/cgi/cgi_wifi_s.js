<%CFG_MAP(wlan_ssid,WIFI_SSID);%><%CFG_MAP(wlan_en,WIFI_EN);%><%CFG_MAP(wlan_authmode,WIFI_AUTHMODE);%><%CFG_MAP_ARY(wlan_wep_key,WIFI_WEP_KEY,4,1);%><%CFG_MAP_ARY(wlan_wpa_key,WIFI_WPA_KEY,4,1);%><%CFG_MAP(wlan_ssid1,WIFI_5G_SSID);%><%CFG_MAP(wlan_en1,WIFI_EN+1);%><%CFG_MAP(wlan_authmode1,WIFI_5G_AUTHMODE);%><%CFG_MAP_ARY(wlan_wep_key1,WIFI_5G_WEP_KEY,4,1);%><%CFG_MAP_ARY(wlan_wpa_key1,WIFI_5G_WPA_KEY,4,1);%><%CFG_MAP(wlan_g_ssid,WIFI_GUEST_SSID);%><%CFG_MAP(wlan_g_en,WIFI_GUEST_EN);%><%CFG_MAP(wlan_g_mode,WIFI_GUEST_TYPE);%><%CFG_MAP(wlan_g_wep,WIFI_GUEST_WEP);%><%CFG_MAP(wlan_g_psk,WIFI_GUEST_PASWD);%>function getWLANInfo(){var k,i;for(var i=0;i<=WIFI_BAND;i++){k=((i==0)?'':i);G_ssid[i]=getCfg("wlan_ssid"+k);G_en[i]=getCfgInt("wlan_en"+k);var auth=getCfg("wlan_authmode"+k);if(auth=='OPEN'){G_key[i]='';}else if(auth=='WEPAUTO'){G_key[i]=getCfg("wlan_wep_key1"+k);}else{G_key[i]=getCfg("wlan_wpa_key1"+k);}
G_sc[i]=getWLAN_sc(i);}
var _mode=getCfg("wlan_g_mode");var _key="";G_ssid[2]=getCfg("wlan_g_ssid");G_en[2]=getCfgInt("wlan_g_en");if(_mode=='2'){G_key[2]=getCfg("wlan_g_wep");G_sc[2]=getWALN_SecStr(1);}else if(_mode=='0'||_mode=='1'){G_key[2]=getCfg("wlan_g_psk");G_sc[2]=getWALN_SecStr(5);}else{G_key[2]="";G_sc[2]=getWALN_SecStr(0);}}
function show_wrapKey(key){var s="";var len=Math.ceil(key.length/32)+1;for(var i=0;i<len;i++){s+=key.substr(i*32,32);if(i!=len-1)s+='<br>';}
return s;}
function getWALN_SecStr(sc_mod){var wifi_sc_s={0:'318',1:'64bit WEP',2:'128bit WEP',3:'WPA-PSK',4:'WPA2-PSK',5:'WPA/WPA2-Personal (PSK)',6:'WPA',7:'WPA2',8:'1297'};return getLangC(wifi_sc_s[sc_mod]);}
function getWLAN_sc(idx){var sc_mod=0;var k=((idx==0)?'':idx);var auth=getCfg("wlan_authmode"+k);if(auth=='OPEN')
sc_mod=0;else if(auth=='WEPAUTO'){sc_mod=2;if(parseInt(getCfg("wifi_wep_keylen"+k),10)==10)
sc_mod=1;}else if(auth=='WPAPSK')
sc_mod=3;else if(auth=='WPA2PSK')
sc_mod=4;else if(auth=='WPAPSKWPA2PSK')
sc_mod=5;else if(auth=='WPA')
sc_mod=6;else if(auth=='WPA2')
sc_mod=7;else if(auth=='WPAWPA2')
sc_mod=8;return getWALN_SecStr(sc_mod);}