import * as React from "react";
import { MineNode } from "../domain";

export const MineSquare = (props: MineProps) => {
    const mineNode = props.mineNode
    return (
        <button className='mine-button'
                tabIndex={props.index}
                onMouseDown={e => props.onMouseDown(e, mineNode)}
        >
            {renderContent(props.mineNode)}
        </button>
    );
};

function renderContent(mineNode: MineNode) {
    if (mineNode.opened) {
        if (mineNode.mineIndicator > 0) {
            return (<span className={`bombs-${mineNode.mineIndicator}`}>{mineNode.mineIndicator}</span>);
        } else if (mineNode.mineIndicator == 0) {
            return ''
        } else {
            return (<i className='fas fa-xs fa-bomb bomb'/>);
        }
    } else {
        if (mineNode.flagged) {
            return (<i className='fas fa-xs fa-flag'/>);
        } else {
            return '';
        }
    }
}

export interface MineProps {
    index: number;
    mineNode: MineNode,
    onMouseDown: (e: React.MouseEvent, mineNode:MineNode) => void;
}
