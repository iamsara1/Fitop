import axios from "axios";

const BASE_URL = "https://fitop-api.vercel.app/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const user = JSON.parse(localStorage.getItem("persist:root"))?.utilisateur;
const currentUser = user && JSON.parse(user).utilisateursCourant;
const TOKEN = currentUser?.accessToken;
console.log(TOKEN)

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
