<template>
  <header
    ref="headerRef"
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
   
    :class="[scrolled ? 'bg-white shadow-md' : 'bg-transparent']"
  >
    <div class="container mx-auto px-4 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Левая часть: логотип и десктопное меню -->
        <div class="flex items-center gap-6">
          <!-- Логотип -->
          <NuxtLink to="/" class="flex items-center space-x-2">
            <img src="~/assets/img/logo.png" alt="Logo" class="w-8 h-8" />
            <span class="text-xl font-bold text-gray-800 hidden sm:block"> space</span>
          </NuxtLink>
         
          <!-- Десктопная навигация (скрывается на мобильных) -->
          <nav class="hidden lg:flex items-center space-x-1">
            <NuxtLink to="/" class="px-3 py-2 text-gray-700 hover:text-blue-600 rounded-md text-sm font-medium transition">
              Главная
            </NuxtLink>
           
          </nav>
        </div>

        <!-- Правая часть: поиск, уведомления, профиль/кнопки -->
        <div class="flex items-center gap-2">
          <!-- Поиск (десктопный) -->
          <div class="hidden md:block relative">
            <input
              type="text"
              placeholder="Поиск..."
              class="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm"
            />
            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <!-- Иконка поиска для мобильных (открывает поиск в модалке - можно реализовать позже) -->
          <button class="md:hidden p-2 text-gray-600 hover:text-blue-600 transition" aria-label="Поиск">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- Уведомления (только для авторизованных) -->
          <button v-if="userStore.user.isAuthenticated" class="relative p-2 text-gray-600 hover:text-blue-600 transition" aria-label="Уведомления">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <!-- Профиль / Кнопки авторизации -->
          <template v-if="userStore.user.isAuthenticated">
            <div class="relative" ref="profileMenuRef">
              <button
                @click="toggleProfileMenu"
                class="flex items-center space-x-2 p-1 rounded-full hover:ring-2 hover:ring-blue-300 transition"
                aria-label="Меню профиля"
              >
                <img
                  :src="userStore.user.avatar || 'https://i.pravatar.cc/150?img=3'"
                  alt="Avatar"
                  class="w-8 h-8 rounded-full object-cover"
                />
                <span class="hidden lg:block text-sm font-medium text-gray-700">{{ userStore.user.name || 'Пользователь' }}</span>
                <svg class="w-4 h-4 text-gray-500 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Выпадающее меню профиля -->
              <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <div
                  v-if="isProfileMenuOpen"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100 z-50"
                >
                  <NuxtLink to="/account" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" @click="closeProfileMenu">Профиль</NuxtLink>
                  <NuxtLink to="/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" @click="closeProfileMenu">Настройки</NuxtLink>
                  <button
                    @click="logout"
                    class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    Выйти
                  </button>
                </div>
              </Transition>
            </div>
          </template>

          <template v-else>
            <NuxtLink to="/login" class="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition">
              Войти
            </NuxtLink>
            <NuxtLink to="/signup" class="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              Регистрация
            </NuxtLink>
          </template>

          <!-- Кнопка мобильного меню (гамбургер) -->
          <button
            @click="toggleMobileMenu"
            class="lg:hidden p-2 text-gray-600 hover:text-blue-600 transition"
            aria-label="Меню"
            :aria-expanded="isMobileMenuOpen"
          >
            <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Мобильное выдвижное меню (drawer) -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform -translate-x-full"
        enter-to-class="transform translate-x-0"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="transform translate-x-0"
        leave-to-class="transform -translate-x-full"
      >
        <div
          v-if="isMobileMenuOpen"
          class="fixed inset-0 z-50 lg:hidden"
          @click.self="closeMobileMenu"
        >
          <!-- Затемнение фона -->
          <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="closeMobileMenu"></div>

          <!-- Само меню -->
          <nav class="absolute left-0 top-0 h-full w-64 bg-white shadow-xl p-6 overflow-y-auto">
            <div class="flex items-center justify-between mb-6">
              <NuxtLink to="/" class="flex items-center space-x-2" @click="closeMobileMenu">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
                <span class="text-xl font-bold text-gray-800">AppName</span>
              </NuxtLink>
              <button @click="closeMobileMenu" class="p-1 text-gray-500 hover:text-gray-700">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <ul class="space-y-2">
              <li>
                <NuxtLink to="/" class="block py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-md" @click="closeMobileMenu">Главная</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/features" class="block py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-md" @click="closeMobileMenu">Фильмы</NuxtLink>
              </li>
             
              
            </ul>

            <div class="border-t border-gray-100 my-4"></div>

            <!-- Кнопки для неавторизованных в мобильном меню -->
            <template v-if="!userStore.user.isAuthenticated">
              <NuxtLink to="/login" class="block w-full text-center py-2 px-4 mb-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50" @click="closeMobileMenu">
                Войти
              </NuxtLink>
              <NuxtLink to="/register" class="block w-full text-center py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700" @click="closeMobileMenu">
                Регистрация
              </NuxtLink>
            </template>
          </nav>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'          // <-- добавить
import { useUserStore } from '@/stores/user'
import { useToastStore } from '@/stores/toast'  // <-- добавить
import axios from 'axios'
import { onClickOutside } from '@vueuse/core'

const userStore = useUserStore()
const toastStore = useToastStore()               // <-- инициализировать
const router = useRouter()                       // <-- инициализировать

// Состояния меню
const isMobileMenuOpen = ref(false)
const isProfileMenuOpen = ref(false)

// Для эффекта при скролле
const scrolled = ref(false)
const headerRef = ref(null)

// Референсы для клика вне
const profileMenuRef = ref(null)

// Закрытие профильного меню при клике вне
onClickOutside(profileMenuRef, () => {
  isProfileMenuOpen.value = false
})

// Обработка скролла
const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

// Функции управления меню
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value
}

const closeProfileMenu = () => {
  isProfileMenuOpen.value = false
}

// Выход из системы 
const logout = () => {
  userStore.removeToken()                       // очищаем токен
  toastStore.showToast(5000, 'Вы вышли из системы!', 'bg-gray-300/10')
  closeProfileMenu()                            // закрываем меню
  router.push('/')                               // редирект на главную
}

// Инициализация и установка токена
onMounted(() => {
  userStore.initStore()
  const token = userStore.user.access
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Token ' + token
  } else {
    axios.defaults.headers.common['Authorization'] = ''
  }

  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Можно добавить дополнительные стили при необходимости,
   но Tailwind покрывает большинство случаев */
</style>