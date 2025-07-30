export function globalIsAdmin(rolUser) {
    try {
        rolUser = rolUser.toLowerCase();
        return !(rolUser !== "presidente" && rolUser !== "vicepresidente" && rolUser !== "tesorero" && rolUser !== "secretaria" && rolUser !== "vocalia" && rolUser !== "administrador" && rolUser !== "cee");
    } catch (error) {
        return false;
    }
}

export function getAllowedRoles() {
    return ["presidente", "vicepresidente", "tesorero", "secretaria", "vocalia", "administrador", "cee", "CEE"];
}