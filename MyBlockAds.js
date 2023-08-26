#!name = MyBlockAds
#!desc = 去广告合集，以下app请使用单独配置文件：高德地图,哔哩哔哩,网易云音乐,微博,YouTube,知乎
#!author = RuCu6
#!update = 2023-08-26 10:20

# ======= 0 ======= #
# 12306 开屏广告 //ad.12306.cn
^https:\/\/ad\.12306\.cn\/ad\/ser\/getAdList url script-analyze-echo-response https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/12306.js
# 58同城 //*.58cdn.com.cn, app.58.com, pic?.ajkimg.com
^https:\/\/app\.58\.com\/api\/home\/(advertising|appadv) url reject
^https:\/\/app\.58\.com\/api\/home\/invite\/popupAdv url reject
^https:\/\/app\.58\.com\/api\/log\/ url reject
^https:\/\/pic\d\.ajkimg\.com\/mat\/\w+\?imageMogr\d\/format\/jpg\/thumbnail\/\d{3}x\d{4}$ url reject
^https:\/\/.+\.58cdn\.com\.cn\/brandads url reject

# ======= A ======= #
# amdc
^http:\/\/amdc\.m\.taobao\.com\/amdc\/mobileDispatch url script-response-header https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/amdc.js
# 爱回收 //gw.aihuishou.com
^https:\/\/gw.aihuishou.com\/app-portal\/home\/getadvertisement url reject
# 爱奇艺
^http:\/\/t7z\.cupid\.iqiyi\.com\/mixer\? url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/myBlockAds.js
# 爱思助手 //list-app-m.i4.cn
^https:\/\/list-app-m\.i4\.cn\/(adclickcb|getHotSearchList|getopfstadinfo)\.xhtml url reject
# 阿里云盘 //api.alipan.com, member.alipan.com
^https:\/\/api\.alipan\.com\/adrive\/v1\/file\/getTopFolders url reject-dict
^https:\/\/api\.alipan\.com\/apps\/v2\/users\/home\/(news|widgets) url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/adrive.js
^https:\/\/member\.alipan\.com\/v1\/users\/onboard_list url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/adrive.js
# 阿里巴巴 //acs.m.taobao.com, gw.alicdn.com, heic.alicdn.com
^https:\/\/acs\.m\.taobao\.com\/gw\/mtop\.alibaba\.advertisementservice\.getadv url reject
^https:\/\/acs\.m\.taobao\.com\/gw\/mtop\.alimama\.etao\.config\.query\/.+?etao_advertise url reject
^https:\/\/acs\.m\.taobao\.com\/gw\/mtop\.alimusic\.common\.mobileservice\.startinit url reject
^https:\/\/acs\.m\.taobao\.com\/gw\/mtop\.etao\.noah\.query\/.+tao_splash url reject
^https:\/\/acs\.m\.taobao\.com\/gw\/mtop\.film\.mtopadvertiseapi\.queryadvertise url reject
^https:\/\/acs\.m\.taobao\.com\/gw\/mtop\.o2o\.ad\.gateway\.get url reject
^https:\/\/acs\.m\.taobao\.com\/gw\/mtop\.taobao\.idle\.home\.welcome url reject
^https:\/\/acs\.m\.taobao\.com\/gw\/mtop\.trip\.activity\.querytmsresources url reject
^https:\/\/gw\.alicdn\.com\/imgextra\/i\d\/[\w!]+-\d-tps-(702-758|1080-2430) url reject-dict
^https:\/\/(gw|heic)\.alicdn\.com\/imgextra\/i\d\/\d*\/?[\w!]+-\d-(octopus|tps-1125-1602)\.jpg_(1\d{3}|9\d{2})x(1\d{3}|9\d{2})q[59]0 url reject-dict

# ======= B ====== #
# 百度云 //pan.baidu.com
^https:\/\/pan\.baidu\.com\/(act\/api\/activityentry|rest\/2\.0\/pcs\/adx)\? url reject-dict
^https:\/\/pan\.baidu\.com\/api\/getsyscfg\? url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/myBlockAds.js
^https?:\/\/update\.pan\.baidu\.com\/statistics\? url reject-dict

# ======= C ======= #
# 昌原云充 五代十路 //www.washpayer.com
^http:\/\/ad\.5tao5ai\.com\/common\/getReceipt\? url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/changyuan.js
^https:\/\/www\.washpayer\.com\/(ad\/getBannerAd|ad\/user-adword|user\/getBannerList) url reject-dict
^https:\/\/www\.washpayer\.com\/(common\/getReceipt|user\/message\/equipmentPara)\? url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/changyuan.js
# 车来了 //api.chelaile.net.cn, web.chelaile.net.cn
^https:\/\/api\.chelaile\.net\.cn\/adpub url reject
^https:\/\/api\.chelaile\.net\.cn\/goocity\/advert url reject
^https:\/\/web\.chelaile\.net\.cn\/api\/adpub url reject
# CSDN //app-gw.csdn.net
^https:\/\/app-gw\.csdn\.net\/cms-app\/v\d\/home_page\/open_advertisement url reject

# ======= D ======= #
# 豆瓣 //api.douban.com
^https:\/\/api\.douban\.com\/v2\/app_ads\/splash url reject
^https:\/\/api\.douban\.com\b.*\/common_ads\? url reject

# ======= E ======= #
# 饿了么 //elemecdn.com, fuss10.elemecdn.com, www1.elecfans.com
^https:\/\/elemecdn.com\/.+\/sitemap url reject
^https:\/\/fuss10.elemecdn.com\/.+\/w\/640\/h\/\d{3,4} url reject
^https:\/\/fuss10.elemecdn.com\/.+\/w\/750\/h\/\d{3,4} url reject
^https:\/\/fuss10.elemecdn.com\/.+\.mp4 url reject
^https:\/\/www1.elecfans.com\/www\/delivery url reject

# ======= F ======= #
# 飞猪 //acs.m.taobao.com
^https:\/\/acs\.m\.taobao\.com\/gw\/mtop\.fliggy\.crm\.screen\.(allresource|predict) url reject-dict

# ======= H ====== #
# 海尔智家 //zj.haier.net
^https:\/\/zj\.haier\.net\/api-gw\/shpmResource\/waterfall\/recommend\/list\? url reject
^https:\/\/zj\.haier\.net\/omsappapi\/ad\/v1\/rotation url reject

# ======= J ====== #
# JavDB //api.yijingluowangluo.xyz, jdforrepam.com
^https:\/\/(api\.yijingluowangluo\.xyz|jdforrepam\.com)\/api\/(v1\/(ads|startup|users)|v4\/movies\/\w+) url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/myBlockAds.js
^https:\/\/(api\.yijingluowangluo\.xyz|jdforrepam\.com)\/api\/v1\/movies\/\w+\/play\? url script-request-header https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/break/javdb.js
# 建设银行
^http:\/\/image1\.ccb\.com\/newsinfo\/eBranch\/check\/nf\/newfin\/activity\/xjr_\w+\.png$ url reject
^http:\/\/imageadv\.ccb\.com\/adpic\/(nctm\/ad|sszserver\/upload\/activity)\/\d{8}\/\w+\.(gif|png|jpg)$ url reject
# 简书跳过重定向页面以直接访问 //links.jianshu.com, www.jianshu.com
^https:\/\/links\.jianshu\.com\/go\?to= url script-echo-response https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/noRedirect.js
^https:\/\/www\.jianshu\.com\/go-wild\?ac=\d&url= url script-echo-response https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/noRedirect.js
# 京东 //api.m.jd.com
^https:\/\/api\.m\.jd\.com\/client\.action\?functionId=start url reject
# 京东极速版 //api.m.jd.com
^https:\/\/api\.m\.jd\.com\/client\.action\?functionId=lite_advertising url response-body jdLiteAdvertisingVO response-body rucu6
# 交管12123 //gab.122.gov.cn
^https:\/\/gab\.122\.gov\.cn\/eapp\/m\/sysquery\/adver$ url reject

# ======= K ======= #
# 肯德基 //res.kfc.com.cn
^https:\/\/res\.kfc\.com\.cn\/advertisement url reject
# 酷安 //api.coolapk.com
^https:\/\/api\.coolapk\.com\/v6\/feed\/(detail|replyList)\? url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/coolapk.js
^https:\/\/api\.coolapk\.com\/v6\/main\/(dataList|indexV8|init) url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/coolapk.js
^https:\/\/api\.coolapk\.com\/v6\/page\/dataList\? url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/coolapk.js
^https:\/\/api\.coolapk\.com\/v6\/search\?.*type=hotSearch url reject-dict

# ======= M ====== #
# 美团 & 美团外卖//flowplus.meituan.net, img.meituan.net, s3plus.meituan.net
^http:\/\/wmapi\.meituan\.com\/api\/v7\/(loadInfo|openscreen|startpicture)\? url reject-dict
^https:\/\/flowplus\.meituan\.net\/v1\/mss_\w+\/linglong\/\d+\.jpg url reject-dict
^https:\/\/img\.meituan\.net\/bizad\/bizad_brandCpt_\d+\.jpg url reject-dict
^https:\/\/s3plus\.meituan\.net\/v1\/mss_\w+\/(brandcpt-vedio|waimai-alita)\/\w+\.zip$ url reject-dict

# ======= P ====== #
# 拼多多 //api.pinduoduo.com, api.yangkeduo.com
^https:\/\/api\.(pinduoduo|yangkeduo)\.com\/api\/cappuccino\/splash url reject

# ======= R ====== #
# Reddit //gql.reddit.com
^https:\/\/gql\.reddit\.com\/$ url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/reddit.js

# ======= T ====== #
# 腾讯视频
^http:\/\/[0-9\.:]*\/?(defaultts|vmind\.qqvideo)\.tc\.qq\.com\/\w+ url reject
^http:\/\/apd-vlive\.apdcdn\.tc\.qq\.com\/vmind\.qqvideo\.tc\.qq\.com\/\w+ url reject-dict
# 贴吧全面去广告 //tiebac.baidu.com
^http:\/\/c\.tieba\.baidu\.com\/c\/f\/(excellent\/personalized|frs\/(generalTabList|page|threadlist)|pb\/(pic)?page)$ url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/baidu/tiebaJson.js
^http:\/\/c\.tieba\.baidu\.com\/c\/f\/(excellent\/personalized|frs\/(generalTabList|page|threadlist)|pb\/(pic)?page)\?cmd url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/baidu/tiebaProto.js
^http:\/\/c\.tieba\.baidu\.com\/c\/s\/sync$ url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/baidu/tiebaJson.js
^https:\/\/tiebac\.baidu\.com\/tiebaads\/commonbatch\? url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/baidu/tiebaJson.js

# ======= W ====== #
# 网上国网 //ehome.esgcc.com.cn
^https:\/\/(csc|osg)-static\.sgcc\.com\.cn(:28888)?\/omg-static\/(?=(98110|99101|99105|99106|99107|99111)) url reject
^https:\/\/(csc-service|osg-base)\.sgcc\.com\.cn:\d+\/dtportal-app\/app_api\/selectExhibition url reject-dict
^https:\/\/ehome\.esgcc\.com\.cn\/mobile\/ url reject
# 微信 //mp.weixin.qq.com, weixin110.qq.com, security.wechat.com
## 移除公众号中的推广内容 //mp.weixin.qq.com
^https:\/\/mp\.weixin\.qq\.com\/mp\/(cps_product_info|getappmsgad|masonryfeed|relatedarticle)\? url reject-dict
## 跳过微信中转页面,解除被封禁链接 //weixin110.qq.com, security.wechat.com
^https\:\/\/(weixin110\.qq|security\.wechat)\.com\/cgi-bin\/mmspamsupport-bin\/newredirectconfirmcgi\? url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/wechat/wechat110.js

# ======= X ====== #
# 闲鱼 //gw.alicdn.com, acs.m.taobao.com
^https:\/\/gw\.alicdn\.com\/mt\/ url reject
^https:\/\/gw\.alicdn\.com\/tfs\/.+\d{3,4}-\d{4} url reject
^https:\/\/gw\.alicdn\.com\/tps\/.+\d{3,4}-\d{4} url reject
^https:\/\/acs\.m\.taobao\.com\/gw\/mtop\.taobao\.idle\.home\.welcome url reject
# 小米 //api.m.mi.com, api-mifit.huami.com, api.jr.mi.com, home.mi.com
## 小米商城 //api.m.mi.com
## 开屏广告
^https:\/\/api\.m\.mi\.com\/v1\/(app\/start|order\/expressView|product\/productView) url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/myBlockAds.js
## 搜索框,热词,卡片
^https:\/\/api\.m\.mi\.com\/v1\/app\/popup_info$ url reject-dict
^https:\/\/api\.m\.mi\.com\/v1\/misearch\/search_input$ url reject-dict
^https:\/\/api\.m\.mi\.com\/v2\/search\/search_default$ url reject-dict
## 商品推荐信息流
^https:\/\/api\.m\.mi\.com\/v1\/home\/page_feed(_v5)?$ url reject-dict
## 小米金融 //api.jr.mi.com
^https:\/\/api\.jr\.mi\.com\/jr\/api\/playScreen url reject
^https:\/\/api\.jr\.mi\.com\/v\d\/adv url reject
## 米家 //home.mi.com
^https:\/\/home\.mi\.com\/cgi-op\/api\/v1\/recommendation\/(banner|myTab|openingBanner) url reject-dict

# ======= Y ====== #
# 优酷 //un-acs.youku.com
^https:\/\/un-acs\.youku\.com\/gw\/mtop\.youku\.play\.ups\.appinfo\.get url script-response-body https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/myBlockAds.js
# 云闪付 //wallet.95516.com
^https:\/\/wallet\.95516\.com(:10533)?\/s\/wl\/icon\/large\/1 url reject

# ======= Z ====== #
# 中国移动 //clientaccess.10086.cn, wap.js.10086.cn
^https:\/\/clientaccess\.10086\.cn\/biz-orange\/DN\/init\/startInit url reject
^https:\/\/wap\.js\.10086\.cn\/jsmccClient\/cd\/market_content\/api\/v\d\/market_content\.page\.query url reject

hostname = ad.12306.cn, *.58cdn.com.cn, app.58.com, pic?.ajkimg.com, gw.aihuishou.com, list-app-m.i4.cn, api.alipan.com, member.alipan.com, acs.m.taobao.com, gw.alicdn.com, heic.alicdn.com, pan.baidu.com, update.pan.baidu.com, www.washpayer.com, api.chelaile.net.cn, web.chelaile.net.cn, app-gw.csdn.net, api.douban.com, elemecdn.com, fuss10.elemecdn.com, www1.elecfans.com, zj.haier.net, api.yijingluowangluo.xyz, jdforrepam.com, links.jianshu.com, www.jianshu.com, api.m.jd.com, gab.122.gov.cn, res.kfc.com.cn, api.coolapk.com, flowplus.meituan.net, img.meituan.net, s3plus.meituan.net, api.pinduoduo.com, api.yangkeduo.com, gql.reddit.com, tiebac.baidu.com, ehome.esgcc.com.cn, *.sgcc.com.cn, mp.weixin.qq.com, weixin110.qq.com, security.wechat.com, api.m.mi.com, api.jr.mi.com, home.mi.com, un-acs.youku.com, wallet.95516.com, clientaccess.10086.cn, wap.js.10086.cn
