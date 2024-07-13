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
                expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                httpOnly:true,
            })
        .json({
            success: true,
            message,
            
        })
}