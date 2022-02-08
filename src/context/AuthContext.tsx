import { createContext, ReactNode, useEffect, useState } from "react";

import { auth, firebase } from "../services/firebase";

interface User {
  id: string;
  name: string;
  email: string | null;
  avatar: string;
  phone?: string;
  authType: "google" | "firebase";
}

interface UpdateUserProps {
  name: string;
  email: string;
  phone?: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  signInWithFirebase: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (update: UpdateUserProps) => void;
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
        const { displayName, photoURL, uid, email, phoneNumber } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account");
        }

        setUser({
          id: uid,
          name: displayName,
          email: email,
          avatar: photoURL,
          phone: phoneNumber ? phoneNumber : undefined,
          authType: "google",
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
      const { displayName, photoURL, uid, email, phoneNumber } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account");
      }

      setUser({
        id: uid,
        name: displayName,
        email,
        avatar: photoURL,
        phone: phoneNumber ? phoneNumber : undefined,
        authType: "google",
      });
    }
  }

  async function signInWithFirebase(email: string, password: string) {
    const result = await auth.signInWithEmailAndPassword(email, password);

    if (result.user) {
      const { displayName, photoURL, uid, email, phoneNumber } = result.user;

      setUser({
        id: uid,
        name: displayName!,
        email,
        avatar: photoURL!,
        phone: phoneNumber ? phoneNumber : undefined,
        authType: "firebase",
      });
    }
  }

  async function signOut() {
    await auth.signOut();
    setUser({} as User);
  }

  function updateUser(update: UpdateUserProps) {
    setUser({
      id: user.id,
      avatar: user.avatar,
      name: update.name,
      email: update.email,
      phone: update.phone ? update.phone : undefined,
      authType: user.authType,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithFirebase,
        signOut,
        updateUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
