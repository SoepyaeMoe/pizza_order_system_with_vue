<template>
    <master-component>
        <div class="container mt-5" style="min-height: 67vh;">
            <div class="row">
                <div class="col-md-4">
                    <img :src="this.$root.imgsrc + product.image" class="img-thumbnail" alt=""
                        style="width: 100%; height: 100%;">
                </div>
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="h3">{{ product.name }}</h3>
                            <p><i class="fas fa-eye me-2"></i>{{ product.view }}</p>
                            <h3 class="h4">{{ product.price }}</h3>
                            <p>{{ product.description }}</p>
                            <div class="btn-group me-2">
                                <button type="button" @click="dec" class="btn btn-warning"> - </button>
                                <input type="text" class="form-control text-center" :value="qty" style="width: 50px;">
                                <button type="button" @click="inc" class="btn btn-warning">+</button>
                            </div>
                            <div class="d-md-inline mt-2">
                                <button type="button" @click="addToCart" class="btn btn-warning"><i
                                        class="fa-solid fa-cart-plus me-2"></i>
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </master-component>
</template>

<script>
export default {
    name: 'product-detail',
    data() {
        return {
            product: {},
            qty: 1
        }
    },
    methods: {
        dec() {
            if (this.qty == 1) {
                return;
            }
            this.qty--;
        },
        inc() {
            this.qty++;
        },
        addToCart() {
            this.$axios.get(`/products/${this.$route.params.id}?quantity=${this.qty}`)
                .then(response => {
                    if (response.data.status == 1) {
                        this.$router.push('/home');
                    }
                });
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
        let id = this.$route.params.id;
        this.$axios.get(`/products/${id}`)
            .then(response => {
                this.product = response.data.data;
                this.$Progress.finish();
                loader.hide();
            });
    }
}
</script>

<style scope>
.d_img {
    width: 100%;
    height: 100%;
}
</style>
