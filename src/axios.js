import axios from 'axios';
import { watch } from 'vue';
import SetCSRFToken from '@/composables/setcsrftoken';
axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.withCredentials = true;
watch(SetCSRFToken, () => {
    axios.defaults.headers.common['X-CSRFToken'] = SetCSRFToken._value;
    console.log(SetCSRFToken._value)
})

function testc() {
    console.log(axios.defaults.baseURL,
        axios.defaults.headers.common['X-CSRFToken'],
        axios.defaults.withCredentials)
}
export default testc