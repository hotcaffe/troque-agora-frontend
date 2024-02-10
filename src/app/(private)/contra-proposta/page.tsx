"use client"

import { Proposal } from "@/components/proposal/Proposal";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Divider, HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";

export default function Page() {
    const [proposal, setProposal] = useState(false);

    return (
        <VStack w="fit-content" m="auto" gap="15px">
            <HStack align="start" w="100%">
                <Breadcrumb separator={<Divider borderWidth="3px" borderColor="teal.200" w="10px"/>}>
                    <BreadcrumbItem >
                        <BreadcrumbLink href="/home">
                            <Button w="100px" h="30px" rounded="15px" 
                                variant='base' 
                            >
                                Voltar
                            </Button>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem onClick={() => setProposal(false)}>
                        <BreadcrumbLink>
                            <Button w="100px" h="30px" rounded="15px" variant='secondary'
                                    color={proposal ? "teal.100" : "teal.300"} outlineColor={proposal ? "teal.100" : "teal.300"}
                            >
                                Proposta
                            </Button>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </HStack>
            <Proposal setProposal={setProposal}/>
        </VStack>
    )
}