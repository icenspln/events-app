import { defineStore } from "pinia";
import { ref } from "vue";
import Axios from "@/api/Axios";

export const useAuthStore = defineStore("auth", () => {
  const state = ref({
    username: null,
    token: null,
  });

  async function login(credentials) {
    const response = await Axios.post(`/auth/login`, credentials);

    state.value.username = response.data.username;
    state.value.token = response.data.token;
    localStorage.setItem("token", state.value.token);
    return response;
  }

  function logout() {
    localStorage.removeItem("token");
    state.value.username = null;
    state.value.token = null;
  }

  return { state, login, logout };
});

// export const useAuthStore = defineStore("auth", {
//   state: () => ({
//     user: null,
//     token: null,
//   }),
//   actions: {
//     async login(credentials) {
//       try {
//         const response = await axios.post("http://localhost:4000/auth/login", credentials);
//         if (response.data.user && response.data.token) {
//           this.user = response.data.user;
//           this.token = response.data.token;
//         }
//         localStorage.setItem("token", this.token);
//         return response;
//       } catch (error) {
//         console.log(error);
//       }
//     },
//     logout() {
//       this.user = null;
//       this.token = null;
//       localStorage.removeItem("token");
//     },
//   },
// });
