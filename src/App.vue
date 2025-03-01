<template>
  <div class="app">
    <header class="header">
      <div class="container">
        <h1 class="app-title">ФармаБаза</h1>
        <div class="nav-links">
          <router-link to="/">Главная</router-link>
        </div>
      </div>
    </header>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} ФармаБаза. Все права защищены.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Используем Composition API
import { convex } from './lib/convex';
</script>

<style>
/* Базовые стили для всего приложения */
:root {
  --primary-color: #2196F3;
  --secondary-color: #03A9F4;
  --accent-color: #00BCD4;
  --text-color: #333;
  --background-color: #f5f5f5;
  --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

body {
  font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  padding: 0;
  color: var(--text-color);
  background-color: var(--background-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  margin: 0;
  font-size: 1.8rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  margin-left: 20px;
  font-weight: 500;
}

.nav-links a.router-link-active {
  border-bottom: 2px solid white;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
}

.footer {
  background-color: #333;
  color: white;
  padding: 1rem 0;
  margin-top: auto;
}
</style>