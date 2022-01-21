import axios from 'axios';

const ax = axios.create({
    baseURL: 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js'
})

export default ax;