const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)



/* <div class="modal-backdrop show">
      <div class="modal-container">
        <button class="modal-close">&times;</button>
        <div class="modal-content">
          <p>Lorem</p>
        </div>
      </div>
    </div> */
function Modal() {
    
    this.openModal = (option = {}) => {
        const $ = document.querySelector.bind(document)
        const $$ = document.querySelectorAll.bind(document)
        const { templateId } = option
        const template = $(`#${templateId}`)

        if(!template) return console.error(`#${templateId} does not exist`);
        
        const content = template.content.cloneNode(true)

        const backdrop = document.createElement("div")
        backdrop.className = "modal-backdrop"

        const container = document.createElement("div")
        container.className = "modal-container"

        const btnClose = document.createElement("div")
        btnClose.className = "modal-close"
        btnClose.innerHTML = "&times;"

        const modalContent = document.createElement("div")
        modalContent.className = "modal-content"

        modalContent.append(content)
        container.append(btnClose, modalContent)
        backdrop.appendChild(container)
        document.body.appendChild(backdrop)

        setTimeout(() => {
            backdrop.classList.add("show")
        },0)

       
        btnClose.onclick = () =>  this.closeModal(backdrop)
        backdrop.onclick = (e) => {
            if(e.target === backdrop) {
                this.closeModal(backdrop)
            }
        }
        document.onkeydown = (e) => {
            if(e.key === "Escape") {
                this.closeModal(backdrop)
            }
        }
    }
     this.closeModal = (elementNode) => {
        elementNode.classList.remove("show")
        elementNode.addEventListener("transitionend", (e) => {
            elementNode.remove()
        })
    }
}

const modal = new Modal()


$("#btn-1").onclick = () => {
    modal.openModal({
        templateId: "modal-1"
    })
}
$("#btn-2").onclick = () => {
    modal.openModal({
        templateId: "modal-1"
    })
}
$("#btn-3").onclick = () => {
    modal.openModal("<h1>Xin chao 3</h1>")
}
$("#btn-4").onclick = () => {
    modal.openModal("<h1>Xin chao 4</h1>")
}

$$(".modal")