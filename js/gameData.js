// class GameData {

export class GameData {
    /**
     * Constructor.
     *
     * @return {void}.
     */
    constructor() {
        this.userName = '';
        this.inGame = false;
        this.gameOver = false;
        this.score = 0;
        
        this.levels = [
            {level: '0', name: 'Facil', points: 10, duration: 10, hits: 1},
            {level: '1', name: 'Normal', points: 20, duration: 5, hits: 1},
            {level: '2', name: 'Dificil', points: 30, duration: 2, hits: 1},
        ]
    }

    /**
     * add points to score
     *
     * @return {void}.
     */
    addScore(points) {
        this.score += points;
    }

    /**
     * get level object, by level id
     *
     * @return {void}.
     */
    getLevelByLevel(level) {
        return this.levels.find(lvl => lvl.level === level);
    }

    /**
     * get points of level object, by level id
     *
     * @return {void}.
     */
    getPointsByLevel(level) {
        const foundLevel = this.getLevelByLevel(level);
        return foundLevel ? foundLevel.points : null;
    }

    /**
     * get duration of level object, by level id
     *
     * @return {void}.
     */
    getDurationByLevel(level) {
        const foundLevel = this.getLevelByLevel(level);
        return foundLevel ? foundLevel.duration : null;
    }

}