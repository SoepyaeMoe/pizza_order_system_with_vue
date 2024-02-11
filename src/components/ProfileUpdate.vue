<template>
    <master-component>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-7 mt-5">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex justify-content-center">
                                <img :src="profileInfo.hasImage ? this.$root.profileImgSrc + profileInfo.image : profileInfo.image"
                                    alt="profile_image" class="mx-auto rounded" style="width: 80px; height: 80px;">
                            </div>
                            <!-- <form @submit.prevent="updateProfile"> -->
                            <div class="mt-5">
                                <label for="name">Name</label>
                                <input type="text" class="form-control" placeholder="Name" v-model="profileInfo.name">
                                <small class="text-danger">{{ this.nameError }}</small>
                            </div>
                            <div class="mt-3">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" placeholder="Email" v-model="profileInfo.email">
                                <small class="text-danger">{{ this.emailError }}</small>
                            </div>
                            <div class="mt-3">
                                <label for="phone">Phone</label>
                                <input type="number" class="form-control" placeholder="Phone" v-model="profileInfo.phone">
                                <small class="text-danger">{{ this.phoneError }}</small>
                            </div>
                            <div class="mt-3">
                                <label for="file">Profile Photo</label>
                                <input type="file" class="form-control" @change="uploadFile">
                                <small class="text-danger">{{ fileError }}</small>
                            </div>
                            <div class="d-flex flex-sm-row flex-column justify-content-end mt-3">
                                <router-link to="/profile" class="btn btn-danger btn-sm me-2 mt-2">cancel</router-link>
                                <button class="btn btn-warning btn-sm me-2 mt-2" type="button"
                                    @click="updateProfile">update</button>
                            </div>
                            <!-- </form> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </master-component>
</template>

<script>
export default {
    data() {
        return {
            profileInfo: {},
            photo: null,

            nameError: null,
            emailError: null,
            phoneError: null,
            fileError: null,
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
        uploadFile(e) {
            this.photo = e.target.files[0];
        },
        updateProfile() {
            this.$axios.post('/upload_photo', { photo: this.photo }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                this.$axios.post('/profile/update', this.profileInfo)
                    .then(response => {
                        if (response.data.status == 1) {
                            this.$router.push('/profile');
                        }
                        if (response.data.status == 0) {
                            this.nameError = response.data.data.name ? response.data.data.name[0] : null;
                            this.emailError = response.data.data.email ? response.data.data.email[0] : null;
                            this.phoneError = response.data.data.phone ? response.data.data.phone[0] : null;
                        }
                    });
                if (response.data.status == 0) {
                    this.fileError = response.data.data.photo ? response.data.data.photo[0] : null;
                }
            });
        }
    },
    mounted() {
        this.getProfile();
    },
}
</script>

<style scoped></style>