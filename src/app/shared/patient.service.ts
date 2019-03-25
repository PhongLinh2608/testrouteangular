import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Patient} from './patient.model';
import {Doctor} from './doctor.model';
import {City} from './city.model';
import {District} from './district.model';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { Country } from './country.model';

@Injectable()
export class PatientService {
  selectedPatient: Patient;
  patientList: Patient[];
  doctorList: Doctor[];
  countryList: Country[];
  cityList: City[];
  totalCityList: City[];
  districtList: District[];
  selectedDistrict: District;
  private patientUrl = 'http://localhost:49627/api/Patients1';
  private apiUrl = 'http://localhost:49627/api/';
  constructor(private http: Http) { }
  postPatient(emp: Patient) {
    const body = JSON.stringify(emp);
    const headerOptions = new Headers({'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({method : RequestMethod.Post, headers : headerOptions});
    return this.http.post('http://localhost:49627/api/Patients1', body, requestOptions)
    .map(x => x.json());
  }
  putPatient(id, emp) {
    const body = JSON.stringify(emp);
    const headerOptions = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:49627/api/Patients1/' + id,
      body,
      requestOptions).map(res => res.json());
  }

  getPatientList() {
    this.http.get('http://localhost:49627/api/Patients1')
    .map((data: Response) => {
      return data.json() as Patient[];
    }).toPromise().then(x => {
      this.patientList = x;
    });
  }
  getPatient(id: number) {
    /* let selectedPatientList = Patient[1]; */
    return this.http.get('http://localhost:49627/api/Patients1/' + id)
    .map((data: Response) => {
    return data.json() as Patient;
    }).toPromise().then(x => {
       this.selectedPatient = x;
    });
  }
  deletePatient(id: number) {
    return this.http.delete('http://localhost:49627/api/Patients1/' + id).map(res => res.json());
  }
  getDoctorList() {
    return this.http.get(this.apiUrl + 'Doctors')
    .map((data: Response) => {
      return data.json() as Doctor[];
    }).toPromise().then(x => {
      this.doctorList = x;
    });
  }
  getCountryList() {
    return this.http.get(this.apiUrl + 'CountryAPI')
    .map((data: Response) => {
      return data.json() as Country[];
    }).toPromise().then(x => {
      this.countryList = x;
    });
  }
  getCityList(countryID: number) {
    this.http.get(this.apiUrl + 'CityAPI/' + countryID)
    .map((data: Response) => {
      return data.json() as City[];
    }).toPromise().then(x => {
      this.cityList = x;
    });
  }
  getDistrict(cityID: number) {
    return this.http.get(this.apiUrl + 'DistrictAPI/' + cityID)
    .map((data: Response) => {
      return data.json() as District[];
    }).toPromise().then(x => {
      this.districtList = x;
    });
  }
  getDistrictByID(districtID: number) {
    return this.http.get(this.apiUrl + 'DistrictsDetailAPI/' + districtID)
    .map((data: Response) => {
      return data.json() as District;
    }).toPromise().then(x => {
      this.selectedDistrict = x;
    });
  }
}
