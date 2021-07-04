<template>
  <div class="row mt-5">
    <Loader class="w-100" :isLoading="isLoading" />

    <div class="col-md-12 mt-3 mb-3">
      <h2>SEARCH DOCUMENT</h2>
    </div>

    <div class="col-md-5">
      <select
        ref="form-select"
        data-live-search="true"
        data-style="btn-outline-primary"
        data-size="10"
        data-width="100%"
        v-model="key"
      >
        <option :value="v.key" v-for="(v, k) of keys" :key="k">{{
          v.name
        }}</option>
      </select>
    </div>

    <div class="col-md-5">
      <div class="form-group">
        <input
          type="text"
          :class="$v.search.$error ? 'is-invalid' : ''"
          class="form-control"
          v-model="$v.search.$model"
          placeholder="SEARCH VALUE"
        />
      </div>
    </div>

    <div class="col-md-2">
      <button
        type="button"
        class="btn btn-success btn-block"
        @click="getDocuments"
      >
        SEARCH
      </button>
    </div>

    <Loader class="w-100" :isLoading="!firstFetch && isTableLoading" />

    <div class="table-responsive" v-if="!isTableLoading">
      <table class="table align-items-center">
        <thead class="thead-light">
          <tr>
            <th scope="col">TCC NUMBER</th>
            <th scope="col">NAME OF ARTICLE</th>
            <th scope="col">FILE NAME</th>
            <th scope="col">APPLICANT COMPANY NAME</th>
            <th scope="col">APPLICANT NAME</th>
            <th scope="col">REMARKS</th>
            <th scope="col" class="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody v-if="documents.length > 0">
          <tr v-for="(document, idx) of documents" :key="idx">
            <td>{{ document.tccNumber }}</td>
            <td>{{ document.nameOfArticle }}</td>
            <td>{{ document.originalFileName }}</td>
            <td>{{ document.applicantCompanyName }}</td>
            <td>{{ document.applicantName }}</td>
            <td>{{ document.remarks }}</td>
            <td>
              <button
                type="button"
                class="btn btn-block btn-sm btn-success"
                @click.prevent="viewDocument(document.id)"
              >
                VIEW
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-if="documents.length == 0">
          <tr>
            <td colspan="7" class="text-center"><h3>NO DATA FOUND.</h3></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      isLoading: true,
      isTableLoading: true,
      firstFetch: true,
      keys: [],
      key: "",
      search: "",
      documents: [],
    };
  },

  validations: {
    search: {
      required,
    },
  },

  methods: {
    initSelectPicker() {
      this.$nextTick(() => {
        $(this.$refs["form-select"]).selectpicker();
      });
    },

    async getDocumentKeys() {
      const { data } = await this.$store.dispatch("document/getDocumentKeys");

      this.keys = data || [];
      if (this.keys.length > 0) this.key = this.keys[0].key;

      this.initSelectPicker();
      this.isLoading = false;
    },

    async getDocuments() {
      this.firstFetch = false;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$popover.show(
          {
            title: "search value field empty!",
            content: "Please fill up search value field.",
          },
          "warning"
        );
        return;
      }

      this.isTableLoading = true;
      const payload = {
        search: this.search,
        key: this.key,
      };

      const { data } = await this.$store.dispatch(
        "document/getDocuments",
        payload
      );

      this.documents = data || [];
      this.isTableLoading = false;
    },

    async viewDocument(id) {
      let route = this.$router.resolve({
        path: `/DocumentManagement/Document/${id}`,
      });
      window.open(route.href, "_blank");
    },
  },

  mounted() {
    this.getDocumentKeys();
  },
};
</script>
