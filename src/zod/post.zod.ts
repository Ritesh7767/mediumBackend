import * as zod from 'zod'

export const postValidation = zod.object({
    title: zod.string(),
    content: zod.string(),
    published: zod.boolean(),
    userId: zod.string()
})