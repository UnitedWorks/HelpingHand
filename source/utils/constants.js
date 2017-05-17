import axios from 'axios';

const isProduction = process.env.NODE_ENV === "production";
const apiURL = 'https://helpinghand-api.herokuapp.com';

axios.defaults.baseURL = apiURL;

export { isProduction, apiURL };
