import { GenericDialog } from "@/components/common/GenericDialog";
import { INoticeProposalFull, IProposalData } from "@/interfaces/proposal";
import { Divider, HStack, Icon,  Text, Circle, VStack, IconButton, useDisclosure } from "@chakra-ui/react";
import { Search, Trash } from "react-feather";

interface IProposalCard {
    data: INoticeProposalFull;
    onOpen: (proposal: INoticeProposalFull) => void;
}

export function ProposalCard({data, onOpen}: IProposalCard) {
    return (
        <VStack p="8px 10px" align="start" rounded="10px" shadow="md" outline="0.2px solid" outlineColor={data.proposal.bo_ativo ? "gray.400" : "red.400"} w="400px">
            <HStack justify="space-between" w="100%">
                <Text fontWeight="semibold" color={data.proposal.bo_ativo ? "teal.800" : "red.400"}>{data.proposal.vc_titulo}</Text>
                <IconButton 
                    icon={<Icon as={Search}/>} aria-label="Excluir proposta" h="24px" 
                    border="2px solid" borderColor="gray.400" bg="white" color="gray.400"
                    _hover={{bg: "white", color: "gray.600", borderColor: "gray.600"}}
                    onClick={() => onOpen(data)}
                />
            </HStack>
            <Divider borderWidth="2px" color="gray.50" />
            <Text noOfLines={3} fontSize="14px">{data.proposal.vc_descricao}</Text>
            <Divider borderWidth="2px" borderColor={data.proposal.bo_ativo ? "teal.600" : "red.600"} opacity={1}/>
            <HStack my="10px" w="100%" justify="start" >
                {data.proposal.proposalItems?.slice(0, 5).map((item) => (
                    <HStack key={item.id_detalheProposta} align="center" maxW="70px">
                        <Circle size="6px" bg={data.proposal.bo_ativo ? "teal.800" : "red.800"}/>
                        <Text h="fit-content" key={item.id_detalheProposta} fontSize="12px" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
                            {item.vc_itemTitulo}
                        </Text>
                    </HStack>
                        
                ))}
            </HStack>
        </VStack>
    )
}