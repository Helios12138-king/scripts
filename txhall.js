async function operator(proxies = []) {
    const _ = lodash
    return proxies.map((p = {}) => {
      const name = _.get(p, 'name') || ''
      _.set(p, 'name', '[腾讯]'+name)
      if(_.get(p, 'type') === 'vmess') {
        if(_.get(p, 'network') === 'ws') {
          _.set(p, 'ws-opts.headers.Host', 'puui.qpic.cn')
        }
        if(_.get(p, 'network') === 'http') {
          _.set(p, 'http-opts.headers.method', 'GET')
          _.set(p, 'http-opts.path', ['/'])
          _.set(p, 'http-opts.headers.Host', ['puui.qpic.cn'])
        }
      }
      if(_.get(p, 'type') === 'trojan') {
        _.set(p, 'sni', 'puui.qpic.cn')
      }
      return p
    })
}
