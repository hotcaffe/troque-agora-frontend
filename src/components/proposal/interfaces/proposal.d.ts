interface IProposal {
    id_usuarioProposta: number;
    id_propostaTroca: number;
    vc_titulo: string;
    vc_descricao: string;
    bo_ativo: boolean;
}

interface IProposalItem {
    id_usuarioProposta: number;
    id_propostaTroca: number;
    id_detalheProposta: number;
    vc_itemTitulo: string;
    vc_descricao: string;
    fl_quantidade: number;
    ch_unidade: string;
    vc_situacaoProduto: string;
    id_categoria: number;
}

interface IProposalData extends IProposal {
    items: IProposalItem[]
}

export {IProposal, IProposalItem, IProposalData}