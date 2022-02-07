import { createContext, ReactNode, useEffect, useState } from "react";

import { auth, firebase } from "../services/firebase";

interface User {
  id: string;
  name: string;
  email: string | null;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  signInWithFirebase: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthContextTypeProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextTypeProps) {
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid, email } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account");
        }

        setUser({
          id: uid,
          name: displayName,
          email: email,
          avatar: photoURL,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid, email } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account");
      }

      setUser({
        id: uid,
        name: displayName,
        email,
        avatar: photoURL,
      });
    }
  }

  async function signInWithFirebase(email: string, password: string) {
    const result = await auth.signInWithEmailAndPassword(email, password);

    if (result.user) {
      const { displayName, photoURL, uid, email } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account");
      }

      setUser({
        id: uid,
        name: displayName,
        email,
        avatar: photoURL,
      });
    }
  }

  async function signOut() {
    await auth.signOut();
    setUser({} as User);
  }
  return (
    <AuthContext.Provider
      value={{ user, signInWithGoogle, signInWithFirebase, signOut }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
