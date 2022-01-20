import store from '@/store';
import GetCart from '@/composables/GetCart';
import GetCSRFToken from '@/composables/csrftoken';
function UserProfile(User) {
  store.dispatch("User", User);
  GetCSRFToken();
  GetCart(User.id);
  localStorage.setItem('User', JSON.stringify(User));
}
export default UserProfile