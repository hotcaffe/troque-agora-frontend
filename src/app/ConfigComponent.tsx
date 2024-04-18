"use client"

import { theme } from "@/config/theme";
import { RequestHandlerProvider } from "@/contexts/RequestHandlerContext";
import { UserProvider } from "@/contexts/UserContext";
import { verifiyRouteVisibility } from "@/utils/verifyRouteVisibility";
import { Box, ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { PrivateRoutes } from "./PrivateRoutes";

const queryClient = new QueryClient();

export function ConfigComponent({children}: {children: ReactNode}) {
    const pathname = usePathname();

    const isPublicRoute = verifiyRouteVisibility(pathname)

    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <RequestHandlerProvider>
                    <UserProvider>
                        <ColorModeScript initialColorMode='light'/>
                        {isPublicRoute && children}
                        {!isPublicRoute && <PrivateRoutes>{children}</PrivateRoutes>}
                    </UserProvider>
                </RequestHandlerProvider>
            </ChakraProvider>
        </QueryClientProvider>
    )
}