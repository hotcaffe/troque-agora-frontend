import { Box, Center, Checkbox, Circle, Flex, FlexProps, Icon, Input, Spinner, Text, VStack, useToast } from "@chakra-ui/react";
import { ProductCard } from "./ProductCard";
import { useInfiniteQuery } from "react-query";
import { IAnuncioTroca } from "@/interfaces/anuncioTroca";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";;
import { X, Check, Repeat } from "react-feather";
import { useForm, useWatch } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { ICategoria } from "@/interfaces/categoria";

interface IProductCardList extends FlexProps {
    generalProposal?: boolean;
    filters: ICategoria | undefined;
}

export function ProductCardList({filters, ...rest}: IProductCardList) {
    const toast = useToast();
    const router = useRouter();
    const params = useSearchParams();
    const [generalProposal, setGeneralProposal] = useState(false);
    const [maxProposal, setMaxProposal] = useState(false);
    
    const {register, handleSubmit, control, reset} = useForm();
    const watch = useWatch({control})

    async function get(filters?: ICategoria, pageParam?: number): Promise<IAnuncioTroca[]> {
        const search = params.get('search')
        return await api.get('/notice', {
            params: {
                id_categoria: filters?.id_categoria,
                vc_titulo: search
            }
        }).then(res => res.data)
    }

    function createProposal({notices}: {[K: string]: string[]}) {
        if (notices.length <= 0) {
            toast({
                title: "Selecione ao menos um anúncio para oferecer sua contra-proposta!",
                status: "info"
            })
            return;
        }
        router.push('/contra-proposta?notices=' + JSON.stringify(notices || '[]'))
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

    useEffect(() => {
        if (watch.notices && watch.notices.length >= 10) setMaxProposal(true)
        else if (maxProposal && watch.notices.length < 10) setMaxProposal(false)
    }, [watch])

    if (isLoading) 
        return (
            <Center w="100%" h="100%">
                <Spinner/>
            </Center>
        )

    return (
        <Box as='form'>
            {generalProposal && 
                <Text mb="20px" color="teal.800" fontWeight="semibold">
                    Selecione os anuncios que deseja atribuir sua contra-proposta geral ({watch?.notices ? watch.notices.length : "0"}/10)
                </Text>
            }
            <Flex {...rest} gap="10px" wrap="wrap" w="100%">
                {data?.pages[0].length ? 
                data.pages.map(products => 
                    <>
                        {
                            products.map((product) => 
                                <ProductCard 
                                    key={`${product.id_anuncioTroca}-${product.id_usuarioAnuncio}`} 
                                    product={product}
                                    generalProposal={generalProposal}
                                    register={register}
                                    maxProposal={maxProposal}
                                />
                            )
                        }
                    </>
                ) :
                <Text>Nenhum produto encontrado com estes parâmetros.</Text>
                }
            </Flex>
            {generalProposal ? 
                <VStack>
                    <Circle cursor="pointer" _hover={{filter: 'brightness(0.90)'}} bg="white" minW="40px" minH="40px" boxShadow="base"
                        position="fixed"
                        right="30px"
                        bottom="90px"
                        onClick={() => {reset(); setGeneralProposal(false); setMaxProposal(false)}}
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