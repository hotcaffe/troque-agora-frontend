"use client"

import { ProductCardList } from "@/components/common/ProductCardList";
import { FilterCardList } from "@/components/home/FilterCardList";
import { Circle, Flex, Icon, Text } from "@chakra-ui/react";
import { Repeat, Truck } from "react-feather";

const filter = {
    id: 1,
    icon: Truck,
    title: "Teste"
}
const filters = Array(10).fill(filter).map((el, index) => ({...el, id: index}));

const product = {
    id: 1,
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: "Produto teste",
    userPercentage: 78,
    value: 2786.99
}
const products = Array(10).fill(product).map((el, index) => ({...el, id: index}))

export default function Page() {
    return (
        <Flex align="center" direction='column'>
            <FilterCardList filters={filters} maxW="800px" mb="40px"/>
            <ProductCardList products={products} maxW="1050px"/>
            <Circle cursor="pointer" _hover={{filter: 'brightness(0.90)'}} bg="white" minW="60px" minH="60px" boxShadow="base"
                position="fixed"
                right="20px"
                bottom="20px"
            >
                <Icon as={Repeat} w="32px" h="32px" color="teal.800"/>
            </Circle>
        </Flex>
    )
}