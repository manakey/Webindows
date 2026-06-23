const startBtn =
document.getElementById("startBtn");

const startMenu =
document.getElementById("startMenu");

const windowsArea =
document.getElementById("windows");

const openNotepad =
document.getElementById("openNotepad");

const clock =
document.getElementById("clock");

const desktopNotepad =
document.getElementById("desktopNotepad");

const desktopExplorer =
document.getElementById("desktopExplorer");

startBtn.onclick = () => {

    startMenu.style.display =
    startMenu.style.display === "block"
    ? "none"
    : "block";

};

function updateClock(){

    const now = new Date();

    clock.textContent =
    now.toLocaleTimeString(
        "ja-JP",
        {
            hour:"2-digit",
            minute:"2-digit"
        }
    );

}

setInterval(updateClock,1000);
updateClock();

function makeDraggable(win){

    const titlebar =
    win.querySelector(".titlebar");

    let dragging = false;

    let offsetX = 0;
    let offsetY = 0;

    titlebar.addEventListener(
        "mousedown",
        e=>{

            dragging = true;

            offsetX =
            e.clientX -
            win.offsetLeft;

            offsetY =
            e.clientY -
            win.offsetTop;

        }
    );

    document.addEventListener(
        "mousemove",
        e=>{

            if(!dragging) return;

            win.style.left =
            (e.clientX-offsetX)+"px";

            win.style.top =
            (e.clientY-offsetY)+"px";

        }
    );

    document.addEventListener(
        "mouseup",
        ()=>{
            dragging=false;
        }
    );

}

function createNotepad(){

    const win =
    document.createElement("div");

    win.className="window";

    const savedText =
    localStorage.getItem(
        "webindows_notepad"
    ) || "";

    win.innerHTML=`
        <div class="titlebar">

            <span>メモ帳</span>

            <button class="closeBtn">
                ✕
            </button>

        </div>

        <div class="content">

            <textarea
            id="notepadArea"
            placeholder="ここに入力">${savedText}</textarea>

        </div>
    `;

    windowsArea.appendChild(win);

    const closeBtn =
    win.querySelector(".closeBtn");

    closeBtn.onclick=()=>{
        win.remove();
    };

    const textarea =
    win.querySelector(
        "#notepadArea"
    );

    textarea.addEventListener(
        "input",
        ()=>{

            localStorage.setItem(
                "webindows_notepad",
                textarea.value
            );

        }
    );

    makeDraggable(win);

    startMenu.style.display="none";
}

openNotepad.onclick =
createNotepad;

desktopNotepad.onclick =
createNotepad;

desktopExplorer.onclick = ()=>{

    const win =
    document.createElement("div");

    win.className="window";

    win.innerHTML=`
        <div class="titlebar">

            <span>
                エクスプローラー
            </span>

            <button class="closeBtn">
                ✕
            </button>

        </div>

        <div
        class="content"
        style="padding:20px;">

            <h3>Webindows</h3>

            <p>📁 Desktop</p>
            <p>📁 Documents</p>
            <p>📁 Downloads</p>

        </div>
    `;

    windowsArea.appendChild(win);

    win.querySelector(
        ".closeBtn"
    ).onclick = ()=>{
        win.remove();
    };

    makeDraggable(win);
};