import cors from 'cors'

import express, { response } from 'express'

import { convert } from "./convert.js"
import { download } from './download.js'
import { transcribe } from './transcribe.js'
import { summarize } from './summarize.js'

const app = express()
app.use(express.json())
app.use(cors()) //habilita a conexão com o front

app.get('/summary/:id', async (request, response) => { // :id este sera o id 
try{
      await download(request.params.id)
       const audioConverted = await convert()
       const result = await transcribe(audioConverted)
  
        response.json({ result }) //json devolve como objeto
} catch(error){
      console.log(error)
      return response.json({error})
}
      
})

app.post("/summary", async (request, response) => {
   try {
         const result = await summarize(request.body.text)
         return response.json({ result})
   } catch (error) {
     console.log(error)
     return response.json({ error })
   }
})
app.listen(3333, () => console.log('server is running on port 3333') )  // arrow function ela se executa sem ser chamada já function normal tem que ser chamada