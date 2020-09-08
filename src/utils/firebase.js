import firebase from "gatsby-plugin-firebase"

export const auth = firebase.auth; 

export const signUpUser = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password)
}

export const signInUser = (email, password) => {
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
