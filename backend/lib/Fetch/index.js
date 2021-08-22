const Config = use("Config");

class Fetch {
  constructor(q) {
    this.query = q;
  }

  search(fields, search) {
    if (search && search.length > 0) {
      const s = search
        .split(" ")
        .filter((s) => s.trim().length > 0)
        .join("|");

      this.query.where(function () {
        for (const field of fields) {
          this.orWhere(field, "~*", s);
        }
      });
    }

    return this;
  }

  async get(limit, page) {
    let data;

    if (limit && page) data = (await this.query.paginate(page, limit)).toJSON();
    else {
      limit && this.query.limit(limit);

      data = { data: (await this.query.fetch()).toJSON() };
    }

    let ret = {
      status: data.data.length > 0 ? 200 : 404,
      message:
        data.data.length > 0 ? "Successfully fetched data" : "No data found.",
    };

    if (data.data.length > 0) ret = { ...ret, ...data };
    return ret;
  }
}

module.exports = Fetch;
