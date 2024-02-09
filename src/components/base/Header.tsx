"use client"

import { TAIconNoBG } from "@/config/icons";
import { Button, Center, Flex, HStack, Icon, Input, InputGroup, InputLeftElement, Link, Text } from "@chakra-ui/react";
import {Bell, HelpCircle, MessageCircle, Search, User} from 'react-feather'
import { InteractionIcon } from "../common/InteractionIcon";
import { usePathname } from "next/navigation";

export function Header() {
    const pathname = usePathname();

    return (
        <Flex w="100%" h="80px" bg="white" justify="center" align="center" gap="40px" px="20px" mb="20px">
            <Link href="/" textDecoration="none" _hover={{textDecoration: "none"}}>
                <Center flexDirection="column">
                    <TAIconNoBG w="60px" h="30px"/>
                    <Text color="teal.800" fontSize="7px" fontWeight="bold">TROQUE AGORA</Text>
                </Center>
            </Link>
            <InputGroup minW="300px" maxW="600px" >
                <InputLeftElement color="gray.400">
                    <Icon as={Search}/>
                </InputLeftElement>
                <Input placeholder="Pesquisar por trocas..." />
            </InputGroup>
            <HStack gap="20px">
                <Link href="/ajuda"><InteractionIcon as={HelpCircle} color={pathname == "/ajuda" ? "teal.300" : "gray.400"} mr="20px" aria-label="Preciso de ajuda"/></Link>
                {/* <InteractionIcon as={Bell} /> */}
                <Link href="/conversas"><InteractionIcon as={MessageCircle} color={pathname == "/conversas" ? "teal.300" : "gray.400"} aria-label="Acessar conversas"/></Link>
                <Link href="/perfil"><InteractionIcon as={User} color={pathname == "/perfil" ? "teal.300" : "gray.400"} aria-label="Acessar meu perfil"/></Link>
            </HStack>
            <Link href="/anuncio"><Button minW="80px">Anunciar</Button></Link>
        </Flex>
    )
}