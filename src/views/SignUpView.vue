<script setup>
import { reactive } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import api from '@/api';
import toast from '@/utils/toast';

const router = useRouter();

const form = reactive({
	fullName: '',
	email: '',
	password: ''
});

const handleSubmit = async () => {
	try {
		const response = await api.post('/auth/sign-up', {
			"fullName": form.fullName,
			"email": form.email,
			"password": form.password
		});

		const token = response.data.token;
		localStorage.setItem('token', token);

		toast.success('Account created successfully!');
	} catch (error) {
		console.error('Error creating user' + error);
	} finally {
		router.push(`/`);
	}
};
</script>

<template>
	<main class="sign-up-page">
		<form @submit.prevent="handleSubmit" class="sign-up-form" autocomplete="off">
			<h2 class="sign-up-form__title">Sign Up</h2>
			<label class="input">
				<span class="input__heading">Full name</span>
				<input v-model="form.fullName" data-test-id="auth-full-name" name="full-name" type="text" required />
			</label>
			<label class="input">
				<span class="input__heading">Email</span>
				<input v-model="form.email" data-test-id="auth-email" name="email" type="email" required />
			</label>
			<label class="input">
				<span class="input__heading">Password</span>
				<input v-model="form.password" data-test-id="auth-password" name="password" type="password"
					minlength="3" maxlength="20" autocomplete="new-password" required />
			</label>
			<button data-test-id="auth-submit" class="button" type="submit">
				Sign Up
			</button>
		</form>
		<span>
			Already have an account?
			<RouterLink data-test-id="auth-sign-in-link" to="/sign-in" class="sign-up-form__link">Sign In</RouterLink>
		</span>
	</main>
</template>