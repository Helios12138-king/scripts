/*
版本：48小时缓存版
注意：此脚本仅支持Surge和Loon
符号：🅳电信 🅻联通 🆈移动 🅶广电 🅲公司 🆉直连 🎮游戏
接口：入口查询[ip-api] 落地查询[ip-api]
功能：根据接口返回的真实结果，重新对节点命名。添加入口城市、落地国家或地区、国内运营商信息，并对这些数据做持久化缓存（48小时有效期），减少API请求次数，提高运行效率。
异常：如遇问题，Loon可以进入[配置]→[持久化缓存]→[删除指定数据]→输入Key[sub-store-cached-script-resource][sub-store-nodes][sub-store-proxies]并删除缓存。Surge需要进入[脚本编辑器]→左下角[设置]→[$persistentStore]→[sub-store-cached-script-resource][sub-store-nodes][sub-store-proxies]删除缓存数据。
作者：@Key @奶茶姐 @小一
用法：Sub-Store脚本操作里添加
日期：2023-05-25 23:40:48
示例：https://gitlab.com/lodepuly/vpn_tool/-/raw/main/Resource/Script/Sub-Store/NodeRename.js#timeout=2000&cd=2000&isp&city&game&bl&flag&fgf=→&tz=[方括号内填写你的机场名]&name=[方括号内填写你的机场名]

----------------
以下是此脚本支持的参数，必须以"#"开头，多个参数使用"&"连接，参考上述地址为例使用参数。
无参数时的节点命名格式: "北京 美国 01"，如果[入口IP或国家]或[落地IP或国家]一样则为 "直连 德国 01" 
[bl]        增加倍率标识；
[isp]       增加运营商或者直连标识；
[dns]       将节点域名解析为IP；
[sheng]     增加入口省份标识；
[city]      增加入口城市标识；
[yun]       增加口云服务商标识；
[game]      增加游戏节点标识；
[flag]      增加旗帜标识，默认无此参数；
[offtz]     关闭脚本通知；
[snone]     清理个别地区只有一个节点的序号；
[fgf=]      设置入口和落地之间的分隔符，默认为空格；
[sn=]       设置国家与序号之间的分隔符，默认为空格；
[name=]     为节点添加机场名称前缀；
[tz=]       为推送通知时添加机场名称；
[timeout=]  测试节点延时允许的最大超时参数，超出允许范围则判定为无效节点，默认1600ms；
[h=]        节点缓存有效期，单位小时，时间参数只能二选一，Loon用户不需要此参数，请进入Sub-Store插件的配置界面自定义缓存有效期；
[min=]      节点缓存有效期，单位分钟，时间参数只能二选一，Loon用户不需要此参数，请进入Sub-Store插件的配置界面自定义缓存有效期；
[cd=]       当有缓存时，会先读取缓存，且对节点进行延时测试，直接输出结果；
            当无缓存时，会对节点直接进行延时测试，节点延时超过所设定的值则判定为无效节点，默认400ms，并将结果写入缓存；
            当设置[cd=]的值小于50时，则直接读取缓存；
[debug]     调试日志，普通用户不建议使用。
*/
const $ = $substore;
const bl = $arguments["bl"];
const isp = $arguments["isp"];
const dns = $arguments["dns"];
const yun = $arguments["yun"];
const city = $arguments["city"];
const flag = $arguments["flag"];
const game = $arguments["game"];
const offtz = $arguments["offtz"];
const sheng = $arguments["sheng"];
const debug = $arguments["debug"];
const numone = $arguments["snone"];
const { isLoon, isSurge, isQX } = $substore.env;
let with_cache = $arguments["cd"] ? $arguments["cd"] : 450;
let timeout = $arguments["timeout"] ? $arguments["timeout"] : 1920;
const tzname = $arguments.tz ? decodeURI($arguments.tz) : "";
const keynames = $arguments.name ? decodeURI($arguments.name) : "";
const FGF = $arguments.fgf == undefined ? " " : decodeURI($arguments.fgf);
const XHFGF = $arguments.sn == undefined ? " " : decodeURI($arguments.sn);
const target = isLoon ? "Loon" : isSurge ? "Surge" : isQX ? "QX" : undefined;
const min = $arguments.min ? decodeURI($arguments.min) : "";
const h = $arguments.h ? decodeURI($arguments.h) : "";
let writet = "";
let innum = 172800000;
let loontrue = false;
let onen = false;
if (min !== "") {
  innum = parseInt(min, 10) * 60000
  writet = $persistentStore.write(JSON.stringify(innum), "time-cache");
} else if (h !== "") {
  innum = parseInt(h, 10) * 3600000
  writet = $persistentStore.write(JSON.stringify(innum), "time-cache");
} else {
  writet = $persistentStore.write(JSON.stringify(innum), "time-cache");
}
const regexArray = [/游戏|game/i,];
const valueArray = ["Game"];
const nameclear = /邀请|返利|循环|官网|客服|网站|网址|获取|订阅|流量|到期|机场|下次|版本|官址|备用|到期|过期|已用|联系|邮箱|工单|群|贩卖|倒卖|防止|(\b(USE|USED|TOTAL|EXPIRE|EMAIL)\b)|\d\s?g/i;
async function operator(proxies) {
  const support = isLoon || isSurge;
  if (!support) {
    $.error(`No Loon or Surge`);
    $notify("当前代理工具不支持此脚本", "请使用Loon或Surge运行此脚本", "");
    console.log("当前代理工具不支持此脚本, 使用Loon或Surge运行此脚本");
    return proxies;
  }
  if (typeof scriptResourceCache === 'undefined') {
    console.log("\n当前Sub-Store无法运行此脚本\n请查阅此处链接说明安装正确的Sub-Store\nhttps://gitlab.com/lodepuly/vpn_tool/-/raw/main/Resource/Script/Sub-Store/NodeRename.js")
    if (target == "Surge") {
      $notification.post("当前Sub-Store无法运行此脚本", "", "请点击此通知安装新版模块并删除旧的模块", {url: "https://github.com/Keywos/rule/raw/main/module/Sub-Store.sgmodule"})
    } else if (target == "Loon") {
      $notification.post("当前Sub-Store无法运行此脚本", "", "请点击此通知安装Loon的专用插件并删除旧的插件", "loon://import?plugin=https://gitlab.com/lodepuly/vpn_tool/-/raw/main/Tool/Loon/Plugin/Sub-Store.plugin")
    }
    return proxies;
  }
  var batch_size = $arguments["batch"] ? $arguments["batch"] : 16;
  const startTime = new Date();
  const PRS = proxies.length;
  console.log(`设定API超时: ${timeout}毫秒`);
  console.log(`有缓API超时: ${with_cache}毫秒`);
  console.log(`批处理节点数: ${batch_size} 个`);
  console.log(`开始处理节点: ${PRS} 个`);
  let i = 0;
  if (debug) { console.log("处理前" + JSON.stringify(proxies)) }
  proxies = proxies.filter((item) => !nameclear.test(item.name));
  let o = 0;
  let Pushtd = "";
  let intimed = "";
  let stops = false;
  while (o < proxies.length && !stops) {
    const batchs = proxies.slice(o, o + 1);
    await Promise.all(
      batchs.map(async (proxy) => {
        try {
          const inss = new Map();
          const id = getid(proxy);
          if (inss.has(id)) {
            return inss.get(id);
          }
          const cacheds = scriptResourceCache.get(id);
          if (cacheds) {
            if (!onen) {
              timeout = with_cache;
              onen = true;
              stops = true;
            }
            const timepushs = scriptResourceCache.gettime(id);
            let TimeStarts = new Date().getTime();
            let timedPush = "";
            if (target == "Loon") {
              let TIMEDKEYS = "";
              const cacheExpirationTimes = { "1分钟": "60000", "5分钟": "300000", "10分钟": "600000", "30分钟": "1800000", "1小时": "3600000", "2小时": "7200000", "3小时": "10800000", "6小时": "21600000", "12小时": "43200000", "24小时": "86400000", "48小时": "172800000", "72小时": "259200000", "参数传入": "innums" };
              intimed = $persistentStore.read("节点缓存有效期");
              TIMEDKEYS = cacheExpirationTimes[intimed] || "172800000";
              if (TIMEDKEYS == "innums") {
                TIMEDKEYS = innum
              }
              //.toString().replace(/-/g, "")
              timedPush = mTIme(
                parseInt(timepushs, 10) - TimeStarts + parseInt(TIMEDKEYS, 10))
            } else {
              timedPush = mTIme(
                parseInt(timepushs, 10) - TimeStarts + parseInt(TIMEDKEY, 10));
            }
            Pushtd = `, ${timedPush}后过期 \n`;
          }
        } catch (err) { }
      })
    );
    o += 1;
  }

  while (i < proxies.length) {
    const batch = proxies.slice(i, i + batch_size);
    await Promise.all(
      batch.map(async (proxy) => {
        try {
          //阿里dns
          const alikey = await AliDNS(proxy.server);
          if (debug) { console.log("--阿里dns" + JSON.stringify(alikey)) }
          // SPAPI
          const spkey = await SPECNAPI(proxy.server, alikey);
          if (debug) { console.log("--国内入口SPAPI🌸" + JSON.stringify(spkey)) }
          let qcip = "";
          qcip = spkey.ip
          // {"country":"中国","regionName":"广东","city":"广州","district":"越秀区","isp":"中国移动","operator":"中国移动"}
          // 落地
          const outip = await IPAPI(proxy);
          let outnames = outip.country + outip.city;
          let reoutnames = ""; // 落地
          let asns = ""; //运营商
          let adcm = ""; // 运营商符号
          let otu = ""; // 🎮
          let incity = ""; //入口
          if (debug) { console.log("=====落地信息🍓" + JSON.stringify(outip)) }
          if (spkey.country == "中国" && spkey.city !== "") {
            if (city && sheng) {
              if (spkey.city == spkey.regionName) {
                incity = spkey.city
              } else {
                incity = spkey.regionName + FGF + spkey.city
              }
            } else if (city) {
              incity = spkey.city
            } else if (sheng) {
              incity = spkey.regionName
            }
            if (/电信|联通|移动|广电/.test(spkey.isp)) {
              asns = spkey.isp.replace(/中国/g, "");
            } else if (yun) {
              asns = spkey.isp;
            } else {
              asns = "企业";
            }
            if (flag) {
              if (isp) {
                const keycm = { '电信': '🅳', '联通': '🅻', '移动': '🆈', '广电': '🅶' };
                if (keycm.hasOwnProperty(asns)) {
                  adcm = keycm[asns];
                } else {
                  adcm = "🅲";
                }
              }
            } else {
              adcm = asns;
            }
          } else {
            const inip = await INDNS(proxy.server);
            if (debug) { console.log("--国外入口" + JSON.stringify(inip)) }
            incity = inip.country
            asns = inip.city
            if (incity == outnames) {
              incity = "直连";
              asns = ""; //防火墙
            }
            if (flag) {
              adcm = "🆉"
            }
            qcip = inip.ip
          }
          //替换game
          let rename = "";
          regexArray.forEach((regex, index) => {
            if (regex.test(proxy.name)) {
              rename = valueArray[index];
            }
          });
          let inkey = "";
          if ((isp && city) || (sheng && city) || (isp && sheng) || (sheng && isp && city) || yun) {
            if (flag || yun || sheng || city) {
              inkey = adcm + incity + FGF;
            } else {
              inkey = incity + asns + FGF;
            }
          } else if (flag) {
            inkey = adcm + FGF;
          } else if (isp || yun) {
            inkey = asns + FGF;
          } else if (city || sheng) {
            inkey = incity + FGF;
          } else {
            inkey = "";
          }

          if (game) {
            //game
            if (rename === "") {
              otu = "";
            } else {
              //'UDP': '🆄',
              const keyotu = { Game: "🎮" };
              if (keyotu.hasOwnProperty(rename)) {
                otu = keyotu[rename];
              } else {
                otu = "";
              }
            }
          } else {
            otu = "";
          };

          let nxx = "";
          if (bl) {
            // 倍率
            const match = proxy.name.match(/(倍率\D?((\d\.)?\d+)\D?)|((\d\.)?\d+)(倍|X|x|×)/);
            if (match) {
              const matchedValue = match[0].match(/(\d[\d.]*)/)[0];
              if (matchedValue !== "1") {
                const newValue = matchedValue + "×";
                nxx = newValue
              }
            }
            if (otu !== "") {
              reoutnames = outnames + otu + nxx;
            } else if (nxx !== "") {
              reoutnames = outnames + otu + XHFGF + nxx;
            } else {
              reoutnames = outnames;
            };
          } else {
            reoutnames = outnames + otu
          }
          let adflag = "";
          if (flag) {
            adflag = getflag(outip.countryCode)
          } else {
            adflag = "";
          }
          if (debug) {
            console.log("--处理前节点名🍉" + JSON.stringify(proxy.name))
            console.log("server为" + JSON.stringify(proxy.server))
          }
          if (dns) { proxy.server = qcip }
          if (debug) { console.log("域名解析后" + proxy.server) }
          proxy.name = inkey + adflag + reoutnames;
          if (debug) {
            console.log("--处理后节点名🍉🍉" + JSON.stringify(proxy.name))
            console.log("server为" + JSON.stringify(proxy.server))
            console.log("\n\n\n")
          }
          // 去重 入口ip/落地IP
          proxy.qc = qcip + outip.query;
        } catch (err) { }
      })
    );
    if (!onen) { await sleep(300); }
    i += batch_size;
  }
  if (debug) { console.log(JSON.stringify(proxies)) };
  proxies = removels(proxies);
  // 去除去重时添加的qc属性
  proxies = removeqc(proxies);
  // 按节点全名分组加序号
  proxies = jxh(proxies);
  if (keynames !== "") {
    proxies.forEach((proxy) => {
      proxy.name = keynames + " " + proxy.name;
    });
  }
  if (debug) { console.log(JSON.stringify(proxies)) };
  numone && (proxies = oneProxies(proxies));
  const PRSO = proxies.length;
  const endTime = new Date();
  const timeDiff = endTime.getTime() - startTime.getTime();
  if (dns) { console.log(`DNS解析后共: ${PRSO} 个`) }
  APIREADKEY > 0 ? console.log(`读取API缓存: ${APIREADKEY} 个`) : null;
  APIWRITEKEY > 0 ? console.log(`写入API缓存: ${APIWRITEKEY} 个`) : null;
  console.log(`处理完后剩余: ${PRSO} 个`);
  if (target == "Loon") {
    console.log("节点缓存有效期: " + intimed + ", 还剩" + Pushtd.replace(/,/g, ""));
  } else {
    console.log("节点缓存有效期: " + mTIme(TIMEDKEY) + ", 还剩" + Pushtd.replace(/,/g, ""));
  }
  console.log(`此方法总用时: ${mTIme(timeDiff)}\n----For New CNAME----`);
  // Push
  const readlog = APIREADKEY ? `读取缓存: ${APIREADKEY} 个 ` : '';
  const writelog = APIWRITEKEY ? `写入缓存: ${APIWRITEKEY} 个 ` : '';
  const Push = (PRSO == PRS) ? "无复用节点, " : "去除无效节点后有" + PRSO + "个, ";
  if (!offtz) {
    $notification.post(`NC: ${tzname}共${PRS}个节点`,
      "",
      `${writelog}${readlog}${Pushtd}${Push}用时:${mTIme(timeDiff)}`)
  }
  return proxies;
}

const ali = new Map();
async function AliDNS(server) {
  const isIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(server);
  if (isIP) {
    return server;
  } else {
    const id = getaliid(server);
    if (ali.has(id)) {
      return ali.get(id);
    }
    const cacheds = scriptResourceCache.get(id);
    if (cacheds) {
      return cacheds;
    } else {
      const resultali = new Promise((resolve, reject) => {
        if (with_cache < 51 && onen) {
          return resultali;
        } else {

          const url = `http://223.5.5.5/resolve?name=${server}&type=A&short=1`;
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
              reject(new Error("timeout"));
            }, timeout);
          });
          const queryPromise = $.http.get({ url }).then((resp) => {
            const alid = JSON.parse(resp.body);
            if (alid.length > 0) {
              resolve(alid[0]);
              scriptResourceCache.set(id, alid[0]);
            } else {
              reject(new Error());
            }
          })
            .catch((err) => {
              reject(err);
            });
          Promise.race([timeoutPromise, queryPromise]).catch((err) => {
            reject(err);
          });
        }
      });
      ali.set(id, resultali);
      return resultali;
    }
  }
}

const spapi = new Map();
async function SPECNAPI(server, alikey) {
  const id = getspcn(server);
  if (spapi.has(id)) {
    return spapi.get(id);
  }
  const cacheds = scriptResourceCache.get(id);
  if (cacheds) {
    return cacheds;
  } else {
    const resultin = new Promise((resolve, reject) => {
      if (with_cache < 51 && onen) {
        return resultin;
      } else {
        const ipcn = alikey;
        const url = `https://api-v3.speedtest.cn/ip?ip=${ipcn}`;
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error("timeout"));
          }, timeout);
        });
        const queryPromise = $.http.get({ url }).then((resp) => {
          const spcnapi = JSON.parse(resp.body);
          if (spcnapi.data) {
            const { country, province: regionName, city, district, isp, ip, operator } = spcnapi.data;
            const newspcn = { country, regionName, city, district, isp, ip, operator };
            resolve(newspcn);
            scriptResourceCache.set(id, newspcn);
          } else {
            reject(new Error());
          }
        })
          .catch((err) => {
            reject(err);
          });
        Promise.race([timeoutPromise, queryPromise]).catch((err) => {
          reject(err);
        });
      }
    });
    ins.set(id, resultin);
    return resultin;
  }
}

const ins = new Map();
async function INDNS(server) {
  const id = getinid(server);
  if (ins.has(id)) {
    return ins.get(id);
  }
  const cacheds = scriptResourceCache.get(id);
  if (cacheds) {
    return cacheds;
  } else {
    const resultin = new Promise((resolve, reject) => {
      if (with_cache < 51 && onen) {
        return resultin;
      } else {
        const ips = server;
        const url = `http://ip-api.com/json/${ips}?lang=zh-CN&fields=status,message,country,countryCode,city,query,regionName,asname,as`;
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error("timeout"));
          }, timeout);
        });
        const queryPromise = $.http.get({ url }).then((resp) => {
          const inipapi = JSON.parse(resp.body);
          if (inipapi.status === "success") {
            resolve(inipapi);
            scriptResourceCache.set(id, inipapi);
          } else {
            resolve(ips);
          }
        })
          .catch((err) => {
            reject(err);
          });
        Promise.race([timeoutPromise, queryPromise]).catch((err) => {
          reject(err);
        });
      }
    });
    ins.set(id, resultin);
    return resultin;
  }
}

let APIREADKEY = 0;
let APIWRITEKEY = 0;
const outs = new Map();
async function IPAPI(proxy) {
  const id = getid(proxy);
  if (outs.has(id)) {
    return outs.get(id);
  }
  const cached = scriptResourceCache.get(id);
  if (cached) {
    APIREADKEY++;
    return cached;
  } else {
    const result = new Promise((resolve, reject) => {
      if (with_cache < 51 && onen) {
        return result;
      } else {
        const url = `http://ip-api.com/json?lang=zh-CN&fields=status,message,country,countryCode,city,query`;
        let node = ProxyUtils.produce([proxy], target);
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error("timeout"));
          }, timeout);
        });
        const queryPromise = $.http.get({
          url, node: node,
          "policy-descriptor": node,
        })
          .then((resp) => {
            const lip = JSON.parse(resp.body);
            if (lip.status === "success") {
              scriptResourceCache.set(id, lip);
              APIWRITEKEY++;
              resolve(lip);
            } else {
              reject(new Error(lip.message));
            }
          })
          .catch((err) => {
            reject(err);
          });
        Promise.race([timeoutPromise, queryPromise]).catch((err) => {
          reject(err);
        });
      }
    });
    outs.set(id, result);
    return result;
  }
}
//四个判断脚本版本是否为最新的哈希值
function getid(proxy) { let dataKey = 'ld';; return MD5(`${dataKey}-${proxy.server}-${proxy.port}`); }
function getinid(server) { let dataKeys = 'ia';; return MD5(`${dataKeys}-${server}`); }
function getaliid(server) { let aliKeys = 'al';; return MD5(`${aliKeys}-${server}`); }
function getspcn(server) { let spcnKeys = 'sc';; return MD5(`${spcnKeys}-${server}`); }
function getflag(countryCode) { const codePoints = countryCode.toUpperCase().split("").map((char) => 127397 + char.charCodeAt()); return String.fromCodePoint(...codePoints).replace(/🇹🇼/g, "🇨🇳"); }
function removels(arr) { const nameSet = new Set(); const result = []; for (const e of arr) { if (e.qc && !nameSet.has(e.qc)) { nameSet.add(e.qc); result.push(e); } } return result; }
function removeqc(arr) { const nameSet = new Set(); const result = []; for (const e of arr) { if (!nameSet.has(e.qc)) { nameSet.add(e.qc); const modifiedE = { ...e }; delete modifiedE.qc; result.push(modifiedE); } } return result; }
function jxh(e) { const n = e.reduce((e, n) => { const t = e.find((e) => e.name === n.name); if (t) { t.count++; t.items.push({ ...n, name: `${n.name}${XHFGF}${t.count.toString().padStart(2, "0")}`, }); } else { e.push({ name: n.name, count: 1, items: [{ ...n, name: `${n.name}${XHFGF}01` }], }); } return e; }, []); const t = n.flatMap((e) => e.items); e.splice(0, e.length, ...t); return e; }
function oneProxies(proxies) { const groups = proxies.reduce((groups, proxy) => { const name = proxy.name.replace(/[^A-Za-z0-9\u00C0-\u017F\u4E00-\u9FFF]+\d+$/, ""); if (!groups[name]) { groups[name] = []; } groups[name].push(proxy); return groups; }, {}); for (const name in groups) { if (groups[name].length === 1 && groups[name][0].name.endsWith("01")) { const proxy = groups[name][0]; proxy.name = name; } } return proxies; }
function mTIme(t) { if (t < 1000) { return `${Math.round(t)}毫秒`; } else if (t < 60000) { return `${Math.round(t / 1000)}秒`; } else if (t < 3600000) { return `${Math.round(t / 60000)}分钟`; } else if (t >= 3600000) { return `${Math.round(t / 3600000)}小时`; } };
function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

var MD5 = function (d) { var _ = M(V(Y(X(d), 8 * d.length))); return _.toLowerCase() }; function M(d) {
  for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length;
    r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f
} function X(d) {
  for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for (m = 0;
    m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _
} function V(d) {
  for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255);
  return _
} function Y(d, _) {
  d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {
    var h = m, g = f, t = r, a = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f,
      r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330),
      r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983),
      r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162),
      r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329),
      r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302),
      r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848),
      r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501),
      r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734),
      r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556),
      r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640),
      r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189),
      r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651),
      r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055),
      r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799),
      r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649),
      r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551),
      m = safe_add(m, h), f = safe_add(f, g), r = safe_add(r, t), i = safe_add(i, a)
  } return Array(m, f, r, i)
} function md5_cmn(d, _, m, f, r, i) {
  return safe_add(bit_rol
    (safe_add(safe_add(_, d), safe_add(f, i)), r), m)
} function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) } function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) } function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) } function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) } function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m }
function bit_rol(d, _) { return d << _ | d >>> 32 - _ }
