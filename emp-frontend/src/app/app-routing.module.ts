import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpAddComponent } from './emp-add/emp-add.component';
import { EmpGetComponent } from './emp-get/emp-get.component';
import { EmpEditComponent } from './emp-edit/emp-edit.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChartComponent } from './chart/chart.component';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
 {
    path: 'employee/create',
    component: EmpAddComponent, canActivate: [AuthGuard]
  },
  { 
    path: 'edit/:id',
    component: EmpEditComponent, canActivate: [AuthGuard]
  },
  { 
  	path: '',
    component: EmpGetComponent, canActivate: [AuthGuard] 
  },
  { 
  	path: 'getChart', 
    component: ChartComponent, canActivate: [AuthGuard] 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
  	path: 'register', 
    component: RegisterComponent 
  },
  { 
    path: 'admin', 
    component: HomeComponent, canActivate: [AuthGuard] 
  },

    // Any other URL redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
