export const environment = {
  production: false,
  apiURL: (window as any)["envconfig"]["apiurl"] || "http://simple.web"
};
