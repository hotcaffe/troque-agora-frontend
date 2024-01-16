import { Box, Divider, Flex, HStack, Heading, VStack } from "@chakra-ui/react";
import { NoticeList } from "./NoticeList";
import { INoticeData } from "@/components/notice/interfaces/notice";

interface INoticeHistory {
    list: INoticeData[]
}

export function NoticeHistory({list}: INoticeHistory) {
    return (
        <VStack p="20px 40px" gap="15px" borderRadius="10px" bg="white" w="1000px">
            <Heading fontSize="24px" color="teal.800" w="100%" >Seus anúncios</Heading>
            <Divider borderWidth="4px" w="100%" borderColor="gray.50"/>
            <HStack gap="10px" justify="space-between" w="100%" h="100%" align="start" minH="830px">
                <NoticeList list={list}/>
            </HStack>
        </VStack>
    )
}