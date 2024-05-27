

export const generateRegistrationToken = (
    name: string,
    token: string,
) : string => {
    return `
        <html>
            <body>
            <p>Dear ${name}, </p>
            <p>An account have been created for you on Weverefy: </p>
            <p>Use the Code below to complete the registration process</p>
            <p>Verification Code: </p>
            <p style="font-size: 27px"><b>${token}</b></p>
            <br><br>
            <p>If you did not reegister with Weverefy Inc. &copy; please kindly ignore this email.</p>
            <p>Best Regards</p>
            <p style="background: aliceblue; padding: 10px; font-weight: 600; font-size: 23px; text-align: center;">Weverfy &copy; Dev Team</p>
            </body>
        </html>
    `
}