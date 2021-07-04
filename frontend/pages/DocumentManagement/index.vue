<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card-wrapper">
        <div class="card">
          <div class="card-body">
            <div class="row" v-if="canUpload">
              <div class="col-md-12">
                <button
                  type="button"
                  class="btn btn-success"
                  @click.prevent="uploadDocument"
                >
                  UPLOAD DOCUMENT
                </button>
              </div>
            </div>
            <DocumentManagementSearchDocument />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  layout: "dashboard",

  meta: {
    module: 200,
  },

  computed: {
    ...mapGetters({
      session: "auth/getSession",
    }),

    canUpload() {
      return this.session.modules.includes(201);
    },
  },

  methods: {
    uploadDocument() {
      this.$router.push("/DocumentManagement/UploadDocument");
    },
  },
};
</script>
