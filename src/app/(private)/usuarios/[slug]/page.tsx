"use client"

import { FormBody } from "@/components/common/FormBody";
import { FormInput } from "@/components/common/FormInput";
import { ProductCardList } from "@/components/common/ProductCardList";
import { INotice } from "@/interfaces/notice";
import { IUserData } from "@/interfaces/profile";
import { api } from "@/utils/api";
import { Box, HStack, Icon, Progress, Spinner, Text, VStack, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "react-feather";
import { useInfiniteQuery, useQuery } from "react-query";

export default function Page({params}: {params: {slug: string}}) {
    const router = useRouter();
    const toast = useToast();

    async function get() {
        return await api.get("/users/" + params.slug).then(res => res.data) as IUserData
    }

    const {data, isLoading} = useQuery(['users', params.slug], get, {
        onError: (err: any) => {
            if ([401, 404].includes(err?.response?.status)) {
                toast({
                    description: "Usuário não encontrado!",
                    status: "info"
                })
            } else {
                toast({
                    description: "Erro ao carregar perfil do usuário.",
                    status: "error"
                })
            }
            router.push("/");
        }
    })

    async function getNotices(id_usuarioPerfil: string, pageParam?: number): Promise<INotice[]> {
        return await api.get('/notice', {
            params: {
                id_usuarioAnuncio: id_usuarioPerfil
            }
        }).then(res => res.data)
    }

    const {data: noticeData, isLoading: noticeIsLoading} = useInfiniteQuery({
        queryKey: ['notices', params.slug],
        queryFn: ({pageParam = 1}) => getNotices(params.slug, pageParam),
        onError: (err: any) => {
            toast({
                description: "Erro ao carregar anúncio para edição",
                status: "error"
            })
        }
    })

    if (isLoading) {
        return (
            <VStack justify="center" gap="25px">
                <Spinner />
            </VStack>
        )
    }

    if (!data) {
        return (
            <VStack gap="20px" borderRadius="10px" bg="white" w="1000px" py="20px" px="40px">
                <Text>Não foi possível recuperar as informações do perfil deste usuário. Tente novamente!</Text>
            </VStack>
        )
    }


    return (
        <VStack justify="center" gap="25px">
            <VStack rounded="10px" p="20px" maxW="900px" bg="white" shadow="md" gap="50px">
                <HStack w="100%" justify="space-between">
                    <VStack w="100%" align="start" gap="0px">
                        <HStack >
                            <Text fontSize="24px" fontWeight="semibold" color="teal.800">{data.vc_nome}</Text>
                            <Icon as={CheckCircle} color="teal.300" w="24px" h="24px"/>
                        </HStack>
                        <Text>{data.enderecoUsuario.vc_cidade} - {data.enderecoUsuario.vc_estado}</Text>
                    </VStack>
                    <Box >
                        <FormInput error="" title='Avaliação geral do anunciante:'>
                            <HStack gap="20px" justify="end">
                                <Progress value={data.avaliacaoUsuario.tx_avaliacaoGeral} w="300px" rounded="5px" colorScheme="teal" h="15px" bg="gray.200"/>
                                <Text color="teal.300" fontWeight="semibold">{data.avaliacaoUsuario.tx_avaliacaoGeral}%</Text>
                            </HStack>
                        </FormInput>
                    </Box>
                </HStack>
                <FormBody title="Informações do perfil" titleDivider>
                    <FormInput w="fit-content" title='Trocas recebidas' error="">
                        <HStack color="gray.500">
                            <Text  w="fit-content" fontWeight="bold" color="teal.300">{data.avaliacaoUsuario.qt_trocasRecebidas}</Text>
                            <Text>trocas recebidas de outros usuários</Text>
                        </HStack>
                    </FormInput>
                    <FormInput w="fit-content" error="" title='Trocas aceitas:'>
                        <HStack color="gray.500">
                            <Text w="fit-content" fontWeight="bold" color="teal.300">{data.avaliacaoUsuario.qt_trocasAceitas}</Text>
                            <Text>trocas aceitas de outros usuários</Text>
                        </HStack>
                    </FormInput>
                    <FormInput w="fit-content" error="" title='Trocas realizadas:'>
                        <HStack color="gray.500">
                            <Text w="fit-content" fontWeight="bold" color="teal.300">{data.avaliacaoUsuario.qt_trocasSucedidas}</Text>
                            <Text>trocas bem sucedidas</Text>
                        </HStack>
                    </FormInput>
                    <FormInput w="fit-content" error="" title='Trocas enviadas:'>
                        <HStack color="gray.500">
                            <Text w="fit-content" fontWeight="bold" color="teal.300">{data.avaliacaoUsuario.qt_trocasEnviadas}</Text>
                            <Text>trocas recebidas de outros usuários</Text>
                        </HStack>
                    </FormInput>
                    <FormInput w="fit-content" error="" title='Trocas recusadas:'>
                        <HStack color="gray.500">
                            <Text w="fit-content" fontWeight="bold" color="teal.300">{data.avaliacaoUsuario.qt_trocasRecusadas}</Text>
                            <Text>trocas recusadas de outros usuários sucedidas</Text>
                        </HStack>
                    </FormInput>
                </FormBody>
            </VStack> :
            <VStack maxW="875px" align="start" fontWeight="semibold" gap="15px">
                <Text>Anúncios desta pessoa:</Text>
                <ProductCardList data={noticeData} isLoading={noticeIsLoading}/>
            </VStack>
        </VStack>
    )
}