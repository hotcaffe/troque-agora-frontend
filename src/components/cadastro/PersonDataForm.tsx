import { Flex, Heading, FormControl, FormLabel, Input, HStack, Button, Divider, VStack, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import { FormBody } from "../common/FormBody";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUserAddress, IUserData, IUserProfile } from "@/interfaces/profile";
import * as Yup from 'yup'
import { FormInput } from "../common/FormInput";
import { MaskedInput } from "../common/MaskedInput";

interface IPersonDataForm {
    goToNext: (data: any) => void;
}

interface User extends IUserProfile, IUserAddress {}

const schema = Yup.object().shape({
    id_usuario: Yup.number().default(0),
    vc_nome: Yup.string().required("O nome é obrigatório"),
    in_cpf: Yup.number().typeError("O CPF é obrigatório").min(11, "Digite o CPF completo").required("O CPF é obrigatório"),
    in_celular: Yup.number().typeError("O telefone é obrigatório").min(11, "Digite o telefone completo").required("O telefone é obrigatório"),
    dt_nascimento: Yup.date().typeError("A data de nascimento é obrigatória").max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), "Você deve ser maior de 18 anos!").required("A data de nascimento é obrigatória"),
    vc_email: Yup.string().default(""),
    bo_ativo: Yup.boolean().default(true),
    id_enderecoUsuario: Yup.number().default(0),
    vc_lougradouro: Yup.string().required("A rua é obrigatória"),
    in_numero: Yup.number().typeError("O número é obrigatório").required("O número é obrigatório"),
    vc_complemento: Yup.string().default(""),
    vc_bairro: Yup.string().required("O bairro é obrigatório"),
    vc_cidade: Yup.string().required("É obrigatório informar um CEP válido!"),
    vc_estado: Yup.string().required("É obrigatório informar um CEP válido!")
})

export function PersonDataForm({goToNext}: IPersonDataForm) {
    const {register, handleSubmit, formState, setValue, setError, clearErrors} = useForm<User>({
        mode: 'all',
        resolver: yupResolver(schema)
    });
    const [CEP, setCEP] = useState('00000000');
    const [address, setAddress] = useState<any>()

    const {errors} = formState;

    async function searchCEP(value: string) {
        if (value == '00000000' || value?.length <- 7) {
            setError('vc_cidade', {
                message: 'O CEP deve possuir 8 caracteres'
            })
            return;
        }
        setCEP('loading')
        try {
            const data = await fetch(`https://viacep.com.br/ws/${value}/json/`) 
                ?.then(res => res.json()) //substituir pela chamada na API
            if (data.erro) throw new Error("CEP não encontrado!")
            setAddress(data)
            setValue('vc_cidade', data.localidade)
            setValue('vc_estado', data.uf)
            clearErrors('vc_cidade')
            clearErrors('vc_estado')
        } catch (error) {
            console.log(error)
            setError('vc_cidade', {
                message: 'O CEP digitado não foi encontrado!'
            })
            setAddress(undefined)
        }
        setCEP(value)
    }
    
    return (
        <VStack w="100%" h="100%" gap="40px" px="35px" py="15px" justify="space-between" as="form">
            <Heading mb="30px" fontSize="xl" color="teal.300" fontWeight="semibold">Informe seus dados para entrar</Heading>
            <FormBody w="100%" title="Informação pessoais" titleDivider  wrap="wrap">
                <FormInput title="Nome" w="300px" error={errors?.vc_nome?.message} man>
                    <Input placeholder="Digite o seu nome completo" type="text" pattern="^[a-zA-Z]+$" {...register("vc_nome")}/>
                </FormInput>
                <FormInput title="CPF" w="200px" error={errors?.in_cpf?.message} man>
                    <MaskedInput placeholder="Digite seu CPF" as={IMaskInput} mask="000.000.000-00" {...register("in_cpf")}/>
                </FormInput>
                <FormInput title="Telefone" w="200px" error={errors?.in_celular?.message} man>
                    <MaskedInput placeholder="Digite seu telefone" type="tel" as={IMaskInput} mask="(00) 00000-0000" {...register("in_celular")}/>
                </FormInput>
                <FormInput title="Data de nascimento" w="200px" error={errors?.dt_nascimento?.message} man>
                    <Input type="date" min="0" {...register("dt_nascimento")}/>
                </FormInput>
            </FormBody>
            <FormBody w="100%" title="Endereço" titleDivider>
                <HStack mr="100%">
                    <FormInput title="CEP" w="180px" error={errors?.vc_cidade?.message || errors?.vc_estado?.message} man>
                        <Input placeholder="Digite seu CEP" as={IMaskInput} mask="00000-000" unmask={true}
                            onComplete={(value: string) => searchCEP(value)}
                        />
                    </FormInput>
                    {address && 
                        CEP == "loading" ? 
                        <Spinner w="24px" h="24px"/>
                        :
                        <>
                            <Divider w="10px" borderWidth="2px" borderColor="teal.200" mt="30px"/>
                            <FormControl w="160px" justifyContent="end" >
                                <FormLabel h="24px"/>
                                <Input value={address?.localidade} disabled {...register("vc_cidade")}/>
                            </FormControl>
                            <FormControl w="160px" justifyContent="end" >
                                <FormLabel h="24px"/>
                                <Input value={address?.uf} disabled {...register("vc_estado")}/>
                            </FormControl>
                        </>
                    }
                </HStack>
                <FormInput title="Bairro" w="250px" error={errors?.vc_bairro?.message} man>
                    <Input placeholder="Informe seu bairro" type="text" {...register("vc_bairro")}/>
                </FormInput>
                <FormInput title="Lougradouro" w="250px" error={errors?.vc_lougradouro?.message} man>
                    <Input placeholder="Rua, Estrada, Avenida etc" {...register("vc_lougradouro")}/>
                </FormInput>
                <FormInput title="Número" w="150px" error={errors?.in_numero?.message} man>
                    <Input placeholder="Residência" type="number" {...register("in_numero")}/>
                </FormInput>
                <FormInput title="Complemento" w="350px" error={errors?.vc_complemento?.message} man>
                    <Input placeholder="Forneça detalhes para o entregador" {...register("vc_complemento")}/>
                </FormInput>
            </FormBody>
            <Flex w="100%" justify="end" align="end">
                <Button onClick={handleSubmit(goToNext)}>Continuar</Button>
            </Flex>
        </VStack>
    )
}