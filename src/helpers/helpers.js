export const unsplashGetImgUrls = (json, dpr, w) => {
  return json.map(result => ({
    url: result.urls.raw + `&w=${w}&dpr=${dpr}`,
    author: {name: result.user.name, link: result.links.html},
  }));
};

export const getQuote = json => {
  return json.contents.quotes[0];
};
