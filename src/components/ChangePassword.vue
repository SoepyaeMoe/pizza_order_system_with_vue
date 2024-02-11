<template>
    <master-component>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-7 mt-5">
                    <div class="card">
                        <div class="card-header">
                            <div class="d-flex justify-content-center">
                                <img style="width: 150px;" src="../../public/image/undraw_My_password_re_ydq7.png" alt="">
                            </div>
                            <h4 class="text-center">Change Password</h4>
                        </div>
                        <div class="card-body">
                            <form class="form" @submit.prevent="changePassword">
                                <div class="mb-2">
                                    <label for="name">Old Password</label>
                                    <input type="password" class="form-control" placeholder="Old Password"
                                        v-model="oldPassword">
                                    <small class="text-danger">{{ this.oldPasswordError }}</small>
                                </div>

                                <div class="mb-2">
                                    <label for="name">New Password</label>
                                    <input type="password" class="form-control" placeholder="New Password"
                                        v-model="newPassword">
                                    <small class="text-danger">{{ this.newPasswordError }}</small>
                                </div>

                                <div class="mb-2">
                                    <label for="name">Confirm Password</label>
                                    <input type="password" class="form-control" placeholder="Confirm Password"
                                        v-model="confirmPassword">
                                    <small class="text-danger">{{ confirmPasswordError }}</small>
                                </div>
                                <div class="d-flex justify-content-end mt-3">
                                    <router-link to="/profile" class="btn btn-sm btn-danger me-2">cancel</router-link>
                                    <button class="btn btn-sm btn-warning" type="submit" :disabled="isDisabled">
                                        Submit
                                        <div class="spinner-border" :class="{ 'd-none': notLoading }" role="status"
                                            style="width: 15px; height: 15px; position: absolute;">
                                            <span class="visually-hidden"></span>
                                        </div>
                                    </button>
                                </div>
                            </form>
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
            oldPassword: null,
            newPassword: null,
            confirmPassword: null,

            oldPasswordError: null,
            newPasswordError: null,
            confirmPasswordError: null,

            isDisabled: false,
            notLoading: true,
        }
    },
    methods: {
        changePassword() {
            this.isDisabled = true;
            this.notLoading = false;
            this.$axios.post('/change_password', {
                oldPassword: this.oldPassword,
                newPassword: this.newPassword,
                confirmPassword: this.confirmPassword
            }).then(response => {
                this.isDisabled = false;
                this.notLoading = true;
                if (response.data.status == 1) {
                    this.$router.push('/profile');
                }
                if (response.data.status == 0) {
                    this.newPasswordError = response.data.message.newPassword ? response.data.message.newPassword[0] : null;
                    this.oldPasswordError = response.data.message.oldPassword ? response.data.message.oldPassword[0] : null;
                    this.confirmPasswordError = response.data.message.confirmPassword ? response.data.message.confirmPassword[0] : null;
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped></style>