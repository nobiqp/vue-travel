<script setup>
import { RouterLink } from 'vue-router';
import bookingsIcon from '@/assets/images/briefcase.svg';
import profileIcon from '@/assets/images/user.svg';
import { onMounted, reactive } from 'vue';
import api from '@/api';
import toast from '@/utils/toast';

const state = reactive({
	name: String,
});

onMounted(async () => {
	try {
		const response = await api.get('/auth/authenticated-user');
		state.name = response.data.fullName;
	} catch (error) {
		console.error('Error fetching user data' + error);
	}
});

const handleSignOut = () => {
	localStorage.removeItem('token');
	toast.success('Signed out successfully.');

};
</script>

<template>
	<nav data-test-id="header-nav" class="header__nav">
		<ul class="nav-header__list">
			<li class="nav-header__item" title="Bookings">
				<RouterLink data-test-id="header-bookings-link" to="/bookings" class="nav-header__inner">
					<span class="visually-hidden">Bookings</span>
					<img :src="bookingsIcon" alt="bookings" />
				</RouterLink>
			</li>
			<li class="nav-header__item" title="Profile">
				<div data-test-id="header-profile-nav" class="nav-header__inner profile-nav" tabindex="0">
					<span class="visually-hidden">Profile</span>
					<img :src="profileIcon" alt="profile" />
					<ul data-test-id="header-profile-nav-list" class="profile-nav__list">
						<li data-test-id="header-profile-nav-username" class="profile-nav__item">
							{{ state.name }}
						</li>
						<li class="profile-nav__item">
							<RouterLink @click="handleSignOut" data-test-id="header-profile-nav-sign-out" to="/sign-in"
								class="profile-nav__sign-out button">
								Sign Out
							</RouterLink>
						</li>
					</ul>
				</div>
			</li>
		</ul>
	</nav>
</template>