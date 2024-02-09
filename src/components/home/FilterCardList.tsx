import { HStack, StackProps } from "@chakra-ui/react";
import { FilterCard } from "./FilterCard";
import { api } from "@/utils/api";
import { Truck } from "react-feather";
import { ICategoria } from "@/interfaces/categoria";

async function get(): Promise<ICategoria[]> {
    return await api.get('/categories').then(res => res.data);
}

export async function FilterCardList({...rest}: StackProps) {
    const data = await get();

    return (
        <HStack gap="10px" {...rest}>
            {data.map(filter => <FilterCard key={filter.id_categoria} icon={Truck} title={filter.vc_titulo} onClick={() => console.log('clicou', filter.vc_titulo)}/>)}
        </HStack>
    )
}