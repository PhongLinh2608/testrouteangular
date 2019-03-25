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
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-edit',
  providers: [PatientService],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  selectedPatient = this.patientService.selectedPatient || {};
  selectPatientID: any;
  selectCountry: any;
  selectCity: any;
  selectDistrict: any;
  doctorList = this.patientService.doctorList || {};
  countryList = this.patientService.countryList || {};
  districtList: District[];
  constructor(private patientService: PatientService, private toastr: ToastrService, private route: ActivatedRoute,
    private router: Router, private datePipe: DatePipe) { }

  ngOnInit() {
    this.patientService.getCountryList().then(res => this.countryList = this.patientService.countryList);
    this.patientService.getDoctorList().then(res => this.doctorList = this.patientService.doctorList);
    const routeParams = this.route.snapshot.params;
    this.selectPatientID = routeParams.id;
    this.patientService.getPatient(this.selectPatientID).then(res => this.selectedPatient = this.patientService.selectedPatient );
    this.patientService.getDistrictByID(routeParams.id).then(res => this.districtList = [this.patientService.selectedDistrict] );
  }
  onSubmit(form: NgForm) {
    this.patientService.putPatient(form.value.PatientID, form.value)
      .subscribe(data => {
        this.toastr.info('Record Updated Successfully!', 'Employee Register');
        this.router.navigate(['/Patients']);
      });
  }
  backForm(form?: NgForm) {
    if (confirm('Are you sure to leave without saving ?') === true) {
    this.router.navigate(['/Patients']); }
  }
  onCountryChange(id: number) {
    this.patientService.getCityList(id);
  }
  onCityChange(id?: number) {
    this.patientService.getDistrict(id).then(res => this.districtList = this.patientService.districtList);
    console.log(this.districtList);
  }
}
