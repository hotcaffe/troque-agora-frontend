import { formatValue } from "@/utils/formatValue";
import { Card, CardFooter, Checkbox, Circle, Divider, Image, Skeleton, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { api } from "@/utils/api";
import { IUserData } from "../../interfaces/profile";
import { INotice } from "@/interfaces/notice";
import { useEffect, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface IProductCard {
    product: INotice;
    generalProposal?: boolean;
    register?: UseFormRegister<FieldValues>;
    maxProposal?: boolean;
}

export function ProductCard({product, generalProposal, register, maxProposal}: IProductCard) {
    const router = useRouter();
    const [isSelected, setIsSelected] = useState(false);

    async function get() {
        const id_usuarioAnuncio = product.id_usuarioAnuncio;
        const id_anuncioTroca = product.id_anuncioTroca

        if (!id_usuarioAnuncio || !id_anuncioTroca) return;

        const images = await api.get('/images', {
            params: {
                id_usuarioAnuncio: id_usuarioAnuncio,
                id_anuncioTroca: id_anuncioTroca,
            }
        }).then(res => res.data).then(array => array[0]?.imageList);

        const userData = await api.get('/users/' + id_usuarioAnuncio).then(res => res.data) as IUserData;

        return {
            images,
            userData
        }
    }

    const {data, isLoading} = useQuery('notice-info', get)

    useEffect(() => {
        setIsSelected(false)
    }, [generalProposal])

    if (isLoading) return <Skeleton w="165px" h="240px"/>

    return (
         <Card w="165px" h="240px" bg="white" px="5px" py="10px" gap="5px"  cursor="pointer" justify="space-between"
            onClick={() => !generalProposal && router.push('/produtos/' + `${product.id_anuncioTroca}-${product.id_usuarioAnuncio}`)}
            border={isSelected ? "2px solid" : "none"} 
            borderColor="teal.300" 
            filter={(!isSelected && maxProposal) ? 'brightness(0.7)' : 'brightness(1)'}
            _hover={(!isSelected && maxProposal) ? {} : {filter: 'brightness(0.95)'}}
         >
            {register && generalProposal &&
                <Checkbox 
                    variant="absolute"
                    {...register("notices", {onChange: (e) => setIsSelected(e.target.checked)})}
                    value={`${product.id_anuncioTroca}-${product.id_usuarioAnuncio}`}
                    isDisabled={!isSelected && maxProposal}
                />
            }
            {generalProposal && <Circle size="20px" bg={isSelected ? "teal.300" : "gray.100"} outline="3px solid" outlineOffset="-3px" outlineColor={isSelected ? "teal.300" : "gray.200"} right="5px" top="5px" position="absolute"/>}
            <Image 
                src={data?.images && data?.images[0]}
                alt={product.vc_titulo}
                borderRadius='lg'
                bg="gray.50"
                h="140px"
                fit="contain"
            />
            <Divider color="gray.200" borderWidth="1px"/>
            <Text fontSize="14px" color="gray.800">
                {product.vc_titulo}
            </Text>
            <CardFooter justify="space-between" p="0">
                <VStack align="flex-start" gap="2px">
                    <Text fontSize="8px" color="gray.800" fontWeight="semibold">Valor a negociar</Text>
                    <Text fontSize="14px" color="teal.300" fontWeight="semibold">{formatValue('currency', product.vl_preco)}</Text>
                </VStack>
                <Divider orientation="vertical" h="30px" borderWidth="1px" borderColor="teal.800"/>
                <VStack align="flex-end" gap="2px">
                    <Text fontSize="8px" color="gray.800" fontWeight="semibold">Avaliação</Text>
                    <Text fontSize="14px" color="teal.300" fontWeight="semibold">{data?.userData?.avaliacaoUsuario.tx_avaliacaoGeral}%</Text>
                </VStack>
            </CardFooter>
         </Card>
    )
}