"use client"

import { FormBody } from "@/components/common/FormBody";
import { FormInput } from "@/components/common/FormInput";
import { MaskedInput } from "@/components/common/MaskedInput";
import { ITicket } from "@/interfaces/ticket";
import { Button, Center, HStack, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from 'yup'

const schema = Yup.object().shape({
    vc_titulo: Yup.string().min(6, 'O título deve ter no mínimo 6 caracteres').required('O título é obrigatório!'),
    vc_contato: Yup.number().typeError('Númerico').min(11000000000, "Digite o telefone completo!").required('O telefone é obrigatório!'),
    vc_descri: Yup.string().min(6, 'A descrição deve ter no mínimo 20 caracteres').required('A descrição é obrigatória!')
})

export default function Page() {
    const {register, handleSubmit, formState} = useForm<ITicket>({
        mode: 'all',
        resolver: yupResolver(schema)
    });

    const {errors} = formState;

    async function onSubmit(data: ITicket) {
        // console.log(data)
    }

    return (
        <Center w="100%">
            <VStack bg="white" w="1000px" minH="600px" p="20px" align="start" justify="space-between">
                <FormBody title="Entre em contato com o suporte:" titleDivider w="100%">
                    <Center w="100%" my="25px">
                        <VStack as="form" align="start" gap="25px">
                            <Text fontSize="18px" fontWeight="semibold" color="teal.800">Abra um ticket:</Text>
                            <HStack gap="15px">
                                <FormInput title='Título' error={errors?.vc_titulo?.message} w="300px" h="80px" man>
                                    <Input placeholder="Digite o título do seu problema" type="text" {...register("vc_titulo")}/>
                                </FormInput>
                                <FormInput title='Contato' error={errors?.vc_contato?.message} w="200px" h="80px" man>
                                    <MaskedInput 
                                        placeholder="Digite seu telefone"
                                        mask="(00) 00000-0000"
                                        {...register("vc_contato")}
                                    />
                                </FormInput>
                            </HStack>
                            <FormInput title='Descreva o seu problema' error={errors?.vc_descri?.message} w="100%" man>
                                <Textarea h="100px" placeholder="Descreva e detalhe o seu problema" {...register("vc_descri")} isInvalid={!!errors?.vc_descri?.message}/>
                            </FormInput>
                            <Button w="100%" type="submit" onClick={handleSubmit(onSubmit, () => console.log(errors))}>Enviar</Button>
                        </VStack>
                    </Center>
                </FormBody>
                <Text w="100%" textAlign="center" color="teal.600" fontWeight="semibold" mb="20px">Telefone para contato direto: (44) 99999 - 1000</Text>
            </VStack>
        </Center>
    )
}