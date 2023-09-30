import fs from "fs"
import wav from "node-wav" // coverter para esse formato
import ffmpeg from "fluent-ffmpeg" //manipular o audio
import ffmpegStatic from "ffmpeg-static" //para apontar para qual biblioteca vai ser usada
import { promises } from "dns"
import { resolve } from "path"
import { rejects } from "assert"
import { error } from "console"

const filePath = "./tmp/audio.mp4"
const outputPath = filePath.replace(".mp4", ".wav") //faz o mp4 virar wav

export const convert = () => 
new Promise((resolve, reject) => {
  console.log("covertendo o vídeo...")

  ffmpeg.setFfmpegPath(ffmpegStatic)
  ffmpeg()
  .input(filePath) //entrada
  .audioFrequency(16000) // frequencia
  .audioChannels(1)
  .format("wav")
  .on("end", () => {
    const file = fs.readFileSync(outputPath)
    const fileDecoded = wav.decode(file)

    const audioData = fileDecoded.channelData[0]
    const floatArray = new Float32Array(audioData)

    console.log("vídeo convertido com sucesso!")

    resolve(floatArray)
    fs.unlinkSync(outputPath)
  })
  .on("error", (erro) => {
    console.log("Erro ao convertero vídeo", error)
    reject(error)
  })
  .save(outputPath)
})