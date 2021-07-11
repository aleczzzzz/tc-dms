<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card-wrapper">
        <div class="card">
          <div class="card-body">
            <Loader class="w-100" :isLoading="isLoading" />

            <input
              type="file"
              class="d-none"
              ref="file"
              @change="onFilePicked"
            />

            <DocumentManagementDocumentUpdateForm
              ref="updateForm"
              :file="document"
              v-if="isUpdate"
            />

            <DocumentManagementDocumentViewForm
              :file="document"
              v-if="!isLoading && !isUpdate && Object.keys(document).length > 0"
            />
            <h2 v-if="Object.keys(document).length == 0" class="text-center">
              DOCUMENT DOES NOT EXIST
            </h2>

            <div
              class="col-md-12"
              v-if="!isLoading && !isUpdate && Object.keys(document).length > 0"
            >
              <button
                type="button"
                class="btn btn-success"
                @click="downloadFile"
              >
                DOWNLOAD FILE
              </button>

              <button
                type="button"
                class="btn btn-success float-right"
                @click="updateDocument"
              >
                UPDATE DOCUMENT
              </button>
            </div>

            <div class="col-md-12" v-if="isUpdate">
              <button
                type="button"
                class="btn btn-danger"
                @click="updateDocument"
              >
                BACK
              </button>

              <button
                type="button"
                class="btn btn-success float-right ml-4"
                @click="submit"
              >
                SUBMIT
              </button>

              <button
                type="button"
                class="btn btn-success float-right"
                @click="updateFile"
              >
                UPDATE FILE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import resumablejs from "resumablejs";
import { saveAs } from "file-saver";

export default {
  data() {
    return {
      isLoading: true,
      key: "",
      document: {},
      isUpdate: false,
      file: null,
      isUploading: false,
      uploadStatus: null,
      popoverInstance: null,
    };
  },

  methods: {
    updateDocument() {
      this.isUpdate = !this.isUpdate;
    },

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

    async updateFile() {
      this.$refs.file.click();
    },

    onFilePicked(event) {
      const file = event.target.files;
      const fileNameChunk = file[0].name.split(".");
      const ext = fileNameChunk[fileNameChunk.length - 1];
      if (ext.toLowerCase() != "pdf") {
        this.$popover.show(
          {
            title: "Warning",
            content: "Invalid file extension. Please upload pdf file only.",
          },
          "warning"
        );
      } else this.resumableJSInstance.addFile(file[0]);
    },

    async submit() {
      const vi = this;
      this.$refs.updateForm.$v.$touch();
      if (this.$refs.updateForm.$v.$invalid) {
        this.$popover.show(
          {
            title: "Warning",
            content: "Please fill up required fields.",
          },
          "warning"
        );
        return;
      }

      this.$popover.show({
        title: "UPDATE DOCUMENT",
        content: "",
        buttons: {
          update: {
            text: "update",
            btnClass: "btn-success",
            keys: ["enter"],
            action() {
              const jc = this;
              jc.$$update.hide();
              jc.$$cancel.hide();

              jc.setIcon(vi.$popover.getIcon("loading"));
              jc.setContent("PROCESSING");

              vi.$store
                .dispatch("document/update", {
                  document: vi.document,
                })
                .then(({ status, message }) => {
                  if (status == 200) {
                    vi.updateDocument();
                    vi.getDocument(vi.document.id);
                  }
                  jc.$$close.show();
                  jc.setIcon(
                    vi.$popover.getIcon(status == 200 ? "success" : "warning")
                  );
                  jc.setContent(message);
                });

              return false;
            },
          },
          cancel: {
            text: "cancel",
            btnClass: "btn-danger",
            keys: ["esc"],
          },
          close: {
            isHidden: true,
            text: "close",
            btnClass: "btn-danger",
          },
        },
      });
    },

    clearFiles() {
      this.file = null;
      this.isUploading = false;
      this.uploadStatus = null;
      this.popoverInstance = null;
      this.resumableJSInstance.cancel();
    },
  },

  mounted() {
    const id = this.$route.params._id;
    this.getDocument(id);
  },

  created() {
    const opts = {
      target: `${this.$config.apiURL}/document/upload`,
      chunkSize: 1 * 1024 * 1024,
      withCredentials: true,
      testChunks: false,
      generateUniqueIdentifier: () =>
        this.document.directoryFileName.split(".")[0],
    };

    this.resumableJSInstance = new resumablejs(opts);

    this.resumableJSInstance.on("fileAdded", (file) => {
      this.file = {
        id: file.uniqueIdentifier,
        file: file.file,
      };

      const vi = this;
      this.popoverInstance = this.$popover.show({
        title: "UPDATE FILE",
        content: `${this.file.file.name}`,
        buttons: {
          upload: {
            text: "upload",
            btnClass: "btn-success",
            keys: ["enter"],
            action() {
              this.$$upload.hide();
              this.$$cancel.hide();

              this.setTitle("PROCESSING");
              this.setIcon(vi.$popover.getIcon("loading"));
              this
                .setContent(`<span class="d-block mb-2 font-weight-bold">UPLOAD PROGRESS:</span>
                               <div class="progress" style="height: 30px; margin: 0;">
                                <div class="progress-bar bg-success" style="width: 0%; color: #000; font-weight: bold;">0</div>
                               </div>`);

              vi.resumableJSInstance.upload();
              return false;
            },
          },
          cancel: {
            text: "cancel",
            btnClass: "btn-danger",
            keys: ["esc"],
          },
          close: {
            isHidden: true,
            text: "close",
            btnClass: "btn-danger",
          },
        },
      });
    });

    this.resumableJSInstance.on("fileSuccess", async (file) => {
      this.uploadStatus = true;
    });

    this.resumableJSInstance.on("fileProgress", () => {
      if (!this.isUploading) return;

      const progress = Math.ceil(this.resumableJSInstance.progress() * 100);
      const jc = this.popoverInstance;
      const progressBar = $(jc.$content).find(".progress-bar");

      progressBar.text(`${progress}%`);
      progressBar.css("width", `${progress}%`);
    });

    this.resumableJSInstance.on("fileError", (file) => {
      file.abort();
      this.uploadStatus = false;
    });

    this.resumableJSInstance.on("uploadStart", () => (this.isUploading = true));

    this.resumableJSInstance.on("complete", async () => {
      const jc = this.popoverInstance;
      let content = "";

      if (this.uploadStatus) {
        const { status } = await this.$store.dispatch(
          "document/updateFileName",
          {
            id: this.document.id,
            filename: this.file.file.name,
          }
        );
        content =
          status == 200
            ? "Successfully updated file."
            : "Failed to update file.";

        if (status == 200) {
          this.updateDocument();
          this.getDocument(this.document.id);
        }
      } else content = "Failed to update file.";

      jc.$$close.show();
      jc.setTitle("PROCESS STATUS");
      jc.setIcon(this.$popover.getIcon("info"));
      this.clearFiles();
      jc.setContent(content);
      jc.$$close.show();
    });
  },
};
</script>
