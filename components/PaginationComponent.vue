<template>
	<nav
		class="flex flex-col sm:flex-row justify-between items-center"
		aria-label="Table pagination">
		<span class="flex flex-grow justify-evenly sm:justify-start gap-6">
			<span class="text-base font-normal text-gray-500">Showing
				<span class="font-semibold text-gray-900">{{ currentPage }}</span>
				of
				<span class="font-semibold text-gray-900">{{ totalPages }}</span>
			</span>
			<p class="font-semibold text-gray-900">{{ totalOnCurrentPage }} entries</p>
		</span>
		<ul class="inline-flex items-center -space-x-px">
			<li>
				<button
					type="button"
					@click="onClickPreviousPage"
					:disabled="isInFirstPage"
					class="cursor-pointer block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:bg-gray-300"
				>
					<span class="sr-only">Previous</span>
					<svg
						class="w-5 h-5"
						aria-hidden="true"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
							clip-rule="evenodd"
						></path>
					</svg>
				</button>
			</li>
			<li>
				<button
					type="button"
					@click="onClickFirstPage"
					:disabled="isInFirstPage"
					class="cursor-pointer block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:bg-gray-300"
				>
					<span class="">First</span>
				</button>
			</li>
			<li v-for="page in pages" :key="page.name">
				<button
					@click="onClickPage(page.name)"
					:class="{ 'bg-gray-300': isPageActive(page.name) }"
					type="button"
					:disabled="page.isDisabled"
					class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
				>
					{{ page.name }}
				</button>
			</li>
			<li>
				<button
					type="button"
					@click="onClickLastPage"
					:disabled="isInLastPage"
					class="cursor-pointer block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:bg-gray-300"
				>
					<span class="">Last</span>
				</button>
			</li>
			<li>
				<button
					type="button"
					@click="onClickNextPage"
					:disabled="isInLastPage"
					class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:bg-gray-300"
				>
					<span class="sr-only">Next</span>
					<svg
						class="w-5 h-5"
						aria-hidden="true"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clip-rule="evenodd"
						></path>
					</svg>
				</button>
			</li>
		</ul>
	</nav>
</template>

<script setup lang="ts">
interface Props {
	maxVisibleButtons?: number
	totalItemCount: number
	perPage: number
	currentPage: number
	totalOnCurrentPage: number
}
const props = withDefaults(defineProps<Props>(), {
	maxVisibleButtons: 3,
	totalOnCurrentPage: 0,
})

const totalPages = computed(() => {
	return Math.ceil(props.totalItemCount / props.perPage);
})

const emit = defineEmits({
	pagechanged: (page: number) => true,
});

const startPage = computed(() => {
	if (props.currentPage === 1) {
		return 1;
	}

	// When on the last page
	if (props.currentPage === totalPages.value) {
		return totalPages.value;
	}

	// When inbetween
	return props.currentPage - 1;
});

const pages = computed(() => {
	const range = [];

	for (
		let i = startPage.value;
		i <=
		Math.min(startPage.value + props.maxVisibleButtons - 1, totalPages.value);
		i++
	) {
		range.push({
			name: i,
			isDisabled: i === props.currentPage,
		});
	}

	return range;
});

const isInFirstPage = computed(() => {
	return props.currentPage === 1;
});

const isInLastPage = computed(() => {
	return props.currentPage === totalPages.value;
});

const onClickFirstPage = () => {
	emit("pagechanged", 1);
};
const onClickPreviousPage = () => {
	emit("pagechanged", props.currentPage - 1);
};
const onClickPage = (page: number) => {
	emit("pagechanged", page);
};
const onClickNextPage = () => {
	emit("pagechanged", props.currentPage + 1);
};
const onClickLastPage = () => {
	emit("pagechanged", totalPages.value);
};

const isPageActive = (page: number) => {
	return props.currentPage === page;
};
</script>
