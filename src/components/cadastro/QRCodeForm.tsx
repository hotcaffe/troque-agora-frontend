import { Button, Divider, Flex, HStack, Heading, Image, Square, Text, VStack } from "@chakra-ui/react";
import * as QRCode from 'qrcode'
import { useEffect, useState } from "react";
import celpic from '../../../public/images/cel.png'

interface IQRCodeForm {
    goToNext: (data: any) => void;
    user: any;
}

export function QRCodeForm({goToNext, user}: IQRCodeForm) {
    const [url, setUrl] = useState('');

    useEffect(() => {
        const test = JSON.stringify(user)
        console.log(test) 
        QRCode.toDataURL(test, {width: 800, margin: 1}, (err, url) => setUrl(url))
    }, [])

    return (
        <HStack h="100%">
            <VStack w="70%">
                {/* <Heading my="15px" fontSize="xl" color="teal.300" fontWeight="semibold">
                    Para continuar o cadastro, acesse nosso aplicativo pelo celular
                </Heading> */}
                <Heading w="430px" textAlign="center" fontSize="lg" color="teal.800" fontWeight="semibold" >
                    Aponte a câmera do seu celular para a figura abaixo
                </Heading>
                <Divider  w="430px" borderWidth="2px" borderColor="teal.300" my="10px"/>
                <VStack gap="0">
                    <Square size="430px" mb="15px" outline="1px solid" outlineColor="gray.100" rounded="10px">
                        <Image src={url} w="100%" h="100%"/>
                    </Square>
                    <Text fontSize="14px" color="teal.800">Se tiver dificuldades para ler o código, digite ele manualmente:</Text>
                    <Text fontSize="14px" color="teal.300">{"xjasdjJASIODUJaskld823UICNadadasf[er]fsdf43[~sdfksdfjn38cdsjnc"}</Text>
                </VStack>
                <Button onClick={goToNext}>Continuar</Button>
            </VStack>
            <VStack w="30%" minH="700px" bg="teal.300" rounded="0 10px 10px 0" p="25px 20px" justify="space-between">
                <Heading mb="30px" fontSize="2xl" color="white" fontWeight="semibold">
                    Baixe o aplicativo:
                </Heading>
                <Flex ml="25px">
                    <Image src={celpic.src} rounded="10px"/>
                </Flex>
                <Divider borderWidth="4px" borderColor="teal.00" my="15px" rounded="5px"/>
                <Text color="white" fontWeight="medium" textAlign="center">Após baixar o aplicativo, clique em "COMPLETAR CADASTRO" em seu dispositivo móvel.</Text>
            </VStack>
        </HStack>
    )
}