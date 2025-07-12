export function isNull(x = null) {
    return x == null || x == undefined || x === "";
}

export const ASSERTVALIDID_SUCCESS = 2763;

export function assertValidId(id, req, res) {
    try {
        id = Number(id);
        if (isNaN(id) || id <= 0) {
            throw new TypeError("expected positive integer")
        }
    } catch (error) {
        return res.status(400).json({
            message: "El id no es válido"
        })
    }

    return ASSERTVALIDID_SUCCESS;
}