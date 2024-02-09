"use client"

import { ProductCardList } from "@/components/common/ProductCardList";
import { FilterCardList } from "@/components/home/FilterCardList";
import { ICategoria } from "@/interfaces/categoria";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";

export default function Page() {
    const [filters, setFilters] = useState<ICategoria | undefined>();

    function changeFilters(filter: ICategoria) {
        if (filters?.id_categoria == filter.id_categoria) {
            setFilters(undefined)
        } else {
            setFilters(filter);
        }
    }

    return (
        <Flex align="center" direction='column'>
            <FilterCardList changeFilters={changeFilters} filters={filters} maxW="800px" mb="40px"/>
            <ProductCardList filters={filters} maxW="1050px"/>
        </Flex>
    )
}