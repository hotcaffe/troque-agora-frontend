"use client"

import { FormBody } from "@/components/common/FormBody";
import { FormInput } from "@/components/common/FormInput";
import { ProductCardList } from "@/components/common/ProductCardList";
import { api } from "@/utils/api";
import { Box, HStack, Icon, Progress, Spinner, Text, VStack, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "react-feather";
import { useQuery } from "react-query";

export default function Page({params}: {params: {slug: string}}) {
    const router = useRouter();
    const toast = useToast();

    async function get() {
        return await api.get("/users/" + params.slug).then(res => res.data)
    }

    const {data, isLoading, isError,  refetch} = useQuery(['users', params.slug], get, {
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

    const product = {
        id: 1,
        image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: "Produto teste",
        userPercentage: 78,
        value: 2786.99
    }
    const products = Array(10).fill(product).map((el, index) => ({...el, id: index}))

    return (
        <VStack justify="center" gap="25px">
            {data ? 
                <VStack rounded="10px" p="20px" maxW="900px" bg="white" shadow="md" gap="50px">
                    <HStack w="100%" justify="space-between">
                        <VStack w="100%" align="start" gap="0px">
                            <HStack >
                                <Text fontSize="24px" fontWeight="semibold" color="teal.800">{data.vc_nome}</Text>
                                <Icon as={CheckCircle} color="teal.300" w="24px" h="24px"/>
                            </HStack>
                            <Text>{data.vc_cidade} - {data.vc_estado}</Text>
                        </VStack>
                        <Box >
                            <FormInput error="" title='Avaliação geral do anunciante:'>
                                <HStack gap="20px" justify="end">
                                    <Progress value={data.tx_avaliacaoGeral} w="300px" rounded="5px" colorScheme="teal" h="15px" bg="gray.200"/>
                                    <Text color="teal.300" fontWeight="semibold">{data.tx_avaliacaoGeral}%</Text>
                                </HStack>
                            </FormInput>
                        </Box>
                    </HStack>
                    <FormBody title="Informações do perfil" titleDivider>
                        <FormInput w="fit-content" title='Trocas recebidas' error="">
                            <HStack color="gray.500">
                                <Text  w="fit-content" fontWeight="bold" color="teal.300">{data.qt_trocasRecebidas}</Text>
                                <Text>trocas recebidas de outros usuários</Text>
                            </HStack>
                        </FormInput>
                        <FormInput w="fit-content" error="" title='Trocas aceitas:'>
                            <HStack color="gray.500">
                                <Text w="fit-content" fontWeight="bold" color="teal.300">{data.qt_trocasAceitas}</Text>
                                <Text>trocas aceitas de outros usuários</Text>
                            </HStack>
                        </FormInput>
                        <FormInput w="fit-content" error="" title='Trocas realizadas:'>
                            <HStack color="gray.500">
                                <Text w="fit-content" fontWeight="bold" color="teal.300">{data.qt_trocasSucedidas}</Text>
                                <Text>trocas bem sucedidas</Text>
                            </HStack>
                        </FormInput>
                        <FormInput w="fit-content" error="" title='Trocas enviadas:'>
                            <HStack color="gray.500">
                                <Text w="fit-content" fontWeight="bold" color="teal.300">{data.qt_trocasEnviadas}</Text>
                                <Text>trocas recebidas de outros usuários</Text>
                            </HStack>
                        </FormInput>
                        <FormInput w="fit-content" error="" title='Trocas recusadas:'>
                            <HStack color="gray.500">
                                <Text w="fit-content" fontWeight="bold" color="teal.300">{data.qt_trocasRecusadas}</Text>
                                <Text>trocas recusadas de outros usuários sucedidas</Text>
                            </HStack>
                        </FormInput>
                    </FormBody>
                </VStack> :
                <Spinner />
            } 
            <VStack maxW="875px" align="start" fontWeight="semibold" gap="15px">
                <Text>Anúncios desta pessoa:</Text>
                <ProductCardList products={products} />

            </VStack>
        </VStack>
    )
}