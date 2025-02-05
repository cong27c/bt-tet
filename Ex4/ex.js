const descriptions = {
    1: "Bạn là người độc lập, mạnh mẽ và có khả năng lãnh đạo. Bạn có tư duy sáng tạo và luôn tìm cách đạt được mục tiêu của mình.",
    2: "Bạn là người hòa đồng, nhạy bén và biết lắng nghe. Bạn rất giỏi trong việc xây dựng mối quan hệ và hợp tác.",
    3: "Bạn sáng tạo, lạc quan và luôn tràn đầy năng lượng. Bạn có khả năng giao tiếp tốt và dễ dàng làm quen với mọi người.",
    4: "Bạn là người thực tế, có tổ chức và làm việc chăm chỉ. Bạn có khả năng xây dựng nền tảng vững chắc trong công việc và cuộc sống.",
    5: "Bạn thích tự do, thích khám phá và là người thích mạo hiểm. Bạn có thể đối mặt với thử thách và luôn tìm kiếm sự thay đổi.",
    6: "Bạn quan tâm đến gia đình, yêu thương và chăm sóc người khác. Bạn là người sống trách nhiệm và luôn quan tâm đến những người thân yêu.",
    7: "Bạn là người thích suy ngẫm, nghiên cứu và khám phá. Bạn có khả năng phân tích và thích sự yên tĩnh.",
    8: "Bạn là người kiên trì, có tham vọng và luôn nỗ lực hết mình. Bạn có sức mạnh và khả năng lãnh đạo trong mọi lĩnh vực.",
    9: "Bạn là người có tấm lòng nhân ái, giúp đỡ và quan tâm đến người khác. Bạn có tính cách giàu tình cảm và thích giúp đỡ cộng đồng.",
  };

  
function handleLifePathNumber() {
    const container = document.createElement("div")
    container.className = "container"

    const title = document.createElement("h1")
    title.className = "title"
    title.textContent = "Ứng dụng thần số học"

    const content = document.createElement("div")
    content.className = "content"

    const date = document.createElement("p")
    date.className = "date"
    date.textContent = "Nhập ngày sinh của bạn:"

    const todoForm = document.createElement("form")
    todoForm.className = "todo-form"

    const todoInput = document.createElement("input")
    todoInput.className = "input"
    todoInput.id = "todo-input"
    todoInput.type = "date"

    const btn = document.createElement("button")
    btn.className = "btn"
    btn.textContent = "Tính số chủ đạo"

    const subTitle = document.createElement("h2")
    subTitle.className = "sub-title"

    const desc = document.createElement("p")
    desc.className = "desc"

    todoForm.append(todoInput, btn)
    content.append(date,todoForm)
    container.append(title, content, subTitle, desc)
    document.body.appendChild(container)
    
    todoForm.onsubmit = function(e) {
        e.preventDefault()
        const todoInput = document.querySelector("#todo-input")
        const value = todoInput.value
        const arr = value.split("-").join("").split("")
        
        if (!value) {
            alert("Vui lòng nhập ngày tháng năm sinh.");
            return;
        }
    

        let total = arr.reduce((acc,num) => +acc + +num)
        while (total >= 10) {
            total = total.toString().split("").reduce((acc, num) => +acc + +num, 0)
        }
        const LifePathNumber = total
        
        const subTitle = document.querySelector(".sub-title")
        subTitle.textContent = `Số chủ đạo của bạn là ${LifePathNumber}`

        const desc = document.querySelector(".desc")
        desc.textContent = descriptions[LifePathNumber]
        todoInput.value = ""
        
    }
  
}
handleLifePathNumber()