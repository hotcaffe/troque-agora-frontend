"use client"
import { IChat } from "@/interfaces/chat";
// import socket from "@/utils/socket";
// import socket from "@/utils/socket";
import { VStack, HStack, Avatar, Divider, InputGroup, Input, InputRightElement, IconButton, Icon, Text, Box, SkeletonCircle, Skeleton, Button } from "@chakra-ui/react";
import {  useEffect, useRef, useState } from "react";
import { Send } from "react-feather";
import { Socket } from "socket.io-client";

interface IChatBox {
    chat: IChat | undefined;
    socket: Socket;
}

export function ChatBox({chat, socket}: IChatBox) {
    const {id_usuario ,vc_nome, conversations} = chat ? chat : {id_usuario: undefined, vc_nome: undefined, conversations: undefined};
    const [isTyping, setIsTyping] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView()
        readMessages()
    }, [conversations])

    useEffect(() => {
        readMessages()
    }, [id_usuario])

    function onMessage(message: string) {
        socket.emit("private message", {
            content: message,
            to: id_usuario
        })
    }

    function handleMessage(e: any) {
        e.preventDefault();
        onMessage(e.target["message-input"].value)
        e.target["message-input"].value = ""
        setIsTyping(false)
        socket.emit("private typing", {
            to: id_usuario,
            isTyping: false
        })  
    }

    function handleTyping(value: string) {
        if (value) {
            if (isTyping) return;
            setIsTyping(true)
            socket.emit("private typing", {
                to: id_usuario,
                isTyping: true
            })
        } else {
            if (!isTyping) return;
            setIsTyping(false)
            socket.emit("private typing", {
                to: id_usuario,
                isTyping: false
            })           
        }
    }

    function readMessages() {
        const messages = conversations?.filter(chat => !chat.read && chat.user_id == id_usuario).map(chat => chat._id);
        if (messages && messages?.length > 0) socket.emit('read message', {messages, user_id: id_usuario})
    }

    return (
        <VStack minW="500px" p="20px" h="100%" bg="white" align="start">
            <HStack gap="10px" w="100%">
                {vc_nome ? 
                    <>
                        <Avatar size="sm"/>
                        <Text fontWeight="semibold" color="teal.800">
                            {vc_nome}
                        </Text>
                    </> :
                    <>
                        <SkeletonCircle size='10'/>
                        <Skeleton height='40px' w="100%"/>
                    </>
                }
            </HStack>
            <Divider borderWidth="1px" />
            <VStack h="100%" w="100%" justify="end" >
                <VStack overflowY="scroll" h="600px" pr="10px" w="650px" minW="400px" direction="column-reverse" justify="start">
                    {conversations ? 
                        conversations.map((message, index) => {
                            const isOwner = message.user_id == id_usuario;
                            if (isOwner) { 
                                return (
                                    <VStack key={message._id} w="100%" align={"start"}>
                                        <Text color="teal.600" fontSize="10px">
                                            {`${new Date(Number(message.timestamp)).toLocaleDateString('pt-BR', {hour: 'numeric', minute: 'numeric', second: 'numeric'})}`}
                                        </Text>
                                        <Box bg={"teal.800"} p="8px 10px">
                                            <Text color="white" wordBreak="break-all">{message.message}</Text>
                                        </Box>
                                    </VStack>    
                                )
                            }

                            return (
                                <VStack key={message._id} w="100%" align={"end"}>
                                    <Text color="teal.600" fontSize="10px">
                                        {`${new Date(Number(message.timestamp)).toLocaleDateString('pt-BR', {hour: 'numeric', minute: 'numeric', second: 'numeric'})}`}
                                    </Text>
                                    <Box bg={"teal.300"} p="8px 10px" whiteSpace="wrap">
                                        <Text color="white" wordBreak="break-all">{message.message}</Text>
                                    </Box>
                                </VStack>                                       
                            )
                        }
                        ) :
                        <VStack w="100%" >
                            <Skeleton w="250px" h="40px" alignSelf="start"/>
                            <Skeleton w="350px" h="40px" alignSelf="start"/>
                            <Skeleton w="150px" h="40px" alignSelf="end"/>
                            <Skeleton w="250px" h="40px" alignSelf="start"/>
                            <Skeleton w="250px" h="40px" alignSelf="end"/>
                        </VStack>
                    }
                    <Box ref={scrollRef} h="1px" w="1px"/>
                </VStack>
            </VStack>
            <InputGroup mt="20px" as='form' onSubmit={(e: any) => handleMessage(e)}>
                {vc_nome ? 
                    <>
                        <Input name="message-input" placeholder={`Envie uma mensagem para ${vc_nome}`} autoComplete="off" onChange={(e) => handleTyping(e.target.value)}/>
                        <InputRightElement> 
                            <IconButton icon={<Icon as={Send}/>} aria-label="Enviar mensagem" 
                                rounded="0 5px 5px 0"
                                type='submit'
                            />
                        </InputRightElement>
                    </> :
                    <Skeleton w="100%" h="40px"/>
                }
            </InputGroup>
        </VStack>
    )
}