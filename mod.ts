type Ufcs<C extends {"prototype": any}> = {
    [K in keyof C["prototype"]]:
        C["prototype"][K] extends (...args: any[]) => any
            ? (...args: Parameters<C["prototype"][K]>) => (_this: C) => ReturnType<C["prototype"][K]>
            : never
} & C

export const ufcs = <C extends {"prototype": unknown}>(_class: C) => {
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

const Duck = ufcs(class Duck {
    quack(num: number) {
        console.log("Quack!", num)
    }
})
const duck = new Duck
Duck.quack(123)(duck); // Quack! 123
duck.quack(123) // Quack! 123