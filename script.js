const nodeRoot = document.getElementsByClassName("noderoot")[0];
const menuRoot = document.getElementById("files");
const saveButton = document.getElementById("saveButton");
const menuDiv = document.getElementsByClassName("menu")[0];

const homePage = `
<h1 class="editable title">📓 Notes</h1>
<p class="editable">📌 Support HTML Tags.</p>
<p class="editable">📌 Support CODE Tag.</p>
<p class="editable">📌 Support Align Text with /align 'align'</p>
<p class="editable">📌 100% Javascript Vanilla.</p>
<p class="editable">📌 I don't know what to put here.</p>
`

const newPage = `
<h1 class="editable title" contenteditable="true">📓 Page Title Here</h1>
`

const moveSidebar = () =>
{
    menuDiv.style.display = (menuDiv.style.display == "flex") ? 'none' : 'flex';
}

const saveFile = (file) => localStorage.setItem(`@${file}`, nodeRoot.innerHTML);
const saveMenu = () => localStorage.setItem("@Menu", menuRoot.innerHTML);

const loadMenu = () =>
{ 
    menuRoot.innerHTML = localStorage.getItem("@Menu") || menuRoot.innerHTML;
}

const loadFile = (file) =>
{
    saveButton.setAttribute('onclick', `saveFile('${file}')`);
    nodeRoot.innerHTML = localStorage.getItem(`@${file}`) || homePage;
}

const createMenu = () =>
{
    const uid = Date.now().toString(36) + Math.random().toString(36).substr(2);

    const li = document.createElement('li');
    const a = document.createElement('a');

    a.setAttribute("contenteditable", "true");
    a.setAttribute("href", "#");
    a.setAttribute("id", uid);
    a.setAttribute("onclick", `loadFile('${uid}')`);

    a.textContent = "New Menu";
    localStorage.setItem(`@${uid}`, newPage);

    li.appendChild(a);
    menuRoot.appendChild(li);

    localStorage.setItem("@Menu", menuRoot.innerHTML);
}

const createNewElement = (tag, align) =>
{
    const element = document.createElement(tag);
    element.setAttribute("contenteditable", "true");
    element.setAttribute("class", "editable");
    element.style.textAlign = align;
          
    nodeRoot.appendChild(element);
    element.focus();
    return element;
}

const verifyCommand = (input) =>
{
    const [ tag, action ] = input.textContent.split("/")[1].split(" ");

    switch (tag) 
    {
        case "h1":          /* FALLTHROUGH */
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
        case "strong":
        case "em":
        case "p":
        case "small":
        case "a":
        case "label":
            const styles = input.style.textAlign;
            input.remove();
            createNewElement(tag, styles);
        break;
        case "code":
            input.remove();
            const code = createNewElement(tag, "left");
            code.setAttribute("spellcheck", "false");
        break;
        case "align":
            input.style.textAlign = action;
            input.textContent = "";
        break;
    
        default:
        break;
    }
}

window.onload = () => { loadFile(); loadMenu(); };

document.addEventListener('keypress', (event) =>
{
    if (event.key === 'Enter')
    {
        const input = nodeRoot.querySelector(":focus") || document.activeElement;
        
        //if (input.tagName == "A") { saveMenu(); } 
        //else { verifyCommand(input); }

        input.tagName == "A" ? saveMenu() : verifyCommand(input);
    }
});