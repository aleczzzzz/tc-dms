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
          <select
            :ref="`form-select-${formKey}`"
            data-style="btn-outline-primary"
            data-size="10"
            data-width="100%"
            v-model="file.rullingType.$model"
          >
            <option value="AR">AR</option>
            <option value="DR">DR</option>
          </select>
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
            :class="{
              [`form-datepicker-${formKey}`]: true,
              'is-invalid': file.recordsDate.$error,
            }"
            class="form-control"
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
            :class="{
              [`form-datepicker-${formKey}`]: true,
              'is-invalid': file.chairDate.$error,
            }"
            class="form-control"
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
            :class="{
              [`form-datepicker-${formKey}`]: true,
              'is-invalid': file.endorseDate.$error,
            }"
            class="form-control"
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
            :class="{
              [`form-datepicker-${formKey}`]: true,
              'is-invalid': file.requestDate.$error,
            }"
            class="form-control"
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
            :class="{
              [`form-datepicker-${formKey}`]: true,
              'is-invalid': file.noticeDate.$error,
            }"
            class="form-control"
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
            :class="{
              [`form-datepicker-${formKey}`]: true,
              'is-invalid': file.draftDate.$error,
            }"
            class="form-control"
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
            :class="{
              [`form-datepicker-${formKey}`]: true,
              'is-invalid': file.finalizeDate.$error,
            }"
            class="form-control"
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
            :class="{
              [`form-datepicker-${formKey}`]: true,
              'is-invalid': file.issueDate.$error,
            }"
            class="form-control"
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
            :class="{
              [`form-datepicker-${formKey}`]: true,
              'is-invalid': file.additionalInfoRequestDate.$error,
            }"
            class="form-control"
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
            :class="{
              [`form-datepicker-${formKey}`]: true,
              'is-invalid': file.additionalInfoSubmissionDate.$error,
            }"
            class="form-control"
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
            :class="{
              [`form-datepicker-${formKey}`]: true,
              'is-invalid': file.dropDate.$error,
            }"
            class="form-control"
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
  props: ["file", "name", "size", "formKey"],

  data() {
    return {
      datepicker: null,
    };
  },

  methods: {
    getFileSize(size) {
      return filesize(size);
    },
  },

  mounted() {
    const vm = this;
    $(this.$refs[`form-select-${this.formKey}`]).selectpicker();

    this.datepicker = $(`.form-datepicker-${this.formKey}`)
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
