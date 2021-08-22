<template>
  <div v-if="session != null">
    <Sidebar />
    <div class="main-content" id="panel">
      <Topbar />
      <Header />
      <div class="container-fluid mt--6">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "dashboard-layout",

  computed: {
    ...mapGetters({
      session: "auth/getSession",
    }),
  },
};
</script>

<style>
.form-control[readonly] {
  background-color: #fff;
}

.form-control {
  color: #000 !important;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #eee;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
}

::-webkit-scrollbar-thumb:hover {
  background: #bbb;
}

.table-responsive table th {
  font-weight: bold;
  font-size: 13px;
}
</style>
