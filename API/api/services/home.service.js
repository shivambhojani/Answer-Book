import path from "path";
import { fileURLToPath } from "url";

const getHomePage = () => {
  const templatePath = path.join(
    path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "index.html"),
  );

  return templatePath;
};

export const homeService = {
  getHomePage,
};
