<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card-wrapper">
        <div class="card">
          <div class="card-body" v-if="!uploadSupported">
            <div class="row">
              <div class="col-md-12 text-center mt-4">
                <b
                  >UPLOAD API NOT SUPPORTED. PLEASE USE A MODERN BROWSER TO
                  ACCESS THIS FUNCTIONALITY.</b
                >
              </div>
            </div>
          </div>

          <div class="card-body" v-if="uploadSupported">
            <div class="row">
              <div class="col-md-12">
                <button
                  type="button"
                  class="btn btn-danger mb-4"
                  @click="goBack"
                >
                  BACK
                </button>
              </div>

              <div class="col-md-12">
                <button
                  type="button"
                  class="btn btn-success mb-4"
                  @click="uploadDocument"
                  :disabled="
                    $v.$invalid ||
                      isUploading ||
                      !isChunkComplete ||
                      files.length == 0
                  "
                >
                  UPLOAD FILES
                </button>
                <button
                  type="button"
                  class="btn btn-danger mb-4 float-right"
                  @click="clearFiles"
                  :disabled="this.files.length == 0"
                >
                  CLEAR FILES
                </button>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div
                  class="dropzone"
                  @drop.prevent="dropFile"
                  @dragover.prevent
                >
                  <div class="dropzone-label" v-if="files.length == 0">
                    <span>DROP DOCUMENTS TO UPLOAD</span>
                  </div>

                  <div class="dropzone-content" v-if="files.length > 0">
                    <div class="accordion" id="upload-accordion">
                      <div
                        class="card m-0"
                        v-for="(file, key) of $v.files.$each.$iter"
                        :key="key"
                      >
                        <div
                          :class="{
                            'bg-red': file.$invalid,
                            'bg-green': !file.$invalid,
                          }"
                          class="card-header"
                          data-toggle="collapse"
                          :data-target="`#collapse${key}`"
                          :aria-controls="`collapse${key}`"
                        >
                          <div class="row">
                            <div class="col-md-6">
                              <h3 class="mb-0 text-white same-line">
                                {{ files[key].file.name }}
                              </h3>
                            </div>
                            <div class="col-md-6 text-right">
                              <i
                                class="fas fa-times text-white"
                                @click.stop.prevent="removeDocument(key)"
                              ></i>
                            </div>
                          </div>
                        </div>
                        <div
                          :id="`collapse${key}`"
                          class="collapse"
                          data-parent="#upload-accordion"
                        >
                          <div class="card-body">
                            <DocumentManagementUploadDocumentForm
                              :file="file"
                              :name="files[key].file.name"
                              :size="files[key].file.size"
                              :formKey="key"
                              :key="`UDF-${key}`"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import resumablejs from "resumablejs";
import { v4 } from "uuid";
import { required } from "vuelidate/lib/validators";

export default {
  layout: "dashboard",

  data() {
    return {
      files: [],
      resumableJSInstance: null,
      isUploading: false,
      uploadError: [],
      uploadSuccess: [],
      popoverInstance: null,
      resolveErrors: [],
      chunkCompleted: 0,
      checkRack: [],
    };
  },

  validations: {
    files: {
      $each: {
        tccNumber: {
          required,
        },
        rullingType: {
          required,
        },
        nameOfArticle: {
          required,
        },
        ahtnCode: {
          required,
        },
        content: {
          required,
        },
        applicantCompanyName: {
          required,
        },
        applicantName: {
          required,
        },
        applicantEmail: {
          required,
        },
        applicantNumber: {
          required,
        },
        assignedTo: {
          required,
        },
        qrt: {
          required,
        },
        recordsDate: {
          required,
        },
        chairDate: {
          required,
        },
        endorseDate: {
          required,
        },
        requestDate: {
          required,
        },
        noticeDate: {
          required,
        },
        draftDate: {
          required,
        },
        finalizeDate: {
          required,
        },
        issueDate: {
          required,
        },
        additionalInfoRequestDate: {
          required,
        },
        additionalInfoSubmissionDate: {
          required,
        },
        dropDate: {
          required,
        },
        remarks: {
          required,
        },
      },
    },
  },

  computed: {
    uploadSupported() {
      return this.resumableJSInstance.support;
    },

    getProgress() {
      return this.isUploading ? this.resumableJSInstance.progress() : 0;
    },

    isChunkComplete() {
      return this.chunkCompleted == this.files.length;
    },
  },

  methods: {
    goBack() {
      this.$router.push("/DocumentManagement");
    },

    dropFile(e) {
      if (!e.dataTransfer.files) return;

      let fileError = {
        ext: [],
        duplicate: [],
      };

      [...e.dataTransfer.files].forEach((f) => {
        const fileNameChunk = f.name.split(".");
        const ext = fileNameChunk[fileNameChunk.length - 1];

        if (ext.toLowerCase() != "pdf") fileError.ext.push(f.name);
        else if (this.files.some((_f) => _f.file.name == f.name))
          fileError.duplicate.push(f.name);
        else this.resumableJSInstance.addFile(f);
      });

      if (fileError.ext.length > 0 || fileError.duplicate.length > 0) {
        let content = "";

        if (fileError.ext.length > 0)
          content += `Invalid file extension/s. Please upload pdf file/s only. <br /><br /> ${fileError.ext
            .map((err) => `* ${err}`)
            .join("<br />")}`;

        if (fileError.duplicate.length > 0)
          content += `File/s already exist. <br /><br /> ${fileError.duplicate
            .map((err) => `* ${err}`)
            .join("<br />")}`;

        this.$popover.show(
          {
            title: "Failed to add file/s.",
            content,
          },
          "warning"
        );
      }
    },

    getFields(file, uid) {
      return {
        file,
        tccNumber: "",
        rullingType: "DR",
        nameOfArticle: "",
        ahtnCode: "",
        content: "",
        applicantCompanyName: "",
        applicantName: "",
        applicantEmail: "",
        applicantNumber: "",
        assignedTo: "",
        qrt: "",
        recordsDate: "",
        chairDate: "",
        endorseDate: "",
        requestDate: "",
        noticeDate: "",
        draftDate: "",
        finalizeDate: "",
        issueDate: "",
        additionalInfoRequestDate: "",
        additionalInfoSubmissionDate: "",
        dropDate: "",
        remarks: "",
        uid,
      };
    },

    getPopoverContent() {
      return `<div>
              ${this.files.map((f) => `* ${f.file.name}`).join("<br />")}
              </div>`;
    },

    clearFiles() {
      this.files = [];
      this.isUploading = false;
      this.uploadError = [];
      this.uploadSuccess = [];
      this.popoverInstance = null;
      this.chunkCompleted = 0;
      this.resumableJSInstance.cancel();
    },

    uploadDocument() {
      const vi = this;

      this.popoverInstance = this.$popover.show({
        title: "UPLOAD AND SAVE DOCUMENT",
        content: this.getPopoverContent(),
        buttons: {
          upload: {
            text: "upload and save",
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
    },

    removeDocument(idx) {
      const vm = this;
      this.popoverInstance = this.$popover.show({
        title: "REMOVE DOCUMENT",
        content: `Would you like to remove (${vm.files[idx].file.name})?`,
        buttons: {
          yes: {
            text: "yes",
            btnClass: "btn-success",
            keys: ["enter"],
            action() {
              vm.files.splice(idx, 1);
            },
          },
          no: {
            text: "no",
            btnClass: "btn-danger",
          },
        },
      });
    },
  },

  created() {
    $(document).on("shown.bs.collapse", ".collapse", function() {
      const parent = $(this).parent();
      const index = $(parent).index();

      $(".dropzone").animate(
        {
          scrollTop: 0 + index * 70,
        },
        100
      );
    });

    const opts = {
      target: `${this.$config.apiURL}/document/upload`,
      chunkSize: 1 * 1024 * 1024,
      withCredentials: true,
      testChunks: false,
      generateUniqueIdentifier: () => v4(),
    };

    this.resumableJSInstance = new resumablejs(opts);

    this.resumableJSInstance.on("fileAdded", (file) => {
      this.files.push(this.getFields(file.file, file.uniqueIdentifier));

      if (this.resolveErrors.length > 0) {
        const reIdx = this.resolveErrors.findIndex(
          (re) => re.file.name == file.fileName
        );

        if (reIdx != -1) {
          const idx = this.files.findIndex(
            (_file) => _file.uid == file.uniqueIdentifier
          );

          const { uid, file: __file, ...rest } = this.resolveErrors[reIdx];
          const valueKeys = Object.keys(rest);

          valueKeys.forEach((vk) => {
            this.files[idx][vk] = this.resolveErrors[reIdx][vk];
          });

          this.resolveErrors.splice(reIdx, 1);
        }
      }
    });

    this.resumableJSInstance.on("chunkingComplete", () => {
      this.chunkCompleted += 1;
    });

    this.resumableJSInstance.on("fileSuccess", async (file) => {
      this.uploadSuccess.push(file);
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
      this.uploadError.push({ message: "Upload failed.", file });
    });

    this.resumableJSInstance.on("uploadStart", () => (this.isUploading = true));

    this.resumableJSInstance.on("complete", async () => {
      const jc = this.popoverInstance;
      let content = "";

      if (this.uploadSuccess.length > 0) {
        const documents = (
          await Promise.all(
            this.uploadSuccess.map(async (file) => {
              const idx = this.files.findIndex(
                ({ uid }) => uid == file.uniqueIdentifier
              );

              const { file: _file, ...payload } = this.files[idx];

              const { status, message } = await this.$store.dispatch(
                "document/save",
                {
                  ...payload,
                  fileName: file.fileName,
                }
              );

              status != 200 && this.uploadError.push({ message, file });

              return { status, message, file };
            })
          )
        ).filter((d) => d.status == 200);

        if (documents.length > 0)
          content += `<span class="d-block font-weight-bold text-success">SUCCESSFULLY PROCESSED DOCUMENTS:</span> ${documents
            .map(({ file }) => `* ${file.fileName}`)
            .join("<br />")}`;
      }

      if (this.uploadError.length > 0) {
        content += `<span class="d-block font-weight-bold text-danger">FAILED TO PROCESS DOCUMENTS:</span> ${this.uploadError
          .map(
            ({ file, message }) =>
              `* ${file.fileName} <span class="text-danger">(${message})</span>`
          )
          .join("<br />")}`;

        const reuploadUIDS = this.uploadError.map(
          ({ file }) => file.uniqueIdentifier
        );

        this.resolveErrors = this.files.filter((f) =>
          reuploadUIDS.includes(f.uid)
        );
      }

      jc.$$close.show();
      jc.setTitle("PROCESS STATUS");
      jc.setIcon(this.$popover.getIcon("info"));

      this.clearFiles();

      this.resolveErrors.length > 0 &&
        this.resumableJSInstance.addFiles(
          this.resolveErrors.map((f) => f.file)
        );

      jc.setContent(content);
      jc.$$close.show();
    });
  },
};
</script>

<style scoped>
.dropzone {
  padding: 1.25rem;
  border: 1px dashed #000;
  border-radius: 0.25rem;
  background-color: #fff;
  height: 63vh;
  cursor: pointer;
  overflow: auto;
}

.dropzone-label {
  display: block;
  margin: auto;
  font-weight: 500;
  font-size: 35px;
  text-align: center;
}

.accordion .card-header {
  border: 2px solid white;
}

.accordion .card-header:after {
  content: none;
}

.same-line {
  display: inline-block;
}
</style>
