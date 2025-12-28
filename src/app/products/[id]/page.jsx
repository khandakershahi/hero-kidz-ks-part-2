import { getSingleProduct } from "@/actions/server/products";
import CartButton from "@/components/buttons/CartButton";
import Image from "next/image";
import { FaStar } from "react-icons/fa";


export async function generateMetadata({ params }) {
    const { id } = await params;
    const product = await getSingleProduct(id);

    if (!product) {
        return {
            title: "Product Not Found | Hero Kidz",
            description: "The requested product could not be found.",
        };
    }

    return {
        title: product.title,
        description: product.description?.slice(0, 160),

        openGraph: {
            type: "website", // ✅ FIXED
            title: product.title,
            description: product.description?.slice(0, 160),
            url: `https://herokidz.com/products/${product._id}`,
            images: [
                {
                    url:
                        product.image ||
                        "https://i.ibb.co.com/yFkcp6dZ/2025-12-26-17-46.png",
                    width: 1200,
                    height: 630,
                    alt: product.title,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: product.title,
            description: product.description?.slice(0, 160),
            images: [
                product.image ||
                "https://i.ibb.co.com/yFkcp6dZ/2025-12-26-17-46.png",
            ],
        },

        alternates: {
            canonical: `https://herokidz.com/products/${product._id}`,
        },
    };
}




export default async function ProductDetails({ params }) {
    // params is a Promise now
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const product = await getSingleProduct(id);

    if (!product) {
        return <div className="text-center py-10">Product not found</div>;
    }

    const {
        title,
        bangla,
        image,
        price,
        discount,
        description,
        ratings,
        reviews,
        sold,
        info,
        qna,
    } = product;

    const discountedPrice = discount
        ? Math.round(price - (price * discount) / 100)
        : price;

    return (
        <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Info */}
            <div className="space-y-4">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-gray-500">{bangla}</p>

                <div className="flex items-center gap-2 text-sm">
                    <FaStar className="text-yellow-400" />
                    <span className="font-semibold">{ratings}</span>
                    <span className="text-gray-400">
                        ({reviews} reviews • {sold} sold)
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-primary">
                        ৳{discountedPrice}
                    </span>

                    {discount > 0 && (
                        <>
                            <span className="line-through text-gray-400">
                                ৳{price}
                            </span>
                            <span className="badge badge-secondary">
                                {discount}% OFF
                            </span>
                        </>
                    )}
                </div>
                {/* action */}
                <CartButton product={product}></CartButton>
            </div>

            {/* Description */}
            <div className="md:col-span-2 space-y-4">
                <h2 className="text-xl font-semibold">Description</h2>
                {description?.split("\n\n").map((para, i) => (
                    <p key={i} className="text-gray-600 leading-relaxed">
                        {para}
                    </p>
                ))}
            </div>

            {/* Features */}
            {info?.length > 0 && (
                <div className="md:col-span-2">
                    <h2 className="text-xl font-semibold mb-2">Key Features</h2>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                        {info.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Q&A */}
            {qna?.length > 0 && (
                <div className="md:col-span-2">
                    <h2 className="text-xl font-semibold mb-2">Q & A</h2>
                    <div className="space-y-3">
                        {qna.map((item, i) => (
                            <div key={i} className="border rounded-lg p-3">
                                <p className="font-medium">{item.question}</p>
                                <p className="text-gray-600 mt-1">
                                    {item.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
