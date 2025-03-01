import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const getAllMedicines = query({
    handler: async (ctx) => {
        return await ctx.db.query("medicines").collect()
    }
})

export const addMedicine = mutation({ 
    args: {
        name: v.string(),
        description: v.string(),
        dosage: v.string(),
        sideEffects: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("medicines", {
            name: args.name,
            description: args.description,
            dosage: args.dosage,
            sideEffects: args.sideEffects || "",
        })
    }
})

export const remove = mutation({
    args: {
        id: v.id("medicines")
    },
    handler: async (ctx, args) => {
        return await ctx.db.delete(args.id);
    }
})