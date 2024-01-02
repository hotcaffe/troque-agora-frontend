import { formatValue } from "@/utils/formatValue";
import { Card, CardFooter, Divider, Image, Text, VStack } from "@chakra-ui/react";

interface IProductCard {
    title: string;
    image: string;
    value: number;
    userPercentage: number;
}

export function ProductCard({title, image, value, userPercentage}: IProductCard) {
    return (
         <Card w="165px" h="240px" bg="white" px="5px" py="10px" gap="5px" _hover={{filter: 'brightness(0.95)'}} cursor="pointer" justify="space-between">
            <Image 
                src={image}
                alt={title}
                borderRadius='lg'
                bg="gray.50"
                h="140px"
                fit="contain"
            />
            <Divider color="gray.200" borderWidth="1px"/>
            <Text fontSize="12px" color="gray.400">
                {title}
            </Text>
            <CardFooter justify="space-between" p="0">
                <VStack align="flex-start" gap="2px">
                    <Text fontSize="8px" color="gray.800" fontWeight="semibold">Valor a negociar</Text>
                    <Text fontSize="14px" color="teal.300" fontWeight="semibold">{formatValue('currency', value)}</Text>
                </VStack>
                <Divider orientation="vertical" h="30px" borderWidth="1px" borderColor="teal.800"/>
                <VStack align="flex-end" gap="2px">
                    <Text fontSize="8px" color="gray.800" fontWeight="semibold">Avaliação</Text>
                    <Text fontSize="14px" color="teal.300" fontWeight="semibold">{userPercentage}%</Text>
                </VStack>
            </CardFooter>
         </Card>
    )
}