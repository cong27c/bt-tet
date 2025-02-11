const categories = [
    {
      id: 1,
      name: "Electronics",
      slug: "electronics",
      children: [
        {
          id: 2,
          name: "Laptops",
          slug: "laptops",
          children: [
            {
              id: 3,
              name: "Apple",
              slug: "apple",
            },
            {
              id: 4,
              name: "Dell",
              slug: "dell",
            },
          ],
        },
        {
          id: 5,
          name: "Headphones",
          slug: "headphones",
        },
      ],
    },
    {
      id: 6,
      name: "Books",
      slug: "books",
      children: [
        {
          id: 7,
          name: "Fiction",
          slug: "fiction",
          children: [
            {
              id: 8,
              name: "Thrillers",
              slug: "thrillers",
            },
            {
              id: 9,
              name: "Mystery",
              slug: "mystery",
            },
          ],
        },
        {
          id: 10,
          name: "Non-Fiction",
          slug: "non-fiction",
        },
      ],
    },
  ];

function createElementList(items , baseSlug = "" ) {
  if(!Array.isArray(items) || items.length <= 0) {
    console.error("du lieu ko hp le")
    return
}
    const ul = document.createElement("ul")
    items.forEach( item => {
        const li = document.createElement('li')
        const link = document.createElement("a")
        const currentSlug = baseSlug ? `${baseSlug}/${item.slug}` : item.slug
        link.href = currentSlug
        link.textContent = item.name
        
        li.appendChild(link)
        ul.appendChild(li)

        if(item.children) {
            if(item.children.length > 0) {
                li.appendChild(createElementList(item.children, currentSlug))
            }
        }
    })
    
    return ul
}

const mainMenuElements = createElementList(categories);
mainMenuElements.className = "menu"
const ulList = mainMenuElements.getElementsByTagName("ul")
for(let i = 0; i < ulList.length; i++) {
    ulList[i].className = `sub-menu-${i+1} sub-menu`
}
    
document.addEventListener('DOMContentLoaded', function() {
    document.body.appendChild(mainMenuElements);
});