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
            <h2 v-if="Object.keys(document).length == 0" class="text-center">
              DOCUMENT DOES NOT EXIST
            </h2>

            <div class="col-md-12">
              <button
                type="button"
                class="btn btn-success"
                @click="downloadFile"
              >
                DOWNLOAD FILE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { saveAs } from "file-saver";

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

    async downloadFile() {
      const { data, status } = await this.$store.dispatch(
        "document/downloadFile",
        {
          id: this.document.id,
        }
      );

      if (status == 200) {
        const file = Buffer.from(data, "base64");

        saveAs(new Blob([file]), this.document.originalFileName);
      } else
        this.$popover.show(
          {
            title: "Failed to downlaod file",
            content: "Please contact administrator.",
          },
          "warning"
        );
    },
  },

  mounted() {
    const id = this.$route.params._id;
    this.getDocument(id);
  },
};
</script>
