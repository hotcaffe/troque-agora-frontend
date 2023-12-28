import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Button, Divider, Heading, VStack } from "@chakra-ui/react";

interface INoticeInterestCard {
    interestList: {
        title: string;
        description: string;
    }[]
}

export function NoticeInterestsCard({interestList}: INoticeInterestCard) {
    return (
        <VStack bg="white" justify="space-between" rounded="10px" w="300px" maxH="550px">
            <VStack p="10px" w="100%">
                <Heading mb="20px" fontSize="18px" fontWeight="regular" color="gray.400">Interesses do anunciante:</Heading>
                <Accordion w="100%" p="5px" maxH="400px" overflowY="scroll" allowMultiple>
                    {interestList.map((interest, index) => (
                        <AccordionItem key={interest.title + index} rounded="10px" shadow="md" border="none" mb="10px">
                            <AccordionButton fontSize="16px" rounded="10px">{interest.title}</AccordionButton>
                            <AccordionPanel fontSize="12px">
                                <Divider borderWidth="2px" mb="10px"/>
                                {interest.description}
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </VStack>
            <Button fontSize="16px" fontWeight="semibold" w="100%" h="50px" rounded="0 0 10px 10px">Realizar proposta de troca</Button>
        </VStack>
    )
}