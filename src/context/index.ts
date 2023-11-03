import {createContext} from "react";
import {dataTypeAuthentication, UserContextInterface} from "../types";


export const UserContext = createContext<UserContextInterface>({
    userData : undefined,
    signInWithEmail: async () => {},
    sigInWithGoogle: async () => {},
    signUp:  async () => {},
    signOut:  async () => {},
    getCurrentUser: async () => false,
})