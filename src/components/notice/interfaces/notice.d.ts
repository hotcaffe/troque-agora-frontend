interface INotice {
    vc_titulo: string;
    vc_descricao: string;
    fl_quantidade: number;
    ch_unidade: string;
    vl_preco: number;
    vc_situacaoProduto: string;
    bo_ativo?: boolean;
    vc_situacaoAnuncio: string;
}

interface INoticeDetails {
    vc_titulo: string;
    vc_conteudo: string;
}

export {INotice, INoticeDetails}