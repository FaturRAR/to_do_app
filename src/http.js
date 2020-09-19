import axios from 'axios';

export default axios.create({
    baseURL: 'https://faturarapi.herokuapp.com/api',
    timeout: 1000,
    header: {
        "Content-type": "application/json"
    }
});