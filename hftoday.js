const params = getParams($argument);
const cityId = params.cityId || "101190401";
const apiUrl = `http://t.weather.sojson.com/api/weather/city/${cityId}`;

$httpClient.get(apiUrl, (error, response, data) => {
  if (error) {
    console.log(error);
    $done();
    return;
  }

  const weatherData = JSON.parse(data);
  if (weatherData.status !== 200) {
    console.log(`请求失败，状态码：${weatherData.status}`);
    $done();
    return;
  }

  const cityInfo = weatherData.cityInfo;
  const currentWeather = weatherData.data.forecast[0];
    const message = `天气：${currentWeather.type}\n温度：${currentWeather.low}  ${currentWeather.high} \n更新：${cityInfo.updateTime}`;
//`城市：${cityInfo.city}\n更新：${cityInfo.updateTime} \n天气：${currentWeather.type}\n温度：${currentWeather.low}  ${currentWeather.high}`
  const body = {
    title: "合肥市",
    content: message,
    cityId:params.cityId,
    icon: params.icon,
    "icon-color": params.color
  };
  $done(body);
});

function getParams(param) {
  return Object.fromEntries(
    param
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}
