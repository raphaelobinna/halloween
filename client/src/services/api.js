import axios from 'axios';

let appURI = null

    if (process.env.NODE_ENV === "production"){
        appURI = process.env.REACT_APP_URL_PRODUCTION
    } else {
        appURI = process.env.REACT_APP_URL_DEVELOPMENT
    }

const host = `${appURI}/api`;

 const setToken = token => {
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}; 

 const call = async (method, path, data) => {
    const response = await axios[method](`${host}/${path}`, data)
    return response.data
};

const test2 = {call, setToken}
 
export default test2;