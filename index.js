import axios from "axios";
import http from "http";
import fs from "fs";


const server = http.createServer(async(req,res) =>{

    if(req.url.includes("/pokemones")){

        try {
            const {data} = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=150")
            const pokemones = data.results.map(async (item) => {
                const { data } = await axios.get(item.url);
                return { nombre: data.name, imagen: data.sprites.front_default};
                });
               
            const datos = await Promise.all(pokemones)
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(datos));

        } catch (error) {

            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error}));

        }
    }

if(req.url.includes("/")){
    return fs.readFile("index.html", "utf-8", (err,html) =>{
        if(err) return res.end("error al leer html")
        
        res.writeHead(200, { "Content-Type": "text/html" });
        return res.end(html);
    })
}


})

server.listen(3000,()=>{
    console.log('servidor activo')
})