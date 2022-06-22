export const checkImageFile = (file) => {
    let err = ""
    if (!file) {
        return err = "File not found"
    }
    if (file.size > 1024 * 1024) {
        return err = "FIle size should be less than 1mb"
    }
    if (file.type !== 'image/jpeg' && file.type !== "image/png") {
        return err = "File format not supported"
    }
}
const CLOUDINARY_URL = "cloudinary://673956851749774:ePF6Z2qnvfByN60rB7VzZUbx2AY@antonsocialnetwork"

export const imageUpload = async (images) => {
    let imgArr = []
    for (const item of images) {
        const formData = new FormData()
        formData.append("file", item)

        formData.append('upload_preset', "evodd6dg")
        formData.append('cloud_name', "antonsocialnetwork")

        const res = await fetch('https://api.cloudinary.com/v1_1/antonsocialnetwork/image/upload', {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        imgArr.push({public_id: data.public_id, secure_url: data.secure_url})
    }
    return imgArr
}