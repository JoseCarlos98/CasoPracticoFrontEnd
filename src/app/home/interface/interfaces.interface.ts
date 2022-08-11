export interface Pokemon {
    id:        number;
    name:      string;
    image:     string;
    attack:    number;
    defense:   number;
    hp:        number;
    type:      string;
    id_author: number;
}

export interface Respuesta {
    success: boolean;
    type:    string;
    data:    any[];
}