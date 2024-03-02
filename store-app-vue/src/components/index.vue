<script setup>
import PageLayout from "../layouts/PageLayout.vue";
import {computed, ref, onBeforeMount} from "vue";
import storeProduct from "../stores/products.js";
import storeCart from "../stores/cart.js";
import Cart from "./Cart.vue";
import DataView from "primevue/dataview";
import Button from "primevue/button";


const products = computed(() => storeProduct.getters.getProducts);

const layout = ref('grid')
const cartModal = ref(false)

onBeforeMount(async()=> {
     await storeProduct.dispatch('getProducts');
});


</script>

<template>
    <page-layout>

        <div class="flex flex-wrap m-4 border-bottom-1">
            <div class="md:col-6 col-12">
                <div class="font-bold text-2xl">Product List</div>
            </div>

            <div class="md:col-6 col-12 text-right mb-2">
              <Button icon="pi pi-shopping-cart" label="View Cart" @click="cartModal = true" class="flex-auto white-space-nowrap"></Button>
            </div>
        </div>

      <cart :cartModal="cartModal" @updateCartModal="cartModal = false" />

      <DataView :value="products" :layout="layout">
            <template #grid="slotProps">
              <div class="grid grid-nogutter">
                <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 sm:col-6 md:col-4 xl:col-6 p-2">
                  <div class="p-4 border-1 surface-border surface-card border-round flex flex-column">
                    <div class="surface-50 flex justify-content-center border-round p-3">
                      <div class="relative mx-auto">
                        <img class="border-round w-full" :src="`${item.image}`" :alt="item.name" style="max-width: 300px"/>
                      </div>
                    </div>
                    <div class="pt-4">
                      <div class="flex flex-row justify-content-between align-items-start gap-2">
                        <div>
                          <div class="text-lg font-medium text-900 mt-1">{{ item.name }}</div>
                        </div>
                      </div>
                      <div class="flex flex-column gap-4 mt-4">
                        <span class="text-2xl font-semibold text-900">${{ item.price }}</span>
                        <div class="flex gap-2">
                          <Button icon="pi pi-shopping-cart" label="Add to Cart" class="flex-auto white-space-nowrap"
                                    @click="storeCart.dispatch('addCartItem', item)" />
                          <Button icon="pi pi-heart" outlined />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
        </DataView>
    </page-layout>
</template>

<style scoped>

</style>
