import { Image } from "@chakra-ui/react";

interface INoticeMiniaturePreview {
    source: string;
    onClick: () => void;
}

export function NoticeMiniaturePreview({source, onClick}: INoticeMiniaturePreview) {
    return (
        <Image alt="Imagem do produto do anúncio" src={source} onClick={onClick} 
            maxW="100px" minH="100px" maxH="100px" minW="100px" rounded="5px" objectFit="cover" bg="gray.100"
            _hover={{filter: 'brightness(0.80)'}} cursor="pointer"
        />
    )
}