import {initializeApp} from "firebase/app"
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from "firebase/auth"
import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlhp-9t9JWfjJsxyX7fIe0zRJxwyPCsJU",
    authDomain: "krsshop-db.firebaseapp.com",
    projectId: "krsshop-db",
    storageBucket: "krsshop-db.appspot.com",
    messagingSenderId: "994736623843",
    appId: "1:994736623843:web:ecb71f8a76c0bed467f5d6"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
prompt: "select_account"
});

export const db = getFirestore();

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const creatUserDocumentFromAuth = async (userAuth) => {
    const userDoc = doc(db, "users", userAuth.uid);

    console.log(userDoc);

    const userSnapshot = await getDoc(userDoc)
    console.log(userSnapshot);
}