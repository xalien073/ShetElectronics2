import store from '@/store';
import { computed } from 'vue';
const SetCSRFToken = computed(() => {
    return store.getters.CSRFToken
})
export default SetCSRFToken