import axios from 'axios';

export default axios.create({
    baseURL: 'https://backend-node-aeade.web.app/api',
    timeout: 1000,
    header: {
        "Content-type": "application/json"
    }
});