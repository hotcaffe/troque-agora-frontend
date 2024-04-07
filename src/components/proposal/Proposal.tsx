import { Button, ButtonGroup, Center, Divider, Flex, Input, Td, Text, Tr, VStack, useToast } from "@chakra-ui/react";
import { FormBody } from "../common/FormBody";
import { X } from "react-feather";
import { InteractionIcon } from "../common/InteractionIcon";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IProposal, IProposalItem } from "../../interfaces/proposal";
import { ProposalItemForm } from "./ProposalItemForm";
import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "../common/FormInput";
import { SimpleStateList } from "../common/SimpleStateList";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ICategory } from "@/interfaces/category";
import { api } from "@/utils/api";

const schema = Yup.object().shape({
    id_usuarioProposta: Yup.number().default(0),
    id_propostaTroca: Yup.number().default(0),
    vc_titulo: Yup.string().min(5, "Deve possuir no mínimo 5 caracteres").max(128, "Maxímo de 64 caracteres").required("Campo obrigatório"),
    vc_descricao: Yup.string().min(12, "Deve possuir no mínimo 12 caracteres").max(128, "Máximo de 128 caracteres").required("Campo obrigatório"),
    bo_ativo: Yup.boolean().default(true)
})

interface IProposalComponent {
    setProposal: Dispatch<SetStateAction<boolean>>;
}

export function Proposal({setProposal}: IProposalComponent) {
    const [proposalList, setProposalList] = useState<IProposalItem[]>([]);
    const params = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const toast = useToast()
    const [categories, setCategories] = useState<ICategory[]>([]);

    const {register, handleSubmit, formState} = useForm<IProposal>({
        mode: 'all',
        resolver: yupResolver(schema)
    })
    
    const {errors} = formState;

    async function getCategories() {
        try {
            const categories = await api.get("/category", {
                params: {
                    bo_ativo: true
                }
            }).then(res => res.data) as ICategory[];

            setCategories(categories)
        } catch {
            return
        }
    }

    function onRemoveItem(index: number) {
        setProposalList(proposalList => [...proposalList.filter((_, subIndex) => subIndex != index)])
    }

    async function onSumbit(data: {vc_titulo: string, vc_descricao: string}) {
        const query = JSON.parse(params.get('notices') || '[]') as string[];

        try {
            if (query.length > 0) {
                const notices = query?.map(notice => {
                    const [id_anuncioTroca, id_usuarioAnuncio] = notice.split('-');
                    return {id_anuncioTroca: Number(id_anuncioTroca), id_usuarioAnuncio: Number(id_usuarioAnuncio)}
                });
        
                const body = {
                    ...data,
                    proposalItems: proposalList,
                    proposalNotices: notices
                }
                
                await api.post('/proposal', body)
            } else {
                const [id_usuarioAnuncio, id_anuncioTroca] = pathname?.split("/")?.slice(-1)[0]?.split('-');
                const body = {
                    ...data,
                    proposalItems: proposalList,
                    proposalNotices: [{
                        id_usuarioAnuncio: Number(id_usuarioAnuncio),
                        id_anuncioTroca: Number(id_anuncioTroca)
                    }]
                }
                await api.post('/proposal', body)
            }

            toast({
                title: "Proposta enviada com sucesso!",
                status: 'success',
                position: 'top-right'
            })

            router.push("/home")
        } catch {
            return
        }
    }

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('user-data') ? true : false;
        if (!isAuthenticated) {
            router.push('/login')
        }

        getCategories()
    }, [])

    return (
        <VStack bg="white" maxW="1150px" p="20px" rounded="10px" align="start">
            <FormBody title="Cadastrar uma contra-proposta:" as='form' >
                <FormInput title='Título' error={errors?.vc_titulo?.message} w="300px" man>
                    <Input placeholder="Digite o título da proposta" type="text" pattern="^[a-z0-9A-Z]+$" {...register("vc_titulo")}/>
                </FormInput>
                <FormInput title='Descrição' error={errors?.vc_descricao?.message} w="350px" man>
                    <Input placeholder="Digite uma descrição pra proposta" type="text" pattern="^[a-z0-9A-Z]+$" {...register("vc_descricao")}/>
                </FormInput>
            </FormBody>
            <Divider borderWidth="2px" borderColor="gray.100" my="10px"/>
            <ProposalItemForm setProposalList={setProposalList} categories={categories}/>
            <Divider borderWidth="2px" borderColor="gray.100" my="10px"/>
            {proposalList.length > 0 ? 
                <SimpleStateList labels={['Título', 'Descrição', 'Quantidade', 'Unidade', 'Situação', 'Categoria']}>
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
                                <Td maxW="130px" minW="130px">{categories.find(category => category.id_categoria == item.id_categoria)?.vc_titulo}</Td>
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
                    <Button variant="inverse" w="100px" onClick={() => setProposal(false)}>Cancelar</Button>
                    <Button w="100px" onClick={handleSubmit(onSumbit, () => console.log(errors, params.get('notices')))}>Finalizar</Button>
                </ButtonGroup>
            </Flex>
        </VStack>
    )
}