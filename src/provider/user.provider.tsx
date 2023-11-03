import React, {useCallback, useState} from "react";
import {dataTypeAuthentication, UserContextInterface, UserData} from "../types";
import { UserContext } from "../context";
import {
    createAuthUserWithEmailAndPassword, getCurrentUserUtil,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup, signOutUser
} from "../utils/firebase/firebase.utils";


export interface userProviderProps {
    children : React.ReactNode
}

export const UserProvider = ({children} : userProviderProps) => {
    const [ userData, setUserData ] = useState<UserData>();

    const signInWithEmail = useCallback(async ({ email, password } : dataTypeAuthentication)=> {
        try{
            const userInformation = await signInAuthUserWithEmailAndPassword(email, password);
            if(userInformation){
                setUserData({
                    createdAt : userInformation.user.metadata.lastSignInTime,
                    displayName : email,
                    email
                });
            }
        }catch (e) {
            console.log((e as Error).message);
        }
    }, [userData])

    const sigInWithGoogle =  useCallback(async ()=>{
        try{
            const userInformation = await signInWithGooglePopup();
            if(userInformation){
                setUserData({
                    createdAt : userInformation.user.metadata.lastSignInTime,
                    displayName : userInformation.user.providerData[0].email || '',
                    email : userInformation.user.providerData[0].email || ''
                });
            }
        }catch (e) {
            console.log((e as Error).message);
        }
    }, [userData])

    const signUp =  useCallback(async ({ email, password } : dataTypeAuthentication)=> {
        try{
            const userInformation = await createAuthUserWithEmailAndPassword(email, password);
            if(userInformation){
                setUserData({
                    createdAt : userInformation.user.metadata.lastSignInTime,
                    displayName : email,
                    email
                });
            }
        }catch (e) {
            console.log((e as Error).message);
        }
    }, [userData])

    const signOut = useCallback(async ()=>{
        await signOutUser();
        setUserData(undefined);
    }, [userData])

    const getCurrentUser = useCallback( async () => {
        if(userData) return true;
        const user = await getCurrentUserUtil();
        if(user){
            setUserData({
                createdAt : user.metadata.lastSignInTime,
                email : user.providerData[0].email || '',
                displayName : user.providerData[0].email || ''
            });
            return true;
        }
        return false;
    }, [])

    const userConetextValue : UserContextInterface = {
        userData,
        getCurrentUser,
        sigInWithGoogle,
        signUp,
        signInWithEmail,
        signOut,
    }

    return(
        <UserContext.Provider value = {userConetextValue}>
            {children}
        </UserContext.Provider>
    )





}