import {get, ResponseObject} from '@loopback/rest';

/**
 * OpenAPI response for ping()
 */
const HEALTH_RESPONSE: ResponseObject = {
    description: 'Health Response',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    message: {type: 'string'},
                },
            },
        },
    },
};

export class HelloController {
    @get('/health', {
        responses: {
            200: HEALTH_RESPONSE
        }
    })
    hello(): object {
        return {
            message: 'Hello world!'
        }
    }
}
