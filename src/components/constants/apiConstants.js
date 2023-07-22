export let BASEURL = process.env.REACT_APP_API_URL;

BASEURL = BASEURL ? BASEURL : "http://localhost:3000";

export const APIURL = {
  GETALL: `${BASEURL}/api/products`,
};
