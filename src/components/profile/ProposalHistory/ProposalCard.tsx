import { GenericDialog } from "@/components/common/GenericDialog";
import { IProposalData } from "@/components/proposal/interfaces/proposal";
import { Divider, HStack, Icon, ListItem, Text, Circle, VStack, IconButton, useDisclosure } from "@chakra-ui/react";
import { Edit, Trash, X } from "react-feather";

interface IProposalCard {
    data: IProposalData
}

export function ProposalCard({data}: IProposalCard) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    function onRemove() {
        onClose()
    }

    return (
        <VStack p="8px 10px" align="start" rounded="10px" shadow="md" outline="0.2px solid" outlineColor={data.bo_ativo ? "gray.400" : "red.400"} w="400px">
            <HStack justify="space-between" w="100%">
                <Text fontWeight="semibold" color={data.bo_ativo ? "teal.800" : "red.400"}>{data.vc_titulo}</Text>
                {data.bo_ativo ? 
                    <GenericDialog isOpen={isOpen} onOpen={onOpen} onClose={onClose} onConfirm={onRemove} 
                        title="Remover proposta?" description="Tem certeza que deseja remover essa proposta?"
                    >
                        <IconButton 
                            icon={<Icon as={Trash}/>} aria-label="Excluir proposta" h="24px" 
                            border="2px solid" borderColor="red.300" bg="white" color="red.300"
                            _hover={{bg: "white", color: "red.600", borderColor: "red.600"}}
                        />
                    </GenericDialog> :
                    <Text color="red.500">Proposta Cancelada</Text>
                }
            </HStack>
            <Divider borderWidth="2px" color="gray.50" />
            <Text noOfLines={3} fontSize="14px">{data.vc_descricao}</Text>
            <Divider borderWidth="2px" borderColor={data.bo_ativo ? "teal.600" : "red.600"} opacity={1}/>
            <HStack my="10px" w="100%" justify="space-between" >
                {data.items.slice(0, 5).map((item) => (
                    <HStack align="center">
                        <Circle size="6px" bg={data.bo_ativo ? "teal.800" : "red.800"}/>
                        <Text h="fit-content" key={item.id_detalheProposta} fontSize="12px">{item.vc_itemTitulo}</Text>
                    </HStack>
                        
                ))}
            </HStack>
        </VStack>
    )
}