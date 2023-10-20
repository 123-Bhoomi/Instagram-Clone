// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from "firebase"; // This does not work for our case; use below three imports for functioning of firebase.
// // import firebase from 'firebase/compat/app';
// // import 'firebase/compat/auth';
// // import 'firebase/compat/firestore';

//   const firebaseApp = firebase.initializeApp({
//         apiKey: "AIzaSyAAp3MxB70gBpSjOWSDTjcMyESQuK-NjLI",
//         authDomain: "instagram-clone-3af82.firebaseapp.com",
//         projectId: "instagram-clone-3af82",
//         storageBucket: "instagram-clone-3af82.appspot.com",
//         messagingSenderId: "566576170273",
//         appId: "1:566576170273:web:89d732036c060666852a60",
//         measurementId: "G-K239N019XQ"
//   });

//   const db = firebaseApp.firestore();
//   const auth = firebase.auth();
//   const storage = firebase.storage();

//   export{ db, auth, storage };
import firebase from 'firebase/compat/app'; // Instead of import firebase from 'firebase'; because it does not work at all
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
      apiKey: "AIzaSyAAp3MxB70gBpSjOWSDTjcMyESQuK-NjLI",
      authDomain: "instagram-clone-3af82.firebaseapp.com",
      projectId: "instagram-clone-3af82",
      storageBucket: "instagram-clone-3af82.appspot.com",
      messagingSenderId: "566576170273",
      appId: "1:566576170273:web:89d732036c060666852a60",
      measurementId: "G-K239N019XQ"
  
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, db, storage };