"use client"

import { Button, ButtonGroup, Center, Checkbox, Divider, Flex, Input, Link, Td, Text, Textarea, Tr, VStack } from "@chakra-ui/react";
import { FormBody } from "../../common/FormBody";
import { FormInput } from "../../common/FormInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'
import { INotice, INoticeDetails } from "../interfaces/notice";
import { AddNoticeItemForm } from "./AddNoticeItemForm";
import { InteractionIcon } from "@/components/common/InteractionIcon";
import { SimpleStateList } from "@/components/common/SimpleStateList";
import { X } from "react-feather";
import {  useState } from "react";
import { MaskedInput } from "@/components/common/MaskedInput";

const schema = Yup.object().shape({
    vc_titulo: Yup.string().min(5, "Deve possuir no mínimo 5 caracteres").max(128, "Maxímo de 128 caracteres").required("Campo obrigatório"),
    vc_descricao: Yup.string().min(24, "Deve possuir no mínimo 24 caracteres").max(256, "Máximo de 256 caracteres").required("Campo obrigatório"),
    fl_quantidade: Yup.number().typeError('Digite a quantidade').required("Campo obrigatório"),
    ch_unidade: Yup.string().max(4, "Maxímo de 4 caracteres").required("Campo obrigatório"),
    vl_preco: Yup.number().typeError('Digite o preço').required("Campo obrigatório"),
    vc_situacaoProduto: Yup.string().min(2, "Mínimo 2 caracteres").max(32, "Máximo de 32 caracteres").required("Campo obrigatório"),
    bo_ativo: Yup.boolean(),
    vc_situacaoAnuncio: Yup.string().required()
})

export function AddNotice() {
    const [detailList, setDetailList] = useState<INoticeDetails[]>([])

    const {register, handleSubmit, formState} = useForm<INotice>({
        mode: 'all',
        resolver: yupResolver(schema)
    });

    function onRemoveItem(index: number) {
        setDetailList(detailList => [...detailList.filter((_, subIndex) => subIndex != index)])
    }

    function onSubmit(data: INotice) {
        console.log({
            ...data,
            details: detailList
        })
    }

    const {errors} = formState;

    return (
        <VStack maxW="1000px" bg="white" p="20px" rounded="10px">
            <FormBody as="form" title="Cadastrar um anúncio:" >
                <FormInput title='Título' error={errors?.vc_titulo?.message} w="300px" man>
                    <Input placeholder="Digite o título da proposta" type="text" {...register("vc_titulo")}/>
                </FormInput>
                <FormInput title='Valor a negociar' error={errors?.vl_preco?.message} w="200px" man>
                    <MaskedInput 
                        placeholder="Digite o valor"
                        mask={[{mask: Number, max: 99999999999999, thousandsSeparator: '.'}]} 
                        {...register("vl_preco")}
                    />
                </FormInput>
                <FormInput title='Situação do item' error={errors?.vc_situacaoProduto?.message} w="300px" man>
                    <Input placeholder="Digite a situação do item" type="text" {...register("vc_situacaoProduto")}/>
                </FormInput>
                <FormInput title='Quantidade' error={errors?.fl_quantidade?.message} w="145px" man>
                    <MaskedInput 
                        placeholder="Quantidade"
                        mask={[
                            {mask: Number, max: 99999999999999999, thousandsSeparator: '.', scale: 6, from: 0}
                        ]} 
                        {...register("fl_quantidade")}
                    />
                </FormInput>
                <FormInput title='Unidade' error={errors?.ch_unidade?.message} w="145px" man>
                    <MaskedInput 
                        placeholder="Unidade"
                        mask="aaaa"
                        {...register("ch_unidade")}
                    />
                </FormInput>
                <FormInput title='Descrição' error={errors?.vc_descricao?.message} man>
                    <Textarea placeholder="Digite a descrição do seu anúncio" h="120px" {...register("vc_descricao")}/>
                </FormInput>
                <Checkbox hidden isChecked={true} {...register("vc_situacaoAnuncio")}/>
            </FormBody>
            <Divider borderWidth="2px" my="10px"/>
            <AddNoticeItemForm setDetailList={setDetailList}/>
            {detailList.length > 0 ? 
                <SimpleStateList labels={['Título', 'Descrição']}>
                    {detailList.map((item, index) => 
                        (
                            <Tr key={index} color="teal.800" overflowX="hidden">
                                <Td><InteractionIcon as={X} w="16px" h="16px" onClick={() => onRemoveItem(index)}/></Td>
                                <Td  overflowX="hidden" whiteSpace="nowrap" textOverflow="ellipsis" title={item.vc_titulo}>
                                    {item.vc_titulo}
                                </Td>
                                <Td  overflowX="hidden" whiteSpace="nowrap" textOverflow="ellipsis" title={item.vc_conteudo}>
                                    {item.vc_conteudo}
                                </Td>
                            </Tr>
                        )    
                    )}
                </SimpleStateList> : 
                <Center w="100%" h="150px">
                    <Text color="gray.400">Informe itens acima para adicioná-los na sua proposta!</Text>
                </Center>
            }
            <Divider borderWidth="2px" borderColor="teal.300" my="10px"/>
            <Flex w="100%" justify="end">
                <ButtonGroup>
                    <Link href="/home"><Button variant="inverse" w="100px">Cancelar</Button></Link>
                    <Button w="100px" type="submit" onClick={handleSubmit(onSubmit, () => console.log(errors))}>Finalizar</Button>
                </ButtonGroup>
            </Flex>
        </VStack>
    )
}