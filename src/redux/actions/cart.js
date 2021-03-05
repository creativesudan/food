import {
    CART_COUPONS_LOADED,
    CART_COUPON_APPLIED,
    CART_TAX_APPLIED,
    CART_EVALUATED
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

export const evaluateCart = (cart) => {
    let mrpTotal = cart.items.reduce((total, obj) => parseInt(obj.variant.mrp) * parseInt(obj.qty) + total, 0);
    let priceTotal = cart.items.reduce((total, obj) => parseInt(obj.variant.price) * parseInt(obj.qty) + total, 0);
    let discount = mrpTotal - priceTotal;
    let totalTax = 0;
    let couponDiscount = 0;
    if (cart.appliedCoupon) {
        couponDiscount = priceTotal * (parseInt(cart.appliedCoupon.value) / 100);
    }
    if (cart.tax) {
        cart.tax.map(t => {
            totalTax = totalTax + priceTotal * (parseInt(t.percantage) / 100);
        })
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