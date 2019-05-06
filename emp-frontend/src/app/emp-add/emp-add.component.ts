import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../_services/employee.service';

@Component({
  selector: 'app-emp-add',
  templateUrl: './emp-add.component.html',
  styleUrls: ['./emp-add.component.css']
})
export class EmpAddComponent implements OnInit {

  angForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder, private es: EmployeeService) {
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

   addemployee(employee_name, eno, pnd, eod, lnd, tc, rt) {
     this.es.addemployee(employee_name, eno, pnd,eod,lnd,tc,rt);
     this.router.navigate(['/']);
   }

  ngOnInit() {
  }

}
