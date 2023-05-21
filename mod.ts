function ufcs(method: any, context: ClassMethodDecoratorContext) {
    method.ufcs = true
}

function ufcs2(_class: any, context: ClassDecoratorContext) {
    console.log(context)
    Object.getOwnPropertyNames(_class.prototype)
        .forEach(prop => {
            console.log(prop)
            if (_class.prototype[prop].ufcs) {
                _class[prop] = (_this: any) => _this[prop]()
            }
        })
    return _class
}
type B<C extends {"prototype": any}> = {
    [K in keyof C["prototype"]]:
        (_this: C) => C["prototype"][K]
} & { new (): C }

type KK = B<typeof Duck> & typeof Duck

const aa = {a: 1}

function ufcsr(_$: any, context: any) {
    console.log("CCCC", context)
    console.log("CCCCCC", _$)
}

@ufcs2
class _Duck {
    @ufcs
    quack() {
        console.log("Quack!")
    }
    static t() {}
    a(){}
}

const Duck = _Duck as unknown as B<typeof _Duck>

Duck.quack(new Duck)

const d = new Duck