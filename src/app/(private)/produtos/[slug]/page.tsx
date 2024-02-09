"use client"
import { ProductCardList } from "@/components/common/ProductCardList";
import { Notice } from "@/components/notice/Notice";
import { NoticeCard } from "@/components/notice/NoticeCard";
import { NoticeInterestsCard } from "@/components/notice/NoticeInterestsCard";
import { IUserData, IUserReview } from "@/components/profile/interface/profile";
import { Proposal } from "@/components/proposal/Proposal";
import { IAnuncioTroca } from "@/interfaces/anuncioTroca";
import { api } from "@/utils/api";
import { Avatar, AvatarBadge, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Divider, Flex, HStack, Skeleton, Stack, Text, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";

const product = {
    id: 1,
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: "Produto teste",
    userPercentage: 78,
    value: 2786.99
}
const products = Array(10).fill(product).map((el, index) => ({...el, id: index}))

export default function Page({params}: {params: {slug: string}}) {
    console.log(params)
    const [proposal, setProposal] = useState(false);

    const toast = useToast();

    async function get() {
        const [id_anuncioTroca, id_usuarioAnuncio] = params.slug.split('-')
        
        const notice = await api.get('/notice', {
            params: {
                id_anuncioTroca,
                id_usuarioAnuncio
            }
        }).then(res => res.data[0])

        const images = await api.get('/images', {
            params: {
                id_usuarioAnuncio: id_usuarioAnuncio,
                id_anuncioTroca: id_anuncioTroca,
            }
        }).then(res => res.data).then(array => array[0]?.imageList);

        const userData = await api.get('/users/' + id_usuarioAnuncio).then(res => res.data) as IUserData;

        return {notice, images, userData}
    }

    const {data, isLoading} = useQuery(['notices', params.slug], get,
        {
            onError: (err: any) => {
                toast({
                    description: "Erro ao carregar anúncio para edição",
                    status: "error"
                })
            }
        }
    ) 

    if (isLoading || !data) {
        return (
            <Skeleton />
        )
    }

    return (
        <VStack w="fit-content" m="auto" gap="15px">
            {params.slug}
            <HStack w="100%">
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
                                Anúncio
                            </Button>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {proposal && <BreadcrumbItem >
                        <BreadcrumbLink>
                            <Button w="100px" h="30px" rounded="15px" variant='secondary'>
                            Proposta
                            </Button>
                        </BreadcrumbLink>
                    </BreadcrumbItem>}
                </Breadcrumb>
            </HStack>
            <Divider borderWidth="2px" borderColor="white"/>
            {proposal ? <Proposal setProposal={setProposal}/> : <Notice setProposal={setProposal} notice={data.notice} userData={data.userData} images={data.images}/>}
            <VStack w="fit-content" align="start" mt="40px" gap="20px">
                <Text fontWeight="semibold" color="teal.800">Outros anúncios semelhantes:</Text>
                <ProductCardList maxW="1050px"/>
            </VStack>
        </VStack>
    )
}