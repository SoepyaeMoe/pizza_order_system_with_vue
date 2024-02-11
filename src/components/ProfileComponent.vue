<template>
    <master-component>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-7 mt-5">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex justify-content-center">
                                <img :src="profileInfo.hasImage ? this.$root.profileImgSrc + profileInfo.image : profileInfo?.image"
                                    alt="profile_image" class="mx-auto rounded" style="width: 80px; height: 80px;">
                            </div>
                            <div class="d-flex justify-content-between fw-bold mt-5">
                                <div><i class="fas fa-user me-2"></i> Name</div>
                                <div>{{ profileInfo?.name }}</div>
                            </div>
                            <hr>
                            <div class="d-flex justify-content-between fw-bold">
                                <div><i class="fa-solid fa-envelope me-2"></i> Email</div>
                                <div>{{ profileInfo?.email }}</div>
                            </div>
                            <hr>
                            <div class="d-flex justify-content-between fw-bold">
                                <div><i class="fas fa-phone me-2"></i> Phone</div>
                                <div>{{ profileInfo?.phone }}</div>
                            </div>
                            <hr>
                            <div class="d-flex justify-content-between fw-bold">
                                <div><i class="fas fa-clock me-2"></i>Join On</div>
                                <div>{{ profileInfo?.created_at }}</div>
                            </div>
                            <div class="d-flex flex-md-row flex-column justify-content-between mt-3">
                                <button class="btn btn-danger btn-sm me-2 mt-2" @click="deleteAccound">Delete
                                    Accound</button>
                                <router-link to="/change_password" class="btn btn-warning btn-sm me-2 mt-2">Change
                                    Password</router-link>
                                <router-link to="/profile_update" class="btn btn-warning btn-sm me-2 mt-2">Update
                                    Profile</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </master-component>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js';

export default {
    data() {
        return {
            profileInfo: [],
            errorMessage: null,
        }
    },
    methods: {
        getProfile() {
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
            this.$axios.get('/profile')
                .then(response => {
                    if (response.data.status == 1) {
                        this.profileInfo = response.data.data;
                        this.$Progress.finish();
                        loader.hide();
                    }
                });
        },
        deleteAccound() {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success m-2",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
                title: "Are you sure?",
                text: "You want to delete your accound?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "delete",
                cancelButtonText: "cancel",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: '<p class="h5">Confirm Password</p>',
                        html: `<input type="password" class="form-control text-center password">`,
                        showCancelButton: true,
                        reverseButtons: true,
                        confirmButtonText: 'Confirm',
                        cancelButtonText: 'Cancel',
                        cancelButtonAriaLabel: "Thumbs down"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            let password = document.getElementsByClassName('password')[0].value;
                            this.$axios.post('check_password', { 'password': password })
                                .then(response => {
                                    if (response.data.status == 1) {
                                        console.log('success');
                                        this.$axios.post('delete')
                                            .then(response => {
                                                if (response.data.status == 1) {
                                                    localStorage.removeItem('token');
                                                    this.$router.push('/login');
                                                }
                                            });
                                    }
                                    if (response.data.status == 0) {
                                        swalWithBootstrapButtons.fire({
                                            title: response.data.message,
                                            icon: "error"
                                        });
                                    }
                                });
                        }
                    });

                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelled",
                        icon: "error"
                    });
                }
            });
        },
    },
    mounted() {
        this.getProfile();
    },
}
</script>

<style scoped></style>