import ytdl from 'ytdl-core'
import fs, { promises } from 'fs'


export const download = (videoId) => 
new Promise((resolve, reject) => { 
  const videoURL = "https://www.youtube.com/shorts/" + videoId
  console.log("realizando o download do vídeo:", videoId)

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly"})
  .on("info", (info) => {
    const seconds = info.formats[0].approxDurationMs / 1000 //pega o tempo do vídeo em mílesegundos e dívide por mil para pegar os mínutos
   if(seconds > 60){
    throw new Error("a duração desse vídeo é maior do que 60 segundos.")
   }
  }).on("end", () => {
    console.log("Download do vídeo finalizado.")
    resolve()
  })
  .on("error", (error) => {
    console.log(
      "não foi possível fazer o download do vídeo. Detalhes do error:",error
    )
    reject(error)
  }).pipe(fs.createWriteStream("./tmp/audio.mp4") ) // aonde vai ser salvo o download
})