import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import {AdditionalInformation, UserData} from "../../types";


const firebaseConfig = {
  apiKey: "AIzaSyB3FeKiI_nnTlPKY-jTcl6rcmLEVPOxKi8",
  authDomain: "ktpmud-60e62.firebaseapp.com",
  projectId: "ktpmud-60e62",
  storageBucket: "ktpmud-60e62.appspot.com",
  messagingSenderId: "312245021413",
  appId: "1:312245021413:web:6a5d92055d63793603820c",
  measurementId: "G-0QFLH6RDZC"
};


const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = async () => await signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();



export const createUserDocumentFromAuth = async (
  userAuth : User,
  additionalInformation? : AdditionalInformation
):Promise<QueryDocumentSnapshot<UserData> | void> => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
 
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error : any) {
      console.log('error creating the user', error.message);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData> ;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password:string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListner = (callback: NextOrObserver<User>) =>{
  onAuthStateChanged(auth, callback)
}


export const getCurrentUserUtil = (): Promise<User> => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (userAuth) => {
        resolve(userAuth as User);
      },
      reject
    );
  });
};
