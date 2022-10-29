function operator(proxies, targetPlatform) {
  const _ = lodash
  const host = 'tms.dingtalk.com'
  return proxies.map(p => {
    const type = _.get(p, 'type')
    if ('trojan' === type) {
      if (host) {
        _.set(p, 'sni', host)
      }
    }
    return p
  })
}
