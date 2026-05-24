import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

import {
  getDatabase
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBIOah96mm3jaKCG3Zi4Doa3ewioBCdVmE",
  authDomain: "teranove.firebaseapp.com",
  databaseURL: "https://teranove-default-rtdb.firebaseio.com",
  projectId: "teranove",
  storageBucket: "teranove.firebasestorage.app",
  messagingSenderId: "351114086310",
  appId: "1:351114086310:web:f5a65ad0a6e7db835ab167"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const db = getDatabase(app);

export default app;