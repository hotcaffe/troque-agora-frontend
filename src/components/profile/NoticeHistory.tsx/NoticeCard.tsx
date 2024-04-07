import { GenericDialog } from "@/components/common/GenericDialog";
import { INoticeData } from "@/interfaces/notice";
import { formatValue } from "@/utils/formatValue";
import { Divider, HStack, Icon, Text, VStack, IconButton, useDisclosure, Flex, Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Edit, Trash, X } from "react-feather";

interface INoticeCard {
    data: INoticeData
}

export function NoticeCard({data}: INoticeCard) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();

    function onRemove() {
        onClose()
    }

    return (
        <VStack p="8px 10px" align="start" rounded="10px" shadow="md" outline="0.2px solid" outlineColor={data.bo_ativo ? "gray.400" : "red.400"} w="420px">
            <HStack justify="space-between" w="100%">
                <Text fontWeight="semibold" color={data.bo_ativo ? "teal.800" : "red.400"}>{data.vc_titulo}</Text>
                {data.bo_ativo ? 
                    <GenericDialog isOpen={isOpen} onOpen={onOpen} onClose={onClose} onConfirm={onRemove} 
                        title="Remover anúncio?" description="Tem certeza que deseja remover esse anúncio? Todas as propostas em andamento serão encerradas!"
                    >
                        <IconButton 
                            icon={<Icon as={Trash}/>} aria-label="Excluir anúncio" h="24px" 
                            border="2px solid" borderColor="red.300" bg="white" color="red.300"
                            _hover={{bg: "white", color: "red.600", borderColor: "red.600"}}
                        />
                    </GenericDialog> :
                    <Text color="red.500">Anúncio Cancelado</Text>
                }
            </HStack>
            <Divider borderWidth="2px" color="gray.50" />
            <Text noOfLines={1} fontSize="14px" >{data.vc_descricao}</Text>
            <Divider borderWidth="2px" borderColor={data.bo_ativo ? "teal.600" : "red.600"} opacity={1}/>
            <HStack my="5px" w="100%" justify="space-between" >
                <Stat>
                    <StatLabel>Valor a negociar:</StatLabel>
                    <StatNumber color={data.bo_ativo ? "teal.300" : "red.300"}>{formatValue('currency', data.vl_preco)}</StatNumber>
                    <StatHelpText fontWeight="semibold">
                        <Flex>
                            Unidade: <Text color={data.bo_ativo ? "teal.400" : "red.400"} w="fit-content" ml="5px" mr="10px">{data.ch_unidade}</Text> 
                            Quantidade: <Text color={data.bo_ativo ? "teal.400" : "red.400"} w="fit-content" ml="5px">{data.fl_quantidade}</Text>x
                        </Flex>
                    </StatHelpText>
                </Stat>
                {
                    data.bo_ativo && 
                    <IconButton 
                        icon={<Icon as={Edit} w="24px" h="24px"/>} aria-label="Editar anúncio" variant="secondary" h="95px"
                        onClick={() => router.push('/perfil/anuncio/' + data.id_anuncioTroca)}
                    />
                }
            </HStack>
        </VStack>
    )
}