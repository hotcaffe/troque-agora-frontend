"use client"

import { Header } from "@/components/base/Header";
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function PrivateLayout({children}: {children: ReactNode}) {
    return (
        <Box pb="40px" >
            <Header/>
            <Box px="20px">
                {children}
            </Box>
        </Box>
    )
}