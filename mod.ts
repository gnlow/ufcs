export type Ufcs<C> = {
    [K in keyof C]:
        C[K] extends (...args: any[]) => any
            ? (...args: Parameters<C[K]>) => (_this: C) => ReturnType<C[K]>
            : never
} & { new (): C }

export const ufcs = <C>(_class: { new (): C }) => {
    Object.getOwnPropertyNames(_class.prototype)
        .forEach(prop => {
            if (prop != "constructor") {
                Object.defineProperty(_class, prop, {
                    value: (...args: unknown[]) => (_this: any) => _this[prop](...args)
                })
            }
        })
    return _class as unknown as Ufcs<C>
}