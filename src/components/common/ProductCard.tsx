import { formatValue } from "@/utils/formatValue";
import { Card, CardFooter, Center, Checkbox, Circle, Divider, Icon, Image, Link, Skeleton, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { api } from "@/utils/api";
import { IUserData, IUserTokenData } from "../../interfaces/profile";
import { INotice, INoticeFull } from "@/interfaces/notice";
import { useEffect, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { Image as FeatherImage } from "react-feather";

interface IProductCard {
    product: INoticeFull;
    generalProposal?: boolean;
    register?: UseFormRegister<FieldValues>;
    maxProposal?: boolean;
}

export function ProductCard({product, generalProposal, register, maxProposal}: IProductCard) {
    const router = useRouter();
    const [isSelected, setIsSelected] = useState(false);
    const [unavailable, setUnavailable] = useState(false);

    useEffect(() => {
        setIsSelected(false)
    }, [generalProposal])

    useEffect(() => {
        setUnavailable(!isSelected && !!maxProposal)
    }, [isSelected, maxProposal]);

    useEffect(() => {
        const storage = localStorage.getItem('user-data');
        if (storage) {
            const user = JSON.parse(storage) as IUserTokenData;
            if (user.id_usuario == product.id_usuarioAnuncio) setUnavailable(!!generalProposal)
        }
    }, [generalProposal])

    return (
        <Link href={"/produtos/" + product.user?.id_usuario + "-" + product.id_anuncioTroca} textDecoration="none">
            <Card w="165px" h="240px" bg="white" px="5px" py="10px" gap="5px"  cursor="pointer" justify="space-between"
                onClick={() => !generalProposal && router.push('/produtos/' + `${product.id_usuarioAnuncio}-${product.id_anuncioTroca}`)}
                border={isSelected ? "2px solid" : "none"} 
                borderColor="teal.300" 
                filter={(unavailable) ? 'brightness(0.7)' : 'brightness(1)'}
                _hover={(unavailable) ? {} : {filter: 'brightness(0.95)'}}
            >
                {register && generalProposal &&
                    <Checkbox 
                        variant="absolute"
                        {...register("notices", {onChange: (e) => setIsSelected(e.target.checked)})}
                        value={`${product.id_anuncioTroca}-${product.id_usuarioAnuncio}`}
                        isDisabled={unavailable}
                    />
                }
                {generalProposal && <Circle size="20px" bg={isSelected ? "teal.300" : "gray.100"} outline="3px solid" outlineOffset="-3px" outlineColor={isSelected ? "teal.300" : "gray.200"} right="5px" top="5px" position="absolute"/>}
                <Image 
                    src={product?.images && product?.images[0]?.url}
                    fallback={
                        <Center w="100%" h="100%">
                            <Icon as={FeatherImage} color="gray.400" fontSize="32px"/>
                        </Center>
                    }
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
                        <Text fontSize="14px" color="teal.300" fontWeight="semibold">{product?.user?.userReview?.tx_avaliacaoGeral}%</Text>
                    </VStack>
                </CardFooter>
            </Card>
        </Link>
    )
}