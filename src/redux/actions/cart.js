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

const getCategoryTax = (id, categories, tax_slabs) => {
    const category = categories.find(category => category.id == id);
    if (category.tax in tax_slabs) {
        console.log("Tax for " + category.name);
        return parseInt(tax_slabs[category.tax]);
    } else {
        return 0;
    }
}
export const evaluateCart = (cart, categories) => {
    let mrpTotal = cart.items.reduce((total, obj) => parseFloat(obj.variant.mrp) * parseInt(obj.qty) + total, 0);
    let priceTotal = cart.items.reduce((total, obj) => parseFloat(obj.variant.price) * parseInt(obj.qty) + total, 0);
    let totalTax = 0;
    if (cart.tax) {
        let tax_slabs = {};
        cart.tax.filter(t => parseInt(t.status) == 1).map(t => { tax_slabs[t.id] = t.percantage });
        cart.items.map(item => {
            const tax = getCategoryTax(item.product.cat_id, categories, tax_slabs);
            console.log(tax);
            totalTax += item.variant.price * item.qty * (tax / 100);
        })
    }

    let discount = mrpTotal - priceTotal;

    let couponDiscount = 0;
    if (cart.appliedCoupon) {
        if (parseInt(cart.appliedCoupon.type) == 1)
            couponDiscount = priceTotal * (parseFloat(cart.appliedCoupon.value) / 100);
        if (parseInt(cart.appliedCoupon.type) == 0)
            couponDiscount = parseFloat(cart.appliedCoupon.value);
    }
    // if (cart.tax) {
    //     cart.tax.map(t => {
    //         totalTax = totalTax + priceTotal * (parseInt(t.percantage) / 100);
    //     });
    // }
    if (priceTotal < 0) priceTotal = 0;

    let total = priceTotal + totalTax - couponDiscount;
    if (total < 0) total = 0;
    return {
        type: CART_EVALUATED,
        payload: {
            subTotal: mrpTotal,
            priceTotal: priceTotal,
            discount: discount,
            couponDiscount: couponDiscount,
            totalTax: totalTax,
            total: total
        }
    }
}

