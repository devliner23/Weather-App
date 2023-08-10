import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";


interface User {
  email: string | null; 
  password: string;
}

export function WeatherAuth() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState<User | null>({
    email: "",
    password: "", 
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: FirebaseUser | null) => {
      setUser(currentUser ? { email: currentUser.email || "", password: "" } : null);
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
        setUser({ email: user.email, password: "" });
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
        setUser({ email: user.email, password: "" });
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

  return {
    logout, 
    user, 

    render: (
      <div className="App">
          <h1>Weather App</h1>
          {user ? (
              <div className="">
                  <p>Welcome, {user.email}!</p>
                  <button onClick={logout}>Logout</button>
              </div>
          ) : (
              <div>
                  <h2>Register</h2>
                  <input
                      type="email"
                      placeholder="Email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                  />
                  <input
                      type="password"
                      placeholder="Password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                  <button onClick={register}>Register</button>

                  <h2>Login</h2>
                  <input
                      type="email"
                      placeholder="Email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                  />
                  <input
                      type="password"
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <button onClick={login}>Login</button>
              </div>
          )}
      </div>
    )
  };
}
