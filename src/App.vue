<template>
  <div id="nav">
    <router-link to="/">AGENDA</router-link>
    <router-link to="/search">SEARCH WORD</router-link>
  </div>
  <load-bar></load-bar>
  <router-view />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
// @ts-ignore
import LoadBar from "@/components/LoadBar";

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
