const express= require('express')
const morgan= require('morgan')
const favicon= require('serve-favicon')
const bodyParser= require('body-parser')
const helper= require('./helper')
let pokemons= require('./mock-pokemon')
const app= express()

const port= 3000



app
.use(favicon(__dirname + '/favicon.ico'))
.use(morgan('dev'))
.use(bodyParser.json())

app.get('/',(req,res) => res.send('hello Express'))

app.get('/api/pokemons/:id',(req,res) => {
    const id= parseInt(req.params.id)
    const pokemon= pokemons.find(pokemon => pokemon.id===id)
    const message= "un pokemon a été bien trouvé"
    res.json(helper.success(message,pokemon))
    // res.send(`Vous avez demandé le pokemon numero ${pokemon.name}`)
})

app.get('/api/pokemons',(req,res) => {
    const message= "La liste des pokemons a été bien récuperée"
    res.json(helper.success(message,pokemons))
})

app.post('/api/pokemons',(req,res) => {
   const id= helper.getUniqueId(pokemons)
   const pokemonCreated= {...req.body, ... {id:id,created:Date()}}
   pokemons.push(pokemonCreated)
   const message= `Le pokemon ${pokemonCreated.name} a bien été crée`
    res.json(helper.success(message,pokemonCreated))
})

app.put('/api/pokemons/:id',(req,res) => {
    const id= parseInt(req.params.id)
    const pokemonUpdate= {...req.body, id:id}
    pokemons= pokemons.map(pokemon => {
        return pokemon.id===id ? pokemonUpdate:pokemon
    })
    const message= `le pokemon ${pokemonUpdate.name} a été bien modifié`
    res.json(helper.success(message,pokemonUpdate))
})

app.delete('/api/pokemons/:id',(req,res) => {
    const id= parseInt(req.params.id)
    const pokemonDelete= pokemons.find(pokemon =>pokemon.id===id)
    pokemons.filter(pokemon => pokemon.id!==id)
    const message= `le pokemon ${pokemonDelete.name} a été bien supprimé`
    res.json(helper.success(message,pokemonDelete))
})


// app.get('/api/pokemons',(req,res) => {
//     res.send(`Il y a ${pokemons.length} pokemons dans le pokedex pour le moment`)
// })

app.listen(port,()=>console.log(`Notre application est demarrée sur:http:://localhost:${port}`))

