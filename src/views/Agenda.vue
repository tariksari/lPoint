<template>
  <div>
    <div :class="[viewType ? 'grid' : 'list', 'page agenda-list']">
      <div class="view-type-button" @click="this.listViewChanger()">
        <format-list-bulleted v-if="viewType"></format-list-bulleted>
        <grid-large v-else></grid-large >
      </div>
      <div v-for="(value, key) in this.wordData" :key="key.id" class="item">
        <div class="audio">
          <play-box-outline
            @click="this.playAudio(value.audio)"
          ></play-box-outline>
        </div>
        <div class="name">{{ value.word }}</div>
        <div class="spell">{{ value.spell }}</div>
        <div class="type">{{ value.lexical_category }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions, mapGetters } from "vuex";
import { GridLarge, FormatListBulleted, PlayBoxOutline } from "mdue";

@Options({
  components: {
    GridLarge,
    FormatListBulleted,
    PlayBoxOutline,
  },
  data() {
    return {
      wordData: {},
      currentRoute: "agenda", //this.$route.params.word,
      viewType: true,
    };
  },
  watch: {
    "$route.params.word": function (par) {
      this.currentRoute = par;
    },
    getWord: {
      handler(val) {
        console.log(val);
        this.wordData = val.data;
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      getWord: "AGENDA/getData",
    }),
  },
  methods: {
    ...mapActions({
      actionAgenda: "AGENDA/AGENDA_GET",
    }),
    getPronunciationsInfo(data: any) {
      if (typeof data.lexicalEntries[0]["entries"] !== "undefined") {
        return data.lexicalEntries[0]["entries"][0]["pronunciations"][0];
      }

      return null;
    },
    playAudio(mediaUrl: string) {
      new Audio(mediaUrl).play();
    },
    listViewChanger() {
      this.viewType = !this.viewType;
    },
  },
  created() {
    this.actionAgenda(this.currentRoute);
  },
})
export default class WordInfo extends Vue {}
</script>
