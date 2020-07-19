import * as React from 'react';
import './App.css';
import { MineField } from './components/MineField';
import { MineNode } from "./domain";

export interface AppProps {
}

interface AppState {
    mineNodes: Array<MineNode>
}

class App extends React.Component<AppProps, AppState> {

    state = {
        mineNodes: []
    }

    componentDidMount() {
        this.getGridData()
            .then(res => this.setState({ mineNodes: res }))
            .catch(err => console.log(err));
    }

    getGridData = async () => {
        const response = await fetch('http://localhost:3100/createGrid');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    public async onMineNodeLeftClick(mineNode: MineNode) {
        this.postMineNodeOpened(mineNode)
            .then(res => this.setState({ mineNodes: res }))
            .catch(err => console.log(err));
    }

    postMineNodeOpened = async (mineNode: MineNode) => {
        mineNode.opened = true
        mineNode.openedBy = this.identifyPlayerOpened(mineNode)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mineNode: mineNode })
        };
        const response = await fetch('http://localhost:3100/mineNodeOpened', requestOptions)
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message);
        return body
    }

    identifyPlayerOpened = (mineNode: MineNode) => {
        if (!mineNode.openedBy) {
            return 'Player 1'
        }
        return mineNode.openedBy === 'Player 1' ? 'Player 2' : mineNode.openedBy
    }

    public render() {
        return (
            <div className="game">
                <MineField
                    mineNodes={this.state.mineNodes}
                    onLeftClick={(mineNode: MineNode) => this.onMineNodeLeftClick(mineNode)}
                />
            </div>
        );
    }
}



export default App;
