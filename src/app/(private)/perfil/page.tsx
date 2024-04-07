"use client"

import { NoticeHistory } from "@/components/profile/NoticeHistory.tsx/NoticeHistory";
import { Profile } from "@/components/profile/Profile";
import { ProposalHistory } from "@/components/profile/ProposalHistory/ProposalHistory";
import { UserContext } from "@/contexts/UserContext";
import { setCustomCSS } from "@/utils/setCustomCss";
import {  Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";


const _cssTab = {
    default: {
        fontWeight:"semibold",
        border:"none",
        w:"180px",
        h:"40px",
        rounded:"10px",
        shadow:"sm",
        outline: "2px solid",
        outlineColor: "teal.300"
    },
    selected: {
        bg: "teal.300",
        color: "white"
    },
    unselected: {
        bg: "white",
        color: "teal.300"
    }
}

export default function Page() {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <VStack justify="center">
            <Tabs onChange={setTabIndex} >
                <TabList gap="15px" py="10px" border="none" justifyContent="center">
                    <Tab {...setCustomCSS(_cssTab, {selectorIndex: tabIndex, index: 0})}>Meu perfil</Tab>
                    <Tab {...setCustomCSS(_cssTab, {selectorIndex: tabIndex, index: 1})}>Contra-propostas</Tab>
                    <Tab {...setCustomCSS(_cssTab, {selectorIndex: tabIndex, index: 2})}>Anúncios</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Profile/>
                    </TabPanel>
                    <TabPanel>
                        <ProposalHistory />
                    </TabPanel>
                    <TabPanel>
                        <NoticeHistory />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </VStack>
    )
}