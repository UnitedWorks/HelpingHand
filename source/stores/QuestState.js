import { observable, action } from "mobx";
import axios from 'axios';

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

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
    this.quests = shuffle(data);
  }

  @action setSingle(data) {
    this.quest = data;
  }

  @action clearItems() {
    this.quests = [];
    this.quest = {};
  }
}
