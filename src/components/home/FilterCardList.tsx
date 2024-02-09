import { HStack, StackProps } from "@chakra-ui/react";
import { FilterCard } from "./FilterCard";
import { api } from "@/utils/api";
import { Truck } from "react-feather";
import { ICategoria } from "@/interfaces/categoria";
import { useEffect, useState } from "react";

interface IFilterCardList extends StackProps{
    changeFilters: (filter: ICategoria) => void;
    filters: ICategoria | undefined;
}

async function get(): Promise<ICategoria[]> {
    return await api.get('/categories').then(res => res.data);
}

export function FilterCardList({changeFilters, filters, ...rest}: IFilterCardList) {
    const [data, setData] = useState<ICategoria[]>([]);
    
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
                <FilterCard key={filter.id_categoria} icon={Truck} title={filter.vc_titulo} onClick={() => changeFilters(filter)} 
                    __css={filters?.id_categoria == filter.id_categoria ? {bg: "teal.800", color: "white"} : {bg: "white", color: "teal.800"}}
                />
            )}
        </HStack>
    )
}