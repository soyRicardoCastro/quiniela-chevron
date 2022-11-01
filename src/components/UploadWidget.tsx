// @ts-ignore
import { useEffect, useRef } from 'react'

function UploadWidget() {
  const cloudinaryRef = useRef()
  const widgetRef = useRef()

  useEffect(() => {
// @ts-ignore
    cloudinaryRef.current = window.cloudinary
// @ts-ignore

    widgetRef.current = cloudinaryRef?.current?.createUploadWidget({
      cloudName: 'ricardocastrodev',
      uploadPreset: 't1iklimr'
// @ts-ignore

    }, function (error, result) {
      console.log(result)
    })
  }, [])
// @ts-ignore
  return (
// @ts-ignore

    <button onClick={() => widgetRef.current.open()}>Subir Imagen</button>
  )
}

export default UploadWidget