const categories = [
    {
      id: 1,
      name: "Chuyên mục 1",
      parent: 0,
      slug: "chuyen-muc-1",
    },
    {
      id: 2,
      name: "Chuyên mục 2",
      parent: 0,
      slug: "chuyen-muc-2",
    },
    {
      id: 3,
      name: "Chuyên mục 3",
      parent: 0,
      slug: "chuyen-muc-3",
    },
    {
      id: 4,
      name: "Chuyên mục 2.1",
      parent: 2,
      slug: "chuyen-muc-2-1",
    },
    {
      id: 5,
      name: "Chuyên mục 2.2",
      parent: 2,
      slug: "chuyen-muc-2-2",
    },
    {
      id: 6,
      name: "Chuyên mục 2.3",
      parent: 2,
      slug: "chuyen-muc-2-3",
    },
    {
      id: 7,
      name: "Chuyên mục 3.1",
      parent: 3,
      slug: "chuyen-muc-3-1",
    },
    {
      id: 8,
      name: "Chuyên mục 3.2",
      parent: 3,
      slug: "chuyen-muc-3-2",
    },
    {
      id: 9,
      name: "Chuyên mục 3.3",
      parent: 3,
      slug: "chuyen-muc-3-3",
    },
    {
      id: 10,
      name: "Chuyên mục 2.2.1",
      parent: 5,
      slug: "chuyen-muc-2-2-1",
    },
    {
      id: 11,
      name: "Chuyên mục 2.2.2",
      parent: 5,
      slug: "chuyen-muc-2-2-2",
    },
  ];


function handleArrList(arr) {
    let obj = {}
    let newArr = []
    arr.forEach( item => {
        obj[item.id] = {...item, children: []}
    })
    arr.forEach(item => {
        if(item.parent === 0) {
            newArr.push(obj[item.id])
        } else {
            obj[item.parent].children.push(obj[item.id])
        }
    })
    function createMenuElement(items) {
        const ulElement = document.createElement("ul")
        items.forEach( item => {
            const liElement = document.createElement("li")

            const link = document.createElement("a")
            link.textContent = item.name
            link.href = item.slug

            liElement.appendChild(link)
            ulElement.appendChild(liElement)
            

           
            if(item.children.length > 0) {
                liElement.appendChild(createMenuElement(item.children))
            }
        })
        
        return ulElement
    }
    const mainMenuElements = createMenuElement(newArr)
    
    mainMenuElements.className = "menu"
        const ulList = mainMenuElements.getElementsByTagName("ul")
        for(let i = 0; i < ulList.length; i++) {
            ulList[i].className = `sub-menu-${i} sub-menu`
        }
    
    console.log(mainMenuElements.outerHTML);
    document.body.appendChild(mainMenuElements)
}


handleArrList(categories)
