"use client"

import { VStack, Heading, Input, Button, Text, HStack, Progress, Icon, Spinner } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FormBody } from "../common/FormBody";
import {  IUserData } from "../../interfaces/profile";
import { IMask } from "react-imask";
import { FormInput } from "../common/FormInput";
import { EditableMaskedInput } from "../common/EditableMaskedInput";
import { CheckCircle, XCircle } from "react-feather";
import { useQuery } from "react-query";
import { api } from "@/utils/api";



export function Profile() {
    const {register, handleSubmit, formState} = useForm<IUserData>({
        mode: 'all',
        // resolver: yupResolver(schema)
    });

    const userLocalStorage = {
        username: 'rfusco',
        password: 'encrypted'
    }

    async function get() {
        const id_usuario = 1; //pegar do cookie no backend ao realizar a requisição
        return await api.get('/users/' + id_usuario).then(res => res.data) as IUserData;
    }

    const {data, isLoading} = useQuery('my-profile', get, {
        refetchInterval: 1000 * 60 * 10,
        refetchOnWindowFocus: false
    })

    const cpfMask = IMask.createPipe({
        mask: '(00) 00000-0000'
    })

    const {errors, isDirty, dirtyFields} = formState;

    if (isLoading) {
        return (
            <VStack gap="20px" borderRadius="10px" bg="white" w="1000px" py="20px" px="40px">
                <Spinner />
            </VStack>
        )
    }

    if (!data) {
        return (
            <VStack gap="20px" borderRadius="10px" bg="white" w="1000px" py="20px" px="40px">
                <Text>Não foi possível recuperar as informações do perfil. Tente novamente!</Text>
            </VStack>
        )
    }

    return (
        <VStack gap="20px" borderRadius="10px" bg="white" w="1000px" py="20px" px="40px">
            <Heading fontSize="28px" color="teal.800" w="100%">Meus dados</Heading>
            <FormBody title="Conta" w="100%" titleDivider>
                <FormInput w="fit-content" title="Email" error={errors.vc_email}>
                    <Input defaultValue={data.vc_email} 
                        cursor="default !important" paddingX="0px" border="none" placeholder="Digite o seu email" type="text" 
                        {...register("vc_email")} isDisabled
                    />
                </FormInput>
                <FormInput w="fit-content" title="Usuário" error={errors.vc_email}>
                    <Input defaultValue={userLocalStorage.username} 
                        cursor="default !important" paddingX="0px" border="none" type="text" 
                        isDisabled
                    />
                </FormInput>
                <FormInput w="fit-content" title="Senha" error={errors.vc_email}>
                    <Input defaultValue={userLocalStorage.password} 
                        cursor="default !important" paddingX="0px" border="none" type="password" 
                        isDisabled
                    />
                </FormInput>
            </FormBody>
            <VStack as="form" gap="20px">
                <FormBody title="Informação pessoais" gap="25px" w="100%" titleDivider >
                    <FormInput w="fit-content" error={errors.vc_nome} title='Nome'>
                        <EditableMaskedInput placeholder="Digite seu nome completo" defaultValue={data.vc_nome} mask={String} {...register("vc_nome")}/>
                    </FormInput>
                    <FormInput error={errors.in_celular} title='Telefone' w="180px">
                        <EditableMaskedInput placeholder="Digite o telefone" mask="(00) 00000-0000" defaultValue={String(data.in_celular)} {...register("in_celular")}/>
                    </FormInput>
                    <FormInput error={errors.in_idade} title='Idade' w="120px">
                        <EditableMaskedInput placeholder="Idade" mask={Number} defaultValue={String(data.in_idade)} {...register("in_idade")}/>
                    </FormInput>
                    <FormInput error={errors.in_cpf} title='CPF' w="150px">
                        <EditableMaskedInput placeholder="Digite o CPF" mask="000.000.000-00" defaultValue={String(data.in_cpf)} {...register("in_cpf")}/>
                    </FormInput>
                </FormBody>
                <FormBody title="Endereço" gap="25px" w="100%" titleDivider >
                    <FormInput error={errors.enderecoUsuario?.vc_lougradouro} title='Lougradouro' w="300px">
                        <EditableMaskedInput placeholder="Digite sua rua/estrada/avenida" defaultValue={data.enderecoUsuario?.vc_lougradouro} mask={String} {...register("enderecoUsuario.vc_lougradouro")}/>
                    </FormInput>
                    <FormInput error={errors.enderecoUsuario?.in_numero} title='Número' w="120px">
                        <EditableMaskedInput placeholder="Digite seu número" mask={Number} defaultValue={String(data.enderecoUsuario?.in_numero)} {...register("enderecoUsuario.in_numero")}/>
                    </FormInput>
                    <FormInput error={errors.enderecoUsuario?.vc_bairro} title='Bairro' w="250px">
                        <EditableMaskedInput placeholder="Centro" mask={String} defaultValue={String(data.enderecoUsuario?.vc_bairro)} {...register("enderecoUsuario.vc_bairro")}/>
                    </FormInput>
                    <FormInput error={errors.enderecoUsuario?.vc_cidade} title='Cidade' w="300px">
                        <EditableMaskedInput placeholder="Digite a cidade" mask={String} defaultValue={String(data.enderecoUsuario?.vc_cidade)} {...register("enderecoUsuario.vc_cidade")}/>
                    </FormInput>
                    <FormInput error={errors.enderecoUsuario?.vc_estado} title='Estado' w="200px">
                        <EditableMaskedInput placeholder="Digite seu estado" mask={String} defaultValue={String(data.enderecoUsuario?.vc_estado)} {...register("enderecoUsuario.vc_estado")}/>
                    </FormInput>
                    <FormInput error={errors.enderecoUsuario?.vc_complemento} title='Complemento' w="300px">
                        <EditableMaskedInput placeholder="Digite um complemento" mask={String} defaultValue={String(data.enderecoUsuario?.vc_complemento)} {...register("enderecoUsuario.vc_complemento")}/>
                    </FormInput>
                </FormBody>
            </VStack>
            <FormBody title="Informações do perfil" gap="25px" w="100%" titleDivider >
                <FormInput w="fit-content" error={errors.avaliacaoUsuario?.qt_trocasRecebidas} title='Trocas recebidas'>
                    <HStack color="gray.500">
                        <Text  w="fit-content" fontWeight="bold" color="teal.300">{data.avaliacaoUsuario.qt_trocasRecebidas}</Text>
                        <Text>trocas recebidas de outros usuários</Text>
                    </HStack>
                </FormInput>
                <FormInput w="fit-content" error={errors.avaliacaoUsuario?.qt_trocasAceitas} title='Trocas aceitas:'>
                    <HStack color="gray.500">
                        <Text w="fit-content" fontWeight="bold" color="teal.300">{data.avaliacaoUsuario.qt_trocasAceitas}</Text>
                        <Text>trocas aceitas de outros usuários</Text>
                    </HStack>
                </FormInput>
                <FormInput w="fit-content" error={errors.avaliacaoUsuario?.qt_trocasSucedidas} title='Trocas realizadas:'>
                    <HStack color="gray.500">
                        <Text w="fit-content" fontWeight="bold" color="teal.300">{data.avaliacaoUsuario.qt_trocasSucedidas}</Text>
                        <Text>trocas bem sucedidas</Text>
                    </HStack>
                </FormInput>
                <FormInput w="fit-content" error={errors.avaliacaoUsuario?.qt_trocasEnviadas} title='Trocas enviadas:'>
                    <HStack color="gray.500">
                        <Text w="fit-content" fontWeight="bold" color="teal.300">{data.avaliacaoUsuario.qt_trocasEnviadas}</Text>
                        <Text>trocas recebidas de outros usuários</Text>
                    </HStack>
                </FormInput>
                <FormInput w="fit-content" error={errors.avaliacaoUsuario?.qt_trocasRecusadas} title='Trocas recusadas:'>
                    <HStack color="gray.500">
                        <Text w="fit-content" fontWeight="bold" color="teal.300">{data.avaliacaoUsuario.qt_trocasRecusadas}</Text>
                        <Text>trocas recusadas de outros usuários sucedidas</Text>
                    </HStack>
                </FormInput>
                <FormInput error={errors.avaliacaoUsuario?.tx_avaliacaoGeral} title='Avaliação geral do anunciante:'>
                    <HStack gap="20px">
                        <Progress value={data.avaliacaoUsuario?.tx_avaliacaoGeral} w="400px" rounded="5px" colorScheme="teal" h="15px" bg="gray.200"/>
                        <Text color="teal.300" fontWeight="semibold">{data.avaliacaoUsuario.tx_avaliacaoGeral}%</Text>
                    </HStack>
                </FormInput>
            </FormBody>
            <FormBody title="Situação do perfil:" w="100%" titleDivider>
                {
                    data.avaliacaoUsuario?.bo_seloAtivo ?
                    <HStack color="teal.300" gap="5px">
                        <Text>Verificado</Text>
                        <Icon as={CheckCircle} w="20px" h="20px"/>
                    </HStack> :
                    <HStack color="red.300" gap="5px">
                        <Text>Não Verificado</Text>
                        <Icon as={XCircle} w="20px" h="20px"/>
                    </HStack>
                }
            </FormBody>
            {isDirty && 
                <HStack w="100%" justify="end">
                    <Button type="submit" onClick={handleSubmit((data) => console.log(data, dirtyFields), () => console.log(errors))}>Confirmar alterações</Button>
                </HStack>
            }
        </VStack>
    )
}