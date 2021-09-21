export const unsplashGetImgUrls = (json, dpr, w) => {
  // Recunstruct a json obj from unsplash and return it in more concise shape
  return json.map(result => ({
    /*
      Map each image url to dynamic parameters.
      More about dynamic urls here: https://unsplash.com/documentation#dynamically-resizable-images
    */
    url: result.urls.raw + `&w=${w}&dpr=${dpr}`,
    author: {name: result.user.name, link: result.links.html},
  }));
};

export const getQuote = json => {
  // Get only useful content from a json that quote api returns
  return json.contents.quotes[0];
};

export const getWeather = json => {
  // Get only an icon and a temperature from a json returned from openweathermap
  return {
    icon: `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`,
    temp: json.main.temp.toFixed(),
  };
};
