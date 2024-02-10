"use client"
import { ProductCardList } from "@/components/common/ProductCardList";
import { Notice } from "@/components/notice/Notice";
import { NoticeCard } from "@/components/notice/NoticeCard";
import { NoticeInterestsCard } from "@/components/notice/NoticeInterestsCard";
import { IUserData, IUserReview } from "@/interfaces/profile";
import { Proposal } from "@/components/proposal/Proposal";
import { api } from "@/utils/api";
import { Avatar, AvatarBadge, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Divider, Flex, HStack, Skeleton, Stack, Text, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { INotice, INoticeData } from "@/interfaces/notice";

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
        }).then(res => res.data[0]) as INoticeData;

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

    async function getList(pageParam?: number): Promise<INotice[]> {
        console.log(data?.notice.id_categoria)
        return await api.get('/notice', {
            params: {
                id_categoria: data?.notice.id_categoria,
            }
        }).then(res => res.data)
    }

    const {data: listData, isLoading: listIsLoading} = useInfiniteQuery({
        queryKey: ['notices-list', data?.notice.id_categoria],
        queryFn: ({pageParam = 1}) => getList(pageParam),
        onError: (err: any) => {
            toast({
                description: "Erro ao carregar listagem de anúncios",
                status: "error"
            })
        }
    })

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
            <VStack align="start" mt="40px" gap="20px" w="100%">
                <Text fontWeight="semibold" color="teal.800">Outros anúncios semelhantes:</Text>
                <ProductCardList data={listData} isLoading={listIsLoading} maxW="1050px"/>
            </VStack>
        </VStack>
    )
}