<template>
    <div>
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>
                <slot></slot>
            </strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FlashMessage',
}
</script>

<style lang="scss" scoped></style>