import * as React from 'react'
import './App.css'
import { MineField } from './components/MineField'
import { MineNode } from './domain'

export interface AppProps {
}

interface AppState {
    mineNodes: Array<MineNode>
    player: String
}

class App extends React.Component<AppProps, AppState> {
    controlDown = false

    state = {
        mineNodes: [],
        player: ''
    }

    isControlKey(code: string) {
        return code === 'ControlLeft' || code === 'ControlRight'
    }

    componentDidMount() {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
        this.getGridData()
            .then(res => this.setState({ mineNodes: res }))
            .catch(err => console.log(err))
        document.onkeydown = (e: KeyboardEvent) => {
            if (this.isControlKey(e.code)) {
                this.controlDown = true
            }
        }
        document.onkeyup = (e: KeyboardEvent) => {
            if (this.isControlKey(e.code)) {
                this.controlDown = false
            }
        }
    }

    getGridData = async () => {
        const response = await fetch('http://localhost:3100/createGrid')
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message)
        return body
    }

    public async onMineNodeMouseDown(evt: React.MouseEvent, mineNode: MineNode) {
        if ((evt.button === 0 && this.controlDown) || evt.button === 2) {
            this.postMineNodeFlagged(mineNode)
                .then(res => this.setState({ mineNodes: res, player: mineNode.flaggedBy }))
                .catch(err => console.log(err))
        } else {
            this.postMineNodeOpened(mineNode)
                .then(res => this.setState({ mineNodes: res, player: mineNode.openedBy }))
                .catch(err => console.log(err))
        }
    }

    postMineNodeOpened = async (mineNode: MineNode) => {
        mineNode.opened = true
        mineNode.openedBy = this.identifyPlayer()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mineNode: mineNode })
        }
        const response = await fetch('http://localhost:3100/mineNodeOpened', requestOptions)
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message)
        return body
    }

    postMineNodeFlagged = async (mineNode: MineNode) => {
        mineNode.flagged = true
        mineNode.flaggedBy = this.identifyPlayer()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mineNode: mineNode })
        }
        const response = await fetch('http://localhost:3100/mineNodeOpened', requestOptions)
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message)
        return body
    }

    identifyPlayer = () => {
        if (!this.state.player) {
            return 'Player 1'
        }
        return this.state.player === 'Player 1' ? 'Player 2' : this.state.player
    }

    public render() {
        return (
            <div className="game">
                <MineField
                    mineNodes={this.state.mineNodes}
                    onMouseDown={(e: React.MouseEvent, mineNode: MineNode) => this.onMineNodeMouseDown(e, mineNode)}
                />
            </div>
        )
    }
}

export default App
