import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore({
    id: 'user',

    state: () => ({
        user: {
            isAuthenticated: false,
            id: null,
            username: null,
            email: null,
            token: null,
            first_name: null,
            last_name: null,
        }
    }),

    actions: {
        initStore() {
           
            const token = localStorage.getItem('user.token')
            if (token) {
                this.user.token = token
                this.user.id = localStorage.getItem('user.id')
                this.user.username = localStorage.getItem('user.username')
                this.user.email = localStorage.getItem('user.email')
                this.user.first_name = localStorage.getItem('user.first_name')
                this.user.last_name = localStorage.getItem('user.last_name')
                this.user.isAuthenticated = true

                // Устанавливаем заголовок для axios
                axios.defaults.headers.common['Authorization'] = `Token ${token}`
            }
        },

        setToken(data) {
            // Извлекаем токен из поля auth_token (ответ Djoser)
            const token = data.auth_token
            this.user.token = token
            this.user.isAuthenticated = true

            localStorage.setItem('user.token', token)

            // Устанавливаем заголовок для всех последующих запросов
            axios.defaults.headers.common['Authorization'] = `Token ${token}`
        },

        removeToken() {
            this.user.token = null
            this.user.isAuthenticated = false
            this.user.id = null
            this.user.username = null
            this.user.email = null
            this.user.first_name = null
            this.user.last_name = null

            localStorage.removeItem('user.token')
            localStorage.removeItem('user.id')
            localStorage.removeItem('user.username')
            localStorage.removeItem('user.email')
            localStorage.removeItem('user.first_name')
            localStorage.removeItem('user.last_name')

            delete axios.defaults.headers.common['Authorization']
        },

        setUserInfo(user) {
            this.user.id = user.id
            this.user.username = user.username
            this.user.email = user.email
            this.user.first_name = user.first_name || ''
            this.user.last_name = user.last_name || ''

            localStorage.setItem('user.id', this.user.id)
            localStorage.setItem('user.username', this.user.username)
            localStorage.setItem('user.email', this.user.email)
            localStorage.setItem('user.first_name', this.user.first_name)
            localStorage.setItem('user.last_name', this.user.last_name)
        },
    },
})