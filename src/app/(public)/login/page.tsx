'use client'

import { FormInput } from "@/components/common/FormInput";
import { TAPin } from "@/config/icons";
import { UserContext } from "@/contexts/UserContext";
import { api } from "@/utils/api";
import { Flex, Center, createIcon, Heading, Input, Button, Text, FormControl, FormLabel, Checkbox, HStack, Link, Spacer, InputGroup, InputRightAddon, Icon, InputRightElement } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { useForm } from "react-hook-form";
import * as Yup from 'yup'

interface ILogin {
    username: string;
    password: string
}

const schema = Yup.object().shape({
    username: Yup.string().required("É obrigatório informar o usuário!"),
    password: Yup.string().required("É obrigatório inserir a senha!")
})

export default function Page() {
    const router = useRouter()
    const {register, handleSubmit, formState, setValue, setError, clearErrors} = useForm<ILogin>({
        mode: 'all',
        resolver: yupResolver(schema)
    });
    const [hidePassword, setHidePassword] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const {storeUserData} = useContext(UserContext)

    const {errors} = formState

    function toggleHidePassword(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setHidePassword(!hidePassword);
    }

    async function login({username, password}: ILogin) {
        try {
            setIsLoading(true)
            const user = await api.get('/user/login', {
                params: {
                    username,
                    password
                }
            }).then(res => res.data);

            storeUserData(user);

            router.push("/")
        } catch (error) {
            setIsLoading(false)
            return;
        }
    }

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("user-data") ? true : false;
        if (isAuthenticated) {
            router.push('/perfil')
        }
    }, [])

    return (
        <Center h="100vh" flexDirection="column" gap="20px">
            <Link  fontWeight="bold" href="/">Retornar para a página principal</Link>
            <Flex w="800px" h="600px">
                <Flex as="form" direction="column" align="center" justify="center" w="500px" gap="15px" rounded="10px 0 0 10px" bg="white">
                    <TAPin w="48px" h="48px" mb="15px" />
                    <Heading mb="30px" fontSize="xl" color="teal.300" fontWeight="semibold">Informe seus dados para entrar</Heading>
                    <FormInput title="Usuário" w="400px" error={errors?.username?.message} man>
                        <Input placeholder="Informe seu usuário" type="text" {...register("username")}/>
                    </FormInput>
                    <FormInput title="Senha" w="400px" error={errors?.password?.message} man>
                        <InputGroup>
                            <Input placeholder="Digite sua senha" type={hidePassword ? "password" : "text"} {...register("password")}/>
                            <InputRightElement cursor="pointer" onClick={(e) => toggleHidePassword(e)}>
                                <Icon as={hidePassword ? Eye : EyeOff} color="gray.600"/>
                            </InputRightElement>
                        </InputGroup>
                    </FormInput>
                    <HStack w="400px">
                        <Checkbox>Manter conectado?</Checkbox>
                        <Spacer/>
                        <Link>Esqueci minha senha</Link>
                    </HStack>
                    
                    <Button type="submit" mt="50px" w="100px" onClick={handleSubmit(login)} isLoading={isLoading}>Entrar</Button>
                </Flex>
                <Flex direction="column" align="center" justify="center" w="290px" gap="20px" px="35px" bg="teal.300" rounded="0 10px 10px 0">
                    <Heading fontSize="3xl" mb="20px" color="white" w="100%">Bem vindo ao<br/>Troque-Agora!</Heading>
                    <Text color="white">Ainda não possui uma conta?</Text>
                    <Button w="100%" border="2px solid white" onClick={() => router.push("/cadastro")}>Cadastrar-se</Button>
                </Flex>
            </Flex>
        </Center>
    )
}