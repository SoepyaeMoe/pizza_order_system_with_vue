<template>
    <div>
        <master-component>
            <div class="container mt-5" style="min-height: 67vh;">
                <div class="row">
                    <div class="col-md-8 overflow-auto mb-5">
                        <table class="table align-middle">
                            <thead class="table-dark">
                                <tr>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th style="width: 200px;">Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-show="cart.length > 0" v-for="c in cart" :key="c.id" style="min-height: 200px;">
                                    <td>{{ c.product }}</td>
                                    <td>{{ c.price }}</td>
                                    <td class="d-flex">
                                        <button type="button" @click="dec(c)" class="btn btn-warning btn-sm"> -
                                        </button>
                                        <input type="text" :value="c.quantity" class="form-control text-center"
                                            style="width: 50px;">
                                        <button type="button" @click="inc(c)" class="btn btn-warning btn-sm"> +
                                        </button>
                                    </td>
                                    <td>{{ c.price * c.quantity }} Kyats</td>
                                    <td>
                                        <button type="button" class="btn btn-danger btn-sm text-white"
                                            @click="removeCart(c)">
                                            <i class="fa-solid fa-x"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr v-show="cart.length == 0">
                                    <td colspan="5" class="text-center">
                                        <p class="text-center">There is no product in your cart.</p>
                                        <router-link to="/home" class="btn btn-dark text-white">Shop
                                            Now</router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-md-4">
                        <h4 class="h5">CART SUMMARY --------------------------</h4>
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <h6>Subtotal</h6>
                                    <p>{{ subtotal }} Kyats</p>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <h6>Delievery</h6>
                                    <p>{{ deli_charge }}</p>
                                </div>
                                <hr>
                                <div class="d-flex justify-content-between">
                                    <h5>Total</h5>
                                    <p>{{ parseInt(subtotal) + parseInt(deli_charge) }} Kyats</p>
                                </div>
                                <button class="btn btn-warning form-control text-white" @click="checkout"
                                    :disabled="cart.length == 0">Proceed
                                    To
                                    Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </master-component>
    </div>
</template>

<script>
export default {
    name: 'CartComponent',
    data() {
        return {
            cart: [],
            deli_charge: null,
        }
    },
    methods: {
        inc(c) {
            c.quantity++;
            this.$axios.post(`/products/addqty/${c.id}`)
                .then(response => response.data.status);
        },
        dec(c) {
            if (c.quantity == 1) {
                return;
            }
            c.quantity--;
            this.$axios.post(`/products/decqty/${c.id}`)
                .then(response => response.data.status);
        },
        removeCart(c) {
            this.$axios.get(`/cart/remove/${c.product_id}`)
                .then(response => {
                    if (response.data.status == 1) {
                        this.cart = this.cart.filter(x => x.product_id != c.product_id);
                    } else {
                        alert(response.data.message)
                    }
                })
        },
        checkout() {
            this.$axios.get(`/checkout`)
                .then(response => {
                    if (response.data.status == 1) {
                        this.$router.push('/home');
                    }
                })
        }
    },
    created() {
        let loader = this.$loading.show({
            container: this.fullPage ? null : this.$refs.formContainer,
            onCancel: this.onCancel,
            loader: "dots",
            width: 50,
            height: 50,
            color: '#E4A11B',
            opacity: 0.5,
        });
        this.$Progress.start();
        this.$axios.get(`/cart`)
            .then(response => {
                if (response.data.status == 1) {
                    this.deli_charge = response.data.deli_charge;
                    this.cart = response.data.data;
                    this.$Progress.finish();
                    loader.hide();
                }
            })
    },
    computed: {
        subtotal() {
            let total = 0;
            this.cart.forEach(e => {
                total += e.price * e.quantity;
            });
            return total;
        }
    }

}
</script>

<style></style>