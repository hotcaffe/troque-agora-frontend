export interface IAnuncioTroca {
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