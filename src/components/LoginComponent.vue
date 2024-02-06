<template>
    <div class="container mt-5">
        <FlashMessage v-show="server_error != null">
            <slot>{{ server_error }}</slot>
        </FlashMessage>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <div class="card-title">
                            <h3 class="text-center mb-5">LOGIN</h3>
                        </div>
                        <form @submit.prevent="login">
                            <!-- Email input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="email">Email address</label>
                                <input type="email" id="email" placeholder="Email address" class="form-control  border"
                                    v-model="email" />
                                <small class="text-danger mb-0">{{ emailError }}</small>
                            </div>

                            <!-- Password input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="password">Password</label>
                                <input type="password" id="password" placeholder="Password" class="form-control border"
                                    v-model="password" />
                                <small class="text-danger mb-0">{{ passwordError }}</small>
                                <small class="text-danger mb-0">{{ errorMessage }}</small>
                            </div>

                            <!-- 2 column grid layout for inline styling -->
                            <div class="row mb-4">
                                <div class="col d-flex justify-content-center">
                                    <!-- Checkbox -->
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="form2Example34"
                                            checked />
                                        <label class="form-check-label" for="form2Example34"> Remember me </label>
                                    </div>
                                </div>

                                <div class="col">
                                    <!-- Simple link -->
                                    <a href="#!">Forgot password?</a>
                                </div>
                            </div>

                            <!-- Submit button -->
                            <button data-mdb-ripple-init type="submit" class="btn btn-primary btn-block mb-4">Sign
                                in</button>

                            <!-- Register buttons -->
                            <div class="text-center">
                                <p>Not a member? <router-link to="/register">Register</router-link></p>
                                <p>or sign up with:</p>
                                <button data-mdb-ripple-init type="button" class="btn btn-secondary btn-floating mx-1">
                                    <i class="fab fa-facebook-f"></i>
                                </button>

                                <button data-mdb-ripple-init type="button" class="btn btn-secondary btn-floating mx-1">
                                    <i class="fab fa-google"></i>
                                </button>

                                <button data-mdb-ripple-init type="button" class="btn btn-secondary btn-floating mx-1">
                                    <i class="fab fa-twitter"></i>
                                </button>

                                <button data-mdb-ripple-init type="button" class="btn btn-secondary btn-floating mx-1">
                                    <i class="fab fa-github"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script scope>
import FlashMessage from './FlashMessage.vue'
export default {
    name: 'LoginComponent',
    components: {
        FlashMessage,
    },
    data() {
        return {
            email: null,
            password: null,
            emailError: null,
            passwordError: null,
            errorMessage: null,

            server_error: null,
        }
    },
    methods: {
        login() {
            this.$Progress.start();
            this.$axios.post('/login', {
                email: this.email,
                password: this.password,
            }).then(response => {
                if (response.data.status == 1) {
                    localStorage.setItem('token', response.data.data.token);
                    this.$axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
                    this.$Progress.finish();
                    this.$router.push('/home');
                } else if (response.data.status == 0) {
                    this.$Progress.fail();
                    this.emailError = response.data.message.email ? response.data.message.email[0] : "";
                    this.errorMessage = response.data.message[0] ? response.data.message : '';
                    this.passwordError = response.data.message.password ? response.data.message.password[0] : "";
                }
            }).catch(error => {
                if (error.message) {
                    this.server_error = "Network Errro or Bad Request";
                }
                this.$Progress.fail();
            });
        }
    },
    created() {

    }
}
</script>

<style></style>