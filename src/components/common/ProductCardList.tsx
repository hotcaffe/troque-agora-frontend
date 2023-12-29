import { Flex, FlexProps } from "@chakra-ui/react";
import { ProductCard } from "./ProductCard";

interface IProductCardList extends FlexProps {
    products: any[]; //Subtituir pelo array da interface do item
}

export function ProductCardList({products, ...rest}: IProductCardList) {
    return (
        <Flex {...rest} gap="10px" wrap="wrap" justify="center" w="100%">
            {products.map(product => 
                <ProductCard key={product.id} image={product.image} title={product.title} userPercentage={product.userPercentage} value={product.value}/>)
            }
        </Flex>
    )
}