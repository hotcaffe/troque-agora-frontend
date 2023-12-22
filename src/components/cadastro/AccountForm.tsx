import { VStack, Heading, FormControl, FormLabel, Input,  Flex, Button } from "@chakra-ui/react";
import { FormBody } from "../common/FormBody";

interface IAccountForm {
    goToNext: () => void;
}

export function AccountForm({goToNext}: IAccountForm) {
    return (
        <VStack w="100%" h="100%" gap="40px" px="35px" py="15px" justify="space-between">
            <Heading mb="30px" fontSize="xl" color="teal.300" fontWeight="semibold">Informe seus dados para entrar</Heading>
            <FormBody title="Conta" w="500px" titleDivider column>
                <FormControl >
                    <FormLabel color="teal.300">Email</FormLabel>
                    <Input placeholder="Digite o email" type="email"/>
                </FormControl>
                <FormControl>
                    <FormLabel color="teal.300">Usuário</FormLabel>
                    <Input placeholder="Informe um nome de usuário para utilizar na plataforma"/>
                </FormControl>
                <FormControl>
                    <FormLabel color="teal.300">Senha</FormLabel>
                    <Input placeholder="Digite uma senha" type="password" />
                </FormControl>
                <FormControl>
                    <FormLabel color="teal.300">Confirme sua senha</FormLabel>
                    <Input placeholder="Confirme sua senha" type="password" />
                </FormControl>
            </FormBody>
            <Flex w="100%" justify="end" align="end" h="140px">
                <Button onClick={goToNext}>Continuar</Button>
            </Flex>
        </VStack>
    )
}