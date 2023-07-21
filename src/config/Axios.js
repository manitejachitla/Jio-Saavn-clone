import axios from "axios";
const Axios = axios.create({
    baseURL: 'https://saavn.me/',
    timeout: 1000,
});
export default Axios;