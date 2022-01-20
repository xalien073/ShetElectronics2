import store from '@/store';
function GetCSRFToken() {
    axios({
        method: "get",
        url: "get-csrf",
    })
        .then((res) => {
            store.dispatch("CSRFToken", res.headers["x-csrftoken"])
        })
        .catch((err) => console.error(err))
}
export default GetCSRFToken