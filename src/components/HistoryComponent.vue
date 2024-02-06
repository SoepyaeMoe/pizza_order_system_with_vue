<template>
    <master-component>
        <div class="container mt-5" style="min-height: 67vh;">
            <div class="row justify-content-center">
                <div class="col-md-9 overflow-auto">
                    <table class="table table-hover">
                        <thead>
                            <tr class="table-dark text-center">
                                <th>Date</th>
                                <th>Total Price</th>
                                <th>Order Code</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center" v-for="order in orders" :key="order.id">
                                <td>{{ order.date }}</td>
                                <td>{{ order.total_price }}</td>
                                <td>{{ order.order_code }}</td>
                                <td :class="statusColor(order)">{{ order.status }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </master-component>
</template>

<script>
export default {
    name: "HistoryComponent",
    data() {
        return {
            orders: [],
        }
    },
    mounted() {
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
        this.$axios.get(`/orders`)
            .then(response => {
                if (response.data.status == 1) {
                    this.orders = response.data.data;
                    this.$Progress.finish();
                    loader.hide();
                }
            })
    },
    methods: {
        statusColor(order) {
            if (order.status == 'Pending') {
                return 'text-warning';
            } else if (order.status == 'Rejected') {
                return 'text-danger';
            } else {
                return 'text-success';
            }
        }
    }
}
</script>

<style></style>