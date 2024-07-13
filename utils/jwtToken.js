export const generateToken = (user, message, statusCode, res) => {
    // console.log("User-", user);

    const token = user.generateJsonWebToken();
    // console.log("Token-", token);

    const cookieName = user.role === "ADMIN" ? "adminToken" : "patientToken";
    // console.log("cookie-", cookieName);

    res
        .status(statusCode)
        .cookie(cookieName,
            token,
            {
                maxAge: 15 * 24 * 60 * 60 * 1000,  //ms
                sameSite: 'none',
                secure: true,
                path: '/',
            })
        .json({
            success: true,
            message,
            token
            
        })
}