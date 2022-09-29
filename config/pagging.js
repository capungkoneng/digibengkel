"use strict";

class Pagination {
  constructor(page, perPage, hostName, pathName) {
    this.page = page - 1 || 0;
    this.perPage = parseInt(perPage) || 10;
    this.currentPage = parseInt(page) || 1;
    this.hostName = hostName;
    this.pathName = pathName;
  }

  next(totalData) {
    const next = parseInt(this.page) + 2 || 1 + 1;
    if (this.currentPage == Math.ceil(totalData / this.perPage)) {
      return null;
    } else {
      return (
        "http://" +
        this.hostName +
        "/api/v1" +
        this.pathName +
        "?page=" +
        next +
        "&perPage=" +
        this.perPage
      );
    }
  }

  prev() {
    const prev = this.page;
    if (this.page == 0) {
      return null;
    } else {
      return (
        "http://" +
        this.hostName +
        "/api/v1" +
        this.pathName +
        "?page=" +
        prev +
        "&perPage=" +
        this.perPage
      );
    }
  }
}

module.exports = Pagination;
