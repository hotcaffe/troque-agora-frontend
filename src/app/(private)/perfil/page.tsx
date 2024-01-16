"use client"

import { FormBody } from "@/components/common/FormBody";
import { INoticeData } from "@/components/notice/interfaces/notice";
import { NoticeHistory } from "@/components/profile/NoticeHistory.tsx/NoticeHistory";
import { Profile } from "@/components/profile/Profile";
import { ProposalHistory } from "@/components/profile/ProposalHistory/ProposalHistory";
import { IProposalData } from "@/components/proposal/interfaces/proposal";
import { setCustomCSS } from "@/utils/setCustomCss";
import { Editable, EditablePreview, Flex, Heading, Input, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

const userData = {
    username: 'rfusco',
    password: 'encrypt',
    vc_nome: "Raphael Alexandre Fusco",
    in_cpf: 11111111130,
    in_celular: 44999998888,
    in_idade: 22,
    vc_email: "raphaelfusco@gmail.com",
    bo_ativo: true,
    vc_lougradouro: "Rua teste dos testes",
    in_numero: 9999,
    vc_complemento: "Em frente ao tal",
    vc_bairro: "Centro",
    vc_cidade: "Mandaguari",
    vc_estado: "Paraná",
    qt_trocasSucedidas: 1320,
    qt_trocasRecebidas: 23320,
    qt_trocasAceitas: 1500,
    qt_trocasRecusadas: 21815,
    qt_trocasEnviadas: 5,
    tx_avaliacaoGeral: 75,
    bo_seloAtivo: true
}

const proposalData = {
    received: [
        {
            id_propostaTroca: 1,
            id_usuarioProposta: 1,
            vc_titulo: "Lorem ipsum dolor",
            vc_descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor",
            bo_ativo: true,
            items: [
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 1,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 2,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 3,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 4,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 5,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 6,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 7,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                }
            ]
        },
        {
            id_propostaTroca: 2,
            id_usuarioProposta: 1,
            vc_titulo: "Lorem bla dolor",
            vc_descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor",
            bo_ativo: false,
            items: [
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 1,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 2,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 3,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 4,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 5,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 6,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 7,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                }
            ]
        },
        {
            id_propostaTroca: 3,
            id_usuarioProposta: 1,
            vc_titulo: "Lorem blow dolor",
            vc_descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor",
            bo_ativo: true,
            items: [
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 1,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 2,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 3,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 4,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 5,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 6,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 7,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                }
            ]
        },
        {
            id_propostaTroca: 4,
            id_usuarioProposta: 1,
            vc_titulo: "Lorem blew dolor",
            vc_descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor",
            bo_ativo: true,
            items: [
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 1,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 2,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 3,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 4,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 5,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 6,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 7,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                }
            ]
        },
        {
            id_propostaTroca: 5,
            id_usuarioProposta: 1,
            vc_titulo: "Lorem hope dolor",
            vc_descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor",
            bo_ativo: true,
            items: [
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 1,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 2,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 3,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 4,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 5,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 6,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 7,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                }
            ]
        },
        {
            id_propostaTroca: 6,
            id_usuarioProposta: 1,
            vc_titulo: "Lorem tinus dolor",
            vc_descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor",
            bo_ativo: true,
            items: [
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 1,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 2,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 3,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 4,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 5,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 6,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 7,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                }
            ]
        }
    ]  as IProposalData[],
    sent: [
        {
            id_propostaTroca: 1,
            id_usuarioProposta: 1,
            vc_titulo: "Lorem ipsum dolor",
            vc_descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor",
            bo_ativo: false,
            items: [
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 1,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 2,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 3,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 4,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 5,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 6,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 7,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                }
            ]
        },
        {
            id_propostaTroca: 2,
            id_usuarioProposta: 1,
            vc_titulo: "Lorem bla dolor",
            vc_descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor",
            bo_ativo: true,
            items: [
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 1,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 2,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 3,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 4,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 5,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 6,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 7,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                }
            ]
        },
        {
            id_propostaTroca: 3,
            id_usuarioProposta: 1,
            vc_titulo: "Lorem blow dolor",
            vc_descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor",
            bo_ativo: true,
            items: [
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 1,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 2,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 3,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 4,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 5,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 6,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 7,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                }
            ]
        },
        {
            id_propostaTroca: 4,
            id_usuarioProposta: 1,
            vc_titulo: "Lorem blew dolor",
            vc_descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor",
            bo_ativo: true,
            items: [
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 1,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 2,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 3,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 4,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 5,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 6,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 7,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                }
            ]
        },
        {
            id_propostaTroca: 5,
            id_usuarioProposta: 1,
            vc_titulo: "Lorem hope dolor",
            vc_descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor",
            bo_ativo: true,
            items: [
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 1,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 2,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 3,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 4,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 5,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 6,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 7,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                }
            ]
        },
        {
            id_propostaTroca: 6,
            id_usuarioProposta: 1,
            vc_titulo: "Lorem tinus dolor",
            vc_descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor",
            bo_ativo: true,
            items: [
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 1,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 2,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 3,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 4,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 5,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 6,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                },
                {
                    id_propostaTroca: 1,
                    id_usuarioProposta: 1,
                    id_detalheProposta: 7,
                    vc_itemTitulo: "Teste1",
                    vc_descricao: "Teste teste teste",
                    ch_unidade: "KG",
                    fl_quantidade: 30,
                    id_categoria: 1,
                    vc_situacaoProduto: "Novo"
                }
            ]
        }
    ]  as IProposalData[]
}

const noticeData = [
    {
        id_usuarioAnuncio: 1,
        id_anuncioTroca: 1,
        id_categoria: 1,
        vc_titulo: "Teste",
        vc_descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor",
        fl_quantidade: 5,
        ch_unidade: "KG",
        vl_preco: 1050.50,
        vc_situacaoAnuncio: "Ativo",
        bo_ativo: true,
        vc_situacaoProduto: "Novo",
        details: [
            {
                id_detalheTroca: 1,
                vc_titulo: "Detalhe1",
                vc_conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet"
            }
        ]
    },
    {
        id_usuarioAnuncio: 1,
        id_anuncioTroca: 2,
        id_categoria: 1,
        vc_titulo: "Teste",
        vc_descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor",
        fl_quantidade: 5,
        ch_unidade: "KG",
        vl_preco: 1050.50,
        vc_situacaoAnuncio: "Ativo",
        bo_ativo: true,
        vc_situacaoProduto: "Novo",
        details: [
            {
                id_detalheTroca: 1,
                vc_titulo: "Detalhe1",
                vc_conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet"
            }
        ]
    },
    {
        id_usuarioAnuncio: 1,
        id_anuncioTroca: 3,
        id_categoria: 1,
        vc_titulo: "Teste2",
        vc_descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor",
        fl_quantidade: 5,
        ch_unidade: "KG",
        vl_preco: 1050.50,
        vc_situacaoAnuncio: "Ativo",
        bo_ativo: false,
        vc_situacaoProduto: "Novo",
        details: [
            {
                id_detalheTroca: 1,
                vc_titulo: "Detalhe1",
                vc_conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet"
            }
        ]
    },
    {
        id_usuarioAnuncio: 1,
        id_anuncioTroca: 4,
        id_categoria: 1,
        vc_titulo: "Teste",
        vc_descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor",
        fl_quantidade: 5,
        ch_unidade: "KG",
        vl_preco: 1050.50,
        vc_situacaoAnuncio: "Ativo",
        bo_ativo: true,
        vc_situacaoProduto: "Novo",
        details: [
            {
                id_detalheTroca: 1,
                vc_titulo: "Detalhe1",
                vc_conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet"
            }
        ]
    },
    {
        id_usuarioAnuncio: 1,
        id_anuncioTroca: 5,
        id_categoria: 1,
        vc_titulo: "Teste",
        vc_descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor",
        fl_quantidade: 5,
        ch_unidade: "KG",
        vl_preco: 1050.50,
        vc_situacaoAnuncio: "Ativo",
        bo_ativo: true,
        vc_situacaoProduto: "Novo",
        details: [
            {
                id_detalheTroca: 1,
                vc_titulo: "Detalhe1",
                vc_conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet"
            }
        ]
    },
    {
        id_usuarioAnuncio: 1,
        id_anuncioTroca: 6,
        id_categoria: 1,
        vc_titulo: "Teste",
        vc_descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor",
        fl_quantidade: 5,
        ch_unidade: "KG",
        vl_preco: 1050.50,
        vc_situacaoAnuncio: "Ativo",
        bo_ativo: true,
        vc_situacaoProduto: "Novo",
        details: [
            {
                id_detalheTroca: 1,
                vc_titulo: "Detalhe1",
                vc_conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet"
            }
        ]
    },
    {
        id_usuarioAnuncio: 1,
        id_anuncioTroca: 7,
        id_categoria: 1,
        vc_titulo: "Teste",
        vc_descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor",
        fl_quantidade: 5,
        ch_unidade: "KG",
        vl_preco: 1050.50,
        vc_situacaoAnuncio: "Ativo",
        bo_ativo: true,
        vc_situacaoProduto: "Novo",
        details: [
            {
                id_detalheTroca: 1,
                vc_titulo: "Detalhe1",
                vc_conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet"
            }
        ]
    },
    {
        id_usuarioAnuncio: 1,
        id_anuncioTroca: 8,
        id_categoria: 1,
        vc_titulo: "Teste",
        vc_descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor",
        fl_quantidade: 5,
        ch_unidade: "KG",
        vl_preco: 1050.50,
        vc_situacaoAnuncio: "Ativo",
        bo_ativo: true,
        vc_situacaoProduto: "Novo",
        details: [
            {
                id_detalheTroca: 1,
                vc_titulo: "Detalhe1",
                vc_conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet"
            }
        ]
    },
    {
        id_usuarioAnuncio: 1,
        id_anuncioTroca: 9,
        id_categoria: 1,
        vc_titulo: "Teste",
        vc_descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor",
        fl_quantidade: 5,
        ch_unidade: "KG",
        vl_preco: 1050.50,
        vc_situacaoAnuncio: "Ativo",
        bo_ativo: true,
        vc_situacaoProduto: "Novo",
        details: [
            {
                id_detalheTroca: 1,
                vc_titulo: "Detalhe1",
                vc_conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet"
            }
        ]
    },
    {
        id_usuarioAnuncio: 1,
        id_anuncioTroca: 10,
        id_categoria: 1,
        vc_titulo: "Teste",
        vc_descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor",
        fl_quantidade: 5,
        ch_unidade: "KG",
        vl_preco: 1050.50,
        vc_situacaoAnuncio: "Ativo",
        bo_ativo: true,
        vc_situacaoProduto: "Novo",
        details: [
            {
                id_detalheTroca: 1,
                vc_titulo: "Detalhe1",
                vc_conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet"
            }
        ]
    },
    {
        id_usuarioAnuncio: 1,
        id_anuncioTroca: 11,
        id_categoria: 1,
        vc_titulo: "Teste",
        vc_descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor",
        fl_quantidade: 5,
        ch_unidade: "KG",
        vl_preco: 1050.50,
        vc_situacaoAnuncio: "Ativo",
        bo_ativo: true,
        vc_situacaoProduto: "Novo",
        details: [
            {
                id_detalheTroca: 1,
                vc_titulo: "Detalhe1",
                vc_conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor sed do eiusmod tempor ipsum dolor sit amet"
            }
        ]
    }
] as INoticeData[]

const _cssTab = {
    default: {
        fontWeight:"semibold",
        border:"none",
        w:"180px",
        h:"40px",
        rounded:"10px",
        shadow:"sm",
        outline: "2px solid",
        outlineColor: "teal.300"
    },
    selected: {
        bg: "teal.300",
        color: "white"
    },
    unselected: {
        bg: "white",
        color: "teal.300"
    }
}

export default function Page() {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <VStack justify="center">
            <Tabs onChange={setTabIndex} >
                <TabList gap="15px" py="10px" border="none" justifyContent="center">
                    <Tab {...setCustomCSS(_cssTab, {selectorIndex: tabIndex, index: 0})}>Meu perfil</Tab>
                    <Tab {...setCustomCSS(_cssTab, {selectorIndex: tabIndex, index: 1})}>Contra-propostas</Tab>
                    <Tab {...setCustomCSS(_cssTab, {selectorIndex: tabIndex, index: 2})}>Anúncios</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Profile userData={userData}/>
                    </TabPanel>
                    <TabPanel>
                        <ProposalHistory received={proposalData.received} sent={proposalData.sent}/>
                    </TabPanel>
                    <TabPanel>
                        <NoticeHistory list={noticeData}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </VStack>
    )
}