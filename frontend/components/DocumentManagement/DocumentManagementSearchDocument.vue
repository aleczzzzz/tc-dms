<template>
  <div>
    <div class="row mt-5">
      <Loader class="w-100" :isLoading="isLoading" />
    </div>

    <div class="row" v-if="!isLoading">
      <div class="col-md-12 mt-3 mb-3">
        <h2>SEARCH DOCUMENT</h2>
      </div>

      <div class="col-md-4">
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

      <div class="col-md-4">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            v-model="search"
            placeholder="SEARCH VALUE"
            ref="search"
            :readonly="isDate"
          />
        </div>
      </div>

      <div class="col-md-2">
        <button
          type="button"
          class="btn btn-success btn-block"
          @click="searchDocument"
        >
          SEARCH
        </button>
      </div>

      <div class="col-md-2">
        <button type="button" class="btn btn-info btn-block" @click="clear">
          CLEAR
        </button>
      </div>
    </div>

    <Loader class="w-100" :isLoading="isTableLoading" />

    <div class="row">
      <div class="col-md-12">
        <Paginate
          v-if="pages > 1"
          :page-count="pages"
          :container-class="'pagination mb-3'"
          :click-handler="getDocuments"
          v-model="page"
          :page-class="'page-item'"
          :page-link-class="'page-link'"
          :prev-class="'page-item'"
          :next-class="'page-item'"
          :next-link-class="'page-link'"
          :prev-link-class="'page-link'"
          :hide-prev-next="true"
          :prev-text="`<i class='fas fa-angle-left' />`"
          :next-text="`<i class='fas fa-angle-right' />`"
        />
      </div>
    </div>

    <div class="table-responsive" v-if="!isTableLoading">
      <table class="table align-items-center">
        <thead class="thead-light">
          <tr>
            <th scope="col">TCC NUMBER</th>
            <th scope="col">NAME OF ARTICLE</th>
            <th scope="col">FILE NAME</th>
            <th scope="col">APPLICANT COMPANY NAME</th>
            <th scope="col">COMPANY REPRESENTATIVE</th>
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
export default {
  data() {
    return {
      isLoading: true,
      isTableLoading: true,
      keys: [],
      key: "",
      search: "",
      documents: [],
      page: 1,
      pages: 0,
      limit: 6,
      datepicker: null,
    };
  },

  computed: {
    isDate() {
      const key = this.keys.find((k) => k.key == this.key);
      return key.type == "date";
    },
  },

  watch: {
    keys() {
      this.initSelectPicker();
    },

    key() {
      this.search = "";
      const vm = this;

      if (this.isDate) {
        this.datepicker = $(this.$refs.search)
          .datepicker({
            language: "en",
            dateFormat: "MM d, yyyy",
            position: "bottom right",
            clearButton: true,
            autoClose: true,
            toggleSelected: false,
            maxDate: new Date(),
            onSelect(formattedDate, date, inst) {
              vm.search = formattedDate;
            },
          })
          .data("datepicker");
      } else {
        this.datepicker != null && this.datepicker.destroy();
      }
    },
  },

  methods: {
    initSelectPicker() {
      this.$nextTick(() => {
        $(this.$refs["form-select"]).selectpicker("refresh");
      });
    },

    async getDocumentKeys() {
      const { data } = await this.$store.dispatch("document/getDocumentKeys");

      this.keys = data || [];
      if (this.keys) this.key = this.keys[0].key;
      this.initSelectPicker();
      this.isLoading = false;
    },

    async getDocuments() {
      this.isTableLoading = true;
      const payload = {
        search: this.search,
        key: this.key,
        limit: this.limit,
        page: this.page,
      };

      const { data, lastPage } = await this.$store.dispatch(
        "document/getDocuments",
        payload
      );

      this.documents = data || [];
      this.pages = lastPage || 0;
      this.isTableLoading = false;
    },

    async viewDocument(id) {
      this.$router.push(`/DocumentManagement/Document/${id}`);
    },

    searchDocument() {
      if (this.search.trim().length == 0) {
        this.$popover.show(
          {
            title: "Warning",
            content: "Please fill up search field.",
          },
          "warning"
        );

        return;
      }

      this.getDocuments();
    },

    clear() {
      this.search = "";
      this.key = this.keys[0].key;
      this.page = 1;
      this.initSelectPicker();
      this.getDocuments();
    },
  },

  async mounted() {
    await this.getDocumentKeys();
    this.getDocuments();
  },
};
</script>
