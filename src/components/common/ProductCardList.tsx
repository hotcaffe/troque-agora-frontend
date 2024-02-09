import { Box, Center, Checkbox, Circle, Flex, FlexProps, Icon, Spinner, VStack, useToast } from "@chakra-ui/react";
import { ProductCard } from "./ProductCard";
import { useInfiniteQuery } from "react-query";
import { IAnuncioTroca } from "@/interfaces/anuncioTroca";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";;
import { X, Check, Repeat } from "react-feather";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface IProductCardList extends FlexProps {
    generalProposal?: boolean;
}

export function ProductCardList({...rest}: IProductCardList) {
    const toast = useToast();
    const router = useRouter();
    const [filters, setFilters] = useState()
    const [generalProposal, setGeneralProposal] = useState(false);

    const {register, handleSubmit, formState} = useForm();

    async function get(filters: any, pageParam: number): Promise<IAnuncioTroca[]> {
        return await api.get('/notice').then(res => res.data)
    }

    function createProposal(notices: {[K: string]: boolean}) {
        console.log(Object.entries(notices).filter(([key, value]) => value).map(notice => notice[0]))
        const _notices = Object.entries(notices).filter(([key, value]) => value).map(notice => notice[0]);
        router.push('/contra-proposta?notices=' + _notices.join(','))
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
    
    if (isLoading) 
        return (
            <Center w="100%" h="100%">
                <Spinner/>
            </Center>
        )

    return (
        <Box as='form'>
            <Flex {...rest} gap="10px" wrap="wrap" w="100%">
                {data?.pages.map(products => 
                    <>
                        {
                            products.map((product) => 
                                <ProductCard 
                                    key={`${product.id_anuncioTroca}-${product.id_usuarioAnuncio}`} 
                                    product={product}
                                    generalProposal={generalProposal}
                                    register={register}
                                />
                            )
                        }
                    </>
                )}
            </Flex>
            {generalProposal ? 
                <VStack>
                    <Circle cursor="pointer" _hover={{filter: 'brightness(0.90)'}} bg="white" minW="40px" minH="40px" boxShadow="base"
                        position="fixed"
                        right="30px"
                        bottom="90px"
                        onClick={() => setGeneralProposal(false)}
                        border="1px solid"
                        borderColor="red.300"
                    >
                        <Icon as={X} w="32px" h="32px" color="red.300"/>
                    </Circle>
                    <Circle cursor="pointer" _hover={{filter: 'brightness(0.90)'}} bg="teal.300" minW="60px" minH="60px" boxShadow="base"
                        position="fixed"
                        right="20px"
                        bottom="20px"
                        onClick={handleSubmit(createProposal)}
                    >
                        <Icon as={Check} w="32px" h="32px" color="white"/>
                    </Circle>
                </VStack> :
                <Circle cursor="pointer" _hover={{filter: 'brightness(0.90)'}} bg="white" minW="60px" minH="60px" boxShadow="base"
                    position="fixed"
                    right="20px"
                    bottom="20px"
                    onClick={() => setGeneralProposal(true)}
                >
                    <Icon as={Repeat} w="32px" h="32px" color="teal.800"/>
                </Circle>
            }
        </Box>
    )
}