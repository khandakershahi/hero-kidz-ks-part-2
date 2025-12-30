import { getCart } from "@/actions/server/cart";
import CartItem from "@/components/cards/CartItem";

const CartPage = async () => {
    const cartItems = await getCart();

    // ✅ Convert Mongo documents → plain objects
    const safeCartItems = cartItems.map((item) => ({
        _id: item._id.toString(),
        productId: item.productId.toString?.() || item.productId,
        title: item.title,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        email: item.email,
        username: item.username,
    }));

    return (
        <div>
            <h2 className="text-4xl py-4 font-bold border-l-8 border-primary pl-8">
                My Cart
            </h2>

            <p className="py-3">
                <span className="text-primary font-bold">
                    {safeCartItems.length}
                </span>{" "}
                Items Found in the Cart
            </p>

            <div className="space-y-3">
                {safeCartItems.map((item) => (
                    <CartItem key={item._id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default CartPage;
