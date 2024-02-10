import { FormBody } from "@/components/common/FormBody";
import { FormInput } from "@/components/common/FormInput";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { INoticeDetails } from "../../../interfaces/notice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'
import { Dispatch, SetStateAction } from "react";

interface IAddNoticeItemForm {
    setDetailList: Dispatch<SetStateAction<INoticeDetails[]>>
}

const schema = Yup.object().shape({
    id_detalheTroca: Yup.number().required(),
    vc_titulo: Yup.string().min(5, "Deve possuir no mínimo 5 caracteres").max(32, "Maxímo de 32 caracteres").required("Campo obrigatório"),
    vc_conteudo: Yup.string().min(24, "Deve possuir no mínimo 24 caracteres").max(128, "Máximo de 128 caracteres").required("Campo obrigatório"),
})

export function AddNoticeItemForm({setDetailList}: IAddNoticeItemForm) {
    const {register, handleSubmit, formState, reset} = useForm<INoticeDetails>({
        mode: 'all',
        resolver: yupResolver(schema)
    });

    const {errors} = formState;

    function onSubmit(data: INoticeDetails) {
        setDetailList(detailList => [...detailList, data]);
        reset();
    }

    return (
        <Flex as="form" onSubmit={handleSubmit(onSubmit)} align="end" justify="space-between" w="100%">
            <Box visibility="hidden" display="none">
                <Input {...register("id_detalheTroca")} value="0"/>
            </Box>
            <FormBody title="Cadastre seus itens de interesse:">
                <FormInput title='Título' error={errors?.vc_titulo?.message} w="300px" man>
                    <Input placeholder="Digite o título da proposta" type="text" {...register("vc_titulo")}/>
                </FormInput>
                <FormInput title='Descrição' error={errors?.vc_conteudo?.message} w="450px" man>
                    <Input placeholder="Digite a descrição do item" type="text" {...register("vc_conteudo")}/>
                </FormInput>
            </FormBody>
            <Button w="150px" type="submit">Adicionar</Button>
        </Flex>
    )
}