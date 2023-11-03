export type ObjectToAdd = {
    title : string;
}


export type AdditionalInformation = {
    displayName ?: string;
}

export type UserData = {
    createdAt ?: string;
    displayName : string;
    email : string;
}

export interface UserContextInterface {
    userData?: UserData,
    signInWithEmail: (user: dataTypeAuthentication) => Promise<void>,
    sigInWithGoogle: () => Promise<void>,
    signUp: (user: dataTypeAuthentication) => Promise<void>,
    signOut: () => Promise<void>,
    getCurrentUser: () => Promise<boolean>

}

export type dataTypeAuthentication = {
    email : string,
    password : string
}