<template>
    <master-component>
        <div class="container mt-5">
            <h2>CONTACT US</h2>
            <div class="row mt-3">
                <div class="col-md-7">
                    <form class="form bg-white p-3" @submit.prevent="sent">
                        <input type="text" class="form-control mt-2" v-model="name" placeholder="Your Name">
                        <small class="mb-0 text-danger">{{ nameError }}</small>

                        <input type="email" class="form-control mt-2" v-model="email" placeholder="Your Email">
                        <small class="mb-0 text-danger">{{ emailError }}</small>

                        <input type="number" class="form-control mt-2" v-model="phone" placeholder="Your Phone Number">
                        <small class="mb-0 text-danger">{{ phoneError }}</small>

                        <textarea class="form-control mt-2" cols="20" rows="8" v-model="message"
                            placeholder="Message"></textarea>
                        <small class="mb-0 d-block text-danger">{{ messageError }}</small>

                        <button class="btn btn-warning mt-2" :disabled="isDisabled" type="submit"
                            style="position: relative;">
                            Send Message
                            <div class="spinner-border" :class="{ 'd-none': notLoading }" role="status"
                                style="width: 15px; height: 15px; position: absolute; right: 5px;">
                                <span class="visually-hidden"></span>
                            </div>
                        </button>
                    </form>
                </div>
                <div class="col-md-5">
                    <div class="map p-3 bg-white">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3186.821441869575!2d96.1407!3d16.86502!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c19488609153b5%3A0xee873d9951fb1a0a!2sJunction%208!5e1!3m2!1sen!2smm!4v1707215390252!5m2!1sen!2smm"
                            width="100%" height="250px" style="border:0;" allowfullscreen="" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                    <div class="contact_info p-3 bg-white">
                        <p class="mb-2"><i class="fa-solid fa-location-dot me-3 text-warning"></i>123 Street, Yangon,
                            MYANMAR</p>
                        <p class="mb-2"><i class="fa-solid fa-envelope me-3 text-warning"></i>info@example.com</p>
                        <p class="mb-2"><i class="fa-solid fa-phone me-3 text-warning"></i>+012 345 67890</p>
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
            name: null,
            email: null,
            phone: null,
            message: null,

            nameError: null,
            emailError: null,
            phoneError: null,
            messageError: null,

            isDisabled: false,
            notLoading: true,
        }
    },
    methods: {
        sent() {
            this.isDisabled = true;
            this.notLoading = false;

            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });

            this.$axios.post('contact', {
                name: this.name,
                email: this.email,
                phone: this.phone,
                message: this.message
            }).then(response => {
                if (response.data.status == 1) {
                    this.name = null;
                    this.email = null;
                    this.phone = null;
                    this.message = null;

                    Toast.fire({
                        icon: "success",
                        title: "successfully sent message"
                    });

                    this.isDisabled = false;
                    this.notLoading = true;
                }
                if (response.data.status == 0) {
                    this.nameError = response.data.data.name ? response.data.data.name[0] : null;
                    this.emailError = response.data.data.email ? response.data.data.email[0] : null;
                    this.phoneError = response.data.data.phone ? response.data.data.phone[0] : null;
                    this.messageError = response.data.data.message ? response.data.data.message[0] : null;

                    this.isDisabled = false;
                    this.notLoading = true;
                }
            })
        }
    },
}
</script>

<style scoped></style>