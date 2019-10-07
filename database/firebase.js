import firebase from 'firebase'
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAcbWY3M-qtQQdMbtI3wV8fPPAAo2_G1hE',
    authDomain: 'extoserviceapp.firebaseapp.com',
    projectId: 'extoserviceapp',
    databaseURL: 'https://extoserviceapp.firebaseio.com'
  }

firebase.initializeApp(firebaseConfig);

const dbh = firebase.firestore();

module.exports =dbh;