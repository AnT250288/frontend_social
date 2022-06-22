export const checkImageFile = (file) => {
    let err=""
    if(!file){
        return err = "File not found"
    }
    if(file.size > 1024*1024){
        return err = "FIle size should be less than 1mb"
    }
    if(file.type !== 'image/jpeg' && file.type !== "image/png"){
        return err="fFile not supported"
    }
}

export const imageUpload = (images) => {
    let imgArr = []
    for (const item of images){
        const formData =new FormData()
        formData.append("file", item)
    }
}