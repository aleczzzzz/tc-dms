<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">FILE NAME</label>
          <input type="text" class="form-control" :value="name" readonly />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">FILE SIZE</label>
          <input
            type="text"
            class="form-control"
            :value="getFileSize(size)"
            readonly
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">TCC NUMBER</label>
          <input
            type="text"
            :class="file.tccNumber.$error ? 'is-invalid' : ''"
            class="form-control"
            v-model="file.tccNumber.$model"
          />
          <FormErrorMessage
            :vData="file.tccNumber"
            v-if="file.tccNumber.$error"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">RULLING TYPE</label>
          <input
            type="text"
            :class="file.rullingType.$error ? 'is-invalid' : ''"
            class="form-control"
            v-model="file.rullingType.$model"
          />
          <FormErrorMessage
            :vData="file.rullingType"
            v-if="file.rullingType.$error"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">NAME OF ARTICLE</label>
          <input
            type="text"
            :class="file.nameOfArticle.$error ? 'is-invalid' : ''"
            class="form-control"
            v-model="file.nameOfArticle.$model"
          />
          <FormErrorMessage
            :vData="file.nameOfArticle"
            v-if="file.nameOfArticle.$error"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">AHTN CODE</label>
          <input
            type="text"
            :class="file.ahtnCode.$error ? 'is-invalid' : ''"
            class="form-control"
            v-model="file.ahtnCode.$model"
          />
          <FormErrorMessage
            :vData="file.ahtnCode"
            v-if="file.ahtnCode.$error"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="form-group">
          <label class="form-control-label">CONTENT</label>
          <textarea
            type="text"
            :class="file.content.$error ? 'is-invalid' : ''"
            class="form-control"
            rows="4"
            v-model="file.content.$model"
          />
          <FormErrorMessage :vData="file.content" v-if="file.content.$error" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">APPLICANT COMPANY NAME</label>
          <input
            type="text"
            :class="file.applicantCompanyName.$error ? 'is-invalid' : ''"
            class="form-control"
            v-model="file.applicantCompanyName.$model"
          />
          <FormErrorMessage
            :vData="file.applicantCompanyName"
            v-if="file.applicantCompanyName.$error"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">APPLICANT NAME</label>
          <input
            type="text"
            :class="file.applicantName.$error ? 'is-invalid' : ''"
            class="form-control"
            v-model="file.applicantName.$model"
          />
          <FormErrorMessage
            :vData="file.applicantName"
            v-if="file.applicantName.$error"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">APPLICANT EMAIL</label>
          <input
            type="text"
            :class="file.applicantEmail.$error ? 'is-invalid' : ''"
            class="form-control"
            v-model="file.applicantEmail.$model"
          />
          <FormErrorMessage
            :vData="file.applicantEmail"
            v-if="file.applicantEmail.$error"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">APPLICANT NUMBER</label>
          <input
            type="text"
            :class="file.applicantNumber.$error ? 'is-invalid' : ''"
            class="form-control"
            v-model="file.applicantNumber.$model"
          />
          <FormErrorMessage
            :vData="file.applicantNumber"
            v-if="file.applicantNumber.$error"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">ASSIGNED TO</label>
          <input
            type="text"
            :class="file.assignedTo.$error ? 'is-invalid' : ''"
            class="form-control"
            v-model="file.assignedTo.$model"
          />
          <FormErrorMessage
            :vData="file.assignedTo"
            v-if="file.assignedTo.$error"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">QRT</label>
          <input
            type="text"
            :class="file.qrt.$error ? 'is-invalid' : ''"
            class="form-control"
            v-model="file.qrt.$model"
          />
          <FormErrorMessage :vData="file.qrt" v-if="file.qrt.$error" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">RECORDS DATE</label>
          <input
            type="text"
            :class="file.recordsDate.$error ? 'is-invalid' : ''"
            class="form-control form-date-picker"
            data-name="recordsDate"
            :value="file.recordsDate.$model"
            readonly="true"
          />
          <FormErrorMessage
            :vData="file.recordsDate"
            v-if="file.recordsDate.$error"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">CHAIR DATE</label>
          <input
            type="text"
            :class="file.chairDate.$error ? 'is-invalid' : ''"
            class="form-control form-date-picker"
            data-name="chairDate"
            :value="file.chairDate.$model"
            readonly="true"
          />
          <FormErrorMessage
            :vData="file.chairDate"
            v-if="file.chairDate.$error"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">ENDORSE DATE</label>
          <input
            type="text"
            :class="file.endorseDate.$error ? 'is-invalid' : ''"
            class="form-control form-date-picker"
            data-name="endorseDate"
            :value="file.endorseDate.$model"
            readonly="true"
          />
          <FormErrorMessage
            :vData="file.endorseDate"
            v-if="file.endorseDate.$error"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">REQUEST DATE</label>
          <input
            type="text"
            :class="file.requestDate.$error ? 'is-invalid' : ''"
            class="form-control form-date-picker"
            data-name="requestDate"
            :value="file.requestDate.$model"
            readonly="true"
          />
          <FormErrorMessage
            :vData="file.requestDate"
            v-if="file.requestDate.$error"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">NOTICE DATE</label>
          <input
            type="text"
            :class="file.noticeDate.$error ? 'is-invalid' : ''"
            class="form-control form-date-picker"
            data-name="noticeDate"
            :value="file.noticeDate.$model"
            readonly="true"
          />
          <FormErrorMessage
            :vData="file.noticeDate"
            v-if="file.noticeDate.$error"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">DRAFT DATE</label>
          <input
            type="text"
            :class="file.draftDate.$error ? 'is-invalid' : ''"
            class="form-control form-date-picker"
            data-name="draftDate"
            :value="file.draftDate.$model"
            readonly="true"
          />
          <FormErrorMessage
            :vData="file.draftDate"
            v-if="file.draftDate.$error"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">FINALIZE DATE</label>
          <input
            type="text"
            :class="file.finalizeDate.$error ? 'is-invalid' : ''"
            class="form-control form-date-picker"
            data-name="finalizeDate"
            :value="file.finalizeDate.$model"
            readonly="true"
          />
          <FormErrorMessage
            :vData="file.finalizeDate"
            v-if="file.finalizeDate.$error"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">ISSUE DATE</label>
          <input
            type="text"
            :class="file.issueDate.$error ? 'is-invalid' : ''"
            class="form-control form-date-picker"
            data-name="issueDate"
            :value="file.issueDate.$model"
            readonly="true"
          />
          <FormErrorMessage
            :vData="file.issueDate"
            v-if="file.issueDate.$error"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label"
            >ADDITIONAL INFORMATION REQUEST DATE</label
          >
          <input
            type="text"
            :class="file.additionalInfoRequestDate.$error ? 'is-invalid' : ''"
            class="form-control form-date-picker"
            data-name="additionalInfoRequestDate"
            :value="file.additionalInfoRequestDate.$model"
            readonly="true"
          />
          <FormErrorMessage
            :vData="file.additionalInfoRequestDate"
            v-if="file.additionalInfoRequestDate.$error"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label"
            >ADDITIONAL INFORMATION SUBMISSION DATE</label
          >
          <input
            type="text"
            :class="
              file.additionalInfoSubmissionDate.$error ? 'is-invalid' : ''
            "
            class="form-control form-date-picker"
            data-name="additionalInfoSubmissionDate"
            :value="file.additionalInfoSubmissionDate.$model"
            readonly="true"
          />
          <FormErrorMessage
            :vData="file.additionalInfoSubmissionDate"
            v-if="file.additionalInfoSubmissionDate.$error"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">DROP DATE</label>
          <input
            type="text"
            :class="file.dropDate.$error ? 'is-invalid' : ''"
            class="form-control form-date-picker"
            data-name="dropDate"
            :value="file.dropDate.$model"
            readonly="true"
          />
          <FormErrorMessage
            :vData="file.dropDate"
            v-if="file.dropDate.$error"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">REMARKS</label>
          <textarea
            type="text"
            :class="file.remarks.$error ? 'is-invalid' : ''"
            class="form-control"
            rows="4"
            v-model="file.remarks.$model"
          />
          <FormErrorMessage :vData="file.remarks" v-if="file.remarks.$error" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import filesize from "filesize";

export default {
  props: ["file", "name", "size"],

  data() {
    return {
      datepicker: null,
    };
  },

  watch: {
    file: {
      deep: true,
      handler() {
        console.log(this.validation);
      },
    },
  },

  methods: {
    getFileSize(size) {
      return filesize(size);
    },
  },

  mounted() {
    const vm = this;
    this.datepicker = $(".form-date-picker")
      .datepicker({
        language: "en",
        dateFormat: "MM d, yyyy",
        position: "top right",
        clearButton: true,
        autoClose: true,
        toggleSelected: false,
        onSelect(formattedDate, date, inst) {
          const key = $(inst.$el).data("name");
          vm.file[key].$model = formattedDate;
          // vm.file[key].$touch();
        },
      })
      .data("datepicker");
  },

  destroyed() {
    if (this.datepicker != null) {
      this.datepicker.destroy();
      this.datepicker = null;
    }
  },
};
</script>

<style></style>
