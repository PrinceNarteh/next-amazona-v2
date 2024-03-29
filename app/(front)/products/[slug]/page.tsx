import { AddToCart } from "@/components/products/AddToCart";
import productService from "@/lib/services/productService";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await productService.getBySlug(params.slug);
  if (!product) {
    return { title: "Product not found" };
  }
  return {
    title: product.name,
    description: product.description,
  };
}

type ProductDetailsProps = {
  params: {
    slug: string;
  };
};

const ProductDetails: React.FC<ProductDetailsProps> = async ({ params }) => {
  const product = await productService.getBySlug(params.slug);

  if (!product) {
    return <div>Product Not Found</div>;
  }

  return (
    <>
      <div className="my-2">
        <Link href="/">Back To Products</Link>
      </div>

      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        <div>
          <ul className="space-y-4">
            <li>
              <h1 className="text-xl">{product.name}</h1>
            </li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>{product.brand}</li>
            <li>
              <div className="divider"></div>
            </li>
            <li>
              Description <p>{product.description}</p>
            </li>
          </ul>
        </div>

        <div className="mt-5 md:mt-0">
          <div className="card bg-base-300 shadow-xl">
            <div className="card-body">
              <div className="mb-2 flex justify-between">
                <div>Price</div>
                <div>{product.price}</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Status</div>
                <div>
                  {product.countInStock > 0 ? "In Stock" : "Unavialable"}
                </div>
              </div>
              {product.countInStock !== 0 && (
                <div className="card-actions justify-center">
                  <AddToCart
                    item={{ ...product, qty: 0, color: "", size: "" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
