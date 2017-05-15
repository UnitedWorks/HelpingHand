import { store } from "rfx-core";

import AppState from "./AppState";
import UserState from "./UserState";
import QuestState from "./QuestState";

export default store.setup({
	appState: AppState,
	userState: UserState,
	questState: QuestState,
});
