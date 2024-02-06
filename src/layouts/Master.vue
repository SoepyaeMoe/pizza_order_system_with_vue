<template>
    <div>
        <Nav></Nav>
        <slot />
        <FooterComponent />
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
import Nav from './Nav.vue';
import FooterComponent from './FooterComponent.vue';
export default {
    name: "app",
    components: { Nav, FooterComponent }
}
</script>

<style></style>