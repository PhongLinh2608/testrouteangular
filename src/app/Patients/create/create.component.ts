import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {PatientService} from 'src/app/shared/patient.service';
import {ToastrService} from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {Patient} from 'src/app/shared/patient.model';
import {Doctor} from 'src/app/shared/doctor.model';
import {City} from 'src/app/shared/city.model';
import {District} from 'src/app/shared/district.model';
import {Country} from 'src/app/shared/country.model';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [PatientService],
})
export class CreateComponent implements OnInit {
  startDate = new Date(1990, 1, 1, 0, 0);
  selectedPatient = {
      PatientID: null,
      FirstName: '',
      LastName: '',
      Birthday: this.startDate,
      Address: '',
      DistrictID: null,
      DoctorID: null,
  };
  selectCountry: any;
  selectCity: any;
  selectDistrict: any;
  doctorList = this.patientService.doctorList || {};
  countryList = this.patientService.countryList || {};
  districtList: District[];
  constructor(private patientService: PatientService, private toastr: ToastrService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.patientService.getCountryList().then(res => this.countryList = this.patientService.countryList);
    this.patientService.getDoctorList().then(res => this.doctorList = this.patientService.doctorList);
  }
  onSubmit(form: NgForm) {
    this.patientService.postPatient(form.value)
        .subscribe(data => {
          this.toastr.success('New Record Added Succcessfully', 'Patient Added');
          this.router.navigate(['Patients']);
        });
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.selectedPatient = {
      PatientID: null,
      FirstName: '',
      LastName: '',
      Birthday: this.startDate,
      Address: '',
      DistrictID: null,
      DoctorID: null,
    };
  }
  onCountryChange(id: number) {
    this.patientService.getCityList(id);
  }
  onCityChange(id?: number) {
    this.patientService.getDistrict(id).then(res => this.districtList = this.patientService.districtList);
    console.log(this.districtList);
  }
}
