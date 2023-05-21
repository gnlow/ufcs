import { ufcs } from "./mod.ts"

const Duck = ufcs(class Duck {
    quack() {
        console.log("Quack!")
    }
})
Duck.quack(new Duck) // Quack!