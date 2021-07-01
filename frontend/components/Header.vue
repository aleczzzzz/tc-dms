<template>
  <div class="header pb-6">
    <div class="container-fluid">
      <div class="header-body">
        <div class="row align-items-center py-4">
          <div class="col-lg-6 col-7">
            <h6 class="h2 d-inline-block mb-0">
              {{ name }} <i class="fas fa-home"></i>
            </h6>
            <nav
              aria-label="breadcrumb"
              class="d-none d-md-inline-block ml-md-1"
            >
              <ol class="breadcrumb breadcrumb-links">
                <li
                  class="breadcrumb-item"
                  v-for="(crumb, key) of getCrumbs"
                  :key="key"
                >
                  {{ crumb }}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { noCase } from "no-case";

export default {
  data() {
    return {
      name: this.$config.name,
    };
  },

  computed: {
    getCrumbs() {
      const crumbs = this.$route.name.split("-");

      return [...this.$route.matched.keys()].map((k) =>
        noCase(crumbs[k]).toUpperCase()
      );
    },
  },
};
</script>

<style scoped>
.breadcrumb-item + .breadcrumb-item::before {
  content: ">";
  font-weight: bold;
}

.breadcrumb-item {
  font-weight: 600;
}
</style>
