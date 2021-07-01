<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card-wrapper">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-control-label">USERNAME</label>
                  <input
                    type="text"
                    class="form-control"
                    readonly
                    :value="session.user.username"
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-control-label">ROLE</label>
                  <input
                    type="text"
                    class="form-control"
                    readonly
                    :value="session.role.role"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-control-label">NAME</label>
                  <input
                    type="text"
                    class="form-control"
                    readonly
                    :value="session.user.fullName"
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-control-label">EMAIL</label>
                  <input
                    type="text"
                    class="form-control"
                    readonly
                    :value="session.user.email"
                  />
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
import { mapGetters } from "vuex";

export default {
  layout: "dashboard",

  meta: {
    module: 300,
  },

  computed: {
    ...mapGetters({
      session: "auth/getSession",
    }),
  },
};
</script>
