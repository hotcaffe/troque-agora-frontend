'use client'

import { TAPin } from "@/config/icons";
import { Flex, Center, createIcon, Heading, Input, Button, Text, FormControl, FormLabel, Checkbox, HStack, Link, Spacer } from "@chakra-ui/react";


export default function Page() {

    return (
        <Center h="100vh" flexDirection="column" gap="20px">
            <Link  fontWeight="bold">Retornar para a página principal</Link>
            <Flex w="800px" h="600px">
                <Flex direction="column" align="center" justify="center" w="500px" gap="15px" rounded="10px 0 0 10px" bg="white">
                    <TAPin w="48px" h="48px" mb="15px" />
                    <Heading mb="30px" fontSize="xl" color="teal.300" fontWeight="semibold">Informe seus dados para entrar</Heading>
                    <FormControl w="400px">
                        <FormLabel>Email</FormLabel>
                        <Input placeholder="Ex: seuemail@dominio.com" type="email"/>
                    </FormControl>
                    <FormControl w="400px">
                        <FormLabel>Senha</FormLabel>
                        <Input placeholder="Digite a sua senha" type="password"/>
                    </FormControl>
                    <HStack w="400px">
                        <Checkbox>Manter conectado?</Checkbox>
                        <Spacer/>
                        <Link>Esqueci minha senha</Link>
                    </HStack>
                    
                    <Button mt="50px" w="100px" >Entrar</Button>
                </Flex>
                <Flex direction="column" align="center" justify="center" w="290px" gap="20px" px="35px" bg="teal.300" rounded="0 10px 10px 0">
                    <Heading fontSize="3xl" mb="20px" color="white" w="100%">Bem vindo ao<br/>Troque-Agora!</Heading>
                    <Text color="white">Ainda não possui uma conta?</Text>
                    <Button w="100%" border="2px solid white">Cadastrar-se</Button>
                </Flex>
            </Flex>
        </Center>
    )
}