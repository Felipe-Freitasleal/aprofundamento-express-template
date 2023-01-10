import { ACCOUNT_TYPE, TAccount, TPokemon } from "./types";

export const accounts: TAccount[] = [
    {
        id: "a001",
        ownerName: "Ciclano",
        balance: 10000,
        type: ACCOUNT_TYPE.GOLD
    },
    {
        id: "a002",
        ownerName: "Astrodev",
        balance: 500000,
        type: ACCOUNT_TYPE.BLACK
    },
    {
        id: "a003",
        ownerName: "Fulana",
        balance: 20000,
        type: ACCOUNT_TYPE.PLATINUM
    }
]

export const pokemons: TPokemon[] = [
    {
        pokeNumero: 1,
        name: "Bulbassauro",
        type: "grama"
    },
    {
        pokeNumero: 123,
        name: "Schyter",
        type: "inseto"
    }
]