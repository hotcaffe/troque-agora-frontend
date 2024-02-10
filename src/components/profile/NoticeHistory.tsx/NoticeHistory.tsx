import { Center, Divider, HStack, Heading, Spinner, Text, VStack, useToast } from "@chakra-ui/react";
import { NoticeList } from "./NoticeList";
import { INoticeData } from "@/interfaces/notice";
import { useQuery } from "react-query";
import { api } from "@/utils/api";
import { RotateCw } from "react-feather";
import { InteractionIcon } from "@/components/common/InteractionIcon";

export function NoticeHistory() {
    const toast = useToast();

    async function get(): Promise<INoticeData[]> {
        return await api.get("/notice").then(res => res?.data);
    }

    const {data, isLoading, isError, refetch} = useQuery('notice-history', get, {
        onError: () => {
            toast({
                description: "Erro ao carregar a lista de anúncios",
                status: "error"
            })
        }
    });

    return (
        <VStack p="20px 40px" gap="15px" borderRadius="10px" bg="white" w="1000px">
            <Heading fontSize="24px" color="teal.800" w="100%" >Seus anúncios</Heading>
            <Divider borderWidth="4px" w="100%" borderColor="gray.50"/>
            <HStack gap="10px" justify="space-between" w="100%" h="100%" align="start" minH="830px">
                <Center w="100%">
                    {isError ? 
                        <HStack gap="5px">
                            <Text fontWeight="semibold" color="gray.500">Erro ao recuperar os dados! Tente novamente.</Text> 
                            <InteractionIcon as={RotateCw} onClick={() => refetch()} aria-label="Recarregar conteúdo" color="teal.300"/>
                        </HStack> :
                        <>
                            {(isLoading || !data) ? <Spinner /> : <NoticeList list={data}/>}
                        </>
                    }
                </Center>
            </HStack>
        </VStack>
    )
}