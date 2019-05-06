import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { EmployeeService } from '../_services/employee.service';


@Component({
  selector: 'app-emp-edit',
  templateUrl: './emp-edit.component.html',
  styleUrls: ['./emp-edit.component.css']
})
export class EmpEditComponent implements OnInit {

  employee: any = {};
  angForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private es: EmployeeService,
    private fb: FormBuilder) {
    this.createForm();
 }

 createForm() {
    this.angForm = this.fb.group({
      employee_name: ['', Validators.required ],
      eno: ['', Validators.required],
      pnd: ['', [Validators.required, Validators.min(0),Validators.max(10)] ],
      eod: ['', [Validators.required, Validators.min(0),Validators.max(10)] ],
      lnd: ['', [Validators.required, Validators.min(0),Validators.max(10)] ],
      tc: ['', [Validators.required, Validators.min(0),Validators.max(10)] ],
      rt: ['', [Validators.required, Validators.min(0),Validators.max(10)] ]
    });
  }

    updateEmployee(employee_name, eno, pnd, eod, lnd, tc, rt,id) {
      this.route.params.subscribe(params => {
      this.es.updateEmployee(employee_name, eno, pnd, eod, lnd, tc, rt, params['id']);
      this.router.navigate(['/']);
	});
	}
	
  ngOnInit() {
    this.route.params.subscribe(params => {
        this.es.editEmployees(params['id']).subscribe(res => {
          this.employee = res;
      });
    });
  }

}

