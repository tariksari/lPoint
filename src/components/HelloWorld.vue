<template>

</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {mapGetters, mapActions} from "vuex";

@Options({
	props: {
		msg: String
	},
	computed: {
		...mapGetters({
			getSidebar: "PANEL_SETTING/getSidebar",
		}),
	},
	methods: {
		...mapActions({
			actionChangeNavStatus: "PANEL_SETTING/GET_WORD",
		})
	},
	created() {
		this.actionChangeNavStatus()
	}
})
export default class HelloWorld extends Vue {
	msg!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
	margin: 40px 0 0;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	display: inline-block;
	margin: 0 10px;
}

a {
	color: #42b983;
}
</style>
