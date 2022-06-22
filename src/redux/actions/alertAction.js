export const ALERT_TYPES = {
    ALERT: "ALERT"
}

export const EditData = (data, id, post) => {
    return data.map(item => (item._id === id) ? post : item)
}

export const DeleteData = (data, id) => {
    return data.filter(item => item._id !== id)
}