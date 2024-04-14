import {z} from 'zod'

export default z.object({
    body: {
        test: z.string()
    }
})