<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">FILE NAME</label>
          <input
            type="text"
            class="form-control"
            :value="fileActual.file.name"
            readonly
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">FILE SIZE</label>
          <input
            type="text"
            class="form-control"
            :value="getFileSize(fileActual.file.size)"
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
          <label class="form-control-label">RULING TYPE</label>
          <select
            :ref="`form-select-${formKey}`"
            data-style="btn-outline-primary"
            data-size="10"
            data-width="100%"
            v-model="fileActual.rulingType"
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
            class="form-control"
            v-model="fileActual.ahtnCode"
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
            :class="`form-datepicker-${formKey}`"
            class="form-control"
            data-name="recordsDate"
            :value="fileActual.recordsDate"
            readonly="true"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">CHAIR DATE</label>
          <input
            type="text"
            :class="`form-datepicker-${formKey}`"
            class="form-control"
            data-name="chairDate"
            :value="fileActual.chairDate"
            readonly="true"
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
            :class="`form-datepicker-${formKey}`"
            class="form-control"
            data-name="endorseDate"
            :value="fileActual.endorseDate"
            readonly="true"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">REQUEST DATE</label>
          <input
            type="text"
            :class="`form-datepicker-${formKey}`"
            class="form-control"
            data-name="requestDate"
            :value="fileActual.requestDate"
            readonly="true"
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
            :class="`form-datepicker-${formKey}`"
            class="form-control"
            data-name="noticeDate"
            :value="fileActual.noticeDate"
            readonly="true"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">DRAFT DATE</label>
          <input
            type="text"
            :class="`form-datepicker-${formKey}`"
            class="form-control"
            data-name="draftDate"
            :value="fileActual.draftDate"
            readonly="true"
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
            :class="`form-datepicker-${formKey}`"
            class="form-control"
            data-name="finalizeDate"
            :value="fileActual.finalizeDate"
            readonly="true"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">ISSUE DATE</label>
          <input
            type="text"
            :class="`form-datepicker-${formKey}`"
            class="form-control"
            data-name="issueDate"
            :value="fileActual.issueDate"
            readonly="true"
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
            :class="`form-datepicker-${formKey}`"
            class="form-control"
            data-name="additionalInfoRequestDate"
            :value="fileActual.additionalInfoRequestDate"
            readonly="true"
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
            :class="`form-datepicker-${formKey}`"
            class="form-control"
            data-name="additionalInfoSubmissionDate"
            :value="fileActual.additionalInfoSubmissionDate"
            readonly="true"
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
            :class="`form-datepicker-${formKey}`"
            class="form-control form-"
            data-name="dropDate"
            :value="fileActual.dropDate"
            readonly="true"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">REMARKS</label>
          <textarea
            type="text"
            class="form-control"
            rows="4"
            v-model="fileActual.remarks"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import filesize from "filesize";

export default {
  props: ["file", "fileActual", "formKey"],

  data() {
    return {
      datepicker: [],
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

    const dps = $(`.form-datepicker-${this.formKey}`);
    dps.each(function(idx) {
      const dpi = $(this)
        .datepicker({
          language: "en",
          dateFormat: "MM d, yyyy",
          position: "top right",
          clearButton: true,
          autoClose: true,
          toggleSelected: false,
          maxDate: new Date(),
          onSelect(formattedDate, date, inst) {
            const key = $(inst.$el).data("name");
            vm.fileActual[key] = formattedDate;
          },
        })
        .data("datepicker");

      vm.datepicker.push(dpi);
    });
  },

  destroyed() {
    this.datepicker.forEach((dp) => {
      dp.destroy();
    });
    this.datepicker = [];
  },
};
</script>

<style></style>
