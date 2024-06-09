

export const PATHS = {
    home: {
        path: "/",
        template: `

            <div class="container">
                <h1>🎮</h1>
            <div class="row">
                <input id="username" class="input-text" type="text" placeholder="Nombre jugador" value="" maxlength="8"/>
            </div>

            <div class="row">
                <button id="btn-go-game" class="button">Empezar</button>
            </div>
            </div>
        `,
    },
    game: {
        path: "/game",
        template: `
            <nav>
                <h1>🙎‍♂️ <span id="username-text"></span></h1>
                <label>Nivel</label>
                <select id="level" class="select">                    
                    <!--<option value="10000">Fácil</option>
                    <option selected value="5000">Normal</option>
                    <option value="2000">Dificil</option>-->
                </select>
            </nav>
            <h3 class="score">Puntuación: <span id="score-data">0</span></h3>
            <h3 id="cnt-timer" class="timer hidden">Tiempo restante: <span id="timer-data"></span></h3>
            
            <h2 id="title-1">Memorice las cartas</h2>

            
            <div class="cnt-numbers">
                <button value="" disabled="disabled" class="number">?</button>
                <button value="" disabled="disabled" class="number">?</button>
                <button value="" disabled="disabled" class="number">?</button>

                <button value="" disabled="disabled" class="number">?</button>
                <button value="" disabled="disabled" class="number">?</button>
                <button value="" disabled="disabled" class="number">?</button>

                <button value="" disabled="disabled" class="number">?</button>
                <button value="" disabled="disabled" class="number">?</button>
                <button value="" disabled="disabled" class="number">?</button>
            </div>

            <div class="cnt-play-game">
                <button id="btn-init-game" class="button" >Jugar</button>
            </div>

        `,
    },

}