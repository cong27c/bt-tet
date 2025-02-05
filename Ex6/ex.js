const categories = [
    {
      id: 1,
      name: "Electronics",
      slugs: "electronics",
      children: [
        {
          id: 2,
          name: "Laptops",
          slugs: "laptops",
          children: [
            {
              id: 3,
              name: "Apple",
              slugs: "apple",
            },
            {
              id: 4,
              name: "Dell",
              slugs: "dell",
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
      slugs: "books",
      children: [
        {
          id: 7,
          name: "Fiction",
          slugs: "fiction",
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
//   function flattenCategories(arr, parentId = 0) {
//     if (!Array.isArray(arr)) throw new Error("Mảng không hợp lệ");
//     let flatten = [];
//     for (const item of arr) {
//         flatten.push({id: item.id, name: item.name, parentId});
//         if (item.children && item.children.length > 0) {
//             flatten = flatten.concat(flattenCategories(item.children, item.id));
//         }   
//     }
//     return flatten;
// }  

// let handledArr = flattenCategories(categories)
// console.log(handledArr);

// function nestedArray(arr) {
//     let obj = {}
//     let newArr = []
//     arr.forEach( item => {
//         obj[item.id] = {...item, children: []}
//     })
//     arr.forEach( item => {
//         if(item.parentId === 0) {
//             newArr.push(obj[item.id])
//         } else {
//             obj[item.parentId].children.push(obj[item.id])
//         }
//     })
//     return newArr
// }
// let newArr = nestedArray(handledArr)

function createElementList(items) {
    const ul = document.createElement("ul")
    items.forEach( item => {
        const li = document.createElement('li')
        const link = document.createElement("a")
        link.href = item.slugs ?? item.slug
        link.textContent = item.name
        
        li.appendChild(link)
        ul.appendChild(li)

        if(item.children) {
            if(item.children.length > 0) {
                li.appendChild(createElementList(item.children))
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