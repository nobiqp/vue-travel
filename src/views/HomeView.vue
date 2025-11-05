<script setup>
import { reactive, computed, onMounted } from 'vue'
import TripCard from '@/components/TripCard.vue';
import api from '@/api';

import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const state = reactive({
	trips: [],
	isLoading: true,
});

const filters = reactive({
	title: '',
	duration: '',
	level: ''
});

onMounted(async () => {
	try {
		const response = await api.get('/trips');
		state.trips = response.data;
	} catch (error) {
		console.error('Error fetching trips list' + error);
	} finally {
		state.isLoading = false;
	}
});

const filteredTrips = computed(() => {
	return state.trips.filter(trip => {
		const matchesTitle = trip.title
			.toLowerCase()
			.includes(filters.title.toLowerCase())

		let matchesDuration = true
		if (filters.duration === '0_x_5') {
			matchesDuration = trip.duration < 5
		} else if (filters.duration === '5_x_10') {
			matchesDuration = trip.duration >= 5 && trip.duration < 10
		} else if (filters.duration === '10') {
			matchesDuration = trip.duration >= 10
		}

		const matchesLevel = !filters.level || trip.level === filters.level

		return matchesTitle && matchesDuration && matchesLevel
	});
});
</script>

<template>
	<div v-if="state.isLoading" class="pulse-loader">
		<PulseLoader color="#6b7280" />
	</div>
	<main v-else>
		<section class="trips-filter">
			<h2 class="visually-hidden">Trips filter</h2>
			<form class="trips-filter__form" autocomplete="off">
				<label class="trips-filter__search input">
					<span class="visually-hidden">Search by name</span>
					<input v-model="filters.title" data-test-id="filter-search" name="search" type="search"
						placeholder="search by title" />
				</label>
				<label class="select">
					<span class="visually-hidden">Search by duration</span>
					<select v-model="filters.duration" data-test-id="filter-duration" name="duration">
						<option value="">duration</option>
						<option value="0_x_5">&lt; 5 days</option>
						<option value="5_x_10">&lt; 10 days</option>
						<option value="10">&ge; 10 days</option>
					</select>
				</label>
				<label class="select">
					<span class="visually-hidden">Search by level</span>
					<select v-model="filters.level" data-test-id="filter-level" name="level">
						<option value="">level</option>
						<option value="easy">easy</option>
						<option value="moderate">moderate</option>
						<option value="difficult">difficult</option>
					</select>
				</label>
			</form>
		</section>
		<section class="trips">
			<h2 class="visually-hidden">Trips List</h2>
			<ul class="trip-list">
				<TripCard v-for="trip in filteredTrips" :key="trip.id" :trip="trip" />
			</ul>
		</section>
	</main>
</template>