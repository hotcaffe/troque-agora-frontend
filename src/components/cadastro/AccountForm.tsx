import { VStack, Heading, FormControl, FormLabel, Input,  Flex, Button } from "@chakra-ui/react";
import { FormBody } from "../common/FormBody";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'
import { FormInput } from "../common/FormInput";

interface IAccountForm {
    goToNext: (data: any) => void;
}

interface UserAccount {
    username: string;
    vc_email: string;
    password: string;
    confirmPassword: string;
}

const schema = Yup.object().shape({
    vc_email: Yup.string().email("Digite um email válido (ex: rodrigo@gmail.com)").required("O email é obrigatório!"),
    username: Yup.string().required("O nome de usuário é obrigatório!"),
    password: Yup.string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        // .matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&]/,
        //     'A senha deve conter: letras minúsculas, letras maiúsculas, números e caracteree especiais'
        // )
        .matches(/^(?=.*[a-z])/, "A senha deve conter uma letra minúscula")
        .matches(/^(?=.*[A-Z])/, "A senha deve conter uma letra maiúscula")
        .matches(/^(?=.*\d)/, "A senha deve conter um número")
        .matches(/^(?=.*[@$!%*?&_])/, "A senha deve conter um caractere especial")
        .required("A senha é obrigatória!"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'As senhas devem ser iguais').required("Por favor, digite sua senha novamente!")
})

export function AccountForm({goToNext}: IAccountForm) {
    const {register, handleSubmit, setValue, formState, getValues} = useForm<UserAccount>({
        mode: 'all',
        resolver: yupResolver(schema)
    });

    const {errors} = formState;

    return (
        <VStack w="100%" h="100%" gap="40px" px="35px" py="15px" justify="space-between">
            <Heading mb="30px" fontSize="xl" color="teal.300" fontWeight="semibold">Informe seus dados para entrar</Heading>
            <FormBody title="Conta" w="500px" titleDivider column>
                <FormInput title="Email" error={errors?.vc_email?.message} man>
                    <Input placeholder="Digite o email" type="email" {...register("vc_email")}/>
                </FormInput>
                <FormInput title="Usuário" error={errors?.username?.message} man> 
                    <Input placeholder="Informe um nome de usuário para utilizar na plataforma" {...register("username")}/>
                </FormInput>
                <FormInput title="Senha" error={errors?.password?.message} man>
                    <Input placeholder="Digite uma senha" type="password" {...register("password")}/>
                </FormInput>
                <FormInput title="Confirme sua senha" error={errors?.confirmPassword?.message} man>
                    <Input placeholder="Confirme sua senha" type="password" {...register("confirmPassword")}/>
                </FormInput>
            </FormBody>
            <Flex w="100%" justify="end" align="end" h="140px">
                <Button onClick={handleSubmit(goToNext)}>Continuar</Button>
            </Flex>
        </VStack>
    )
}