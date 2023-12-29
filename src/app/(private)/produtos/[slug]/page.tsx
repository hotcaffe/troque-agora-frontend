"use client"
import { ProductCardList } from "@/components/common/ProductCardList";
import { Notice } from "@/components/notice/Notice";
import { NoticeCard } from "@/components/notice/NoticeCard";
import { NoticeInterestsCard } from "@/components/notice/NoticeInterestsCard";
import { Proposal } from "@/components/proposal/Proposal";
import { Avatar, AvatarBadge, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Divider, Flex, HStack, Stack, Text, VStack } from "@chakra-ui/react";



const navigationList = [
    {
        displayName: 'Voltar',
        link: '/home'
    },
    {
        displayName: 'Anúncio'
    }
]



const product = {
    id: 1,
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: "Produto teste",
    userPercentage: 78,
    value: 2786.99
}
const products = Array(10).fill(product).map((el, index) => ({...el, id: index}))

export default function Page({params}: {params: {slug: number}}) {

    return (
        <VStack w="fit-content" m="auto" gap="15px">
            {params.slug}
            <HStack w="100%">
                <Breadcrumb separator={<Divider borderWidth="3px" borderColor="teal.200" w="10px"/>}>
                    {navigationList.map(item => 
                        <BreadcrumbItem key={item.displayName}>
                            <BreadcrumbLink href={item.link ? "/home" : "#"}>
                                <Button w="100px" h="30px" rounded="15px" variant={item.link ? 'base' : 'secondary'}>
                                    {item.displayName}
                                </Button>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    )}
                </Breadcrumb>
            </HStack>
            <Divider borderWidth="2px" borderColor="white"/>
            {/* <Notice /> */}
            <Proposal/>
            <VStack w="fit-content" align="start" mt="40px" gap="20px">
                <Text fontWeight="semibold" color="teal.800">Outros anúncios semelhantes:</Text>
                <ProductCardList products={products} maxW="1000px"/>
            </VStack>
        </VStack>
    )
}