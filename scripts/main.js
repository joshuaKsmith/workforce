import { GetEmployees } from './employees.js'

const container = document.querySelector("#container")

const render = async () => {
    const employeesHTML = await GetEmployees()

    container.innerHTML = `
        <h1>Workforce</h1>
        <article class="employees">
            <h2>Employees</h2>
            ${employeesHTML}
        </article>
    `
}

render()