import * as zod from 'zod'

export const registerValidation = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8)
})

export const loginValidation = registerValidation.omit({username: true})