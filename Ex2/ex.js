const slidesData = [
    {
        image: "https://picsum.photos/id/25/800/400",
        title: "Slide 1",
    },
    {
        image: "https://picsum.photos/id/27/800/400",
        title: "Slide 2",
    },
    {
        image: "https://picsum.photos/id/28/800/400",
        title: "Slide 3",
    },
    {
        image: "https://picsum.photos/id/29/800/400",
        title: "Slide 4",
    },
]

function createSlideShow() {
    const slideShow = document.createElement("div")
    slideShow.className = "slide-show"

    const listImages = document.createElement("div")
    listImages.className = "list-images"

    const title = document.createElement("h2")
    title.className = "slide-title"
    title.innerText = slidesData[0].title 
    
    const dotList = document.createElement("div")
    dotList.className = "dots"

    slidesData.forEach( (item, index) => {
        const imgs = document.createElement("img")
        imgs.src = item.image
        const dot = document.createElement("div")
        dot.className = "dot"
        dot.dataset.index = index
        

        dotList.appendChild(dot)
        listImages.appendChild(imgs)
    })

    const btns = document.createElement("div")
    btns.className = 'btns'
    const prev = document.createElement("div")
    prev.className = 'prev btn'
    prev.innerHTML = "&#8592"
    const next = document.createElement("div")
    next.className = "next btn"
    next.innerHTML = "&#8594"

    btns.append(prev, next)
    slideShow.append(listImages, title, btns, dotList)
    document.body.appendChild(slideShow)

    const imgs = document.getElementsByTagName("img")
    const length = imgs.length
    let current = 0
    let handleInterval = setInterval(handle, 3000)

    
        function updateDots() {
            const dots = document.querySelectorAll(".dot")
            dots.forEach(dot => {
                dot.classList.remove("active")
            })
            dots[current].classList.add("active")
        }
        updateDots()


    function handle() {
        if (current == length - 1) {
            current = 0
            listImages.style.transform = `translateX(0px)`
        } else {
            current++
            let width = imgs[0].offsetWidth
            listImages.style.transform = `translateX(${width * -1 * current}px)`
        }

        title.innerText = slidesData[current].title
        updateDots()
    }

    next.addEventListener("click", function () {
        clearInterval(handleInterval)
        handle()
        handleInterval = setInterval(handle, 3000)
    })

    prev.addEventListener("click", function () {
        clearInterval(handleInterval)
        if (current == 0) {
            current = length - 1
            let width = imgs[0].offsetWidth
            listImages.style.transform = `translateX(${width * -1 * current}px)`
        } else {
            current--
            let width = imgs[0].offsetWidth
            listImages.style.transform = `translateX(${width * -1 * current}px)`
        }

        title.innerText = slidesData[current].title
        updateDots()
        handleInterval = setInterval(handle, 3000)
        
    })
}

createSlideShow()