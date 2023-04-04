async function operator(proxies = []) {
    const _ = lodash
    return proxies.map((p = {}) => {
        const name = _.get(p, 'name') || '' // 演示一下 可以用 lodash

        _.set(p, 'name', name + '🆙') // 名称 添加后缀 怕小白复制出问题 不使用反引号了
        // _.set(p, 'port', 80)  // 改端口
        _.set(p, 'ws-opts.headers.Host', 'gw.alicdn.com') // 改混淆

        _.set(p, 'xudp', true) // 开 xudp clash meta 核 vmess 支持 xudp

        // _.set(p, 'udp', true) // 开 udp 一般不用在脚本里改 可以界面上开
        // _.set(p, 'tfo', true) // 开 tfo 一般不用在脚本里改 可以界面上开
        return p
    })
}
