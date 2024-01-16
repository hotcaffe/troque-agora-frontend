import { Box, Divider, Flex, HStack, Heading, VStack } from "@chakra-ui/react";
import { ProposalList } from "./ProposalList";
import { IProposalData } from "@/components/proposal/interfaces/proposal";

interface IProposalHistory {
    received: IProposalData[]
    sent: IProposalData[]
}

export function ProposalHistory({received, sent}: IProposalHistory) {
    return (
        <VStack p="20px 40px" gap="15px" borderRadius="10px" bg="white" w="1000px">
            <Heading fontSize="24px" color="teal.800" w="100%" >Histórico de Contra-propostas</Heading>
            <Divider borderWidth="4px" w="100%" borderColor="gray.50"/>
            <HStack gap="10px" justify="space-between" w="100%" h="100%" align="start">
                <ProposalList title="Enviadas" list={received}/>
                <Divider  minH="830px" bg="gray.50" w="30px"/>
                <ProposalList title="Recebidas" list={sent}/>
            </HStack>
        </VStack>
    )
}