import { HStack, StackProps } from "@chakra-ui/react";
import { FilterCard } from "./FilterCard";

interface IFilterCardList extends StackProps {
    filters: any[];
}

export function FilterCardList({filters, ...rest}: IFilterCardList) {
    return (
        <HStack gap="10px" {...rest}>
            {filters.map(filter => <FilterCard key={filter.id} icon={filter.icon} title={filter.title} onClick={() => console.log('clicou', filter.title)}/>)}
        </HStack>
    )
}