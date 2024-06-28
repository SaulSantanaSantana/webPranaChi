import { Timestamp } from "firebase/firestore";

export class Pay {
    id?: string;
    Usuario?: string;
    uid?: string;
    Concepto?: string;
    Fecha: Timestamp = Timestamp.now();
    Marcada?: boolean = false;
    Cantidad?: number;
}