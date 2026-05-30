import { defineStore } from 'pinia'
import axios from 'axios'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: null,
  }),
  getters: {
    itemCount: (state) => state.cart?.items?.length || 0,
  },
  actions: {
    async fetchCart() {
      const res = await axios.get('/cart/')
      this.cart = res.data
    },
    async addItem(product_id, quantity = 1) {
      await axios.post('/cart/', { product_id, quantity })
      await this.fetchCart()
    },
    async removeItem(id) {
      await axios.delete(`/cart/${id}/`)
      await this.fetchCart()
    }
  }
})