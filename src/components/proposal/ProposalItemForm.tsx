import { Flex, FormControl, FormLabel, Input, Button, FormErrorMessage } from "@chakra-ui/react";
import { FormBody } from "../common/FormBody";
import { Dispatch, SetStateAction } from "react";
import { IProposalItem } from "./interfaces/proposal";
import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { FormInput } from "../common/FormInput";

interface IProposalItemForm {
    setProposalList: Dispatch<SetStateAction<IProposalItem[]>>
}

const schema = Yup.object().shape({
    vc_itemTitulo: Yup.string().min(5, "Deve possuir no mínimo 5 caracteres").max(64, "Maxímo de 64 caracteres").required("Campo obrigatório"),
    vc_descricao: Yup.string().min(12, "Deve possuir no mínimo 12 caracteres").max(128, "Máximo de 128 caracteres").required("Campo obrigatório"),
    fl_quantidade: Yup.number().typeError('A quantidade deve ser um número').required("Campo obrigatório"),
    ch_unidade: Yup.string().max(4, "Máximo de 4 caracteres").required("Campo obrigatório."),
    vc_situacaoProduto: Yup.string().max(32, "Máximo de 32 caracteres").required("Campo obrigatório"),
    id_categoria: Yup.number().typeError('A categoria deve ser um número.').required("Campo obrigatório")
})

export function ProposalItemForm({setProposalList}: IProposalItemForm) {
    const {register, handleSubmit, formState} = useForm<IProposalItem>({
        mode: 'all',
        resolver: yupResolver(schema)
    })

    const {errors} = formState;

    function onSubmit(data: IProposalItem) {
        setProposalList(proposalList => [...proposalList, data])
    }

    return (
        <Flex as={'form'} onSubmit={handleSubmit(onSubmit, () => console.log(errors))} align="end" justify="space-between">
            <FormBody title="Cadastre os itens da contra-proposta:">
                <FormInput title='Título' error={errors?.vc_itemTitulo?.message} w="300px" man>
                    <Input placeholder="Digite o título da proposta" type="text" pattern="^[a-z0-9A-Z]+$" {...register("vc_itemTitulo")}/>
                </FormInput>
                <FormInput title='Descrição' error={errors?.vc_descricao?.message} w="470px" man>
                    <Input placeholder="Digite uma descrição pra proposta" type="text" pattern="^[^\s][A-z0-9À-ž\s]+$" {...register("vc_descricao")}/>
                </FormInput>
                <FormInput title='Quantidade' error={errors?.fl_quantidade?.message} w="150px" man>
                    <Input placeholder="Quantidade" type="number"{...register('fl_quantidade')}/>
                </FormInput>
                <FormInput title='Unidade' error={errors?.ch_unidade?.message} w="150px" man>
                    <Input placeholder="Unidade" type="text" {...register('ch_unidade')}/>
                </FormInput>
                <FormInput title='Situação' error={errors?.vc_situacaoProduto?.message} w="300px" man>
                    <Input placeholder="Situação do item" type="text" {...register('vc_situacaoProduto')}/>
                </FormInput>
                <FormInput title='Categoria' error={errors?.id_categoria?.message} w="150px" man>
                    <Input placeholder="Categoria" {...register('id_categoria')}/>
                </FormInput>
            </FormBody>
            <Button w="150px" type="submit">Adicionar</Button>
        </Flex>
    )
}