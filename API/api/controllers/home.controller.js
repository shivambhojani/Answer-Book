import { homeService } from "../services/index.js";

// Get the homepage
const homeGET = (_req, res) => {
  const homepageTemplate = homeService.getHomePage();

  res.status(200).sendFile(homepageTemplate);
};

export const homeController = {
  homeGET,
};
