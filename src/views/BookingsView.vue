<script setup>
import BookingCard from '@/components/BookingCard.vue';
import { ref, onMounted } from 'vue';
import api from '@/api';

import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const bookings = ref([]);
const isLoading = ref(true);

const handleBookingDeleted = (id) => {
	bookings.value = bookings.value.filter(b => b.id !== id)
};

onMounted(async () => {
	try {
		const response = await api.get(`/bookings`);
		bookings.value = response.data;

		console.log(bookings)
	} catch (error) {
		console.error('Error fetching bookings list' + error);
	} finally {
		isLoading.value = false;
	}
});

</script>

<template>
	<div v-if="isLoading" class="pulse-loader">
		<PulseLoader color="#6b7280" />
	</div>
	<main v-else class="bookings-page">
		<ul class="bookings__list">
			<BookingCard v-for="booking in bookings" :key="booking.id" :booking="booking"
				@deleted="handleBookingDeleted" />
		</ul>
	</main>
</template>