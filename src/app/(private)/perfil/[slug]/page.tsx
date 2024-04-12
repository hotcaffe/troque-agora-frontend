"use client"

import { ProductCardList } from "@/components/common/ProductCardList";
import { INoticeData, INoticeFull } from "@/interfaces/notice";
import { IUserData } from "@/interfaces/profile";
import { api } from "@/utils/api";
import { Divider, HStack, Heading, Icon, Progress, Skeleton, Text, VStack, useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CheckCircle, XCircle } from "react-feather";
import { useInfiniteQuery, useQuery } from "react-query";

const Status = {
    "true": <Icon as={CheckCircle} color="teal.300" w="20px" h="20px"/>,
    "false": <Icon as={XCircle} color="red.300" w="20px" h="20px"/>
} as any;

export default function Page({params}: {params: {slug: string}}) {
    const {slug} = params;
    const toast = useToast();
    const router = useRouter();

    async function get(): Promise<IUserData> {
        if (isNaN(Number(slug))) {
            return await api.get("/user/", {
                params: {
                    username: slug
                }
            }).then(res => res?.data);
        } else {
            return await api.get("/user/" + slug).then(res => res?.data);
        }
    }

    async function getNotices(page: number): Promise<INoticeFull[]>{
        if (user) {
            return await api.get("/notice/list", {
                params: {
                    id_usuarioAnuncio: user.id_usuario
                }
            }).then(res => res?.data);
        }

        return {} as INoticeFull[];
    }

    const {data: user, isLoading, isError} = useQuery(['user', slug], get, {
        refetchInterval: 0,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: 0,
        onError: (error: AxiosError) => {
            toast({title: "Erro ao buscar dados do usuário!", position: "bottom", status: "error"})
        }
    })

    const {data: notices, isLoading: isNoticesLoading} = useInfiniteQuery({
        queryKey: ['notices-user', user],
        queryFn: ({pageParam = 1}) => getNotices(pageParam),
        refetchInterval: 0,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: 0
    })

    if (isError) {
        return (
            <VStack w="100%">
                <Text>Erro ao recuperar usuário!</Text>
            </VStack>
        )
    }

    useEffect(() => {
        if (!user && !isLoading) router.push("/home")
    }, [user, isLoading])

    return (
        <VStack w="100%" gap="20px">
            <Skeleton isLoaded={!isLoading}>
                <VStack maxW="800px" minW="800px" p="20px" rounded="10px" shadow="base" bg="white">
                    <HStack w="100%" justify="space-between">
                        <VStack gap="2px" align="start">
                            <HStack gap="5px" align="end" title={user?.userReview.bo_seloAtivo ? "Usuário verificado" : "Usuário não verificado"}>
                                <Heading size="md" noOfLines={1} color="teal.800">{user?.vc_nome}</Heading>
                                {Status[String(user?.userReview.bo_seloAtivo)]}
                            </HStack>
                            <Text noOfLines={1} color="teal.800">{user?.userAddress.vc_cidade} - {user?.userAddress.vc_estado}</Text>
                        </VStack>
                        <VStack gap="5px" align="start">
                            <Text color="teal.800" fontWeight="semibold">Avaliação geral do anunciante:</Text>
                            <HStack gap="10px">
                                <Progress colorScheme="teal" rounded="5px" value={Number(user?.userReview.tx_avaliacaoGeral)} w="300px"/>
                                <Text color="teal.300" fontWeight="semibold">{Number(user?.userReview.tx_avaliacaoGeral)?.toFixed(2)}</Text>
                            </HStack>
                        </VStack>
                    </HStack>
                    <Heading size="md" mt="30px" color="teal.800" alignSelf="start">Informações do perfil</Heading>
                    <Divider w="100%" borderWidth="2px" opacity={1} borderColor="teal.300" mt="5px" mb="10px"/>
                    <HStack wrap="wrap" gap="20px">
                        <VStack align="start" gap="2px">
                            <Text fontWeight="semibold" fontSize="14px" color="teal.800">Trocas recebidas:</Text>
                            <HStack gap="5px">
                                <Text fontWeight="semibold" color="teal.300" fontSize="14px">{user?.userReview.qt_trocasRecebidas}</Text>
                                <Text fontSize="12px" color="gray.400">trocas recebidas de outros usuários</Text>
                            </HStack>
                        </VStack>
                        <VStack align="start" gap="2px">
                            <Text fontWeight="semibold" fontSize="14px" color="teal.800">Trocas aceitas:</Text>
                            <HStack gap="5px">
                                <Text fontWeight="semibold" color="teal.300" fontSize="14px">{user?.userReview.qt_trocasAceitas}</Text>
                                <Text fontSize="12px" color="gray.400">trocas recebidas e aceitas</Text>
                            </HStack>
                        </VStack>
                        <VStack align="start" gap="2px">
                            <Text fontWeight="semibold" fontSize="14px" color="teal.800">Trocas realizadas:</Text>
                            <HStack gap="5px">
                                <Text fontWeight="semibold" color="teal.300" fontSize="14px">{user?.userReview.qt_trocasSucedidas}</Text>
                                <Text fontSize="12px" color="gray.400">trocas bem sucedidas</Text>
                            </HStack>
                        </VStack>
                        <VStack align="start" gap="2px">
                            <Text fontWeight="semibold" fontSize="14px" color="teal.800">Trocas enviadas:</Text>
                            <HStack gap="5px">
                                <Text fontWeight="semibold" color="teal.300" fontSize="14px">{user?.userReview.qt_trocasEnviadas}</Text>
                                <Text fontSize="12px" color="gray.400">trocas enviadas para outros usuários</Text>
                            </HStack>
                        </VStack>
                        <VStack align="start" gap="2px">
                            <Text fontWeight="semibold" fontSize="14px" color="teal.800">Trocas recebidas:</Text>
                            <HStack gap="5px">
                                <Text fontWeight="semibold" color="teal.300" fontSize="14px">{user?.userReview.qt_trocasRecusadas}</Text>
                                <Text fontSize="12px" color="gray.400">trocas recibadas e recusadas</Text>
                            </HStack>
                        </VStack>
                    </HStack>
                </VStack>
            </Skeleton>
        
            <Skeleton isLoaded={!isNoticesLoading}>
                <VStack align="start" mt="40px" gap="20px" w="100%" maxW="800px" minW="800px">
                    <Text fontWeight="semibold" color="teal.800">Outros anúncios deste usuário:</Text>
                    <ProductCardList data={notices} isLoading={isNoticesLoading} maxW="1050px"/>
                </VStack>
            </Skeleton>
        </VStack>
    )
}