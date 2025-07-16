

const elements = {
    headerContainer: document.getElementById("headerContainer"),
    headTitle: document.getElementById("headTitle"),
    sunIconBtn: document.getElementById("sunIconBtn"),
    moonIconBtn: document.getElementById("moonIconBtn"),
    extensionsCardsContainer: document.getElementById("extensionsCardsContainer"),
    AllBtn: document.getElementById("allBtn"),
    ActiveBtn: document.getElementById("activeBtn"),
    inactiveBtn: document.getElementById("inactiveBtn"),
    removeExtensionBtn: document.getElementById("removeExtensionBtn"),
    extensionStatusBtn: document.getElementById("extensionStatusBtn"),
};

let extensionData = [];
let currenttheme = "dark";
 

async function loadData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
      extensionData = data.map((extension, index) => {
          return { ...extension, id: index };
      });
      
      init()
      console.log(extensionData)

  } catch (error) {
    console.error('Failed to load data:', error);
  }
}
function renderingcards(CardsType) {
    elements.extensionsCardsContainer.innerHTML = "";
    if (CardsType === "active") {
        extensionData.filter((activeData) => activeData.isActive == true).map((data) => {
            
            elements.extensionsCardsContainer.innerHTML += `
                <div class="card ${currenttheme == "white"? 'whiteTheme': ''}" data-Cardid="${data.id}" >
            <div class="extensionCardDetails ${currenttheme == "white"? 'whiteTheme': ''}">
                <img src="${data.logo}" alt="devlens" class="extensionImage">
                <div class="card-info">
                <h3 class="extentionTitle">${data.name}</h3>
                <p class="extentionDescription">${data.description}</p>
                </div>
            </div>
            <div class="card-action">
                <button class="removeExtensionBtn ${currenttheme == "white"? 'whiteTheme': ''}" id="removeExtensionBtn" onclick="removeCard(${data.id}, 'active')">Remove</button>
                <div class="extensionStatus extensionStatusClicked" id="extensionStatusBtn" onclick="extentionStatusToggle(${data.id}, 'active')"><span></span></div>
            </div>
            </div>
        `
        })
    } else if (CardsType === "inactive") {
        extensionData.filter((activeData) => activeData.isActive == false).map((data) => { 
             elements.extensionsCardsContainer.innerHTML += `
                <div class="card ${currenttheme == "white"? 'whiteTheme': ''}"  data-Cardid="${data.id}"  >
            <div class="extensionCardDetails ${currenttheme == "white"? 'whiteTheme': ''}">
                <img src="${data.logo}" alt="devlens" class="extensionImage">
                <div class="card-info">
                <h3 class="extentionTitle">${data.name}</h3>
                <p class="extentionDescription">${data.description}</p>
                </div>
            </div>
            <div class="card-action">
                <button class="removeExtensionBtn ${currenttheme == "white"? 'whiteTheme': ''}" id="removeExtensionBtn" onclick="removeCard(${data.id}, 'inactive')">Remove</button>
                <div class="extensionStatus" id="extensionStatusBtn" onclick="extentionStatusToggle(${data.id}, 'inactive')"><span></span></div>
            </div>
            </div>
        `
         })
    } else {
        extensionData.map((data) => {
             elements.extensionsCardsContainer.innerHTML += `
                <div class="card ${currenttheme == "white"? 'whiteTheme': ''}" data-Cardid="${data.id}" >
            <div class="extensionCardDetails ${currenttheme == "white"? 'whiteTheme': ''} ">
                <img src="${data.logo}" alt="devlens" class="extensionImage">
                <div class="card-info">
                <h3 class="extentionTitle">${data.name}</h3>
                <p class="extentionDescription">${data.description}</p>
                </div>
            </div>
            <div class="card-action">
                <button class="removeExtensionBtn ${currenttheme == "white"? 'whiteTheme': ''} " id="removeExtensionBtn" onclick="removeCard(${data.id})">Remove</button>
                <div class="extensionStatus ${data.isActive ? "extensionStatusClicked" : ""}" id="extensionStatusBtn" onclick="extentionStatusToggle(${data.id})"><span></span></div>
            </div>
            </div>
        `
         })
    }
}

function removeCard(id, cardtype="all") {
    extensionData = extensionData.filter((extension) => extension.id !== id);
    console.log(cardtype)
    renderingcards(cardtype);

     
}

function extentionStatusToggle(id, cardtype="all") {
    document.querySelectorAll(".card").forEach((card) => {
        if (card.getAttribute("data-Cardid") == id) {
            card.querySelector('.extensionStatus').classList.toggle("extensionStatusClicked");
           extensionData =  extensionData.map((extension) => {
                if (extension.id == id) {
                    return {...extension, isActive: !extension.isActive}
                } else {
                    return extension;
                }
           })
            renderingcards(cardtype)
            /* renderingcards(cardtype); */
        }
    })
}
function changeThemeToDark( ) {
    console.log("dark"); 
    document.body.classList.remove("whiteTheme");
    elements.headerContainer.classList.remove("whiteTheme");
    elements.headTitle.classList.remove("whiteTheme");
    elements.AllBtn.classList.remove("whiteTheme");
    elements.ActiveBtn.classList.remove("whiteTheme");
    elements.inactiveBtn.classList.remove("whiteTheme");
    document.querySelectorAll(".card").forEach((card) => {
        card.classList.remove("whiteTheme")
    });
    document.querySelectorAll(".extensionCardDetails").forEach((card) => {
        card.classList.remove("whiteTheme")
    });
    document.querySelectorAll(".removeExtensionBtn").forEach((card) => {
        card.classList.remove("whiteTheme")
    });


}
function changeThemeToWhite( ) {
    console.log("White"); 
    document.body.classList.add("whiteTheme");
    elements.headerContainer.classList.add("whiteTheme");
    elements.headTitle.classList.add("whiteTheme");
    elements.AllBtn.classList.add("whiteTheme");
    elements.ActiveBtn.classList.add("whiteTheme");
    elements.inactiveBtn.classList.add("whiteTheme");
    document.querySelectorAll(".card").forEach((card) => {
        card.classList.add("whiteTheme")
    });
    document.querySelectorAll(".extensionCardDetails").forEach((card) => {
        card.classList.add("whiteTheme")
    });
    document.querySelectorAll(".removeExtensionBtn").forEach((card) => {
        card.classList.add("whiteTheme")
    });
}


function init() {
    renderingcards("all");
     

    elements.sunIconBtn.addEventListener("click", () => {
        changeThemeToWhite();
        currenttheme = "white";
        elements.sunIconBtn.classList.add("hide");
        elements.moonIconBtn.classList.remove("hide");
    })
    elements.moonIconBtn.addEventListener("click", () => {
        changeThemeToDark();
        currenttheme = "dark";
        
        elements.sunIconBtn.classList.remove("hide");
        elements.moonIconBtn.classList.add("hide");
    })
     
    elements.AllBtn.addEventListener("click", () => {
        renderingcards("all");
        elements.AllBtn.classList.add("clicked");
        elements.ActiveBtn.classList.remove("clicked");
        elements.inactiveBtn.classList.remove("clicked");
    });
    elements.ActiveBtn.addEventListener("click", () => {
        renderingcards("active");
        elements.AllBtn.classList.remove("clicked");
        elements.ActiveBtn.classList.add("clicked");
        elements.inactiveBtn.classList.remove("clicked");
    });
    elements.inactiveBtn.addEventListener("click", () => {
        renderingcards("inactive");
        elements.AllBtn.classList.remove("clicked");
        elements.ActiveBtn.classList.remove("clicked");
        elements.inactiveBtn.classList.add("clicked");
    });

}

loadData();
 
 