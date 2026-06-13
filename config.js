
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
   import { getFirestore} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDWRSBfteHxuIR-c-OvPOukKbKBbPEumbg",
    authDomain: "chopnow-535d2.firebaseapp.com",
    projectId: "chopnow-535d2",
    storageBucket: "chopnow-535d2.firebasestorage.app",
    messagingSenderId: "506570237164",
    appId: "1:506570237164:web:e8724eeb8bd43f7623f1c9"
  };

  // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const db=getFirestore(app)


