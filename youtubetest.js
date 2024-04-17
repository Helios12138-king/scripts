/*
 * 由@LucaLin233编写
 * 原脚本地址：https://raw.githubusercontent.com/LucaLin233/Luca_Conf/main/Surge/JS/stream-all.js
 * 由@Rabbit-Spec修改
 * 更新日期：2022.06.26
 * 版本：2.2
 */

const REQUEST_HEADERS = {
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
    'Accept-Language': 'en',
}

// 即将登陆
const STATUS_COMING = 2
// 支持解锁
const STATUS_AVAILABLE = 1
// 不支持解锁
const STATUS_NOT_AVAILABLE = 0
// 检测超时
const STATUS_TIMEOUT = -1
// 检测异常
const STATUS_ERROR = -2

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36'


  ;(async () => {
    let panel_result = {
      title: '流媒体解锁检测',
      content: '', 
    }
  let [{ region, status }] = await Promise.all(check_youtube_premium())
      .then((result) => { 
         console.log(result)
        let content = result.join('\n')
        console.log(content)
     
panel_result['content'] = content
      })
      .finally(() => {
        $done(panel_result)
      })
  })()
  async function check_youtube_premium() {
    let inner_check = () => {
      return new Promise((resolve, reject) => {
        let option = {
          url: 'https://www.youtube.com/premium',
          headers: REQUEST_HEADERS,
        }
        $httpClient.get(option, function (error, response, data) {
          if (error != null || response.status !== 200) {
            reject('Error')
            return
          }
  
          if (data.indexOf('Premium is not available in your country') !== -1) {
            resolve('Not Available')
            return
          }
  
          let region = ''
          let re = new RegExp('"countryCode":"(.*?)"', 'gm')
          let result = re.exec(data)
          if (result != null && result.length === 2) {
            region = result[1]
          } else if (data.indexOf('www.google.cn') !== -1) {
            region = 'CN'
          } else {
            region = 'US'
          }
          resolve(region)
        })
      })
    }
  
    let youtube_check_result = 'YouTube: '
  
    await inner_check()
      .then((code) => {
        if (code === 'Not Available') {
          youtube_check_result += '不支持解锁'
        } else {
          youtube_check_result += '已解锁 ➟ ' + code.toUpperCase()
        }
      })
      .catch((error) => {
        youtube_check_result += '检测失败，请刷新面板'
      })
  
    return youtube_check_result
  }
      function getLocationInfo() {
        return new Promise((resolve, reject) => {
          let opts = {
            url: 'https://disney.api.edge.bamgrid.com/graph/v1/device/graphql',
            headers: {
              'Accept-Language': 'en',
              Authorization: 'ZGlzbmV5JmJyb3dzZXImMS4wLjA.Cu56AgSfBTDag5NiRA81oLHkDZfu5L3CKadnefEAY84',
              'Content-Type': 'application/json',
              'User-Agent': UA,
            },
            body: JSON.stringify({
              query: 'mutation registerDevice($input: RegisterDeviceInput!) { registerDevice(registerDevice: $input) { grant { grantType assertion } } }',
              variables: {
                input: {
                  applicationRuntime: 'chrome',
                  attributes: {
                    browserName: 'chrome',
                    browserVersion: '94.0.4606',
                    manufacturer: 'apple',
                    model: null,
                    operatingSystem: 'macintosh',
                    operatingSystemVersion: '10.15.7',
                    osDeviceIds: [],
                  },
                  deviceFamily: 'browser',
                  deviceLanguage: 'en',
                  deviceProfile: 'macosx',
                },
              },
            }),
          }
      
          $httpClient.post(opts, function (error, response, data) {
            if (error) {
              reject('Error')
              return
            }
      
            if (response.status !== 200) {
              console.log('getLocationInfo: ' + data)
              reject('Not Available')
              return
            }
      
            data = JSON.parse(data)
            if(data?.errors){
              console.log('getLocationInfo: ' + data)
              reject('Not Available')
              return
            }
      
            let {
              token: { accessToken },
              session: {
                inSupportedLocation,
                location: { countryCode },
              },
            } = data?.extensions?.sdk
            resolve({ inSupportedLocation, countryCode, accessToken })
          })
        })
      }
      
      function testHomePage() {
        return new Promise((resolve, reject) => {
          let opts = {
            url: 'https://www.disneyplus.com/',
            headers: {
              'Accept-Language': 'en',
              'User-Agent': UA,
            },
          }
      
          $httpClient.get(opts, function (error, response, data) {
            if (error) {
              reject('Error')
              return
            }
            if (response.status !== 200 || data.indexOf('Sorry, Disney+ is not available in your region.') !== -1) {
              reject('Not Available')
              return
            }
      
            let match = data.match(/Region: ([A-Za-z]{2})[\s\S]*?CNBL: ([12])/)
            if (!match) {
              resolve({ region: '', cnbl: '' })
              return
            }
      
            let region = match[1]
            let cnbl = match[2]
            resolve({ region, cnbl })
          })
        })
      }
      
      function timeout(delay = 5000) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject('Timeout')
          }, delay)
        })
      }
