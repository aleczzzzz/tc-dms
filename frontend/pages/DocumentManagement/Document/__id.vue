<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card-wrapper">
        <div class="card">
          <div class="card-body">
            <Loader class="w-100" :isLoading="isLoading" />

            <DocumentManagementDocumentViewForm
              :file="document"
              v-if="Object.keys(document).length > 0"
            />
            <h2 v-else class="text-center">
              DOCUMENT DOES NOT EXIST
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      key: "",
      document: {},
    };
  },

  methods: {
    async getDocument(id) {
      const { data } = await this.$store.dispatch("document/getDocument", {
        id,
      });

      if (data) {
        this.document = data;
        this.key = data.id;
      }

      this.isLoading = false;
    },
  },

  mounted() {
    const id = this.$route.params._id;
    this.getDocument(id);
  },
};
</script>
