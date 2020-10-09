<template>
	<div>
		<div class="word-info-list">
			<div
				class="row"
				v-for="(value, key) in this.wordData"
				:key="key.id"
			>
				<div class="item name">{{ value.word }}</div>
				<div
					class="item pronunciation-spell"
					v-if="this.getPronunciationsInfo(value)"
				>
					/
					{{ this.getPronunciationsInfo(value)['phoneticSpelling'] }}/
					:
				</div>
				<div
					class="item pronunciation-audio"
					v-if="this.getPronunciationsInfo(value)"
				>
					<a
						class="play-audio"
						@click="
							this.playAudio(
								this.getPronunciationsInfo(value)['audioFile']
							)
						"
					>
						<i class="el-icon-video-play"></i>
					</a>
				</div>
				<div class="item word-action">
					<i class="icon el-icon-folder-add"></i>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

@Options({
	data() {
		return {
			wordData: {},
			currentRoute: this.$route.params.word,
		};
	},
	watch: {
		'$route.params.word': function (par) {
			this.currentRoute = par;
		},
		getWord: {
			handler(val) {
				console.log(val);
				this.wordData = val.data.results;
			},
			deep: true,
		},
	},
	computed: {
		...mapGetters({
			getWord: 'WORD_INFO/getData',
		}),
	},
	methods: {
		...mapActions({
			actionSearch: 'WORD_INFO/WORD_GET',
		}),
		getPronunciationsInfo(data: any) {
			if (typeof data.lexicalEntries[0]['entries'] !== 'undefined') {
				return data.lexicalEntries[0]['entries'][0][
					'pronunciations'
				][0];
			}

			return null;
		},
		playAudio(mediaUrl: string) {
			new Audio(mediaUrl).play();
		},
	},
	created() {
		this.actionSearch(this.currentRoute);
	},
})
export default class WordInfo extends Vue {}
</script>
