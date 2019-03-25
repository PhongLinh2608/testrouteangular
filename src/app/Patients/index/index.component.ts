import { Component, OnInit } from '@angular/core';
import {PatientService} from 'src/app/shared/patient.service';
import {Patient} from 'src/app/shared/patient.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-index',
  providers: [PatientService],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  patientList: any;
  constructor(private patientService: PatientService, private toastr: ToastrService) { }

  ngOnInit() {
    this.patientService.getPatientList();
  }
  onDelete(id: number) {
    if (confirm('Are you sure to delete this Patient ?') === true) {
      this.patientService.deletePatient(id)
      .subscribe(x => {
        this.patientService.getPatientList();
       /*  this.toastr.warning('Deleted Successfully', 'Employee Register'); */
        alert('Delete success');
      });
    }
  }

}
