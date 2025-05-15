## <h1>Routes:</h1>

## <h2>Api-Endpoints: <a href="https://documenter.getpostman.com/view/37407571/2sB2qUp5iQ">Postman Link</a></h2>

<h2>Auth</h2>

<h3>POST</h3>
<p>auth/confirm-email</p>
<p>auth/signup</p>
<p>auth/login</p>

---

<h3>dashboard/category</h3>

<p>GET: getCategories</p>

<p>POST: createCategory</p>

<p>PATCH: updateCategory</p>

---

<h3>dashboard/brand</h3>

<p>GET: getBrands</p>

<p>POST: createBrand</p>

<p>PATCH: updateBrand</p>

---

<h3>seller/coupon</h3>

<p>POST: addCoupon</p>

<h3>seller/coupon/:couponId</h3>

<p>DELETE: deleteCoupon</p>

---

<h3>seller/product</h3>

<p>POST: addProduct</p>

<h3>seller/product/:productId</h3>

<p>PATCH: updateProduct</p>

---

<h3>user/cart</h3>

<p>POST: addToCart</p>

<p>DELETE: clearCart</p>

<h3>user/cart/:productId</h3>

<p>PATCH: removeFromCart</p>

---

<h3>user/order</h3>

<p>POST: createOrder</p>

<h3>user/order/checkout/:orderId</h3>

<p>POST: checkout</p>

<h3>user/order/refund/:orderId</h3>

<p>POST: refund</p>

## <h2>GraphQL:</h2>:

# <h3>Query:</h3>

<p>getCategories</p>
<p>getBrands</p>
<p>getCoupons</p>
<p>getProducts</p>
<p>getCart</p>
<p>getOrders</p>

# <h3>Mutation:</h3>

<p>addToCart</p>
<p>createOrder</p>
