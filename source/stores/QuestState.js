import { observable, action } from "mobx";
import axios from "axios";

import firebase from '../utils/firebase';

export default class QuestState {
  @observable quests;
  @observable quest;

  constructor() {
    this.quests = [];
    this.quest = {};
  }

  async fetchData(id) {
    // Firebase fetching to do
    console.log(data);
    data.length > 0 ? this.setData(data) : this.setSingle(data);
  }

  @action setData(data) {
    this.quests = data;
  }

  @action setSingle(data) {
    this.quest = data;
  }

  @action clearItems() {
    this.quests = [];
    this.quest = {};
  }
}
