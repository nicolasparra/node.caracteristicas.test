module.exports = {
    app: {
        port: process.env.PORT || 4001
    },
    mundo_credito_service: {
        url: process.env.MUNDO_CREDITO_URL
    },
    postgresql: {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect: 'postgresql'
    },
    swagger: {
        definition: {
            openapi: '3.0.1',
            info: {
                title: 'API Mundo Credito',
                description: 'API for Mundo Crédito Project',
                contact: {
                    name: 'Nicolas Parra'
                },
                servers: ['https://localhost:4000'],
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    }
                }
            },
        },
        schemes: ["http", "https"],
        apis: ['./src/controllers/*.js']
    }
}