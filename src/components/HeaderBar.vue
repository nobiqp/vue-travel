<script setup>
import { RouterLink, useRoute } from 'vue-router';
import HeaderNav from './HeaderNav.vue';
import { computed } from 'vue';

const route = useRoute();

const hiddenNav = computed(() => route.path === '/sign-in' || route.path === '/sign-up');
</script>

<template>
	<header class="header">
		<div class="header__inner">
			<RouterLink data-test-id="header-logo" to="/" class="header__logo">
				Travel App
			</RouterLink>
			<HeaderNav v-if="!hiddenNav" />
		</div>
	</header>
</template>