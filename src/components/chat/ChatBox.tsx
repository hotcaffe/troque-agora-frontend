import { VStack, HStack, Avatar, Divider, InputGroup, Input, InputRightElement, IconButton, Icon, Text, Box, SkeletonCircle, Skeleton } from "@chakra-ui/react";
import {  useEffect, useRef } from "react";
import { Send } from "react-feather";

interface IChatBox {
    user: string;
    messages: {
        owner?: boolean;
        date: string;
        content: string;
    }[]
}


export function ChatBox({user, messages}: IChatBox) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView()
    }, [messages]);

    function onMessage(message: string) {
        console.log(message)
    }

    return (
        <VStack minW="500px" p="20px" h="100%" bg="white" align="start">
            <HStack gap="10px" w="100%">
                {user ? 
                    <>
                        <Avatar size="sm"/>
                        <Text fontWeight="semibold" color="teal.800">
                            {user}
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
                    {messages ? 
                        messages.map((message, index) => {
                            return (
                                <VStack key={`${user}-${message.date}-${index}-${message.content}`} w="100%" align={message.owner ? "end" : "start"}>
                                    <Text color="teal.600" fontSize="10px">{message.date}</Text>
                                    <Box bg={message.owner ? "teal.300" : "teal.800"} p="8px 10px">
                                        <Text color="white">{message.content}</Text>
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
            <InputGroup mt="20px" as='form' onSubmit={(e: any) => {
                e.preventDefault();
                onMessage(e.target["message-input"].value)
            }}>
                {user ? 
                    <>
                        <Input name="message-input" placeholder={`Envie uma mensagem para ${user}`} />
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