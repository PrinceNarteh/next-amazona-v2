import useCartService from "@/lib/hooks/useCartStore";
import { OrderItem } from "@/lib/models/OrderModel";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type AddToCartProps = {
  item: OrderItem;
};
export const AddToCart: React.FC<AddToCartProps> = ({ item }) => {
  const router = useRouter();
  const { items, increase } = useCartService();
  const [existItem, setExistItem] = useState<OrderItem | undefined>(undefined);

  const addToCartHandler = () => {
    increase(item);
  };

  useEffect(() => {
    setExistItem(items.find((x) => x.slug === item.slug));
  }, [item, items]);

  return existItem ? (
    <div>
      <button className="btn" type="button">
        -
      </button>
      <span className="px-2">{existItem.qty}</span>
      <button className="btn" type="button" onClick={() => increase(existItem)}>
        +
      </button>
    </div>
  ) : (
    <button
      onClick={addToCartHandler}
      className="btn btn-primary w-full flex items-center"
    >
      <Icon icon="f7:cart" fontSize={18} />
      <span className="block">Add To Cart</span>
    </button>
  );
};
