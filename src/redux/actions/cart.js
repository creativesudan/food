import {
    CART_COUPONS_LOADED,
    CART_COUPON_APPLIED,
    CART_TAX_APPLIED,
    CART_EVALUATED,
    ORDER_SUCCESS,
    CART_CLEARED
} from "./types";
import agent from "../../agent";

export const fetchCoupons = () => {
    return {
        type: CART_COUPONS_LOADED,
        payload: agent.Cart.coupons()
    }
}

export const fetchTax = () => {
    return {
        type: CART_TAX_APPLIED,
        payload: agent.Cart.tax()
    }
}

export const addCouponToCart = (coupon) => {
    return {
        type: CART_COUPON_APPLIED,
        payload: coupon
    }
}

export const codOrder = (orderId) => {
    return {
        type: ORDER_SUCCESS,
        payload: agent.Order.codOrder(orderId)
    }
}

export const onlineOrder = (orderId, txnid, type = "ONLINE") => {
    return {
        type: ORDER_SUCCESS,
        payload: agent.Order.onlineOrder(orderId, txnid, type)
    }
}

export const removeFromCart = (item) => {
    return { type: "CART_PRODUCT_REMOVED", payload: item }
}

export const clearCart = () => {
    return {
        type: CART_CLEARED
    }
}

export const evaluateCart = (cart) => {
    let mrpTotal = cart.items.reduce((total, obj) => parseInt(obj.variant.mrp) * parseInt(obj.qty) + total, 0);
    let priceTotal = cart.items.reduce((total, obj) => parseInt(obj.variant.price) * parseInt(obj.qty) + total, 0);
    let discount = mrpTotal - priceTotal;
    let totalTax = 0;
    let couponDiscount = 0;
    if (cart.appliedCoupon) {
        if (parseInt(cart.appliedCoupon.type) == 1)
            couponDiscount = priceTotal * (parseInt(cart.appliedCoupon.value) / 100);
        if (parseInt(cart.appliedCoupon.type) == 0)
            couponDiscount = parseInt(cart.appliedCoupon.value);
    }
    if (cart.tax) {
        cart.tax.map(t => {
            totalTax = totalTax + priceTotal * (parseInt(t.percantage) / 100);
        });
    }
    if (priceTotal < 0) priceTotal = 0;
    return {
        type: CART_EVALUATED,
        payload: {
            subTotal: mrpTotal,
            priceTotal: priceTotal,
            discount: discount,
            couponDiscount: couponDiscount,
            totalTax: totalTax,
            total: priceTotal + totalTax - couponDiscount
        }
    }
}

