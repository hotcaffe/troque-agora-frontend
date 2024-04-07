"use client"

import { TAIconNoBG } from "@/config/icons";
import { Button, Center, Flex, HStack, Icon, Input, InputGroup, InputLeftElement, Link, Text } from "@chakra-ui/react";
import { HelpCircle, MessageCircle, Search, User} from 'react-feather'
import { InteractionIcon } from "../common/InteractionIcon";
import { usePathname, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";

export function Header() {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const pathname = usePathname();
    const params = useSearchParams();
    const search = params.get('search');

    async function ensureAuthenticated() {
        const isUserAuthenticated = localStorage.getItem('user-data') ? true : false;
        setIsUserAuthenticated(isUserAuthenticated);
    }

    useEffect(() => {
        ensureAuthenticated()
    }, [])

    return (
        <Flex w="100%" h="80px" bg="white" justify="center" align="center" gap="40px" px="20px" mb="20px">
            <Link href="/" textDecoration="none" _hover={{textDecoration: "none"}}>
                <Center flexDirection="column">
                    <TAIconNoBG w="60px" h="30px"/>
                    <Text color="teal.800" fontSize="7px" fontWeight="bold">TROQUE AGORA</Text>
                </Center>
            </Link>
            <InputGroup minW="300px" maxW="600px" as='form'>
                <InputLeftElement color="gray.400">
                    <Icon as={Search}/>
                </InputLeftElement>
                <Input defaultValue={search || ''} name="search" placeholder="Pesquisar por trocas..." />
                <Button hidden type="submit"/>
            </InputGroup>
            {isUserAuthenticated ? 
            <>
                <HStack gap="20px">
                    <Link href="/ajuda"><InteractionIcon as={HelpCircle} color={pathname == "/ajuda" ? "teal.300" : "gray.400"} mr="20px" aria-label="Preciso de ajuda"/></Link>
                    {/* <InteractionIcon as={Bell} /> */}
                    <Link href="/conversas"><InteractionIcon as={MessageCircle} color={pathname == "/conversas" ? "teal.300" : "gray.400"} aria-label="Acessar conversas"/></Link>
                    <Link href="/perfil"><InteractionIcon as={User} color={pathname == "/perfil" ? "teal.300" : "gray.400"} aria-label="Acessar meu perfil"/></Link>
                </HStack>
                <Link href="/anuncio"><Button minW="80px">Anunciar</Button></Link> 
            </> :
            <>
                <Link href="/ajuda"><InteractionIcon as={HelpCircle} color={pathname == "/ajuda" ? "teal.300" : "gray.400"} mr="20px" aria-label="Preciso de ajuda"/></Link>
                <HStack>
                    <Link href="/login"><Button variant="secondary">Entrar</Button></Link>
                    <Link href="/cadastro"><Button>Cadastrar-se</Button></Link>
                </HStack>
            </>
            
            
            }
        </Flex>
    )
}