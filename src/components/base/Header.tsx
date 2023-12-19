"use client"

import { TAIconNoBG } from "@/config/icons";
import { Button, Center, Flex, HStack, Icon, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import {Bell, MessageCircle, Search, User} from 'react-feather'
import { InteractionIcon } from "../common/InteractionIcon";

export function Header() {
    return (
        <Flex h="80px" bg="white" justify="center" align="center" gap="40px" px="20px">
            <Center flexDirection="column">
                <TAIconNoBG w="60px" h="30px"/>
                <Text color="teal.800" fontSize="7px" fontWeight="bold">TROQUE AGORA</Text>
            </Center>
            <InputGroup minW="300px" maxW="600px" >
                <InputLeftElement color="gray.400">
                    <Icon as={Search}/>
                </InputLeftElement>
                <Input placeholder="Pesquisar por trocas..." />
            </InputGroup>
            <HStack gap="20px">
                <InteractionIcon as={Bell}/>
                <InteractionIcon as={MessageCircle}/>
                <InteractionIcon as={User}/>
            </HStack>
            <Button minW="80px">Anunciar</Button>
        </Flex>
    )
}