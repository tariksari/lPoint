<template>
  <nav class="shadow-sm fixed-top p-2">
    <div class="max-w-5xl mx-auto sm:px-6 lg:px-8">
      <div class="d-flex bd-highlight">
        <div class="p-2 bd-highlight">
          <router-link class="p-2 rounded-2" to="/">AGENDA</router-link>
        </div>
        <div class="p-2 bd-highlight">
          <router-link
            v-bind:class="{
              'router-link-active': this.$route.name == 'WordInfo',
            }"
            class="p-2 rounded-2"
            to="/search"
            exact
            >SEARCH WORD</router-link
          >
        </div>
        <div class="ms-auto bd-highlight setting__icon">
          <router-link
            v-bind:class="{
              'router-link-active': this.$route.name == 'settings',
            }"
            to="/settings"
            exact
            ><cog-box
          /></router-link>
        </div>
      </div>
    </div>
  </nav>
  <load-bar></load-bar>
  <router-view class="main-content" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapGetters } from "vuex";

import LoadBar from "@/components/LoadBar.vue";
import { CogBox } from "mdue";

import { ContentSaveCog } from "mdue";

@Options({
  components: {
    LoadBar,
    CogBox,
    ContentSaveCog,
  },
  watch: {
    getThemeMod: {
      handler() {
        this.themeSetter();
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      getThemeMod: "APP/getThemeMod",
    }),
  },
  created() {
    this.themeSetter();
  },
})
export default class App extends Vue {
  getThemeMod: any;

  private themeSetter() {
    if (this.getThemeMod == "0") {
      document.documentElement.classList.remove("dark");
      return;
    }

    document.documentElement.classList.add("dark");
  }
}
</script>

<style lang="scss">
@import "./assets/styles/main.scss";
</style>
