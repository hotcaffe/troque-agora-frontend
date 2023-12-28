import { Header } from "@/components/base/Header";
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function PrivateLayout({children}: {children: ReactNode}) {
    return (
        <Box pb="40px">
            <Header/>
            {children}
        </Box>
    )
}