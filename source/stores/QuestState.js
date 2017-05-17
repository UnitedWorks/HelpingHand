import { observable, action } from "mobx";
import axios from 'axios';

export default class QuestState {
  @observable quests;
  @observable quest;

  constructor() {
    this.quests = [];
    this.quest = {};
  }

  async fetchData(id) {
    const params = {};
    if (id) params.id = id;
    let { data } = await axios.get('quests', { params });
    data.quests ? this.setData(data.quests) : this.setSingle(data.quest);
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
