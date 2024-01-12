"use client"

import { VStack, Heading, Editable, EditablePreview, Input, EditableInput, InputLeftAddon, FormLabel, Button, Text, Box, HStack, Progress, Icon } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormBody } from "../common/FormBody";
import { IUserAddress, IUserProfile, IUserReview } from "./interface/profile";
import { EditableControls } from "../common/EditableControls";
import { MaskedInput } from "../common/MaskedInput";
import { IMaskInput } from "react-imask";
import { IMask } from "react-imask";
import { FormInput } from "../common/FormInput";
import { EditableMaskedInput } from "../common/EditableMaskedInput";
import { CheckCircle, XCircle } from "react-feather";

const userLocalStorage = {
    username: 'rfusco',
    password: 'encrypt'
}

interface UserData extends IUserProfile, IUserAddress, IUserReview {}

interface IProfile {
    userData: UserData
}

export function Profile({userData}: IProfile) {
    const {register, handleSubmit, formState} = useForm<UserData>({
        mode: 'all',
        // resolver: yupResolver(schema)
    });

    const cpfMask = IMask.createPipe({
        mask: '(00) 00000-0000'
    })

    const {errors, isDirty, dirtyFields} = formState;

    return (
        <VStack gap="20px" borderRadius="10px" bg="white" w="1000px" py="20px" px="40px">
            <Heading fontSize="28px" color="teal.800" w="100%">Meus dados</Heading>
            <FormBody title="Conta" w="100%" titleDivider>
                <FormInput w="fit-content" title="Email" error={errors.vc_email}>
                    <Input defaultValue={userData.vc_email} 
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
                        <EditableMaskedInput placeholder="Digite seu nome completo" defaultValue={userData.vc_nome} mask={String} {...register("vc_nome")}/>
                    </FormInput>
                    <FormInput error={errors.in_celular} title='Telefone' w="180px">
                        <EditableMaskedInput placeholder="Digite o telefone" mask="(00) 00000-0000" defaultValue={String(userData.in_celular)} {...register("in_celular")}/>
                    </FormInput>
                    <FormInput error={errors.in_idade} title='Idade' w="120px">
                        <EditableMaskedInput placeholder="Idade" mask={Number} defaultValue={String(userData.in_idade)} {...register("in_idade")}/>
                    </FormInput>
                    <FormInput error={errors.in_cpf} title='CPF' w="150px">
                        <EditableMaskedInput placeholder="Digite o CPF" mask="000.000.000-00" defaultValue={String(userData.in_cpf)} {...register("in_cpf")}/>
                    </FormInput>
                </FormBody>
                <FormBody title="Endereço" gap="25px" w="100%" titleDivider >
                    <FormInput error={errors.vc_lougradouro} title='Lougradouro' w="300px">
                        <EditableMaskedInput placeholder="Digite sua rua/estrada/avenida" defaultValue={userData.vc_lougradouro} mask={String} {...register("vc_lougradouro")}/>
                    </FormInput>
                    <FormInput error={errors.in_numero} title='Número' w="120px">
                        <EditableMaskedInput placeholder="Digite seu número" mask={Number} defaultValue={String(userData.in_numero)} {...register("in_numero")}/>
                    </FormInput>
                    <FormInput error={errors.vc_bairro} title='Bairro' w="250px">
                        <EditableMaskedInput placeholder="Centro" mask={String} defaultValue={String(userData.vc_bairro)} {...register("vc_bairro")}/>
                    </FormInput>
                    <FormInput error={errors.vc_cidade} title='Cidade' w="300px">
                        <EditableMaskedInput placeholder="Digite a cidade" mask={String} defaultValue={String(userData.vc_cidade)} {...register("vc_cidade")}/>
                    </FormInput>
                    <FormInput error={errors.vc_estado} title='Estado' w="200px">
                        <EditableMaskedInput placeholder="Digite seu estado" mask={String} defaultValue={String(userData.vc_estado)} {...register("vc_estado")}/>
                    </FormInput>
                    <FormInput error={errors.vc_complemento} title='Complemento' w="300px">
                        <EditableMaskedInput placeholder="Digite um complemento" mask={String} defaultValue={String(userData.vc_complemento)} {...register("vc_complemento")}/>
                    </FormInput>
                </FormBody>
            </VStack>
            <FormBody title="Informações do perfil" gap="25px" w="100%" titleDivider >
                <FormInput w="fit-content" error={errors.qt_trocasRecebidas} title='Trocas recebidas'>
                    <HStack color="gray.500">
                        <Text  w="fit-content" fontWeight="bold" color="teal.300">{userData.qt_trocasRecebidas}</Text>
                        <Text>trocas recebidas de outros usuários</Text>
                    </HStack>
                </FormInput>
                <FormInput w="fit-content" error={errors.qt_trocasAceitas} title='Trocas aceitas:'>
                    <HStack color="gray.500">
                        <Text w="fit-content" fontWeight="bold" color="teal.300">{userData.qt_trocasAceitas}</Text>
                        <Text>trocas aceitas de outros usuários</Text>
                    </HStack>
                </FormInput>
                <FormInput w="fit-content" error={errors.qt_trocasSucedidas} title='Trocas realizadas:'>
                    <HStack color="gray.500">
                        <Text w="fit-content" fontWeight="bold" color="teal.300">{userData.qt_trocasSucedidas}</Text>
                        <Text>trocas bem sucedidas</Text>
                    </HStack>
                </FormInput>
                <FormInput w="fit-content" error={errors.qt_trocasEnviadas} title='Trocas enviadas:'>
                    <HStack color="gray.500">
                        <Text w="fit-content" fontWeight="bold" color="teal.300">{userData.qt_trocasEnviadas}</Text>
                        <Text>trocas recebidas de outros usuários</Text>
                    </HStack>
                </FormInput>
                <FormInput w="fit-content" error={errors.qt_trocasRecusadas} title='Trocas recusadas:'>
                    <HStack color="gray.500">
                        <Text w="fit-content" fontWeight="bold" color="teal.300">{userData.qt_trocasRecusadas}</Text>
                        <Text>trocas recusadas de outros usuários sucedidas</Text>
                    </HStack>
                </FormInput>
                <FormInput error={errors.tx_avaliacaoGeral} title='Avaliação geral do anunciante:'>
                    <HStack gap="20px">
                        <Progress value={70} w="400px" rounded="5px" colorScheme="teal" h="15px" bg="gray.200"/>
                        <Text color="teal.300" fontWeight="semibold">{userData.tx_avaliacaoGeral}%</Text>
                    </HStack>
                </FormInput>
            </FormBody>
            <FormBody title="Situação do perfil:" w="100%" titleDivider>
                {
                    userData.bo_seloAtivo ?
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