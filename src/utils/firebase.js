import firebase from "firebase"

var firebaseConfig = {
  apiKey: "AIzaSyBvrWv-8LZs7mJev-cSx5a3_9JGZbeZ5cM",
  authDomain: "kiloka-4489a.firebaseapp.com",
  databaseURL: "https://kiloka-4489a.firebaseio.com",
  projectId: "kiloka-4489a",
  storageBucket: "kiloka-4489a.appspot.com",
  messagingSenderId: "40700863875",
  appId: "1:40700863875:web:5a1746135ee93c6bdf02b6",
  measurementId: "G-NMQXVZ6EJT",
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

export const auth = firebase.auth
export const db = firebase.database()

export const signup = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password)
}

export const login = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password)
}

export const loginWithGoogle = () => {
  const provider = new auth.GoogleAuthProvider()
  return auth().signInWithPopup(provider)
}

export const logout = () => {
  return auth().signOut()
}
export const checkAuth = () => {
  return auth().onAuthStateChanged()
}
