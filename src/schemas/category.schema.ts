import {TypeOf, object, string } from 'zod';

export const createCategorySchema = object({
    body: object({
        name: string({
            required_error: 'Name is required'
        }),
        image: string().optional(),
    })
})


export type CreateCategoryInput = TypeOf<typeof createCategorySchema>['body'];