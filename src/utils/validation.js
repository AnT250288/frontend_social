const validation = ({fullName, userName, email, password, cf_password, gender}) => {
    const err = {}

    if (!fullName) {
        err.fullName = "Please add your fullName"
    } else if (fullName.length > 25) {
        err.fullName = "Length should be less than 25 symbols"
    }

    if (!userName) {
        err.userName = "Please add your userName"
    } else if (userName.replace(/ /g, '').length > 25) {
        err.userName = "Length should be less than 25 symbols"
    }

    if (!email) {
        err.email = "Please add your email"
    } else if (!validateEmail(email)) {
        err.email = "Invalid email format"
    }

    if (!password) {
        err.password = "Please add your password"
    } else if (password.length < 6) {
        err.password = "Length should be more than 6 symbols"
    }

    if (password !== cf_password) {
        err.cf_password = "Password doesn't match"
    }

    return {
        errMessage: err,
        errLength: Object.keys(err).length
    }
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^([a-z\d\.-]+)@([a-z\d-]+).([a-z]{2,12})(\.[a-z]{2,12})?$/)
}

export default validation