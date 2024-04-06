"use client"

import { ChatBox } from "@/components/chat/ChatBox";
import { IChat } from "@/interfaces/chat";
import { api } from "@/utils/api";
import socket from "@/utils/socket";
import { Avatar, Box, Center, Divider, HStack, Icon, Input, InputGroup, InputLeftElement, SkeletonCircle, SkeletonText, Text, VStack } from "@chakra-ui/react";
import {  useEffect, useState } from "react";
import { Circle, Search } from "react-feather";
import { useQuery } from "react-query";


export default function Page() {
    const [actualChat, setActualChat] = useState<number>();
    const [chatList, setChatList] = useState<IChat[]>();
    const [filterList, setFilterList] = useState<number[]>([]);
    const [whoIsTyping, setWhoIsTyping] = useState<number[]>([]);
    async function get(): Promise<IChat[]> {
        const data = await api.get("/chat/").then(res => res.data)
        return data;
    }

    const {data, isLoading} = useQuery('conversas', get, {
        onSuccess: (data) => {
            if (data) {
                setChatList(data);
            }
        },
        refetchInterval: 0,
        refetchOnMount: false,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false
    });

    function onSearch(value: string) {
        const filteredChatList = chatList?.filter((chat) => chat.vc_nome.toUpperCase().includes(value.toUpperCase())).map(chat => chat.id_usuario) || [];
        setFilterList(filteredChatList);
    }

    function setNewMessage(message: any) {
        setChatList(chatList => chatList?.map(chat => {
            if ((chat.id_usuario == message.recipient_id) || (chat.id_usuario == message.user_id)) {
                return {
                    ...chat,
                    conversations: [...chat.conversations, message]
                }
            } else {
                return chat;
            }
        }))
    }

    useEffect(() => {
        socket.connect();

        socket.on("message received", (message) => {
            setNewMessage(message)
        });

        socket.on("private message", (message) => {
            setNewMessage(message)
        })

        socket.on("private typing", (message) => {
            if (message.isTyping) {
                const alreadyTyping = whoIsTyping.find(user => user == message.from);
                if (alreadyTyping) return;
                setWhoIsTyping(whoIsTyping => [...whoIsTyping, Number(message.from)] );
            } else {
                setWhoIsTyping(whoIsTyping => whoIsTyping.filter(user => user != message.from))
            }
        })

        socket.on("message readed", ({messages, user_id}: {messages: string[], user_id: number}) => {
            setChatList(chatList => chatList?.map(chat => {
                if (chat.id_usuario != user_id) return chat;

                const updatedConversations = chat.conversations.map(message => {
                    if (messages.includes(message._id)) {
                        return {
                            ...message,
                            read: true
                        }
                    }

                    return message
                })

                return {
                    ...chat,
                    conversations: updatedConversations
                }
            }))
        })

        return () => {
            socket.off("message received")
            socket.off("private message")
            socket.off("private typing")
            socket.off("read message")
        }
    }, [])

    return (
        <Center w="100%">
            <HStack rounded="10px" maxW="1000px" bg="white" h="800px" align="start">
                <VStack p="20px" maxW="350px" align="start" gap="15px">
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
                                chatList?.filter(chat => filterList.length == 0 || filterList?.includes(chat.id_usuario))?.map((chat: IChat, index: number) => {
                                    const lastMessage = chat.conversations?.slice(-1)[0];
                                    const isOwner = chat.id_usuario == lastMessage?.recipient_id ? 'Você: ' : '';
                                    const isTyping = whoIsTyping.includes(chat.id_usuario);
                                    const unread = chat.conversations.filter(message => !message.read && message.user_id == chat.id_usuario);

                                    return (
                                        <HStack key={chat.id_usuario} gap="10px" w="100%" overflowY="scroll" onClick={() => setActualChat(chat.id_usuario)}
                                            _hover={{bg: "gray.100"}} cursor="pointer" py="5px" bg={chat.id_usuario == actualChat ? "gray.100" : "white"}
                                            justify="space-between"
                                        > 
                                            <HStack>
                                                <Avatar size="sm"/>
                                                <VStack align="start" gap="0" maxW="200px"  overflowX="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                                                    <Text fontWeight="semibold" color="teal.800" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" maxW="inherit" title={chat.vc_nome}>
                                                        {chat.vc_nome}
                                                    </Text>
                                                    {isTyping ?
                                                        <Text w="100%" fontSize="12px" color={"teal.300"} textOverflow="ellipsis" whiteSpace="nowrap" overflowX="clip">
                                                            {chat.vc_nome.split(' ')[0] + " está digitando..."}
                                                        </Text> :
                                                        <Text w="100%" fontSize="12px" color={(unread.length > 0) ? "teal.300" : "teal.800"} textOverflow="ellipsis" whiteSpace="nowrap" overflowX="clip">
                                                            {lastMessage ? isOwner + lastMessage.message : 'Clique para enviar uma mensagem'}
                                                        </Text>
                                                    }
                                                </VStack>
                                            </HStack>
                                            {(unread.length > 0) &&
                                                <Center w="20px" h="20px" rounded="100%" bg="teal.300">
                                                    <Text color="white" fontSize="12px">
                                                        {unread.length}
                                                    </Text>
                                                </Center>
                                            }
                                        </HStack>
                                    )
                                })
                        }
                    </VStack>
                </VStack>
                <Box h="100%" bg="gray.300" w="1px"/>
                {actualChat ? 
                    <ChatBox chat={chatList && chatList.find(chat => chat.id_usuario == actualChat)} socket={socket}/>
                    : 
                    <Center minW="500px" p="20px" h="100%" bg="white">
                        <Text color="gray.500" fontWeight="semibold">Selecione uma conversa disponível no lado esquerdo para iniciar um diálogo.</Text>
                    </Center>
                }
            </HStack>
        </Center>
    )
}