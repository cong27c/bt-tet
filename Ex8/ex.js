document.addEventListener("DOMContentLoaded", function () {

    const totalBillInput = document.querySelectorAll('.todo-input')[0]
    const numberOfPeopleInput = document.querySelectorAll('.todo-input')[1]
    const tipInput = document.querySelectorAll('.todo-input')[2]
    const calculateButton = document.querySelector('.btn')
    const resultDesc = document.querySelector('.desc')
    const total = document.querySelector('.total')
  
    calculateButton.addEventListener('click', function () {
        const totalBill = parseFloat(totalBillInput.value)
        const numberOfPeople = parseInt(numberOfPeopleInput.value)
        const tip = (parseFloat(tipInput.value)) ? parseFloat(tipInput.value) : 0
        console.log(tipInput.value);
        if (isNaN(totalBill) || isNaN(numberOfPeople) || numberOfPeople <= 0 || totalBill <= 0 || tip < 0 || totalBill < tip) {
        resultDesc.textContent = "Vui lòng nhập số liệu hợp lệ."
        totalBillInput.value = ''
        numberOfPeopleInput.value = ''
        tipInput.value = ''
        return
        }

    const totalAmount = totalBill + tip
    const amountPerPerson = totalAmount / numberOfPeople

    resultDesc.textContent = `Mỗi người cần trả: ${amountPerPerson.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`
    total.textContent = `Tổng thiệt hại là: ${totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`


    totalBillInput.value = ''
    numberOfPeopleInput.value = ''
    tipInput.value = ''
    })
  })