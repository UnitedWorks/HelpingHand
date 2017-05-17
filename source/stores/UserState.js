import { observable, action } from "mobx";
import axios from "axios";

export default class UserState {
  @observable authenticated;
  @observable authenticating;

  constructor() {
    this.authenticated = false;
    this.authenticating = false;
    this.user = {};
  }

  async fetchData(pathname, id) {
    let { data } = await axios.get(
      `https://jsonplaceholder.typicode.com${pathname}`
    );
    this.setData(data);
  }

  @action setData(data) {
    this.user = data;
  }

  @action authenticate() {
    return new Promise((resolve, reject) => {
      this.authenticating = true;
      setTimeout(() => {
        this.authenticated = !this.authenticated;
        this.authenticating = false;
        resolve(this.authenticated);
      }, 0);
    });
  }
}
