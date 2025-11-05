<script setup>
import { RouterLink } from 'vue-router';
import { defineProps } from 'vue';

defineProps({
	trip: Object,
});
</script>

<template>
	<li data-test-id="trip-card" class="trip-card">
		<img data-test-id="trip-card-image" :src="trip.image" alt="trip photo" />
		<div class="trip-card__content">
			<div class="trip-info">
				<h3 data-test-id="trip-card-title" class="trip-info__title">
					{{ trip.title }}
				</h3>
				<div class="trip-info__content">
					<span data-test-id="trip-card-duration" class="trip-info__duration">
						<strong>{{ trip.duration }}</strong> days
					</span>
					<span data-test-id="trip-card-level" class="trip-info__level">
						{{ trip.level }}
					</span>
				</div>
			</div>
			<div class="trip-price">
				<span>Price</span>
				<strong data-test-id="trip-card-price-value" class="trip-price__value">
					${{ trip.price }}
				</strong>
			</div>
		</div>
		<RouterLink data-test-id="trip-card-link" :to="'/trip/' + trip.id" class="button">
			Discover a trip
		</RouterLink>
	</li>
</template>