
export interface IValidator<T>{
    validate(data:unknown): Promise<T>
}