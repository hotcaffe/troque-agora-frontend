import { ICategory } from "./category";
import { INotice } from "./notice";
import { IUserData, IUserProfile } from "./profile";

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
    category?: ICategory;
}

interface IProposalData extends IProposal {
    proposalItems?: IProposalItem[];
}

interface INoticeProposal {
    id_propostaTroca: number;
    id_usuarioAnuncio: number;
    id_anuncioTroca: number;
    id_usuarioProposta: number;
    vc_status: 'pending' | 'rejected' | 'canceled' | 'accepted' | 'finished';
}

interface INoticeProposalFull extends INoticeProposal{
    proposal: IProposal & {
        proposalItems?: IProposalItem[];
        user?: IUserData,
        notice?: INotice
    }
}

export {IProposal, IProposalItem, IProposalData, INoticeProposal, INoticeProposalFull}