<template>
  <nav class="shadow-2xl shadow-inner fixed z-20">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex items-baseline">
            <router-link
              class="
                px-3
                py-2
                rounded-md
                text-sm
                font-medium
                text-gray-300
                hover:text-white
              "
              to="/"
              >AGENDA</router-link
            >
            <router-link
              v-bind:class="{
                'router-link-active': this.$route.name == 'WordInfo',
              }"
              class="
                px-3
                py-2
                rounded-md
                text-sm
                font-medium
                text-gray-300
                hover:text-white
              "
              to="/search"
              exact
              >SEARCH WORD</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
  <load-bar></load-bar>
  <router-view class="pt-16" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

import LoadBar from "@/components/LoadBar.vue";

@Options({
  components: {
    LoadBar,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "./assets/styles/main.scss";
</style>
