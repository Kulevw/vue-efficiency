export const useSync = (prop, ctx) => value => ctx.emit(`update:${prop}`, value)
