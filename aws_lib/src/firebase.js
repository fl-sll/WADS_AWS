// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjangM-5_6aDCDVrg1CMDbh94PDT34_KU",
  authDomain: "awslibrary-470e9.firebaseapp.com",
  projectId: "awslibrary-470e9",
  storageBucket: "awslibrary-470e9.appspot.com",
  messagingSenderId: "153955154427",
  appId: "1:153955154427:web:40c08abea2baf6b39b335e",
  measurementId: "G-BTE03HYW8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app)
// why are u typing it one by one
// no i didnt
// i copied, and i just follow the slide
// fucktard
// uncalled for tf did i do
export{db}