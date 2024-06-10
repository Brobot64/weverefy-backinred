const accountPaths = {
    "/account/token": {
        post: {
            tags: ["Account"],
            summary: "Initiate the Account Creation",
            description: "Send OTP to phone number to complete the Signup preparation",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/InitiateSignUp"
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "OTP sent",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/InitiateSignUpResponse"
                            }
                        }
                    }
                }
            }
        }
    },

    "/account/token/resend": {
        post: {
            tags: ["Account"],
            summary: "Re-initiate the Account Creation",
            description: "Resend Send OTP to phone number to complete the Signup preparation",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/InitiateSignUp"
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "OTP sent",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/InitiateSignUpResponse"
                            }
                        }
                    }
                }
            }
        }
    },

    "/account/register/{usertype}/{token}": {
        post: {
            tags: ["Account"],
            summary: "Account Creation",
            description: "Creating Account For users and business",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/InitiateSignUp"
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "OTP sent",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/InitiateSignUpResponse"
                            }
                        }
                    }
                }
            }
        }
    }
}


export default accountPaths;