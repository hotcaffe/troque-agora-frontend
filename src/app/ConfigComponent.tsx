"use client"

import { theme } from "@/config/theme";
import { RequestHandlerProvider } from "@/contexts/RequestHandlerContext";
import { UserProvider } from "@/contexts/UserContext";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export function ConfigComponent({children}: {children: ReactNode}) {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <RequestHandlerProvider>
                    <UserProvider>
                        {children}
                    </UserProvider>

                </RequestHandlerProvider>
            </ChakraProvider>
        </QueryClientProvider>
    )
}