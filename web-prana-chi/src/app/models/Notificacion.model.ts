import { Timestamp } from "firebase/firestore";

export class UserNotificacion {
    id?: string;
    Usuario?: string;
    uid?: string;
    Mensaje?: string;
    Fecha: Timestamp = Timestamp.now();
    Marcada?: boolean = false;
}