/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCkmXdE8cOlumq_3w_caZZ8sil-t-xoSXg",
    authDomain: "routemaster-7b0d9.firebaseapp.com",
    projectId: "routemaster-7b0d9",
    storageBucket: "routemaster-7b0d9.appspot.com",
    messagingSenderId: "1001998114482",
    appId: "1:1001998114482:web:062b0b4ca40bb78367f3ab"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
