import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from '../models/employee-dashboard.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData: any = [];
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],
    });
    this.getAllEmployee();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;}

  postEmployeeDetails() {
    this.employeeModelObj.FirstName = this.formValue.value.firstName;
    this.employeeModelObj.LastName = this.formValue.value.lastName;
    this.employeeModelObj.Email = this.formValue.value.email;
    this.employeeModelObj.Mobile = this.formValue.value.mobile;
    this.employeeModelObj.Salary = this.formValue.value.salary;

    this.apiService.postEmployee(this.employeeModelObj).subscribe(
      (res) => {
        this.employeeData.push(res);
        alert('added');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
      },
      (err) => {
        alert('its not good to be like that');
      }
    );
  }
  getAllEmployee() {
    this.apiService.getEmployee().subscribe((res:any) => {
      console.log(res);
      this.employeeData = res;
    });
  }
  deleteEmployee(data: any) {
    this.apiService.deleteEmployee(data.id).subscribe((res: any) => {
      alert('u deleted this one');
      this.getAllEmployee();
    });
  }
  onEdit(data :any){
    this.showUpdate = true;
    this.showAdd = false;
    this.employeeModelObj.Id = data.Id
    this.formValue.controls['firstName'].setValue(data.FirstName);
    this.formValue.controls['lastName'].setValue(data.LastName);
    this.formValue.controls['email'].setValue(data.Email);
    this.formValue.controls['mobile'].setValue(data.Mobile);
    this.formValue.controls['salary'].setValue(data.Salary);
  }
  updateEmployeeDetails(){
    this.employeeModelObj.FirstName = this.formValue.value.firstName;
    this.employeeModelObj.LastName = this.formValue.value.lastName;
    this.employeeModelObj.Email = this.formValue.value.email;
    this.employeeModelObj.Mobile = this.formValue.value.mobile;
    this.employeeModelObj.Salary = this.formValue.value.salary;
    this.apiService.updateEmployee(this.employeeModelObj , this.employeeModelObj.Id).subscribe(
      (res:any)=>{
        alert('updated')
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee
      },
      (err) => {
        alert('theres is the problem with api');
      }
    )

  }
}
