<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">FILE NAME</label>
          <input
            type="text"
            class="form-control"
            :value="file.originalFileName"
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
            :value="getFileSize(file.size)"
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
            :class="$v.file.tccNumber.$error ? 'is-invalid' : ''"
            class="form-control"
            v-model="$v.file.tccNumber.$model"
          />
          <FormErrorMessage
            :vData="$v.file.tccNumber"
            v-if="$v.file.tccNumber.$error"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">RULING TYPE</label>
          <select
            ref="form-select"
            data-style="btn-outline-primary"
            data-size="10"
            data-width="100%"
            v-model="file.rulingType"
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
            :class="$v.file.nameOfArticle.$error ? 'is-invalid' : ''"
            class="form-control"
            v-model="$v.file.nameOfArticle.$model"
          />
          <FormErrorMessage
            :vData="$v.file.nameOfArticle"
            v-if="$v.file.nameOfArticle.$error"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">AHTN CODE</label>
          <input type="text" class="form-control" v-model="file.ahtnCode" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="form-group">
          <label class="form-control-label">DESCRIPTION OF GOOD</label>
          <textarea
            type="text"
            :class="$v.file.content.$error ? 'is-invalid' : ''"
            class="form-control"
            rows="10"
            v-model="$v.file.content.$model"
          />
          <FormErrorMessage
            :vData="$v.file.content"
            v-if="$v.file.content.$error"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">APPLICANT COMPANY NAME</label>
          <input
            type="text"
            :class="$v.file.applicantCompanyName.$error ? 'is-invalid' : ''"
            class="form-control"
            v-model="$v.file.applicantCompanyName.$model"
          />
          <FormErrorMessage
            :vData="$v.file.applicantCompanyName"
            v-if="$v.file.applicantCompanyName.$error"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">COMPANY REPRESENTATIVE</label>
          <input
            type="text"
            :class="$v.file.applicantName.$error ? 'is-invalid' : ''"
            class="form-control"
            v-model="$v.file.applicantName.$model"
          />
          <FormErrorMessage
            :vData="$v.file.applicantName"
            v-if="$v.file.applicantName.$error"
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
            :class="$v.file.applicantEmail.$error ? 'is-invalid' : ''"
            class="form-control"
            v-model="$v.file.applicantEmail.$model"
          />
          <FormErrorMessage
            :vData="$v.file.applicantEmail"
            v-if="$v.file.applicantEmail.$error"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">CONTACT NUMBER</label>
          <input
            type="text"
            :class="$v.file.applicantNumber.$error ? 'is-invalid' : ''"
            class="form-control"
            v-model="$v.file.applicantNumber.$model"
          />
          <FormErrorMessage
            :vData="$v.file.applicantNumber"
            v-if="$v.file.applicantNumber.$error"
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
            :class="$v.file.assignedTo.$error ? 'is-invalid' : ''"
            class="form-control"
            v-model="$v.file.assignedTo.$model"
          />
          <FormErrorMessage
            :vData="$v.file.assignedTo"
            v-if="$v.file.assignedTo.$error"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">QRT</label>
          <input
            type="text"
            :class="$v.file.qrt.$error ? 'is-invalid' : ''"
            class="form-control"
            v-model="$v.file.qrt.$model"
          />
          <FormErrorMessage :vData="$v.file.qrt" v-if="$v.file.qrt.$error" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">DATE FROM RECORDS</label>
          <input
            type="text"
            class="form-control form-datepicker"
            data-name="recordsDate"
            :value="file.recordsDate"
            readonly="true"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">DATE FROM CHAIR</label>
          <input
            type="text"
            class="form-control form-datepicker"
            data-name="chairDate"
            :value="file.chairDate"
            readonly="true"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">DATE ENDORSED TO TS</label>
          <input
            type="text"
            class="form-control form-datepicker"
            data-name="endorseDate"
            :value="file.endorseDate"
            readonly="true"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">DATE REQUEST (BOC)</label>
          <input
            type="text"
            class="form-control form-datepicker"
            data-name="requestDate"
            :value="file.requestDate"
            readonly="true"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">DATE NSC SENT</label>
          <input
            type="text"
            class="form-control form-datepicker"
            data-name="noticeDate"
            :value="file.noticeDate"
            readonly="true"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">DATE DRAFTED</label>
          <input
            type="text"
            class="form-control form-datepicker"
            data-name="draftDate"
            :value="file.draftDate"
            readonly="true"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">DATE FINALIZED</label>
          <input
            type="text"
            class="form-control form-datepicker"
            data-name="finalizeDate"
            :value="file.finalizeDate"
            readonly="true"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">DATE ISSUED</label>
          <input
            type="text"
            class="form-control form-datepicker"
            data-name="issueDate"
            :value="file.issueDate"
            readonly="true"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label"
            >DATE ADDTL INFO REQUEST</label
          >
          <input
            type="text"
            class="form-control form-datepicker"
            data-name="additionalInfoRequestDate"
            :value="file.additionalInfoRequestDate"
            readonly="true"
          />
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label"
            >DATE ADDTL INFO RECEIVED</label
          >
          <input
            type="text"
            class="form-control form-datepicker"
            data-name="additionalInfoSubmissionDate"
            :value="file.additionalInfoSubmissionDate"
            readonly="true"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label class="form-control-label">DATE DROPPED</label>
          <input
            type="text"
            :class="`form-datepicker`"
            class="form-control form-"
            data-name="dropDate"
            :value="file.dropDate"
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
            v-model="file.remarks"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import filesize from "filesize";
import { required } from "vuelidate/lib/validators";
import moment from "moment";

export default {
  props: ["file"],

  data() {
    return {
      datepicker: [],
    };
  },

  validations: {
    file: {
      tccNumber: {
        required,
      },
      nameOfArticle: {
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
      }
    },
  },

  methods: {
    getFileSize(size) {
      return filesize(size);
    },
  },

  mounted() {
    const vm = this;
    $(this.$refs["form-select"]).selectpicker();

    const dps = $(".form-datepicker");
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
            vm.file[key] = formattedDate;
          },
        })
        .data("datepicker");

      const i = $(this).data("name");
      if(vm.file[i]) dpi.selectDate(moment(vm.file[i], "MMMM D, YYYY").toDate());
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
