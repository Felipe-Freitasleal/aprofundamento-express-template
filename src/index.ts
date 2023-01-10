import express, { Request, Response } from 'express'
import cors from 'cors'
import { accounts, pokemons } from './database'
import { ACCOUNT_TYPE, TAccount, TPokemon } from './types'
import { get } from 'https'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

app.get("/accounts", (req: Request, res: Response) => {
    res.send(accounts)
})

app.get("/accounts/:id", (req: Request, res: Response)=>{
    const id = req.params.id as string
    const result = accounts.find((account)=>{
        return account.id === id
    })
    res.status(200).send(result)
})

app.delete("/accounts/:id", (req:Request, res: Response)=>{
    const id = req.params.id as string
    const getIndex = accounts.findIndex((account) => account.id === id)
    if(getIndex >= 0){
        accounts.splice(getIndex, 1)
        res.status(200).send("Conta excluída")
        console.log(accounts)
    } else {
        res.status(404).send("Usuário não encontrado")
    }
})

app.put("/accounts/:id", (req:Request, res:Response)=>{
    const id = req.params.id 

    const newId = req.body.id as string | undefined
    const newOwnerName = req.body.ownerName as string | undefined
    const newBalence = req.body.balance as number | undefined
    const newType = req.body.type as ACCOUNT_TYPE | undefined

    const getAccount = accounts.find((account)=> account.id == id)
    if(getAccount){
        getAccount.id = newId || getAccount.id
        getAccount.ownerName = newOwnerName || getAccount.ownerName
        getAccount.balance = isNaN(newBalence) ? getAccount.balance : newBalence
        getAccount.type = newType || getAccount.type
        res.status(200).send("Mudanças aplicadas")
        console.log(accounts)
    }
})

app.post("/pokemons", (req:Request, res:Response)=>{
    const { pokeNumero, name, type } = req.body as TPokemon
    if(pokeNumero && name && type){

        const newPokemon: TPokemon = {
            pokeNumero,
            name,
            type
        }
        pokemons.push(newPokemon)
        res.status(200).send("Pokémon Cadastrado!")
        console.table(pokemons)
    } else {
        res.status(404).send("Insira os dados corretamente.")
    }
})

app.get("/pokemons", (req:Request, res:Response)=>{
    res.status(200).send(pokemons)
})

app.put("/pokemons/:name", (req: Request, res: Response)=>{
    const name = req.params.name

    const newPokemero = req.body.pokeNumero as number | undefined
    const newName = req.body.name as string | undefined
    const newType = req.body.type as string[] | undefined

    const getPokemon = pokemons.find((pokemon)=> pokemon.name.toLowerCase() === name.toLowerCase())

    if(getPokemon){
        getPokemon.pokeNumero = isNaN(newPokemero) ? getPokemon.pokeNumero : newPokemero
        getPokemon.name = newName || getPokemon.name
        getPokemon.type = newType || getPokemon.type

        res.status(200).send("Pokemon atualizado!")
        console.log(getPokemon)
    } else {
        res.status(404).send("Pokémon não encontrado.")
    }
})

app.delete("/pokemons/:name", (req:Request, res:Response)=>{
    const name = req.params.name

    const result = pokemons.findIndex((pokemon) => pokemon.name.toLowerCase() === name.toLowerCase())

    if(result){
        pokemons.splice(result, 1)
        res.status(200).send("Pokémon excluído.")
        console.log(pokemons)
    } else {
        res.status(404).send("Pokémon não encontrado.")
    }
})