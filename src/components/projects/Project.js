class Project {
    constructor(title, series, code = "") {
        if (!code) {
            let titleParts = title.split(" ").filter(p => p.toLowerCase() !== "the");
            this.code = titleParts.map(p => p[0]).join("").toUpperCase();
        } else {
            this.code = code;
        }
        this.title = title;
        this.series_title = series;
        this.goal = 100000;
    }

    setGoal(goal) {
        this.goal = goal;
    }
}