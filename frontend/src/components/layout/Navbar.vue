<template>
  <nav class="bg-black text-white px-6 py-4 flex justify-between items-center border-b border-gray-800">
    <div class="text-2xl font-bold tracking-wider">
      <router-link to="/">GRAS Restaurant</router-link>
    </div>
    
    <div class="hidden md:flex space-x-8 items-center">
      <router-link to="/" class="hover:text-premium-gold transition-colors">Home</router-link>
      <router-link to="/menu" class="hover:text-premium-gold transition-colors">Menu</router-link>
      <router-link to="/gallery" class="hover:text-premium-gold transition-colors">Gallery</router-link>
      <router-link to="/contact" class="hover:text-premium-gold transition-colors">Contact</router-link>
      
      <PrimaryButton @click="$router.push('/reservation')">Book Now</PrimaryButton>
    </div>
    
    <!-- Mobile menu placeholder -->
    <div class="md:hidden">
      <button class="text-premium-gold">☰</button>
    </div>
  </nav>
</template>

<script setup>
import PrimaryButton from '../common/PrimaryButton.vue'
</script>
