export class ValidationError extends Error{
    constructor(
         
        public readonly errors: Record<string, string[]>,
        message: string = 'Validation failed',
        readonly statusCode: number = 400,
    ) {
        super(message);
        this.name = 'ValidationError';
    }
}