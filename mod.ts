type Ufcs<C extends {"prototype": any}> = {
    [K in keyof C["prototype"]]:
        (_this: C) => C["prototype"][K]
} & { new (): C }

const ufcs = <C extends {"prototype": any}>(_class: C) => {
    Object.getOwnPropertyNames(_class.prototype)
        .forEach(prop => {
            if (prop != "prototype") {
                Object.defineProperty(_class, prop, {
                    value: (_this: any) => _this[prop]()
                })
            }
        })
    return _class as unknown as Ufcs<C>
}