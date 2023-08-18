


function authValidator (username, password) {
    const valid = {
        usernameStatus: "not ok",
        passwordStatus: "not ok",
        overall: "not ok"
    }
    if (username.length > 0) {
        valid.usernameStatus = "ok"
    } else {
        throw new Error("Ім'я не може бути пустим!")
    }
    if (password.length > 6 && password.length < 12) {
        valid.passwordStatus = "ok"
    }
    if (valid.usernameStatus === "ok" && valid.passwordStatus === "ok") {
        valid.overall = "ok"
    }
    if (password.length < 6) {
        throw new Error("Пароль має бути від 6 до 12 символів!")
    }
    if (password.length > 12) {
        throw new Error("Пароль має бути від 6 до 12 символів!")
    }
    return valid.overall
};

export default authValidator