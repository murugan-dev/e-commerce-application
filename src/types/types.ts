type ProductRating = {
    rate: number,
    count: number
}

export type ProductInfo = {
    category: string,
    description: string,
    id: number,
    image: string,
    price: number,
    rating: ProductRating,
   title: string
}

export type ProductCategory = {
    category: string,
    setCategory:  React.Dispatch<React.SetStateAction<string>>
}

export type DateAndDay = {
    date: string;
    day: string; 
};