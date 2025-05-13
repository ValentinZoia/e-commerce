export class ValidationError extends Error{
    constructor(
        public readonly errors: Record<string, string[]>,
        message: string = 'Validation failed',
    ) {
        super(message);
        this.name = 'ValidationError';
    }
}