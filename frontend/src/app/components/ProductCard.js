"use client";

export default function ProductCard({ product }) {
    return (
        <div className="w-full max-w-lg bg-white rounded-2xl border p-4">

            <h2 className="text-lg font-semibold text-gray-800">
                {product?.name}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
                {product?.category}
            </p>

            <div className="flex justify-between items-center mt-3">
                <span className="text-xl font-bold text-green-600">
                    ₹{product?.price / 100}
                </span>

                <span
                    className={`text-sm px-2 py-1 rounded-full ${product?.stock > 0
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                >
                    {product?.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
            </div>
        </div>
    );
}