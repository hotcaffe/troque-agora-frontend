import { Divider, HStack, Heading, Skeleton, VStack } from "@chakra-ui/react";
import { ProposalList } from "./ProposalList";
import { INoticeProposal, INoticeProposalFull, IProposalData } from "@/interfaces/proposal";
import { api } from "@/utils/api";
import { useQuery } from "react-query";


export function ProposalHistory() {
    async function get() {
        const sent = await api.get('/proposal/sent', {params: {relations: 'proposal,proposalItems,notice,category'}}).then(res => res.data) as INoticeProposalFull[];
        const received = await api.get('/proposal/received', {params: {relations: 'proposal,proposalItems,notice,user,userAddress,userReview,category'}}).then(res => res.data) as INoticeProposalFull[]
        return {sent, received}
    }

    const {data, isLoading, refetch} = useQuery('proposal-history', get, {
        refetchInterval: 1000 * 60 * 10,
        refetchOnWindowFocus: false
    });

    return (
        <VStack p="20px 40px" gap="15px" borderRadius="10px" bg="white" w="1000px">
            <Heading fontSize="24px" color="teal.800" w="100%" >Histórico de Contra-propostas</Heading>
            <Divider borderWidth="4px" w="100%" borderColor="gray.50"/>
            <HStack gap="10px" justify="space-between" w="100%" h="100%" align="start">
                <Skeleton isLoaded={!isLoading}>{data && <ProposalList title="Enviadas" list={data.sent} owner refetch={refetch}/>}</Skeleton>
                <Divider  minH="830px" bg="gray.50" w="30px"/>
                <Skeleton isLoaded={!isLoading}>{data && <ProposalList title="Recebidas" list={data.received} refetch={refetch}/>}</Skeleton>
            </HStack>
        </VStack>
    )
}