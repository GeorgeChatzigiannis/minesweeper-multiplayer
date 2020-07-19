export class MineNode {
    constructor(public x: number,
                public y: number,
                public opened = false,
                public mineIndicator = 0,
                public flagged = false,
                public openedBy: String = '',
    ) {
    }
}
