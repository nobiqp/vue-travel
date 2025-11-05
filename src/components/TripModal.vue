<script setup>
import { useRouter } from 'vue-router';
import { defineProps, defineEmits, ref } from 'vue';
import api from '@/api';
import toast from '@/utils/toast';

const router = useRouter();

const tomorrowUTC = new Date();
tomorrowUTC.setUTCDate(tomorrowUTC.getUTCDate() + 1);
const dateString = tomorrowUTC.toISOString().split('T')[0];

const props = defineProps({
	trip: Object,
	modal: Boolean,
});

const emit = defineEmits(['update:modal']);

const tripData = ref({
	id: props.trip.id,
	date: '',
	guests: 1,
});

const handleSubmit = async () => {
	try {
		await api.post(`/bookings`, {
			"tripId": tripData.value.id,
			"guests": tripData.value.guests,
			"date": tripData.value.date
		});
		router.push(`/bookings`);

		toast.success('Trip booked successfully!');
	} catch (error) {
		console.error('Error boooking a trip' + error);
	}
};

</script>

<template>
	<div class="modal">
		<div data-test-id="book-trip-popup" class="book-trip-popup">
			<button @click="emit('update:modal', false)" data-test-id="book-trip-popup-close"
				class="book-trip-popup__close">
				×
			</button>
			<form @submit.prevent="handleSubmit" class="book-trip-popup__form" autocomplete="off">
				<div class="trip-info">
					<h3 data-test-id="book-trip-popup-title" class="trip-info__title">
						{{ trip.title }}
					</h3>
					<div class="trip-info__content">
						<span data-test-id="book-trip-popup-duration" class="trip-info__duration">
							<strong>{{ trip.duration }}</strong> days
						</span>
						<span data-test-id="book-trip-popup-level" class="trip-info__level">
							{{ trip.level }}
						</span>
					</div>
				</div>
				<label class="input">
					<span class="input__heading">Date</span>
					<input v-model="tripData.date" data-test-id="book-trip-popup-date" name="date" type="date"
						:min="dateString" required />
				</label>
				<label class="input">
					<span class="input__heading">Number of guests</span>
					<input v-model="tripData.guests" data-test-id="book-trip-popup-guests" name="guests" type="number"
						min="1" max="10" value="1" required />
				</label>
				<span class="book-trip-popup__total">
					Total:
					<output data-test-id="book-trip-popup-total-value" class="book-trip-popup__total-value">
						${{ trip.price * tripData.guests }}
					</output>
				</span>
				<button data-test-id="book-trip-popup-submit" class="button" type="submit">
					Book a trip
				</button>
			</form>
		</div>
	</div>
</template>