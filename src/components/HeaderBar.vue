<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { computed } from 'vue';
import HeaderNav from './HeaderNav.vue';
import logo from '@/assets/images/logo/logo.png';

const route = useRoute();

const hiddenNav = computed(() => route.path === '/sign-in' || route.path === '/sign-up');
</script>

<template>
	<header class="header">
		<div class="header__inner">
			<RouterLink data-test-id="header-logo" to="/" class="header__logo">
				Cat Travel
				<img :src="logo" alt="Cat Travel Logo" class="logo__image" />
			</RouterLink>
			<HeaderNav v-if="!hiddenNav" />
		</div>
	</header>
</template>