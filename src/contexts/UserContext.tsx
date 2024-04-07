'use client'

import { IUserTokenData } from "@/interfaces/profile";
import { api } from "@/utils/api";
import { redirect, useRouter } from "next/navigation";
import { Dispatch, ReactNode, SetStateAction, useState, createContext, useEffect } from "react";

interface IUserContext {
    storeUserData: (user: IUserTokenData) => void;
    getUserData: () => IUserTokenData | undefined;
    isAuthenticated: () => Promise<boolean>;
    logout: () => Promise<void>;
}

export const UserContext = createContext({} as IUserContext)

export function UserProvider({children}: {children: ReactNode}) {
    const router = useRouter()

    async function isAuthenticated() {
        try {
            await api.get("/user/me")
            return true
        } catch(error) {
            localStorage.removeItem('user-data')
            router.push("/login")
            return false
        }
    }

    async function logout() {
        try {
            await api.get("/user/logout").then(res => res.data)
            localStorage.removeItem('user-data')
            router.push("/login")
        } catch (error) {
            return;
        }
    }

    function storeUserData(user: IUserTokenData) {
        localStorage.setItem('user-data', JSON.stringify(user))
    }

    function getUserData(): IUserTokenData | undefined {
        try {
            const user = localStorage.getItem('user-data');
            if (user) {
                return JSON.parse(user)
            } else {
                logout()
            }
        } catch (error) {
            logout()
        }
    }
    
    return (
        <UserContext.Provider value={{storeUserData, getUserData, isAuthenticated, logout}}>
            {children}
        </UserContext.Provider>
    )
}