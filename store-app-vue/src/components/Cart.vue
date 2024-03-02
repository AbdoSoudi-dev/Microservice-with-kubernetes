<script setup>

import storeCart from "../stores/cart.js";
import Dialog from "primevue/dialog";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import {computed, ref, watch} from "vue";
import api from "../axios.js";

const props = defineProps({
  cartModal: Boolean
});

const cartModal = ref(props.cartModal);

const emit = defineEmits(['updateCartModal'])

watch(cartModal, (newValue, oldValue) => {
  if (newValue === false) {
    emit('updateCartModal');
  }
});

watch(() => props.cartModal, (newValue, oldValue) => {
  if (newValue === true) {
    cartModal.value = newValue;
  }
});

const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
const cartItems = computed(() => Object.values(storeCart.getters.getCartItems));

const shippingInfo = ref({
  phone: '',
  address: ''
})

const createOrder = async () => {
  try {
    await api.post('/orders', {
      ...shippingInfo.value,
      order: cartItems.value.map(item => ({ product: item.name, quantity: item.quantity, _id: item._id }))
    });
    cartModal.value = false;
    storeCart.dispatch('clearCart');
  }
  catch (error) {
    alert('something went wrong');
  }
  cartModal.value = false;

}

</script>

<template>
  <Dialog v-model:visible="cartModal" modal :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <DataTable :value="cartItems" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">Cart Items</span>
        </div>
      </template>
      <Column field="name" header="Name"></Column>
      <Column header="Image">
        <template #body="slotProps">
          <img :src="`${slotProps.data.image}`" :alt="slotProps.data.image" class="w-6rem border-round" />
        </template>
      </Column>
      <Column field="price" header="Price">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.price) }}
        </template>
      </Column>
      <Column field="quantity" header="Quantity"> </Column>
      <Column field="total" header="Total">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.price * slotProps.data.quantity) }}
        </template>
      </Column>
      <Column field="remove" header="Remove">
        <template #body="slotProps">
          <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="storeCart.dispatch('removeCartItem', slotProps.data)"></Button>
        </template>
      </Column>

      <template #footer> In total there are {{ cartItems ? cartItems.length : 0 }} products. </template>
    </DataTable>

    <form @submit.prevent="createOrder()" v-if="cartItems.length">

      <div class="flex flex-wrap align-items-center justify-content-between gap-2 mt-4 ">
        <span class="text-xl text-900 font-bold">Shipping Details</span>
      </div>

      <div class="flex flex-column gap-2">
        <div class="col-12">
          <label for="phone" class="block text-900 font-medium mb-2">Username</label>
          <InputText id="phone" v-model="shippingInfo.phone" aria-describedby="phone-help" />
        </div>
        <div class="col-12">
          <label for="address" class="block text-900 font-medium mb-2">Username</label>
          <InputText id="address" v-model="shippingInfo.address" aria-describedby="address-help" />
        </div>

          <div class="col-12 flex align-items-center justify-content-between gap-2">
            <Button type="submit" label="Create Order" class="flex-auto white-space-nowrap" />
          </div>
      </div>
    </form>



  </Dialog>
</template>

<style scoped>

</style>