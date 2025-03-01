import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
    medicines: defineTable({
        name: v.string(),
        description: v.string(),
        dosage: v.string(),
        sideEffects: v.optional(v.string()),
    })
})