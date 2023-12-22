import { Button, Divider, Flex, HStack, Heading, Square, Text, VStack } from "@chakra-ui/react";

interface IQRCodeForm {
    goToNext: () => void;
}


export function QRCodeForm({goToNext}: IQRCodeForm) {
    return (
        <HStack h="100%">
            <VStack w="70%">
                <Heading mb="30px" fontSize="xl" color="teal.300" fontWeight="semibold">
                    Para continuar o cadastro, acesse nosso aplicativo pelo celular
                </Heading>
                <Heading w="430px" textAlign="center" fontSize="lg" color="teal.800" fontWeight="semibold" >
                    Aponte a câmera do seu celular para a figura abaixo
                </Heading>
                <Divider  w="430px" borderWidth="2px" borderColor="teal.300" my="10px"/>
                <VStack gap="0">
                    <Square size="430px" mb="15px" outline="1px solid" outlineColor="gray.100" rounded="10px">
                        <Text>QR CODE AQUI</Text>
                    </Square>
                    <Text fontSize="14px" color="teal.800">Se tiver dificuldades para ler o código, digite ele manualmente:</Text>
                    <Text fontSize="14px" color="teal.300">{"xjasdjJASIODUJaskld823UICNadadasf[er]fsdf43[~sdfksdfjn38cdsjnc"}</Text>
                </VStack>
                <Button onClick={goToNext}>Continuar</Button>
            </VStack>
            <VStack w="30%" h="100%" bg="teal.300" rounded="0 10px 10px 0" p="25px 30px">
                <Heading mb="30px" fontSize="2xl" color="white" fontWeight="semibold">
                    Baixe o nosso aplicativo:
                </Heading>
                <Flex h="400px" w="100%" bg="teal.800" rounded="10px">

                </Flex>
                <Divider borderWidth="4px" borderColor="teal.00" my="15px" rounded="5px"/>
                <Text color="white" fontWeight="medium">Utilize a câmera do seu celular para ler o código na tela do seu computador.</Text>
            </VStack>
        </HStack>
    )
}