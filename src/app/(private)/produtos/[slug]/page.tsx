"use client"
import { ProductCardList } from "@/components/common/ProductCardList";
import { Notice } from "@/components/notice/Notice";
import { NoticeCard } from "@/components/notice/NoticeCard";
import { NoticeInterestsCard } from "@/components/notice/NoticeInterestsCard";
import { IUserData, IUserReview } from "@/interfaces/profile";
import { Proposal } from "@/components/proposal/Proposal";
import { api } from "@/utils/api";
import { Avatar, AvatarBadge, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Divider, Flex, HStack, Skeleton, Spinner, Stack, Text, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { INotice, INoticeData, INoticeFull } from "@/interfaces/notice";
import { useRouter } from "next/navigation";

export default function Page({params}: {params: {slug: string}}) {
    console.log(params)
    const [proposal, setProposal] = useState(false);
    const router = useRouter();

    const toast = useToast();

    async function get() {
        const [id_usuarioAnuncio, id_anuncioTroca] = params.slug.split('-')
        
        const notice = await api.get('/notice', {
            params: {
                id_anuncioTroca,
                id_usuarioAnuncio,
                relations: 'noticeDetails,user,userReview'
            }
        }).then(res => res.data) as INoticeFull;

        return notice
    }

    const {data: notice, isLoading, isFetching} = useQuery(['notices', params.slug], get,
        {
            onError: (err: any) => {
                toast({
                    description: "Erro ao carregar anúncio para edição",
                    status: "error"
                })
            },
            refetchInterval: 0,
            refetchOnMount: false,
            refetchOnWindowFocus: false
        }
    ) 

    async function getList(pageParam?: number): Promise<INoticeFull[]> {
        if (!notice?.id_categoria) return [];
        return await api.get('/notice/list', {
            params: {
                where : {
                    id_categoria: notice?.id_categoria
                },
                relations: 'user,userReview'
            }
        }).then(res => res.data)
    }

    const {data: listData, isLoading: listIsLoading} = useInfiniteQuery({
        queryKey: ['notices-list', notice?.id_categoria],
        queryFn: ({pageParam = 1}) => getList(pageParam),
        onError: (err: any) => {
            toast({
                description: "Erro ao carregar listagem de anúncios",
                status: "error"
            })
        },
        refetchInterval: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })


    if (isLoading || isFetching) {
        return (
            <VStack gap="15px">
                <Skeleton maxW="1100px" w="100%" h="48px" />
                <Skeleton maxW="1100px" w="100%" h="42px" />
                <HStack w="100%" h="100%" align="center" justify="center">
                    <Skeleton rounded="10px" maxW="800px" w="100%" h="550px"/>
                    <Skeleton rounded="10px" maxW="300px" w="100%" h="550px"/>
                </HStack>
            </VStack>
        )
    }

    if (!notice) {
        return router.push("/")
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
            {proposal ? <Proposal setProposal={setProposal}/> : <Notice setProposal={setProposal} notice={notice}/>}
            <VStack align="start" mt="40px" gap="20px" w="100%">
                <Text fontWeight="semibold" color="teal.800">Outros anúncios semelhantes:</Text>
                <ProductCardList data={listData} isLoading={listIsLoading} maxW="1050px"/>
            </VStack>
        </VStack>
    )
}