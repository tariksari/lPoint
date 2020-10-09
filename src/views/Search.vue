<template>
	<div>
		<div class="search-area">
			<el-input
				placeholder="Search Word"
				v-model="searchKey"
				clearable>
			</el-input>
			<el-button type="info" @click="this.searchButtonAction">Search</el-button>
		</div>
		<div class="search-result">
			<ul>
				<li v-for="(value,key) in this.data">
					<router-link :to="'/word-info/'+value.word">
						<div class="word-info">{{ value.label }}</div>
						<div class="score">{{ value.score }}</div>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>
<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {mapGetters, mapActions} from "vuex";


@Options({
	data() {
		return {
			searchKey: '',
			data: {}
		}
	},
	watch: {
		getStatus: {
			handler(val) {
				console.log(val.data.results)
				this.data = val.data.results
			},
			deep: true
		}
	},
	computed: {
		...mapGetters({
			getStatus: "SEARCH/getData",
		}),
	},
	methods: {
		...mapActions({
			actionSearch: "SEARCH/WORD_SEARCH_GET",
		}),
		searchButtonAction() {
			this.actionSearch(this.searchKey)
		}
	},
	created() {
		setInterval(() => {
			//	this.searchKey = Math.random();
		}, 1000)
	}
})
export default class SearchPage extends Vue {
}
</script>
