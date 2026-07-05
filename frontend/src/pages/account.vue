<template>
  <div class="max-w-2xl mx-auto p-4">
    <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
      <!-- Градиентная шапка профиля -->
      <div class="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>

      <!-- Аватар и основная информация -->
      <div class="relative px-6 pb-6">
        <!-- Аватар с инициалами или картинкой -->
        <div class="flex items-end -mt-12 mb-4">
          <div class="relative">
            <div class="w-24 h-24 rounded-full border-4 border-white bg-gray-200 shadow-lg flex items-center justify-center text-2xl font-bold text-gray-700 overflow-hidden">
              <img v-if="userStore.user.avatar" :src="userStore.user.avatar " alt="avatar" class="w-full h-full object-cover" />
              <span v-else>{{ userInitials }}</span>
            </div>

            
            <!-- Кнопка редактирования аватара (можно подключить позже) -->
            <button class="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md hover:shadow-lg transition border border-gray-200" title="Редактировать аватар">
              <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          <div class="ml-6">
            <h2 class="text-2xl font-bold text-gray-800">{{ fullName || userStore.user.username }}</h2>
            <p class="text-gray-500 flex items-center mt-1">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              @{{ userStore.user.username }}
            </p>
          </div>
        </div>

        <!-- Детали профиля в сетке -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <!-- Email -->
          <div class="flex items-center p-3 bg-gray-50 rounded-lg">
            <svg class="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div>
              <p class="text-xs text-gray-500">Email</p>
              <p class="text-sm font-medium text-gray-800">{{ userStore.user.email }}</p>
            </div>
          </div>

          <!-- Имя -->
          <div class="flex items-center p-3 bg-gray-50 rounded-lg">
            <svg class="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <div>
              <p class="text-xs text-gray-500">Имя</p>
              <p class="text-sm font-medium text-gray-800">{{ userStore.user.first_name || '—' }}</p>
            </div>
          </div>

          <!-- Фамилия -->
          <div class="flex items-center p-3 bg-gray-50 rounded-lg">
            <svg class="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p class="text-xs text-gray-500">Фамилия</p>
              <p class="text-sm font-medium text-gray-800">{{ userStore.user.last_name || '—' }}</p>
            </div>
          </div>

          <!-- Можно добавить другие поля, например, дату регистрации -->
        </div>

        <!-- Кнопки действий -->
        <div class="flex justify-end space-x-3 mt-6">
          <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition flex items-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Редактировать
          </button>
          <button @click="logout" class="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition flex items-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Выйти
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useToastStore } from '@/stores/toast'
import axios from 'axios'

const userStore = useUserStore()
const toastStore = useToastStore()
const router = useRouter()

// Полное имя из first_name и last_name
const fullName = computed(() => {
  const first = userStore.user.first_name || ''
  const last = userStore.user.last_name || ''
  return first || last ? `${first} ${last}`.trim() : ''
})

// Инициалы для аватара (по умолчанию)
const userInitials = computed(() => {
  if (fullName.value) {
    const names = fullName.value.split(' ')
    return names.map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }
  return userStore.user.username ? userStore.user.username[0].toUpperCase() : '?'
})

// Выход из системы
const logout = () => {
  userStore.removeToken() // Очистка токена в сторе
  toastStore.showToast(5000, 'Вы вышли из системы успешно', 'bg-gray-300/10')
  router.push({ name: 'login' })
}

// Устанавливаем заголовок страницы
document.title = "Мой профиль"
</script>