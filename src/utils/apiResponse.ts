interface ApiResponseInterface {
    status: number,
    data: object,
    message?: string,
    success: boolean
}

class ApiResponse implements ApiResponseInterface {
    status: number;
    data: object
    message: string
    success: boolean

    constructor(status: number, data: object, message: string = "Task completed"){
        this.status = status
        this.data = data
        this.message = message
        this.success = status < 400
    }
}

export default ApiResponse