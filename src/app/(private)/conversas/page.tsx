"use client"

import { ChatBox } from "@/components/chat/ChatBox";
import { api } from "@/utils/api";
import { Avatar, Box, Center, Divider, HStack, Icon, Input, InputGroup, InputLeftElement, SkeletonCircle, SkeletonText, Text, VStack } from "@chakra-ui/react";
import {  useState } from "react";
import { Search } from "react-feather";
import { useQuery } from "react-query";

export default function Page() {
    const [actualChat, setActualChat] = useState<any>();
    const [chatList, setChatList] = useState<any>();
    async function get(): Promise<any> {
        const username = "rfusco" //enviar o usuário pelo token de acesso
        return await api.get("/chat/" + username).then(res => res.data)
    }

    const {data, isLoading} = useQuery('conversas', get, {
        onSuccess: (data) => {
            setActualChat(data.conversations[0]);
            setChatList(data.conversations)
        }
    });

    function onSearch(value: string) {
        const filteredChatList = data?.conversations?.filter((chat: any) => chat.user.toUpperCase().includes(value.toUpperCase()));
        setChatList(filteredChatList)
    }

    return (
        <Center w="100%">
            <HStack rounded="10px" maxW="1000px" bg="white" h="800px" align="start">
                <VStack p="20px" maxW="300px" align="start" gap="15px">
                    <Text fontWeight="semibold" color="gray.500">Conversas recentes</Text>
                    <Divider borderWidth="2px"/>
                    <InputGroup w="100%">
                        <InputLeftElement color="gray.400">
                            <Icon as={Search}/>
                        </InputLeftElement>
                        <Input placeholder="Pesquisar por contatos" onChange={(e) => onSearch(e.target.value)}/>
                    </InputGroup>
                    <VStack gap="0" w="100%" >
                        
                        {
                            isLoading ? 
                                <>
                                    <HStack padding='6' boxShadow='lg' bg='white' w="100%" h="50px" py="5px" justify="start">
                                        <SkeletonCircle size='10'/>
                                        <SkeletonText w="150px" noOfLines={2} />
                                    </HStack> 
                                    <HStack padding='6' boxShadow='lg' bg='white' w="100%" h="50px" py="5px" justify="start" mt="10px">
                                        <SkeletonCircle size='10'/>
                                        <SkeletonText w="150px" noOfLines={2} />
                                    </HStack> 
                                    <HStack padding='6' boxShadow='lg' bg='white' w="100%" h="50px" py="5px" justify="start" mt="10px">
                                        <SkeletonCircle size='10'/>
                                        <SkeletonText w="150px" noOfLines={2} />
                                    </HStack> 
                                </>
                            :
                                chatList?.map((chat: any, index: number) => 
                                    <HStack key={chat.user} gap="10px" w="100%" overflowY="scroll" onClick={() => setActualChat(chat)}
                                        _hover={{bg: "gray.100"}} cursor="pointer" py="5px" px="5px"
                                    > 
                                        <Avatar size="sm"/>
                                        <VStack align="start" gap="0" maxW="200px" >
                                            <Text fontWeight="semibold" color="teal.800">{chat.user}</Text>
                                            <Text w="100%" fontSize="12px" color="teal.800" textOverflow="ellipsis" whiteSpace="nowrap" overflowX="clip">
                                                {chat.messages?.slice(-1)[0].content}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                )
                        }
                    </VStack>
                </VStack>
                <Box h="100%" bg="gray.300" w="1px"/>
                <ChatBox user={actualChat?.user} messages={actualChat?.messages}/>
            </HStack>
        </Center>
    )
}