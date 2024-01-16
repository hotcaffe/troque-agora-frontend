interface INotice {
    id_usuarioAnuncio: number;
    id_anuncioTroca: number;
    id_categoria: number;
    vc_titulo: string;
    vc_descricao: string;
    fl_quantidade: number;
    ch_unidade: string;
    vl_preco: number;
    vc_situacaoProduto: string;
    bo_ativo: boolean;
    vc_situacaoAnuncio: string;
}

interface INoticeDetails {
    id_detalheTroca: number;
    vc_titulo: string;
    vc_conteudo: string;
}

interface INoticeData extends INotice {
    details: INoticeDetails[]
}

export {INotice, INoticeDetails, INoticeData}