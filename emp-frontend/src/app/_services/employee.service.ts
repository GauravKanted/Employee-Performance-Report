import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

   uri = 'http://localhost:4000/employee';

  constructor(private http: HttpClient) { }

  addemployee(employee_name, eno, pnd, eod, lnd, tc, rt) {
    const obj = {
      employee_name: employee_name,
      employee_id: eno,
      pnd: pnd,
      eod: eod,
      lnd: lnd,
      tc: tc,
      rt: rt
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Add Employee Done'));
  }

  getEmployees() {
    return this
           .http
           .get(`${this.uri}`);
  }

  editEmployees(id) {
    return this
            .http
            .get(`${this.uri}/edit/${id}`);
    }


  updateEmployee(employee_name, eno, pnd, eod, lnd, tc, rt,id) {
    const obj = {
      employee_name: employee_name,
      employee_id: eno,
      pnd: pnd,
      eod: eod,
      lnd: lnd,
      tc: tc,
      rt: rt
    };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Update Employee Done'));
  }

  deleteEmployee(id) {
    return this
              .http
              .get(`${this.uri}/delete/${id}`);
  }
}
