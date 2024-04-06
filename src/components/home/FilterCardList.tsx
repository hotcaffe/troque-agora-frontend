import { HStack, StackProps } from "@chakra-ui/react";
import { FilterCard } from "./FilterCard";
import { api } from "@/utils/api";
import * as Feather from "react-feather";
import { ICategory } from "@/interfaces/category";
import { useEffect, useState } from "react";

interface IFilterCardList extends StackProps{
    changeFilters: (filter: ICategory) => void;
    filters: ICategory | undefined;
}

async function get(): Promise<ICategory[]> {
    return await api.get('/category').then(res => res.data);
}

export function FilterCardList({changeFilters, filters, ...rest}: IFilterCardList) {
    const [data, setData] = useState<ICategory[]>([]);
    
    useEffect(() => {
        async function exec() {
            const data = await get();
            setData(data)
        };
        exec();
    }, []);

    return (
        <HStack gap="10px" {...rest}>
            {data.map(filter => 
                <FilterCard key={filter.id_categoria} icon={Feather[filter.vc_icone]} title={filter.vc_titulo} onClick={() => changeFilters(filter)} 
                    __css={filters?.id_categoria == filter.id_categoria ? {bg: "teal.800", color: "white"} : {bg: "white", color: "teal.800"}}
                />
            )}
        </HStack>
    )
}