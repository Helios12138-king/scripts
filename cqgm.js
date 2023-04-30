function operator(proxies){
    proxies.forEach(p => {
        p["ws-opts"] = p["ws-opts"] || {"headers": {}};
        p["ws-opts"].headers = {
                "Host": "pull.free.video.10010.com"
        };
    });
}
