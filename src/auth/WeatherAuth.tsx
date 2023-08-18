import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";

interface User {
  uid: string;
  email: string | null;
  password: string;
}

export function WeatherAuth() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState<User | null>({
    uid: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: FirebaseUser | null) => {
      setUser(currentUser ? { uid: currentUser.uid, email: currentUser.email || "", password: "" } : null);
    });
    return () => unsubscribe();
  }, []);

  const createUserDocument = async (user: FirebaseUser | null) => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      const userData = {
        email: user.email || "",
      };
      await setDoc(userRef, userData);
    } catch (error) {
      console.error("Error creating user document:", error);
    }
  };

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      const user = userCredential.user;
      if (user) {
        setUser({ uid: user.uid, email: user.email, password: "" });
        await createUserDocument(user);
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      const user = userCredential.user;
      if (user) {
        setUser({ uid: user.uid, email: user.email, password: "" });
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const isAuthenticated = user !== null; 

  return {
    logout,
    user,
    register,
    login,
    setRegisterEmail, 
    setRegisterPassword, 
    setLoginEmail, 
    setLoginPassword,
    isAuthenticated
  };
}
