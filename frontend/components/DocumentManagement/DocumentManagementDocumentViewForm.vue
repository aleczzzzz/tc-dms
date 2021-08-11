<template>
  <div>
    <div class="col-md-12">
      <button type="button" class="btn btn-danger mb-4" @click="goBack">
        BACK
      </button>
    </div>

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
              :value="file.size"
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
              class="form-control"
              :value="file.tccNumber"
              readonly="true"
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label class="form-control-label">RULING TYPE</label>
            <input
              type="text"
              class="form-control"
              :value="file.rulingType"
              readonly="true"
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
              class="form-control"
              :value="file.nameOfArticle"
              readonly="true"
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label class="form-control-label">AHTN CODE</label>
            <input
              type="text"
              class="form-control"
              :value="file.ahtnCode"
              readonly="true"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label class="form-control-label">DESCRIPTION OF GOOD</label>
            <textarea
              type="text"
              class="form-control"
              rows="10"
              :value="file.content"
              readonly="true"
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
              class="form-control"
              :value="file.applicantCompanyName"
              readonly="true"
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label class="form-control-label">COMPANY REPRESENTATIVE</label>
            <input
              type="text"
              class="form-control"
              :value="file.applicantName"
              readonly="true"
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
              class="form-control"
              :value="file.applicantEmail"
              readonly="true"
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label class="form-control-label">CONTACT NUMBER</label>
            <input
              type="text"
              class="form-control"
              :value="file.applicantNumber"
              readonly="true"
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
              class="form-control"
              :value="file.assignedTo"
              readonly="true"
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label class="form-control-label">QRT</label>
            <input
              type="text"
              class="form-control"
              :value="file.qrt"
              readonly="true"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label class="form-control-label">DATE FROM RECORDS</label>
            <input
              type="text"
              class="form-control"
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
              class="form-control"
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
              class="form-control"
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
              class="form-control"
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
              class="form-control"
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
              class="form-control"
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
              class="form-control"
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
              class="form-control"
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
              >DATE ADDTL INFO REQUEST INFO</label
            >
            <input
              type="text"
              class="form-control"
              :value="file.additionalInfoRequestDate"
              readonly="true"
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label class="form-control-label"
              >DATE ADDTL INFO INFO RECEIVED</label
            >
            <input
              type="text"
              class="form-control"
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
              class="form-control"
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
              :value="file.remarks"
              readonly="true"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label class="form-control-label">BOC DAY COUNT</label>
            <input
              type="text"
              class="form-control"
              :value="file.bocDayCount"
              readonly="true"
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label class="form-control-label">NOSC DAY COUNT</label>
            <input
              type="text"
              class="form-control"
              :value="file.noscDayCount"
              readonly="true"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label class="form-control-label">DRAFT DAY COUNT</label>
            <input
              type="text"
              class="form-control"
              :value="file.draftDayCount"
              readonly="true"
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label class="form-control-label">ISSUE DAY COUNT</label>
            <input
              type="text"
              class="form-control"
              :value="file.finalizeDayCount"
              readonly="true"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label class="form-control-label"
              >ADDITIONAL INFORMATION SUBMITTED DAY COUNT</label
            >
            <input
              type="text"
              class="form-control"
              :value="file.additionalInfoDayCount"
              readonly="true"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label class="form-control-label">ISSUANCE DAY COUNT</label>
            <input
              type="text"
              class="form-control"
              :value="file.issuanceDayCount"
              readonly="true"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import filesize from "filesize";

export default {
  props: ["file"],

  methods: {
    getFileSize(size) {
      return filesize(size);
    },

    goBack() {
      this.$router.push("/DocumentManagement");
    },
  },
};
</script>

<style></style>
