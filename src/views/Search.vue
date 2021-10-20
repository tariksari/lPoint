<template>
  <div>
    <div class="page search-area">
      <input
        @keyup.enter="searchButtonAction"
        class="
          shadow
          appearance-none
          border
          rounded
          w-full
          py-2
          px-3
          text-gray-700
          leading-tight
          focus:outline-none focus:shadow-outline
        "
        type="text"
        v-model="searchKey"
      />

      <button
        @click="this.searchButtonAction"
        class="
          transition
          duration-500
          ease-in-out
          transform
          hover:-translate-x-1 hover:scale-120
          bg-gray-300
          hover:bg-gray-400
          text-gray-800
          font-bold
          py-2
          px-4
          rounded
          inline-flex
          items-center
        "
      >
        <magnify></magnify>
        <span>SEARCH</span>
      </button>
    </div>

    <div class="page search-result" v-if="data.length">
      <ul>
        <li v-for="(value, key) in this.data" :key="key">
          <router-link :to="'/info/' + encodeURI(value.word)">
            {{ value.word }}
            <div class="word-info">{{ value.label }}</div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapGetters, mapActions } from "vuex";
import { Magnify } from "mdue";

@Options({
  components: {
    Magnify,
  },
  watch: {
    getData: {
      handler(val) {
        this.data = val.data;
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      getData: "SEARCH/getData",
    }),
  },
  methods: {
    ...mapActions({
      actionSearch: "SEARCH/WORD_SEARCH_GET",
    }),
  },
})
export default class SearchPage extends Vue {
  searchKey = "";
  data: any = [];
  actionSearch: any;

  searchButtonAction(): void {
    this.actionSearch(this.searchKey);
  }
}
</script>
