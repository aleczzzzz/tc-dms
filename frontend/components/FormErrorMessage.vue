<template>
  <div class="invalid-feedback">
    {{ getMessage(vData) }}
  </div>
</template>

<script>
const { getErrorMessage } = require("~/lib/Validator");

export default {
  props: ["vData"],

  methods: {
    getMessage(model) {
      return getErrorMessage(model);
    },
  },
};
</script>

<style></style>
