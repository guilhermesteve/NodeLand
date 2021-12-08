type Product = {
    title :string,
    price : number
}
const data : Product[] = [
    { title: 'Produto X', price: 10 },
    { title: 'Produto Y', price: 15 },
    { title: 'Produto W', price: 20 }
]

export const Product = {
    getAll: () : Product[] =>{
        return data
    }
}