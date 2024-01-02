import { Divider, Flex, HStack, Heading, Image, ListItem, Progress, Square, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, UnorderedList, VStack } from "@chakra-ui/react";
import { NoticeMiniaturePreview } from "./NoticeMiniaturePreview";
import { useState } from "react";
import { ZoomImageCard } from "../common/ZoomImageCard";
import { formatValue } from "@/utils/formatValue";

interface INoticeCard {
    title: string;
    description: string;
    noticeTotalValue: number;
    noticeUnit: string;
    noticeQuantity: number;
    advertiserChanges: number;
    advertiserReceivedChanges: number;
    advertiserRate: number;
    topicList: string[];
    imageList: string[];
}

export function NoticeCard({title, description, noticeTotalValue, noticeUnit, noticeQuantity, advertiserChanges, advertiserReceivedChanges, advertiserRate, topicList, imageList}: INoticeCard) {
    const [selectedImage, setSelectedImage] = useState(imageList[0]);

    return (
        <Flex p="10px" bg="white" gap="10px" rounded="10px" maxW="800px" maxH="550px" color="teal.900">
            <VStack maxW="400px">
                <Square size="350px" outline="1px solid" outlineColor="gray.50" bg="gray.100" overflow="hidden" rounded="10px">
                    <ZoomImageCard src={selectedImage} maxH="350px" maxW="350px"/>
                </Square>
                <HStack maxW="350px" gap="15px" h="120px" overflowX="scroll">
                    {imageList.map((image, index) => 
                        <NoticeMiniaturePreview key={image + index} source={image} onClick={() => setSelectedImage(imageList[index])}/>
                    )}
                </HStack>
            </VStack>
            <VStack gap="10px" align="start" ml="10px">
                <Heading fontSize="20px">{title}</Heading>
                <Text fontSize="12px">{description}</Text>
                <UnorderedList fontSize="12px">
                    {topicList.slice(0, 6).map((topic, index) => <ListItem key={topic + index}>{topic}</ListItem>)}
                </UnorderedList>
                <Divider borderWidth="2px"/>
                <Stat>
                    <StatLabel>Valor a negociar:</StatLabel>
                    <StatNumber color="teal.300">{formatValue('currency', noticeTotalValue)}</StatNumber>
                    <StatHelpText fontWeight="semibold">
                        <Flex>
                            Unidade: <Text color="teal.400" w="fit-content" ml="5px" mr="10px">{noticeUnit}</Text> 
                            Quantidade: <Text color="teal.400" w="fit-content" ml="5px">{noticeQuantity}</Text>x
                        </Flex>
                    </StatHelpText>
                </Stat>
                <Stat>
                    <StatLabel>Trocas realizadas:</StatLabel>
                    <StatHelpText>
                        <StatArrow type="increase"/> 
                        {advertiserChanges} trocas bem sucedidas
                    </StatHelpText>
                </Stat>
                <Stat>
                    <StatLabel>Trocas recebidas:</StatLabel>
                    <StatHelpText>
                        <StatArrow type="increase"/> 
                        {advertiserReceivedChanges} trocas recebidas de outros usuários
                    </StatHelpText>
                </Stat>
                <Stat>
                    <StatLabel>Avaliação geral do anunciante</StatLabel>
                    <StatHelpText>
                        <Progress value={advertiserRate} colorScheme="teal" rounded="5px"/>
                        {advertiserRate}%
                    </StatHelpText>
                </Stat>
            </VStack>
        </Flex>
    )
}