"use client"
import { ProductCardList } from "@/components/common/ProductCardList";
import { NoticeCard } from "@/components/notice/NoticeCard";
import { NoticeInterestsCard } from "@/components/notice/NoticeInterestsCard";
import { Avatar, AvatarBadge, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Divider, Flex, HStack, Stack, Text, VStack } from "@chakra-ui/react";

const noticeData = {
    title: "Lorem ipsum dolor sit amet, sed do eiusmod tempor", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor:", 
    noticeTotalValue: 2049, 
    noticeUnit: "PC", 
    noticeQuantity: 5, 
    advertiserChanges: 1320, 
    advertiserReceivedChanges: 23320, 
    advertiserRate: 75, 
    topicList: [
        "Lorem ipsum dolor sit amet",
        "Consetectur adipiscing elit",
        "Sed do eiusmod tempor",
        "Consectetur adipiscing elit",
        "Lorem ipsum dolor sit amet",
        "Sed do eiusmod tempor",
        "Sed do eiusmod tempor",
        "Sed do eiusmod tempor"
    ], 
    imageList: [
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1937&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ]
}

const interestsData = [
    {
        title: "Lorem ipsum dolor",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor"
    },
    {
        title: "Lorem ipsum dolor",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor"
    },
    {
        title: "Lorem ipsum dolor",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor"
    }
]

const navigationList = [
    {
        displayName: 'Voltar',
        link: '/home'
    },
    {
        displayName: 'Anúncio'
    }
]

const user = {
    name: "Raphael Fusco",
    email: "raphaelfusco@dominio.com"
}

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
        <VStack w="fit-content" m="auto" gap="25px">
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
            <HStack gap="10px" w="100%">
                <Avatar size="sm"/>
                <VStack align="start" gap="0">
                    <Text fontWeight="semibold" color="teal.800">{user.name}</Text>
                    <Text fontSize="12px" color="teal.800">{user.email}</Text>
                </VStack>
            </HStack>
            <Flex gap="10px">
                <NoticeCard 
                    title={noticeData.title} 
                    description={noticeData.description} 
                    noticeTotalValue={noticeData.noticeTotalValue}
                    noticeUnit={noticeData.noticeUnit}
                    noticeQuantity={noticeData.noticeQuantity}
                    advertiserChanges={noticeData.advertiserChanges}
                    advertiserReceivedChanges={noticeData.advertiserReceivedChanges}
                    advertiserRate={noticeData.advertiserRate}
                    topicList={noticeData.topicList}
                    imageList={noticeData.imageList}
                />
                <NoticeInterestsCard interestList={interestsData}/>
            </Flex>
            <VStack w="fit-content" align="start" mt="40px" gap="20px">
                <Text fontWeight="semibold" color="teal.800">Outros anúncios semelhantes:</Text>
                <ProductCardList products={products} maxW="1000px"/>
            </VStack>
        </VStack>
    )
}