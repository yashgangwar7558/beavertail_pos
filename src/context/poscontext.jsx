import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import Swal from 'sweetalert2'

export const PosContext = createContext()

export const PosProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [categoryProducts, setCategoryProducts] = useState([])
  const [cart, setCart] = useState([])
  const [discountRate, setDiscountRate] = useState(0)
  const [taxRate, setTaxRate] = useState(0)

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const data = { tenantId: import.meta.env.VITE_TENANT_ID }
      const result = await axios.post(
        `${import.meta.env.VITE_BVTV_API_URL}/get-allsubtypes`,
        data,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      setCategories(result.data.subTypes)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError('Error fetching categories')
      console.log(`Getting categories error ${error}`)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategoryProducts = async (selectedCategory) => {
    try {
      setLoading(true)
      const data = {
        tenantId: import.meta.env.VITE_TENANT_ID,
        subCategory: selectedCategory,
      }
      let result
      if (selectedCategory === 'All') {
        result = await axios.post(
          `${import.meta.env.VITE_BVTV_API_URL}/get-recipes`,
          data,
          {
            headers: { 'Content-Type': 'application/json' },
          },
        )
      } else {
        result = await axios.post(
          `${import.meta.env.VITE_BVTV_API_URL}/get-subtype-recipes`,
          data,
          {
            headers: { 'Content-Type': 'application/json' },
          },
        )
      }
      setCategoryProducts(result.data.recipes)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError('Error fetching category products')
      console.log(`Getting category products error ${error}`)
    }
  }

  useEffect(() => {
    fetchCategoryProducts(selectedCategory)
  }, [selectedCategory])

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.name === item.name,
      )

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart]
        const existingItem = updatedCart[existingItemIndex]

        existingItem.quantity += 1
        existingItem.total = existingItem.menuPrice * existingItem.quantity
        existingItem.totalPayable = existingItem.total

        return updatedCart
      } else {
        const newItem = {
          name: item.name,
          quantity: 1,
          menuPrice: item.menuPrice,
          total: item.menuPrice,
          totalPayable: item.menuPrice,
        }

        return [...prevCart, newItem]
      }
    })
  }

  const removeFromCart = (name) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== name))
  }

  const updateCartItem = (updatedItem) => {
    const updatedTotal = updatedItem.quantity * updatedItem.menuPrice
    const updatedItemWithTotal = { ...updatedItem, total: updatedTotal }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === updatedItemWithTotal.name ? updatedItemWithTotal : item,
      ),
    )
  }

  const placeOrder = async () => {
    try {
      const sum = cart.reduce((total, item) => total + item.total, 0)
      const discount = sum * (discountRate / 100)
      const tax = (sum - discount) * (taxRate / 100)
      const totalPayable = sum - discount + tax

      const billPosRef = uuidv4()
      const billNumber = `BILL-${Math.floor(100000 + Math.random() * 900000)}`

      const orderData = {
        tenantId: import.meta.env.VITE_TENANT_ID,
        billPosRef,
        billNumber,
        customerName: 'anonymous',
        billingDate: new Date().toISOString(),
        itemsOrdered: cart,
        discountAmount: discount.toFixed(2),
        total: (sum - discount).toFixed(2),
        taxAmount: tax.toFixed(2),
        totalPayable: totalPayable.toFixed(2),
      }
      console.log(orderData)

      const response = await axios.post(
        `${import.meta.env.VITE_BVTV_API_URL}/process-bill`,
        orderData,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )

      if (response.data.success) {
        setCart([])
        setDiscountRate(0)
        setTaxRate(0)
        Swal.fire('Order Success!', '', 'success')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Add some Items!',
        })
      }
    } catch (error) {
      console.error('Error placing order:', error)
    }
  }

  return (
    <PosContext.Provider
      value={{
        categories,
        selectedCategory,
        setSelectedCategory,
        categoryProducts,
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        placeOrder,
        discountRate,
        setDiscountRate,
        taxRate,
        setTaxRate,
        loading,
        error,
      }}
    >
      {children}
    </PosContext.Provider>
  )
}
