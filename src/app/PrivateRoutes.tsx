import { UserContext } from "@/contexts/UserContext";
import { ReactNode, useContext, useEffect, useState } from "react";

export const PrivateRoutes = ({children}: {children: ReactNode}) => {
    const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false);
    const {isAuthenticated} = useContext(UserContext);

    async function ensureAuthenticated() {
        const response = await isAuthenticated();
        setUserAuthenticated(response);

        return;
    }

    useEffect(() => {
        ensureAuthenticated()
    }, []);

    return (
        <>
            {!userAuthenticated && null}
            {userAuthenticated && <>{children}</>}
        </>
    )
}