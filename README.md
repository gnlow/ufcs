# ufcs

```ts
const Duck = ufcs(class Duck {
    quack() {
        console.log("Quack!")
    }
})
Duck.quack(new Duck)

const d = new Duck
```