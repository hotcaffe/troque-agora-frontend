import { Checkbox, Divider, Flex, HStack, Icon, Input, InputGroup, InputLeftElement, Select, VStack } from "@chakra-ui/react";
import { INoticeData } from "@/interfaces/notice";
import { Search } from "react-feather";
import { NoticeCard } from "./NoticeCard";
import { useRef, useState } from "react";

interface INoticeList {
    list: INoticeData[]
}

export function NoticeList({list}: INoticeList) {
    const filters = useRef<HTMLDivElement>(null);
    const [stateList, setStateList] = useState(list);
    const [showCanceled, setShowCanceled] = useState(false);
    function onSearch(elements: any) {
        const {vc_titulo, vc_situacaoAnuncio} =  elements;
        setStateList(_ => list
            .filter(notice => notice.vc_titulo.includes(vc_titulo.value))
            .filter(notice => notice.vc_situacaoAnuncio.includes(vc_situacaoAnuncio.value))
        )
    }

    return (
        <VStack w="100%" gap="15px" bg="white" align="start">
            <VStack align="start" gap="10px">
                <HStack justify="space-between" w="100%" gap="10px" ref={filters} 
                    onChange={() => filters.current && onSearch(filters.current.getElementsByClassName("filters"))}
                >
                    <InputGroup >
                        <InputLeftElement pointerEvents='none'>
                            <Icon as={Search}/>
                        </InputLeftElement>
                        <Input className="filters" name="vc_titulo" type='text' placeholder='Pesquisar pelos anúncios' w="400px"/>
                    </InputGroup>
                    <Select className="filters" name="vc_situacaoAnuncio" placeholder="Selecione a situação" >
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
                    </Select>
                </HStack>
                <Checkbox fontSize="10px" onChange={(e) => setShowCanceled(e.target?.checked)}>Mostrar cancelados?</Checkbox>
            </VStack>
            <Divider borderColor="teal.300" w="100%" borderWidth="2px" opacity={1}/>
            <Flex mt="10px" overflowY="scroll" p="5px" maxH="780px" w="100%" align="start" wrap="wrap" gap="15px" justify="start">
                {(showCanceled ? stateList : stateList.filter(notice => notice.bo_ativo)).map(notice => (
                    <NoticeCard key={`${notice.id_usuarioAnuncio}-${notice.id_anuncioTroca}`} data={notice}/>
                ))}
            </Flex>
        </VStack>
    )
}