import { Header } from "@/components/base/Header";
import { ReactNode } from "react";

export default function PrivateLayout({children}: {children: ReactNode}) {
    return (
        <>
            <Header/>
            {children}
        </>
    )
}