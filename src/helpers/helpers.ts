interface ImgUrlsJSON {
  urls: {
    raw: string;
  };
  user: {
    name: string;
  };
  links: {
    html: string;
  };
}

interface ImgUrlsReturn {
  url: string;
  author: {
    name: string;
    link: string;
  };
}

export const unsplashGetImgUrls = (
  json: ImgUrlsJSON[],
  dpr: number,
  w: number
): ImgUrlsReturn[] => {
  // Recunstruct a json obj from unsplash and return it in more concise shape
  return json.map((result: any) => ({
    /*
      Map each image url to dynamic parameters.
      More about dynamic urls here: https://unsplash.com/documentation#dynamically-resizable-images
    */
    url: (result.urls.raw as string) + `&w=${w}&dpr=${dpr}`,
    author: {name: result.user.name, link: result.links.html},
  }));
};

interface QuoteJSON {
  contents: {
    quotes: Array<{
      quote: string;
      author: string;
    }>;
  };
}

interface QuoteReturn {
  author: string;
  quote: string;
}

export const getQuote = (json: QuoteJSON): QuoteReturn => {
  // Get only useful content from a json that quote api returns
  return json.contents.quotes[0];
};

interface WeatherJSON {
  main: {
    temp: number;
  };
  weather: Array<{
    icon: string;
  }>;
}

interface WeatherReturn {
  icon: string;
  temp: string;
}

export const getWeather = (json: WeatherJSON): WeatherReturn => {
  // Get only an icon and a temperature from a json returned from openweathermap
  return {
    icon: `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`,
    temp: json.main.temp.toFixed(),
  };
};
