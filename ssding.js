async function operator(proxies = []) {
    const _ = lodash
    return proxies.map((p = {}) => {
      if(_.get(p, 'type') === 'ss') {
        const name = _.get(p, 'name') || '' // 演示一下 可以用 lodash

        _.set(p, 'name', name + '-后缀') // 名称 添加后缀 怕小白复制出问题 不使用反引号了
        _.set(p, 'plugin', 'obfs')  // 改混淆插件
        _.set(p, 'plugin-opts', { "mode": "http", "host": "industry-fab.dingtalk.com" })  // 改混淆

        // _.set(p, 'plugin-opts.mode', 'http')  // 改混淆插件
        // _.set(p, 'plugin-opts.host', 'v9-dy.ixigua.com')  // 改混淆

        // _.set(p, 'udp', true) // 开 udp 一般不用在脚本里改 可以界面上开
        // _.set(p, 'tfo', true) // 开 tfo 一般不用在脚本里改 可以界面上开
      }
      return p
    })
}
