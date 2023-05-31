//componentes
import { Button } from "../components/Button"
import { Card } from "../components/Card";
//estilos
import '../sass/App.scss'
//iconos
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";
//hooks
import { useState, useEffect} from "react";

const App = ()=>{
 const [pokemonId, setPokemonId] = useState(1)
 const [pokemonEvolutions, setPokemonEvolutions] = useState([])

 useEffect(()=>{
getEvolutions(pokemonId)
 },[pokemonId])
  async function getEvolutions(id){
   const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
   const data = await response.json()
  
  
   let pokemonEvoArray = []

  let pokemonLv1 =  data.chain.species.name
  let pokemonLvl1Img = await getPokemonImgs(pokemonLv1)
  pokemonEvoArray.push([pokemonLv1, pokemonLvl1Img])

  if(data.chain.evolves_to.length !== 0){
    let pokemonLv2 = data.chain.evolves_to[0].species.name;
    let pokemonLvl2Img =  await getPokemonImgs(pokemonLv2)
    pokemonEvoArray.push([pokemonLv2, pokemonLvl2Img])

    if(data.chain.evolves_to[0].evolves_to.length !== 0){
      let pokemonLv3 = data.chain.evolves_to[0].evolves_to[0].species.name
      let pokemonLvl3Img =  await getPokemonImgs(pokemonLv3)

      pokemonEvoArray.push([pokemonLv3, pokemonLvl3Img])
      console.log(pokemonEvoArray)
    
    }
  }
  setPokemonEvolutions(pokemonEvoArray)
  }
 async function getPokemonImgs(name){
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
  const data = await response.json()
  return data.sprites.other["official-artwork"].front_default
 }
function prevClick(){
  (pokemonId === 1)?
          setPokemonId(1):
         setPokemonId(pokemonId -1)
}
function nextClick(){
  setPokemonId(pokemonId +1)
}

    return(
        <div className="app" >
        <div className={`card-conteiner card${pokemonEvolutions.length}`}>
          {pokemonEvolutions.map(pokemon => 
          <Card name={pokemon[0]}
          key={pokemon[0]}
          img = {pokemon[1]}/>
)}
        </div>
        <div className="buttons-conteiner">
      <Button 
      icon={<TiArrowLeftOutline/>} 
      handleClick={prevClick}/>
      
      <Button 
      icon={<TiArrowRightOutline/>}
      handleClick={nextClick}/>
      </div>
      </div>
    )
}

export {App}