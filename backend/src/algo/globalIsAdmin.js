export function globalIsAdmin(rolUser) {
    console.log(rolUser);
    try {
        rolUser = rolUser.toLowerCase();
        return !(rolUser !== "presidente" && rolUser !== "vicepresidente" && rolUser !== "tesorero" && rolUser !== "secretaria" && rolUser !== "vocalia" && rolUser !== "administrador" && rolUser !== "cee");
    } catch (error) {
        console.log("Error en globalIsAdmin(): " + error);
        return false;
    }
}

export function getAllowedRoles() {
    return ["presidente", "vicepresidente", "tesorero", "secretaria", "vocalia", "administrador", "cee", "CEE"];
}

export default globalIsAdmin;