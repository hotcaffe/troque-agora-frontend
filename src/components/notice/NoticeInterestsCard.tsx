import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Button, Divider, Heading, Link, VStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { INoticeDetails } from "../../interfaces/notice";
import { IUserTokenData } from "@/interfaces/profile";

interface INoticeInterestCard {
    id_usuarioAnuncio: number;
    interestList: INoticeDetails[]
    setProposal: Dispatch<SetStateAction<boolean>>;
}

export function NoticeInterestsCard({id_usuarioAnuncio, interestList, setProposal}: INoticeInterestCard) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<IUserTokenData>();

    useEffect(() => {
        const storage = localStorage.getItem('user-data')
        if (storage) {
            setIsAuthenticated(true)
            setUser(JSON.parse(storage));
        }
    }, [])

    return (
        <VStack bg="white" justify="space-between" rounded="10px" w="300px" maxH="550px">
            <VStack p="10px" w="100%">
                <Heading mb="20px" fontSize="18px" fontWeight="regular" color="gray.400">Interesses do anunciante:</Heading>
                <Accordion w="100%" p="5px" maxH="400px" overflowY="scroll" allowMultiple>
                    {interestList?.map((interest, index) => (
                        <AccordionItem key={interest.id_detalheTroca} rounded="10px" shadow="md" border="none" mb="10px">
                            <AccordionButton fontSize="16px" rounded="10px">{interest.vc_titulo}</AccordionButton>
                            <AccordionPanel fontSize="12px">
                                <Divider borderWidth="2px" mb="10px"/>
                                {interest.vc_conteudo}
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </VStack>
            {isAuthenticated ? 
                <>
                    {(user?.id_usuario != id_usuarioAnuncio) &&
                        <Button onClick={() => setProposal(true)} fontSize="16px" fontWeight="semibold" w="100%" h="50px" rounded="0 0 10px 10px">
                            Realizar proposta de troca
                        </Button>
                    }
                </>
                 : 
                <Link href="/login" w="100%">
                    <Button fontSize="16px" fontWeight="semibold" w="100%" h="50px" rounded="0 0 10px 10px" variant="secondary">
                        Entre para realizar trocas
                    </Button>
                </Link>
            }
        </VStack>
    )
}