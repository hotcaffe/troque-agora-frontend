"use client"

import { theme } from "@/config/theme";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";

export function ConfigComponent({children}: {children: ReactNode}) {
    return (
        <ChakraProvider theme={theme}>
                {children}
        </ChakraProvider>
    )
}