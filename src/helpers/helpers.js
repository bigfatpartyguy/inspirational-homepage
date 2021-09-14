export const unsplashGetImgUrls = json => {
  return json.results.map(result => result.urls.full);
};
