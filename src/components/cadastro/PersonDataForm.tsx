import { Flex, Heading, FormControl, FormLabel, Input, HStack, Button, Divider, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { IMaskInput } from "react-imask";
import { FormBody } from "../common/FormBody";

interface IPersonDataForm {
    goToNext: () => void;
}

export function PersonDataForm({goToNext}: IPersonDataForm) {
    const [CEP, setCEP] = useState(''); //substituir o set para o local onde buscar o cep efetivamente
    
    return (
        <VStack w="100%" h="100%" gap="40px" px="35px" py="15px" justify="space-between">
            <Heading mb="30px" fontSize="xl" color="teal.300" fontWeight="semibold">Informe seus dados para entrar</Heading>
            <FormBody w="100%" title="Informação pessoais" titleDivider>
                <FormControl w="300px" >
                    <FormLabel color="teal.300">Nome</FormLabel>
                    <Input placeholder="Digite o seu nome completo" type="text" pattern="^[a-zA-Z]+$"/>
                </FormControl>
                <FormControl w="200px">
                    <FormLabel color="teal.300">CPF</FormLabel>
                    <Input placeholder="Digite seu CPF" as={IMaskInput} mask="000.000.000-00"/>
                </FormControl>
                <FormControl w="200px">
                    <FormLabel color="teal.300">Digite seu telefone</FormLabel>
                    <Input placeholder="Digite seu telefone" type="tel" as={IMaskInput} mask="(00) 00000-0000"/>
                </FormControl>
                <FormControl w="80px">
                    <FormLabel color="teal.300">Idade</FormLabel>
                    <Input placeholder="Idade" type="number" min="0" max="999"/>
                </FormControl>
            </FormBody>
            <FormBody w="100%" title="Endereço" titleDivider>
                <HStack mr="100%">
                    <FormControl w="160px">
                        <FormLabel color="teal.300">CEP</FormLabel>
                        <Input placeholder="Digite seu CEP" as={IMaskInput} mask="00000-000" unmask={true} 
                            onComplete={(e: any) => setCEP(e)}
                        />
                    </FormControl>
                    {CEP && 
                        <>
                            <Divider w="10px" borderWidth="2px" borderColor="teal.200" mt="30px"/>
                            <FormControl w="160px" justifyContent="end" >
                                <FormLabel h="24px"/>
                                <Input value="Mandaguari" disabled/>
                            </FormControl>
                            <FormControl w="160px" justifyContent="end" >
                                <FormLabel h="24px"/>
                                <Input value="Paraná" disabled/>
                            </FormControl>
                        </>
                    }
                </HStack>
                <FormControl w="250px">
                    <FormLabel color="teal.300">Bairro</FormLabel>
                    <Input placeholder="Informe seu bairro" type="text"/>
                </FormControl>
                <FormControl w="250px">
                    <FormLabel color="teal.300">Lougradouro</FormLabel>
                    <Input placeholder="Rua, Estrada, Avenida etc"/>
                </FormControl>
                <FormControl w="150px">
                    <FormLabel color="teal.300">Número</FormLabel>
                    <Input placeholder="Residencia" type="number"/>
                </FormControl>
                <FormControl w="350px">
                    <FormLabel color="teal.300">Complemento</FormLabel>
                    <Input placeholder="Forneça detalhes para o entregador"/>
                </FormControl>
            </FormBody>
            <Flex w="100%" justify="end" align="end">
                <Button onClick={goToNext}>Continuar</Button>
            </Flex>
        </VStack>
    )
}