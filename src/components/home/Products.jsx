import ProductCard from "../cards/ProductCards";
import { getProducts } from "@/actions/server/products";

export default async function Products() {
    const products = await getProducts();

    return (
        <div className="flex flex-col justify-center items-center gap-5">
            <h2 className="text-4xl font-bold text-primary">Products</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
}
