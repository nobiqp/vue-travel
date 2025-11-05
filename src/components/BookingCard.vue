<script setup>
import { defineProps, defineEmits } from 'vue';
import api from '@/api';
import toast from '@/utils/toast';

const props = defineProps({
	booking: Object,
});

const emit = defineEmits(['deleted']);

const handleCancel = async () => {
	try {
		await api.delete(`/bookings/${props.booking.id}`);
		emit('deleted', props.booking.id);
		toast.success('Booking canceled successfully!');
	} catch (error) {
		console.error('Error canceling a trip' + error);
	}
};

</script>

<template>
	<li data-test-id="booking" class="booking">
		<h3 data-test-id="booking-title" class="booking__title">{{ booking.trip.title }}</h3>
		<span data-test-id="booking-guests" class="booking__guests">
			{{ booking.guests }} guests
		</span>
		<span data-test-id="booking-date" class="booking__date">
			{{ new Date(booking.date).toISOString().split('T')[0] }}
		</span>
		<span data-test-id="booking-total" class="booking__total">
			${{ booking.totalPrice }}
		</span>
		<button @click="handleCancel" data-test-id="booking-cancel" class="booking__cancel" title="Cancel booking">
			<span class="visually-hidden">Cancel booking</span>
			×
		</button>
	</li>
</template>