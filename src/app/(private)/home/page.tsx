"use client"

import { ProductCardList } from "@/components/common/ProductCardList";
import { FilterCardList } from "@/components/home/FilterCardList";
import { Flex } from "@chakra-ui/react";

export default function Page() {
    return (
        <Flex align="center" direction='column'>
            <FilterCardList maxW="800px" mb="40px"/>
            <ProductCardList maxW="1050px"/>
        </Flex>
    )
}