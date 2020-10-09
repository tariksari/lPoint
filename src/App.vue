<template>
  <div id="nav">
	  <router-link to="/">AGENDA</router-link>
	  <router-link to="/ss">GAME</router-link>
	  <router-link to="/word-list">WORD LIST</router-link>
    <router-link to="/search" class="active">SEARCH WORD</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
@import "./assets/styles/main.scss";
</style>
