

export const GetEmployees = async () => {
    const responseA = await fetch("http://localhost:8088/employees?_expand=computer&_expand=department&_expand=location")
    const employees = await responseA.json()

    /*
    Get all relationships and _expand the customer

    https://github.com/typicode/json-server/tree/v0.17.4#relationships
    */

    const responseB = await fetch("http://localhost:8088/employeeCustomers?_expand=customer&_expand=employee")
    const employeeCustomers = await responseB.json()

    const employeesHTML = `
        ${employees.map((employee) => {
            let html = `
                <div class="employee">
                    <header class="employee__name">
                        <h1>${employee.firstName} ${employee.lastName} - age ${employee.age}</h1>
                    </header>
                    <section class="employee_computer">
                        Currently using a ${employee.computer.year} ${employee.computer.model}
                    </section>
                    <section class="employee__department">
                        Works in the ${employee.department.name} department
                    </section>
                    <section class="employee_location">
                        Works at the ${employee.location.name} office
                    </section>
                    <section class="employee__customers">
                        Has worked for the following customers:
                        <ul>
            `

            //Find all the customer relationships for this employee
            const relationships = employeeCustomers.filter((empCust) => {
                if (empCust.employeeId === employee.id) {
                    return empCust
                }
            })

            //Find the related customer for each relationship
            html += relationships.map((rel) => {
                    return `<li>${rel.customer.name}</li>`
            }).join("")

            html += "</ul></section></div>"

            return html
        }).join("")}
    `
    
    return employeesHTML
}