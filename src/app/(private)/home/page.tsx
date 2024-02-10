"use client"

import { ProductCardList } from "@/components/common/ProductCardList";
import { FilterCardList } from "@/components/home/FilterCardList";
import { ICategory } from "@/interfaces/category";
import { INotice } from "@/interfaces/notice";
import { api } from "@/utils/api";
import { Flex, useToast } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";

export default function Page() {
    const [filters, setFilters] = useState<ICategory | undefined>();
    const toast = useToast();
    const params = useSearchParams();

    function changeFilters(filter: ICategory) {
        if (filters?.id_categoria == filter.id_categoria) {
            setFilters(undefined)
        } else {
            setFilters(filter);
        }
    }

    async function get(filters?: ICategory, pageParam?: number): Promise<INotice[]> {
        const search = params.get('search')
        return await api.get('/notice', {
            params: {
                id_categoria: filters?.id_categoria,
                vc_titulo: search
            }
        }).then(res => res.data)
    }

    const {data, isLoading} = useInfiniteQuery({
        queryKey: ['notices', filters],
        queryFn: ({pageParam = 1}) => get(filters, pageParam),
        onError: (err: any) => {
            toast({
                description: "Erro ao carregar anúncio para edição",
                status: "error"
            })
        }
    })

    return (
        <Flex align="center" direction='column'>
            <FilterCardList changeFilters={changeFilters} filters={filters} maxW="800px" mb="40px"/>
            <ProductCardList data={data} isLoading={isLoading} filters={filters} maxW="1050px"/>
        </Flex>
    )
}