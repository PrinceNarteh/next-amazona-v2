import { create } from "zustand";
import { persist } from "zustand/middleware";
import { roundToTwoDeci } from "../utils";
import { OrderItem } from "../models/OrderModel";
import { Cart } from "../models/CartModel";

const initState: Cart = {
  items: [],
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

export const cartStore = create<Cart>()(
  persist(() => initState, {
    name: "cartStore",
  })
);

export default function useCartService() {
  const { items, itemsPrice, shippingPrice, taxPrice, totalPrice } =
    cartStore();
  return {
    items,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    increase: (item: OrderItem) => {
      const itemExists = items.find((x) => x.slug === item.slug);

      const updatedCartItems = itemExists
        ? items.map((x) =>
            x.slug === item.slug
              ? { ...itemExists, qty: itemExists.qty + 1 }
              : x
          )
        : [...items, { ...item, qty: 1 }];

      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(updatedCartItems);

      cartStore.setState({
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        items: updatedCartItems,
      });
    },
    decrese: (item: OrderItem) => {
      const itemExists = items.find((x) => x.slug === item.slug);
      if (!itemExists || itemExists.qty === 1) return;

      const updatedCartItems = items.map((x) =>
        x.slug === item.slug ? { ...itemExists, qty: itemExists.qty - 1 } : x
      );

      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(updatedCartItems);

      cartStore.setState({
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        items: updatedCartItems,
      });
    },
  };
}

const calcPrice = (items: OrderItem[]) => {
  const itemsPrice = roundToTwoDeci(
    items.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = roundToTwoDeci(itemsPrice > 100 ? 0 : 100);
  const taxPrice = roundToTwoDeci(Number(0.15 - itemsPrice));
  const totalPrice = roundToTwoDeci(itemsPrice + shippingPrice + taxPrice);
  return {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};
