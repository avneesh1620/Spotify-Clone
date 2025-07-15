import { v2 as cloudinary } from 'cloudinary'
import Album from '../Models/Album.js'



//API to add Album to the database
export const addAlbum = async(req, res) => {
    try {
        const name = req.body.name
        const desc = req.body.desc
        const bgColour = req.body.bgColour
        const imageFile = req.file
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})

        const albumData = {
            name,
            desc,
            bgColour,
            image: imageUpload.secure_url
        }

        const album = Album(albumData)
        await album.save()

        res.json({
            success: true,
            message: "Album Added Successfully",
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        })
    }
}



//API to list the albums from the database
export const listAlbum = async(req, res) => {
    try {
        const allAlbums = await Album.find({})

        res.json({
            success: true,
            allAlbums,
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        })
    }
}



//API to delete an Album from the Database
export const removeAlbum = async(req, res) => {
    try {
        await Album.findByIdAndDelete(req.body.id)
        res.json({
            success: true,
            message: "Album Removed",
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        })
    }
}