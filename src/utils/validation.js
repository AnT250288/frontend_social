const validation = ({fullName, userName, email, password, cf_password, gender}) => {
    const err = {}

    if (!fullName) {
        err.fullName = "Please add your fullName"
    }
    if (!userName) {
        err.userName = "Please add your userName"
    }
    if (!email) {
        err.email = "Please add your email"
    }
    if (!password) {
        err.password = "Please add your password"
    }
    if (!cf_password) {
        err.cf_password = "Confirm your password"
    }
}