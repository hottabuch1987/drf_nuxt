<template>
  <main class="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Заголовок -->
      <div>
        <h1 class="text-center text-4xl font-bold text-gray-900 dark:text-white">
          Регистрация
        </h1>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Уже есть аккаунт?
          <NuxtLink to="/login" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition">
            Войдите
          </NuxtLink>
        </p>
      </div>

      <!-- Блок ошибок -->
      <div v-if="errors.length > 0" class="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400 dark:text-red-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800 dark:text-red-200">Ошибка при регистрации</h3>
            <div class="mt-2 text-sm text-red-700 dark:text-red-300">
              <ul class="list-disc list-inside space-y-1">
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Форма -->
      <form class="mt-8 space-y-6" @submit.prevent="submitForm">
        <div class="space-y-4 rounded-md shadow-sm">
          <div>
            <label for="username" class="sr-only">Имя пользователя</label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              autocomplete="username"
              required
              class="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
              placeholder="Имя пользователя"
            />
          </div>
          <div>
            <label for="email" class="sr-only">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
              placeholder="Email"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Пароль</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              autocomplete="new-password"
              required
              class="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
              placeholder="Пароль"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import { useToastStore } from '@/stores/toast'

export default {
  name: 'Signup',
  setup() {
    const toastStore = useToastStore()
    return { toastStore }
  },
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
      },
      errors: [],
      loading: false,
    }
  },
  mounted() {
    document.title = 'Регистрация | App'
  },
  methods: {
    async submitForm() {
      this.errors = []
      this.loading = true

      // Простейшая валидация
      if (!this.form.username) this.errors.push('Введите имя пользователя')
      if (!this.form.email) this.errors.push('Введите email')
      if (!this.form.password) this.errors.push('Введите пароль')

      if (this.errors.length > 0) {
        this.loading = false
        return
      }

      try {
        const response = await axios.post('/auth/users/', this.form) // замените на ваш endpoint
        if (response.status === 201) {
          this.toastStore.showToast(5000, 'Пользователь зарегистрирован. Пожалуйста, войдите в систему.', 'bg-gray-100/40')
          this.$router.push('/login')
        } else {
          // Неожиданный ответ
          this.errors.push('Не удалось зарегистрироваться. Попробуйте позже.')
        }
      } catch (error) {
        console.error('Registration error:', error)
        if (error.response && error.response.data) {
          const data = error.response.data
          // Обработка различных форматов ошибок от Django REST framework
          if (typeof data === 'object') {
            Object.keys(data).forEach(field => {
              const messages = data[field]
              if (Array.isArray(messages)) {
                this.errors.push(...messages)
              } else {
                this.errors.push(`${field}: ${messages}`)
              }
            })
          } else if (typeof data === 'string') {
            this.errors.push(data)
          } else {
            this.errors.push('Ошибка сервера. Проверьте введённые данные.')
          }
        } else if (error.request) {
          this.errors.push('Нет ответа от сервера. Проверьте соединение.')
        } else {
          this.errors.push('Ошибка при отправке запроса.')
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>