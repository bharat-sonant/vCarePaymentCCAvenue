import { getDatabase } from 'firebase/database';
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

console.log(localStorage.getItem("city"));
let firebaseConfig = {
  apiKey: "AIzaSyBGZ_IB4y5Ov1nuqIhWndGU8hfJadlE85I",
  authDomain: "dtdnavigator.firebaseapp.com",
  databaseURL: "https://dtdnavigatortesting.firebaseio.com/",
  projectId: "dtdnavigator",
  storageBucket: "dtdnavigator.appspot.com",
  messagingSenderId: "381118272786",
  appId: "1:381118272786:web:7721ceb096f806bcec0fcb",
  measurementId: "G-XJW1MRQ481"
};

// if(localStorage.getItem("city")=="malviyanagar"){
//   firebaseConfig = {
//     apiKey: "AIzaSyAfi2H40SId5z6DOPvHubaD7n_wK2rrJY8",
//     authDomain: "wevoisdev-94a32.firebaseapp.com",
//     databaseURL: "https://wevois-wastebin-development.firebaseio.com",
//     projectId: "wevoisdev-94a32",
//     storageBucket: "wevoisdev-94a32.appspot.com",
//     messagingSenderId: "1084311190022",
//     appId: "1:1084311190022:web:6c946f5f530be67931e187"
//   };
// }
// else{
//   firebaseConfig = {
//     apiKey: "AIzaSyAfi2H40SId5z6DOPvHubaD7n_wK2rrJY8",
//     authDomain: "wevoisdev-94a32.firebaseapp.com",
//     databaseURL: "https://wevois-wastebin-development.firebaseio.com",
//     projectId: "wevoisdev-94a32",
//     storageBucket: "wevoisdev-94a32.appspot.com",
//     messagingSenderId: "1084311190022",
//     appId: "1:1084311190022:web:6c946f5f530be67931e187"
//   };
// }

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const storage = getStorage(app);