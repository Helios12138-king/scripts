function operator(proxies){
    proxies.forEach(p => {
        p["ws-opts"] = p["ws-opts"] || {"headers": {}};
        p["ws-opts"].headers = {
                "Host": "gw.alicdn.com"
        };
    });
}
