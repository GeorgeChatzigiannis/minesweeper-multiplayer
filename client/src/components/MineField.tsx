import * as React from 'react';
import { MineNode } from "../domain";
import { MineSquare } from "./MineSquare";

export const MineField = (props: MineFieldProps) => (
    <div className="game-board">
        {
            props.mineNodes.map((rows, i) =>
                <div key={i} className="board-row">
                    {
                        rows.map((mineNode, j) =>
                            <MineSquare key={`${mineNode.x}-${mineNode.y}`}
                                        index={mineNode.y}
                                        mineNode={mineNode}
                                        onMouseDown={(e, mineNode) => props.onMouseDown(e, mineNode)}
                            />
                        )
                    }
                </div>
            )
        }
    </div>
);

export interface MineFieldProps {
    mineNodes: Array<Array<MineNode>>,
    onMouseDown: (e: React.MouseEvent, mineNode:MineNode) => void;
}

