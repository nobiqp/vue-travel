<script setup>
import { useRoute } from 'vue-router';
import { ref, reactive, onMounted } from 'vue';
import TripModal from '@/components/TripModal.vue';
import api from '@/api';

import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const route = useRoute();
const tripId = route.params.id;
const trip = ref(null);

const state = reactive({
	showModal: false,
	isLoading: true,
});

onMounted(async () => {
	try {
		const response = await api.get(`/trips/${tripId}`);
		trip.value = response.data;
	} catch (error) {
		console.error('Error carching trip info' + error);
	} finally {
		state.isLoading = false;
	}
});

const handleBooking = () => {
	state.showModal = true;
};

</script>

<template>
	<div v-if="state.isLoading" class="pulse-loader">
		<PulseLoader color="#6b7280" />
	</div>
	<main v-else class="trip-page">
		<div v-if="trip" class="trip">
			<img data-test-id="trip-details-image" :src="trip.image" class="trip__img" alt="trip photo" />
			<div class="trip__content">
				<div class="trip-info">
					<h3 data-test-id="trip-details-title" class="trip-info__title">
						{{ trip.title }}
					</h3>
					<div class="trip-info__content">
						<span data-test-id="trip-details-duration" class="trip-info__duration">
							<strong>{{ trip.duration }}</strong> days
						</span>
						<span data-test-id="trip-details-level" class="trip-info__level">
							{{ trip.level }}
						</span>
					</div>
				</div>
				<div data-test-id="trip-details-description" class="trip__description">
					{{ trip.description }}
				</div>
				<div class="trip-price">
					<span>Price</span>
					<strong data-test-id="trip-details-price-value" class="trip-price__value">
						${{ trip.price }}
					</strong>
				</div>
				<button @click="handleBooking" data-test-id="trip-details-button" class="trip__button button">
					Book a trip
				</button>
			</div>
		</div>
	</main>
	<TripModal v-if="state.showModal" :trip="trip" v-model:modal="state.showModal" />
</template>