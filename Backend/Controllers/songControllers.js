import { v2 as cloudinary } from 'cloudinary'
import Song from '../Models/Songs.js'


//API to add song
export const addSong = async(req, res) => {
    try {
        const name = req.body.name
        const desc = req.body.desc
        const album = req.body.album
        const audioFile = req.files.audio[0]
        const imageFile = req.files.image[0]
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, {resource_type: "video"})
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
        const duration = `${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration%60)}`

        const songData = {
            name, 
            desc, 
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration,
        }

        const song = Song(songData)
        await song.save()

        res.json({
            success: true,
            message: "Song Added",
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        })   
    }
}



//API to fetch all the songs from the database
export const listSong = async(req, res) => {
    try {
        const allSongs = await Song.find({})
        res.json({
            success: true,
            songs: allSongs,
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        })
    }
}



//API to delete a particular song from the database
export const removeSong = async(req, res) => {
    try {
        await Song.findByIdAndDelete(req.body.id)
        res.json({
            success: true,
            message: "Song Deleted Successfully",
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        })
    }
}