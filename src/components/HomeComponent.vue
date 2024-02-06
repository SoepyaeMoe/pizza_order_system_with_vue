<template>
    <div>
        <master-component>
            <div class="container position-relative" style="min-height: 75vh;">
                <!-- category list -->
                <div class="row">
                    <div class="col-12 mt-3 bg-light py-2 shadow-sm">
                        <span class="category" @click="view()">All / </span>
                        <span class="category" v-for="c in homeData.catgoryList" :key="c.id" @click="category(c)">
                            {{ c.name }} /
                        </span>
                        <span class="text-primary">{{ active }}</span>
                    </div>
                </div>
                <!-- end category list -->

                <!-- filter  -->
                <div class="row justify-content-end my-3">
                    <div class="col-md-6 d-flex justify-content-end">
                        <input type="text" class="form-control me-2" placeholder="Search products..." @keyup="search"
                            v-model="searchKey">
                        <select class="form-control me-2" @change="sort" v-model="sortingValue">
                            <option value="" selected>Sorting</option>
                            <option value="asc">Oldest</option>
                            <option value="desc">Lastest</option>
                        </select>
                    </div>

                </div>
                <!-- end filter -->

                <!-- product item -->
                <div class="row">
                    <div class="col-lg-3 col-md-4 col-sm-6 col-12 mb-3" v-for="p in productList" :key="p.id">
                        <div class="card p_container m-auto" @click="detail(p)">
                            <div style="height: 220px;">
                                <img :src="this.$root.imgsrc + p.image" class="card-img-top p_img">
                            </div>
                            <div class="card-body">
                                <p class="text-center mb-1">{{ p.name }}</p>
                                <h4 class="text-center h5">{{ p.price }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end product item -->
            </div>
        </master-component>
    </div>
</template>

<script>
export default {
    name: 'HomeComponent',
    data() {
        return {
            homeData: [],
            productList: [],
            active: '',
            searchKey: '',
            sortingValue: '',
        }
    },
    methods: {
        view(id = '') {
            let loader = this.$loading.show({
                container: this.fullPage ? null : this.$refs.formContainer,
                onCancel: this.onCancel,
                loader: "dots",
                width: 50,
                height: 50,
                color: '#E4A11B',
                opacity: 0,
            });
            this.$Progress.start();
            this.$axios.get(`/home?category=${id}`)
                .then(response => {
                    if (response.data.status == 1) {
                        this.homeData = response.data.data;
                        this.productList = response.data.data.productList;
                        this.$Progress.finish();
                        loader.hide();
                    }
                });
        },
        category(c) {
            this.view(c.id);
            this.active = c.name;
        },
        detail(p) {
            this.$axios.get(`/products/${p.id}`)
                .then(response => {
                    if (response.data.status == 1) {
                        this.$router.push('products/' + p.id);
                    }
                })

        },
        search() {
            this.productList = this.homeData.productList.filter(x => {
                return x.name.toLowerCase().search(this.searchKey.toLowerCase()) >= 0;
            });
        },
        sort() {
            if (this.sortingValue == 'desc') {
                this.$axios.get(`/home?sorting=${this.sortingValue}`)
                    .then(response => {
                        this.productList = response.data.data.productList;
                    })
            }
            if (this.sortingValue == 'asc') {
                this.$axios.get(`${this.$root.url}/home?sorting=${this.sortingValue}`)
                    .then(response => {
                        this.productList = response.data.data.productList;
                    })
            }
        }
    },
    created() {
        this.view();
    }
}
</script>

<style scopte>
.category {
    cursor: pointer;
}

.category:hover {
    border-bottom: 1px solid black;
}

.p_container {
    max-width: 300px;
    overflow: hidden;
}

.p_container:hover .p_img {
    filter: brightness(1);
    transform: scale(1.1);
}

.p_container:hover {
    cursor: pointer;
}

.p_img {
    filter: brightness(0.9);
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: .3s linear;
}
</style>