import axios from 'axios'

export default axios.create({
    baseURL: 'https://flights-41d2d.firebaseio.com/'
})