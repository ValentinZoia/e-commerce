export class CustomError extends Error {
    constructor(
        public readonly statusCode: number,
        public readonly message:string,
        readonly type: string,
        
    ) {
        super(message);
        this.name = "CustomError";
    }

    
    static badRequest(message: string) {
        return new CustomError(400, message, 'BadRequestError');
    }
    static unauthorized(message: string) {
        return new CustomError(401, message,'UnauthorizedError');
    }
    static forbidden(message: string) {
        return new CustomError(403, message, 'ForbiddenError');
    }
    static notFound(message: string ) {
        return new CustomError(404, message, 'NotFoundError');
    }
    static internalServerError(message: string = 'Internal Server Error') {
        return new CustomError(500, message, 'InternalServerError');
    }

}