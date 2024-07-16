interface ApiErrorInterface {
    status: number,
    message: string,
    success: boolean,
    data?: string,
    errors?: string[]
}

class ApiError extends Error implements ApiErrorInterface {
    status: number;
    message: string;
    success: boolean;
    data: string
    errors: string[]

    constructor(status: number, message: string, data: string = "", errors: string[] = [], stack: string = ""){
        super(message)
        this.status = status
        this.message = message
        this.success = false,
        this.data = data
        this.errors = errors

        if(stack) this.stack = stack
        else Error.captureStackTrace(this, this.constructor)
    }
}

export default ApiError