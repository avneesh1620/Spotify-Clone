import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AdminContext } from '../Context/AdminContext'


const ListAlbum = () => {

  const {axios} = useContext(AdminContext)

  const [data, setData] = useState([])


  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`/api/album/list`)

      if (response.data.success) {
        setData(response.data.allAlbums)
      }
    } catch (error) {
      toast.error("Error Occured while fetching Albums")
    }
  }


  const removeAlbum = async(id) => {
    try {
      const response = await axios.post(`/api/album/remove`, {id})

      if(response.data.success){
        toast.success(response.data.message)
        await fetchAlbums()
      }
    } catch (error) {
        toast.error("Error Occured while Deleting Album")
    }
  }


  useEffect(() => {
    fetchAlbums()
  }, [])


  return (
    <div>
      <p>All Album List</p>
      <br />
      <div>
        <div className='sm:grid hidden  grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
            <b>Image</b>
            <b>Name</b>
            <b>Description</b>
            <b>Album Colour</b>
            <b>Action</b>
        </div>
        {data.map((item, index) => {
          return (
            <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
                <img src={item.image} className='w-12' alt="" />
                <p>{item.name}</p>
                <p>{item.desc}</p>
                <input type="color" value={item.bgColour} />
                <p className='cursor-pointer' onClick={() => removeAlbum(item._id)} >X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListAlbum