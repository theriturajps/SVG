function toastNotif(message) {
    const toast = document.getElementById('toastNotif');
    toast.innerHTML = `<span>${message}</span>`;
    toast.style.opacity = '1';
    setTimeout(() => {
        toast.style.opacity = '0';
    }, 3000);
}

const renderUI = (target, icons) => {
    target.innerHTML = (`
        <p class="note">Click on the icon to copy its SVG code.</p>
        <input placeholder="Search among ${icons.length} icons..." class="iCIn" id="iCInQu" type="text"/>
        <div id="iCHe"></div>
        <div class="iCCon" id="iCCtr"></div>
    `);
    const input = document.getElementById("iCInQu");
    const iconsContainer = document.getElementById("iCCtr");
    const iconsHeader = document.getElementById("iCHe");

    const showIconResults = (query) => {
        const noQuery = !(typeof query === "string" && (query = query.trim()));
        const filteredIcons = !noQuery ? icons.filter(icon => {
            const nameLowered = icon.code.trim().toLowerCase();
            const queryLowered = query.trim().toLowerCase();
            const nameJoined = nameLowered.replace(/ /g, "");
            const queryJoined = queryLowered.replace(/ /g, "");
            return (
                nameLowered.includes(queryLowered) ||
                nameJoined.includes(queryJoined)
            );
        }) : icons;

        iconsContainer.innerHTML = iconsHeader.innerHTML = "";

        if (filteredIcons.length === 0) {
            iconsHeader.innerHTML = `<p class="note">Nothing to see here...</p>`;
        } else {
            filteredIcons.forEach((icon) => {
                const button = document.createElement("button");
                Object.assign(button, {
                    className: "icon-box",
                    type: "button",
                    innerHTML: (`${icon.svg}<span>${icon.code}</span>`)
                });
                button.dataset.iconName = icon.name;
                button.dataset.iconCode = icon.code;
                button.addEventListener("click", () => {
                    navigator.clipboard.writeText(icon.svg)
                        .then(() => {
                            toastNotif(`Icon SVG Copied to clipboard: ${icon.code}`);
                        })
                        .catch(err => {
                            toastNotif(`Failed to copy! Please reach us.`);
                        });
                });
                iconsContainer.appendChild(button);
            });
        }
    };

    input.addEventListener("input", (e) => {
        showIconResults(e.target.value);
    });

    showIconResults();
};

const onGetIcons = (icons) => {
    if (!icons) {
        return null;
    }
    document.getElementById('exploreButton').textContent = `Explore ${icons.length} SVG Icons`;
    renderUI(document.getElementById("iC"), icons);
};

(async (options) => {
    const icons = await fetch(options.url).then(res => res.ok ? res.json() : null);
    onGetIcons(icons);
})({
    url: "../../data/svg-icons.json"
});

console.log(`
SVG Icon Collection
> This website is managed by %cRitu Raj%c
> For more information, visit the website.
  >> %cInstagram:%c @riturajps
  >> %cWebsite:%c www.riturajps.in
  >> %cTelegram:%c @riturajps
  >> %cTwitter:%c @riturajps
  >> %cEmail:%c owner@patna.eu.org
`, 
'font-weight: bold;', '', 
'font-weight: bold;', '', 
'font-weight: bold;', '', 
'font-weight: bold;', '', 
'font-weight: bold;', '', 
'font-weight: bold;', ''
);
