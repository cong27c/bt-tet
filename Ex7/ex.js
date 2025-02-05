
function calculate() {
    const so1 = parseFloat(document.getElementById('so1').value)
    const so2 = parseFloat(document.getElementById('so2').value)
    const operation = document.querySelector('input[name="operation"]:checked')

    let result

    if (operation) {
        switch (operation.value) {
            case '+':
                result = so1 + so2
                break
            case '-':
                result = so1 - so2
                break
            case '*':
                result = so1 * so2
                break
            case '/':
                if (so2 !== 0) {
                    result = so1 / so2
                } else {
                    result = 'Không thể chia cho 0'
                }
                break
            default:
                result = 'Chưa chọn phép toán'
        }
    } 
     document.getElementById('result').textContent = result

       document.getElementById('so1').value = ''
       document.getElementById('so2').value = ''
       const operations = document.querySelectorAll('input[name="operation"]')
       operations.forEach(op => op.checked = false) 
}


document.getElementById('calcForm').addEventListener('submit', function(event) {
    event.preventDefault() 
    calculate() 
})