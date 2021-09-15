export const unsplashGetImgUrls = json => {
  return json.results.map(result => ({
    url: result.urls.full,
    author: {name: result.user.name, link: result.links.html},
  }));
};
