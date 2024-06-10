const schemas = {
    InitiateSignUp: {
        required: ["email", "phone_number"],
        type: "object",
        properties: {
            email: {
                type: "string",
                format: "email",
                example: "userbdev@domain.com"
            },
            phone_number: {
                type: "string",
                example: "+2348120382190"
            },
        },
    },

    InitiateSignUpResponse: {
        type: "object",
        properties: {
            message: {
                type: "string",
                example: "Verification Code sent"
            }
        }
    },

    AccountCreationPayload: {
        type: "object",
        properties: {
            "email": {type: "string", example: "userbdev@domain.com"},
            "firstname": {type: "string", example: "Ngozi Temitope"},
            "lastname": {type: "string", example: "Musa"},
            "phone_number": {type: "string", example: "+2347089248992"},
            "passwrd": {type: "string", example: "sharidanBulliLon12^5&4#"},
            "confirmpasswrd": {type: "string", example: "sharidanBulliLon12^5&4#"},
            "bvn": {type: "string", example: "22390299023"},
            "address": {type: "string", example: "XYZ, Niger street, Shomolu, Lagos, Nigeria"},
            "biz_type": {type: "string", example: ""},
            "biz_reg_no": {type: "string", example: "RC0928420"},
            "biz_sector": {type: "string", example: "Finance"},
            "biz_website": {type: "string", example: "www.mywebsite.com"},
            "biz_social": {type: "string", example: "www.facebook.com"},
            "biz_employee_no": {type: "number", example: "20"},
            "biz_country_op": {type: "string", example: "NG"},
        },
    }

};

export default schemas;