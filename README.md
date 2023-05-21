# ufcs
Unified Function Call Syntax

```ts
import { ufcs } from "https://deno.land/x/ufcs/mod.ts"

const Duck = ufcs(class Duck {
    quack(num: number) {
        console.log("Quack!", num)
    }
})
const duck = new Duck
Duck.quack(123)(duck); // Quack! 123
duck.quack(456) // Quack! 456
```