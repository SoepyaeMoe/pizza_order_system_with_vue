<template>
    <div class="container mt-5">
        <FlashMessage v-show="server_error != null">{{ server_error }}</FlashMessage>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <div class="card-title">
                            <h3 class="text-center mb-5">REGISTER</h3>
                        </div>
                        <form @submit.prevent="register">
                            <!-- Name input -->
                            <div class="form-outline mb-4">
                                <label class="form-label mb-0" for="name">Name</label>
                                <input type="text" id="name" placeholder="Name" class="form-control  border"
                                    v-model="name" />
                                <small class="text-danger mb-0">{{ nameError }}</small>
                            </div>

                            <!-- Email input -->
                            <div class="form-outline mb-4">
                                <label class="form-label mb-0" for="form2Example1">Email address</label>
                                <input type="email" id="form2Example1" placeholder="Email address"
                                    class="form-control  border" v-model="email" />
                                <small class="text-danger mb-0">{{ emailError }}</small>
                            </div>

                            <!-- Password input -->
                            <div class="form-outline mb-4">
                                <label class="form-label mb-0" for="phone">Phone</label>
                                <input type="number" id="phone" placeholder="Phone number" class="form-control border"
                                    v-model="phone" />
                                <small class="text-danger mb-0">{{ phoneError }}</small>
                            </div>

                            <!-- Password input -->
                            <div class="form-outline mb-4">
                                <label class="form-label mb-0" for="form2Example2">Password</label>
                                <input type="password" id="form2Example2" placeholder="Password" class="form-control border"
                                    v-model="password" />
                                <small class="text-danger mb-0">{{ passwordError }}</small>
                            </div>

                            <!-- Password input -->
                            <div class="form-outline mb-4">
                                <label class="form-label z-1" for="cpassword">Confirm Password</label>
                                <input type="password" id="cpassword" placeholder="Confirm Password"
                                    class="form-control border" v-model="password_confirmation" />
                                <small class="text-danger mb-0">{{ c_passwordError }}</small>
                            </div>


                            <!-- Submit button -->
                            <button data-mdb-ripple-init type="submit"
                                class="btn btn-primary btn-block mb-4">Register</button>

                            <p class="text-center">Already have an accound? <router-link to="/login"
                                    class="ms-2">Login</router-link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <vue-progress-bar></vue-progress-bar>
</template>

<script>
import FlashMessage from './FlashMessage.vue';
export default {
    components: {
        FlashMessage,
    },
    data() {
        return {
            server_error: null,

            name: null,
            email: null,
            phone: null,
            password: null,
            password_confirmation: null,

            nameError: null,
            emailError: null,
            phoneError: null,
            passwordError: null,
            c_passwordError: null,
        }
    },
    methods: {
        register() {
            this.$Progress.start();
            this.$axios.post(`/register`, {
                name: this.name,
                email: this.email,
                phone: this.phone,
                password: this.password,
                password_confirmation: this.password_confirmation
            })
                .then(response => {
                    console.log(response);
                    if (response.data.status == 1) {
                        localStorage.setItem('token', response.data.data.token);
                        this.$axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
                        this.$Progress.finish();
                        this.$router.push('/home');
                    }
                    if (response.data.status == 0) {
                        this.nameError = response.data.message.name ? response.data.message.name[0] : null;
                        this.emailError = response.data.message.email ? response.data.message.email[0] : null;
                        this.phoneError = response.data.message.phone ? response.data.message.phone[0] : null;
                        this.passwordError = response.data.message.password ? response.data.message.password[0] : null;
                        this.c_passwordError = response.data.message.password_confirmation ? response.data.message.password_confirmation[0] : null;
                        this.$Progress.fail();
                    }
                })
                .catch(error => {
                    if (error.message) {
                        this.server_error = "Network Error or Bad Request";
                    }
                    this.$Progress.fail();
                });
        }
    },
}
</script>

<style></style>