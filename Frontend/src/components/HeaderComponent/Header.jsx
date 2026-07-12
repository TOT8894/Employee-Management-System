import  "./Header.css"
export const Header =()=>{
    return(
        <div className="Header">
            <ul className="Header-ul">
                <li className="Header-ul-li"><a href="Dashboard.html">Dashboard</a></li>
                <li className="Header-ul-li"><a href="Employees.html">Employees</a></li>
                <li className="Header-ul-li"><a href="Departments.html">Departments</a></li>
                <li className="Header-ul-li"><a href="Attendance.html">Attendance</a></li>
                <li className="Header-ul-li"><a href="Leave-Management.html">Leave Management</a></li>
                <li className="Header-ul-li"><a href="Payroll.html">Payroll</a></li>
                <li className="Header-ul-li"><a href="Documents.html">Document</a></li>
                <li className="Header-ul-li"><a href="Settings.html">Settings</a></li>
            </ul>
        </div>
    )
}