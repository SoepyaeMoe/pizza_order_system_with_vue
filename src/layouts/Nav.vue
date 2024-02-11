<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-md-5">
        <div class="container-fluid">
            <router-link to="/home" class="navbar-brand text-warning fs-4 h-3">My Shop</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                <i class="fa-solid fa-bars"></i>
            </button>
            <nav class="collapse navbar-collapse d-lg-flex justify-content-between" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/home" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/history" class="nav-link">
                            Order History
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/contact" class="nav-link"> Contact Us </router-link>
                    </li>

                </ul>

                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/cart" class="nav-link text-warning">
                            <i class="fa-solid fa-cart-shopping"></i>
                            <span class="badge rounded-pill badge-notification bg-danger">{{ cart.length }}</span>
                        </router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            {{ userInfo.name }}
                        </a>
                        <ul class="dropdown-menu fw-bold">
                            <li><span class="dropdown-item fw-bold"> {{ userInfo.email }} </span></li>
                            <li><router-link to="/profile"><span class="dropdown-item fw-bold">Profile</span></router-link>
                            </li>
                            <li><span class="dropdown-item fw-bold" @click="logout">Logout</span></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    </nav>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
export default {
    name: 'app',
    data() {
        return {
            userInfo: {},
            cart: [],
        }
    },
    methods: {
        logout() {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-danger m-2",
                    cancelButton: "btn btn-success",
                    title: "h4"
                },
                buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
                // title: "Are you sure?",
                title: "Are you sure, you want to logout?",
                // icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Logout",
                cancelButtonText: "Cancel",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post('http://localhost:8000/api/logout')
                        .then(response => {
                            if (response.data.status == 1) {
                                console.log('success');
                                localStorage.removeItem('token');
                                axios.defaults.headers.common['Authorization'] = 'Bearer';
                                this.$router.push('/login');
                            }
                        });
                }
            });

        }
    },
    created() {
        axios.get('http://localhost:8000/api/profile')
            .then(response => {
                if (response.data.status == 1) {
                    this.userInfo = response.data.data;
                }
            });
        axios.get(`${this.$root.url}/cart`)
            .then(response => {
                if (response.data.status == 1) {
                    this.cart = response.data.data;
                }
            });
    },
}
</script>

<style>
nav a.router-link-exact-active {
    color: #E4A11B;
}

.dropdown-item {
    cursor: pointer;
}
</style>