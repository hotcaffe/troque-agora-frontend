import { Box, Button, ButtonGroup, Center, Divider, Flex, FormControl, FormLabel, Icon, Input, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { FormBody } from "../common/FormBody";
import { X } from "react-feather";
import { InteractionIcon } from "../common/InteractionIcon";
import { useState } from "react";
import { IProposalItem } from "./interfaces/proposal";
import { useForm } from "react-hook-form";
import { ProposalItemForm } from "./ProposalItemForm";



export function Proposal() {
    const [proposalList, setProposalList] = useState<IProposalItem[]>([])

    function onRemoveItem(index: number) {
        setProposalList(proposalList => [...proposalList.filter((_, subIndex) => subIndex != index)])
    }

    return (
        <VStack bg="white" w="1000px" p="20px" rounded="10px" align="start">
            <FormBody title="Cadastrar uma contra-proposta:">
                <FormControl w="300px" >
                    <FormLabel color="teal.300">Título</FormLabel>
                    <Input placeholder="Digite o título da proposta" type="text" pattern="^[a-zA-Z]+$"/>
                </FormControl>
                <FormControl w="350px" >
                    <FormLabel color="teal.300">Descrição</FormLabel>
                    <Input placeholder="Digite uma descrição pra proposta" type="text" pattern="^[a-zA-Z]+$"/>
                </FormControl>
            </FormBody>
            <Divider borderWidth="2px" borderColor="gray.100" my="10px"/>
            <ProposalItemForm setProposalList={setProposalList}/>
            <Divider borderWidth="2px" borderColor="gray.100" my="10px"/>
            {proposalList.length > 0 ? 
                <TableContainer maxH="300px" overflowY="scroll">
                    <Table>
                        <Thead >
                            <Tr>
                                <Th/>
                                <Th color="gray.400">Título</Th>
                                <Th color="gray.400">Descrição</Th>
                                <Th color="gray.400">Quantidade</Th>
                                <Th color="gray.400">Unidade</Th>
                                <Th color="gray.400">Situação</Th>
                                <Th color="gray.400">Categoria</Th>
                            </Tr>
                        </Thead>
                        <Tbody maxH="300px" overflowY="scroll">
                            {proposalList.map((item, index) => 
                                (
                                    <Tr key={index} color="teal.800">
                                        <Td><InteractionIcon as={X} w="16px" h="16px" onClick={() => onRemoveItem(index)}/></Td>
                                        <Td maxW="150px" minW="150px" overflowX="hidden" whiteSpace="nowrap" textOverflow="ellipsis" title={item.vc_itemTitulo}>
                                            {item.vc_itemTitulo}
                                        </Td>
                                        <Td maxW="200px" minW="200px" overflowX="hidden" whiteSpace="nowrap" textOverflow="ellipsis" title={item.vc_descricao}>
                                            {item.vc_descricao}
                                        </Td>
                                        <Td maxW="100px" minW="100px">{item.fl_quantidade}</Td>
                                        <Td maxW="100px" minW="100px">{item.ch_unidade}</Td>
                                        <Td maxW="130px" minW="130px">{item.vc_situacaoProduto}</Td>
                                        <Td maxW="130px" minW="130px">{item.id_categoria}</Td>
                                    </Tr>
                                )    
                            )}
                        </Tbody>
                    </Table>
                </TableContainer> : 
                <Center w="100%" h="150px">
                    <Text color="gray.400">Informe itens acima para adicioná-los na sua proposta!</Text>
                </Center>
            }
            <Divider borderWidth="2px" borderColor="teal.300" my="10px"/>
            <Flex w="100%" justify="end">
                <ButtonGroup>
                    <Button variant="inverse" w="100px">Cancelar</Button>
                    <Button w="100px">Finalizar</Button>
                </ButtonGroup>
            </Flex>
        </VStack>
    )
}