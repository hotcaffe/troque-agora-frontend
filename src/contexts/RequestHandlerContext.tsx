"use client"

import { IUserTokenData } from "@/interfaces/profile";
import { IResponseError } from "@/interfaces/response-error";
import { api } from "@/utils/api";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { redirect, useRouter } from "next/navigation";
import { Dispatch, ReactNode, SetStateAction, useState, createContext, useEffect } from "react";

interface IRequestHandlerContext {

}

export const RequestHandlerContext = createContext({} as IRequestHandlerContext)


export function RequestHandlerProvider({children}: {children: ReactNode}) {
    const router = useRouter();
    const toast = useToast();

    async function logout() {
        await api.get("/user/logout")
        router.push('/login')
        return;
    }

    function redirectUser() {
        router.push("/")
    }

    const actions = {
        'REVOKE_SESSION': logout,
        'REDIRECT_USER': redirectUser
    }

    function getToastStatus(status: number) {
         if (status < 500) {
            return 'warning'
        } else {
            return 'error'
        }
    }
    
    function errorHandler(error: AxiosError) {
        if (error.message == "TA_AXIOS_ERROR") return;

        const data = error.response?.data as IResponseError;
        const statusCode = error.response?.status as any;
        
        if (!data.message || !statusCode) {
            // toast({
            //     title: 'Erro interno',
            //     status: 'error',
            //     position: 'top-right'
            // })
        } else {
            toast({
                title: data.message,
                status: getToastStatus(statusCode),
                position: 'top-right'
            })
        }
        
        if (data.action) {
            actions[data.action]()
        }

        throw new Error("TA_AXIOS_ERROR")
    }

    useEffect(() => {
        api.interceptors.response.use((config) => config, (error) => errorHandler(error))
    }, [])


    return (
        <RequestHandlerContext.Provider value={{}}>
            {children}
        </RequestHandlerContext.Provider>
    )
}