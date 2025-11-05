<script setup>
import HeaderBar from '@/components/HeaderBar.vue';
import FooterBar from './components/FooterBar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <HeaderBar />
  <RouterView />
  <FooterBar />
</template>