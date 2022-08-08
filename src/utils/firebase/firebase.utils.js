import {initializeApp} from "firebase/app"
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
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
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

export const creatUserDocumentFromAuth = async (userAuth , additionalInformation = {}) => {
    if(!userAuth) return;

    const userDoc = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDoc)
    
    if (!userSnapshot.exists()) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDoc, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        })
      } catch {
        console.log("something wrong");
      }
    }
    return userDoc
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
}
export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password)
}