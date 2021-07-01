<template>
  <div id="notfound">
    <div class="notfound">
      <div class="notfound-404">
        <h1>Oops!</h1>
        <h2>404 - The Page can't be found</h2>
      </div>
      <a @click.prevent="goToHomepage" id="go-to-homepage">Go TO Homepage</a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToHomepage() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
#go-to-homepage {
  cursor: pointer;
}
</style>
