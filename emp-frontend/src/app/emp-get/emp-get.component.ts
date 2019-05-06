import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../_services/employee.service';
import { Employee } from '../Employee';


@Component({
  selector: 'app-emp-get',
  templateUrl: './emp-get.component.html',
  styleUrls: ['./emp-get.component.css']
})
export class EmpGetComponent implements OnInit {
  
  employees: Employee[];

  constructor(private route: ActivatedRoute,
    private router: Router, private es: EmployeeService) { 
    this.es
      .getEmployees()
      .subscribe((data: Employee[]) => {
        this.employees = data;
    });
  }


deleteEmployee(id) {
    this.es.deleteEmployee(id).subscribe(res => {
      console.log('Deleted');
      this.es
      .getEmployees()
      .subscribe((data: Employee[]) => {
        this.employees = data;
    });
    });
  }

  ngOnInit() {
  this.es
      .getEmployees()
      .subscribe((data: Employee[]) => {
        this.employees = data;
    });
  }
}
