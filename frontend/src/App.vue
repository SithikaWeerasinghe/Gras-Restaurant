<template>
  <div class="min-h-screen bg-black flex flex-col font-sans">
    <Navbar />
    
    <main class="flex-grow">
      <router-view />
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
</script>
