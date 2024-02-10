import { Divider, HStack, Heading, Skeleton, VStack } from "@chakra-ui/react";
import { ProposalList } from "./ProposalList";
import { INoticeProposal, IProposalData } from "@/interfaces/proposal";
import { api } from "@/utils/api";
import { useQuery } from "react-query";


export function ProposalHistory() {
    async function get() {
        const id_usuario = 1; //pegar do cookie do usuário no backend
        const sent = await api.get('/proposal', {params: {id_usuarioProposta: id_usuario}}).then(res => res.data) as IProposalData[];

        const relationTo = await api.get('/notice-proposal', {params: {id_usuarioAnuncio: id_usuario}}).then(res => res.data) as INoticeProposal[];
        const received = await Promise.all(relationTo.map(async (noticeProposal) => {
            const {id_usuarioProposta, id_propostaTroca} = noticeProposal;
            return await api.get('/proposal', {params: {id_usuarioProposta, id_propostaTroca}}).then(res => res.data)
        })) as IProposalData[][] 

        //No caso destas requisições, elas deverão ser realizadas a uma rota do backend que faça o relacionamento automático entre as tabelas, para evitar o array de requisições.

        return {sent, received: received.flat()}
    }

    const {data, isLoading} = useQuery('proposal-history', get, {
        refetchInterval: 1000 * 60 * 10,
        refetchOnWindowFocus: false
    });

    return (
        <VStack p="20px 40px" gap="15px" borderRadius="10px" bg="white" w="1000px">
            <Heading fontSize="24px" color="teal.800" w="100%" >Histórico de Contra-propostas</Heading>
            <Divider borderWidth="4px" w="100%" borderColor="gray.50"/>
            <HStack gap="10px" justify="space-between" w="100%" h="100%" align="start">
                <Skeleton isLoaded={!isLoading}>{data && <ProposalList title="Enviadas" list={data.sent}/>}</Skeleton>
                <Divider  minH="830px" bg="gray.50" w="30px"/>
                <Skeleton isLoaded={!isLoading}>{data && <ProposalList title="Recebidas" list={data.received}/>}</Skeleton>
            </HStack>
        </VStack>
    )
}