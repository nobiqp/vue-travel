<script setup>
import { reactive } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import api from '@/api';
import toast from '@/utils/toast';

const router = useRouter();

const form = reactive({
	email: '',
	password: ''
});

const handleSubmit = async () => {
	try {
		const response = await api.post('/auth/sign-in', {
			"email": form.email,
			"password": form.password
		});

		const token = response.data.token;
		localStorage.setItem('token', token);

		toast.success('Logged in successfully!');
	} catch (error) {
		console.error('Error authorizing user' + error);
	} finally {
		router.push(`/`);
	}
};
</script>

<template>
	<main class="sign-in-page">
		<form @submit.prevent="handleSubmit" class="sign-in-form" autocomplete="off">
			<h2 class="sign-in-form__title">Sign In</h2>
			<label class="input">
				<span class="input__heading">Email</span>
				<input v-model="form.email" data-test-id="auth-email" name="email" type="email" required />
			</label>
			<label class="input">
				<span class="input__heading">Password</span>
				<input v-model="form.password" data-test-id="auth-password" name="password" type="password"
					autocomplete="new-password" minlength="3" maxlength="20" required />
			</label>
			<button data-test-id="auth-submit" class="button" type="submit">
				Sign In
			</button>
		</form>
		<span>
			Don't have an account?
			<RouterLink data-test-id="auth-sign-up-link" to="/sign-up" class="sign-in-form__link">
				Sign Up
			</RouterLink>
		</span>
	</main>
</template>