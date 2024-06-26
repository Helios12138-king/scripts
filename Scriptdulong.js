# 【JavaScript】合集

# 分割线——————————————————————————

# Youtube 简体字幕
//https:\/\/www.youtube.com\/api\/timedtext\?.+&lang=(?!zh)((?!&tlang=zh\-Hans).)*$ url request-header \sHTTP/1\.1(\r\n) request-header &tlang=zh-Hans HTTP/1.1$1
# 掌阅 去广告
^https?:\/\/ih2\.ireader\.com\/zyapi\/bookstore\/ad\/ url reject-200
^https?:\/\/ih2\.ireader\.com\/zyapi\/self\/screen\/ad url reject-200
^https?:\/\/ih2\.ireader\.com\/zycl\/api\/ad\/ url reject-200
# 作业帮 去广告
^https:\/\/syh\.zybang\.com\/com\/adx\/impress$ url reject-200
# 京东 去广告
^https?:\/\/api\.m\.jd\.com\/client\.action\?functionId=start$ url reject-200
# 京喜 去开屏
^https:\/\/api\.m\.jd\.com\/api\?functionId=delivery_show$ url reject
^https:\/\/img10\.360buyimg\.com\/deliveryadmin\/jfs url reject
# 小米运动 去广告
^https:\/\/api-mifit-cn2\.huami\.com\/discovery\/mi\/cards\/startpage_ad url reject
# 京东极速版 去广告
https://api.m.jd.com/client.action\?functionId=lite_advertising url reject
# > 京东金融 去广告
^https?:\/\/ms\.jr\.jd\.com\/gw\/generic\/aladdin\/(new)?na\/m\/getLoadingPicture url reject
# 滴滴出行 去广告
//01 安全提示横幅
^https:\/\/guard\.sec\.xiaojukeji\.com\/api\/guard\/psg\/v2\/getShieldStatus url reject
//02 底部打车&代价推荐
^https:\/\/conf\.diditaxi\.com\.cn\/one url reject
//03 福利专区-金融服务-公交-骑车-滴滴乐园
^https:\/\/conf\.diditaxi\.com\.cn\/nav\/widget url reject
//04 接送机-优惠商城
^https:\/\/api\.udache\.com\/gulfstream url reject
//05 主页 领任务
^https:\/\/conf\.diditaxi\.com\.cn\/api\/(component|fusion|dynamicmodule|usercenter) url reject
^https:\/\/conf\.diditaxi\.com\.cn\/dynamic url reject
//06 主页 非主流式悬浮挂件
^https:\/\/res\.xiaojukeji\.com\/resapi\/activity\/mget url reject
//07 商城
^https:\/\/shop-gw\.chengxinyouxuan\.com\/(route|indexConfig|apolloConfig|getShopTuanInfos) url reject
//08 开屏广告
^https:\/\/img-ys011\.didistatic\.com\/static url reject
//09 骑行
^https:\/\/pt-starimg\.didistatic\.com\/static url reject
# 云闪付 去广告
^https:\/\/wallet\.95516\.com\/s\/wl\/icon\/long url reject
# 人人视频 去广告
^https?:\/\/api\.rr\.tv\/(?:ad\/getAll$|storage/business/rootName/app/homePage) url reject
# 交管12123 去广告
^https:\/\/gab\.122\.gov\.cn\/eapp\/m\/sysquery\/adver$ url reject
# 狮桥司机 去广告
^https:\/\/api-daoshang\.shiqiao\.com\/cloud-common\/(startupPageNew|versionManger)\/(query$|isUpdate$) url reject
# IT之家 去广告
^https:\/\/m\.ithome\.com\/api\/news\/newslistpageget url script-response-body https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/ithome/ithome.ad.js
^https:\/\/api\.ithome\.com\/json\/(listpage|newslist)\/news url script-response-body https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/ithome/ithome.ad.js
^https:\/\/api\.ithome\.com\/json\/slide\/index url script-response-body https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/ithome/ithome.ad.js
^https:\/\/api\.zuihuimai\.com url reject
^https:\/\/napi\.ithome\.com\/api\/(news|topmenu)\/(getfeeds|index) url script-response-body https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/ithome/ithome.ad.js
# 威锋 去广告
^https:\/\/api\.wfdata\.club\/v2\/yesfeng\/(infoCenterAd|yesList) url reject
# 贝壳网 去广告
^https:\/\/bkw-legacy\.oss-cn-shenzhen\.aliyuncs\.com\/cms\/ad url reject
# 美团 去广告
^https?:\/\/img\.meituan\.net\/(bizad|brandCpt)\/\w+\.(png|jpg) url reject
^https?:\/\/peisongapi\.meituan\.com\/client\/getInitiateImage url reject-200
^https?:\/\/img\.meituan\.net\/(adunion|display|midas)\/\w+\.(gif|jpg|jpg\.webp)$ url reject
^https?:\/\/(s3plus|flowplus)\.meituan\.net\/v\d\/\w+\/linglong\/\w+\.(gif|jpg|mp4) url reject
^https?:\/\/p\d\.meituan\.net\/(bizad|wmbanner)\/\w+\.jpg url reject
^https?:\/\/p\d\.meituan\.net\/movie\/\w+\.jpg\?may_covertWebp url reject
# 腾讯视频 去开屏（重装app）
^http:\/\/(.+qqvideo\.tc\.qq\.com\/.+mp4|pgdt\.gtimg\.cn) url reject-200
# VSCO 解锁
^https:\/\/(api\.revenuecat\.com\/v\d\/subscribers|vsco\.co\/api\/subscriptions\/\d\.\d\/user-subscriptions)\/ url script-response-body https://raw.githubusercontent.com/githubdulong/Script/master/vsco.js
# 金山WPS
^https?:\/\/[a-z-]*account\.wps\.c(n|om)(:\d+|)\/api\/users url script-response-body https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/Wps.js
# 扫描全能王 pro
^https:\/\/(api|api-cs)\.intsig\.net\/purchase\/cs\/query_property\? url script-response-body https://raw.githubusercontent.com/githubdulong/Script/master/CamScanner.js
# DayOne 解锁
^https:\/\/dayone\.(me|app)\/api\/(users|v2\/users\/(account-status|receipt))$ url script-request-body https://raw.githubusercontent.com/langkhach270389/Surge-LK/main/scripts/langkhach/dayone.js
# 彩云天气 svip
https?:\/\/biz\.caiyunapp\.com\/(membership_rights|v2\/user) url script-response-body https://raw.githubusercontent.com/githubdulong/Script/master/cytq.js
# 百度云盘 解锁
https:\/\/pan\.baidu\.com\/rest\/2\.0\/membership\/user url script-response-body https://raw.githubusercontent.com/githubdulong/Script/master/bdcloud.js
# bilbii 换区、评分
#^https:\/\/ap(p|i)\.bili(bili|api)\.(com|net)\/(pgc\/view\/v\d\/app\/season|x\/offline\/version)\? url script-response-body https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/Bili_Auto_Regions.js
#^https:\/\/ap(p|i)\.bili(bili|api)\.(com|net)\/x\/v\d\/search(\/type)?\?.+?%20(%E6%B8%AF|%E5%8F%B0|%E4%B8%AD)& url script-request-header https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/Bili_Auto_Regions.js
# MIX 解锁
^https:\/\/bmall\.camera360\.com\/api\/mix\/recovery$ url script-response-body https://raw.githubusercontent.com/githubdulong/Script/master/mix.js
# Boxjs
https?:\/\/boxjs\.(com|net) url script-analyze-echo-response https://raw.githubusercontent.com/chavyleung/scripts/master/box/chavy.boxjs.js
# 美图秀秀 
^https?://(api|h5).xiuxiu.meitu.com/(v1/user/show.json|v1/vip/vip_show.json|v1/vip/prompt/query.json|v1/h5/vip/sub_detail.json|v1/h5/user/self_show.json|v1/h5/vip/user_detail.json|v1/vip/prompt/query.json|v1/vip/prompt/query.json) url script-response-body https://raw.githubusercontent.com/githubdulong/Script/master/Mtxx.js
# 豆瓣电影 搜索
^https://m.douban.com/movie/subject/.+ url script-response-body https://raw.githubusercontent.com/githubdulong/Script/master/Douban_qx.js
# Emby 解锁
^https:\/\/mb3admin\.com\/admin\/service(\/registration\/validateDevice|\/appstore\/register|\/registration\/validate|\/registration\/getStatus|\/supporter\/retrievekey) url script-echo-response https://raw.githubusercontent.com/githubdulong/Script/master/Emby.js
# 阿里云盘 首页优化
^https?:\/\/api\.aliyundrive\.com\/apps\/v\d\/users\/apps\/widgets$ url script-response-body https://raw.githubusercontent.com/githubdulong/Script/master/alidrive.js
# 小红书开屏+信息流广告
^https?:\/\/edith\.xiaohongshu\.com\/api\/sns\/v2\/system_service\/splash_config url script-response-body https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/xiaohongshu/xiaohongshu.ad.js
^https:\/\/edith\.xiaohongshu\.com\/api\/sns\/v6\/homefeed\? url script-response-body https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/xiaohongshu/xiaohongshu.ad.js

# 分割线——————————————————————————

# > Hostname主机名
hostname = -*.snssdk.com, -*.amemv.com, *account.wps.cn, *account.wps.com, ap*.intsig.net, dayone.*, *.musical.ly, *.lagoapps.com, api.meiyan.com, gist.githubusercontent.com, biz.caiyunapp.com, vsco.co, spclient.wg.spotify.com, pan.baidu.com, ap?.bilibili.com, ap?.biliapi.net, btrace.qq.com, bmall.camera360.com, api.revenuecat.com, www.youtube.com, m.ithome.com, api.ithome.com, api.zuihuimai.com, napi.ithome.com, gab.122.gov.cn, api-mifit-cn2.huami.com, as.xiaojukeji.com, pt-starimg.didistatic.com, security.xiaojukeji.com, guard.sec.xiaojukeji.com, conf.diditaxi.com.cn, api.udache.com, res.xiaojukeji.com, shop-gw.chengxinyouxuan.com, img-ys011.didistatic.com, wallet.95516.com, api-daoshang.shiqiao.com, bkw-legacy.oss-cn-shenzhen.aliyuncs.com, api.wfdata.club, api.xiuxiu.meitu.com, h5.xiuxiu.meitu.com, boxjs.net, boxjs.com, m.douban.com, mb3admin.com, flowplus.meituan.net ,syh.zybang.com, ms.jr.jd.com,*.meituan.net, ,*.meituan.com, img10.360buyimg.com, api.aliyundrive.com, *.xiaohongshu.com
