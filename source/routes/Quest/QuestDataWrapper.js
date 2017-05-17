import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Redirect } from "react-router-dom";

export default function QuestDataWrapper(Component) {
	@inject("store")
	@observer
	class DataFetcher extends Component {
		constructor(props) {
			super(props);
			this.store = this.props.store.questState;
		}

		componentDidMount() {
			let id = this.props.match.params.id ? this.props.match.params.id : null;
			this.store.fetchData(id);
		}

		componentWillUnmount() {
			this.store.clearItems();
		}

		render() {
			return <Component {...this.props} />;
		}
	}
	return DataFetcher;
}
