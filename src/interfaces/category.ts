import { FeatherIcon } from "./feather-icons";

export interface ICategory {
    id_categoria: number;
    vc_titulo: string;
    vc_icone: FeatherIcon;
    vc_descricao: string;
    bo_ativo: boolean;
}