import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

interface Beneficiar {
  name: string;
  date: string | Date;
  type: string;
  optional: string;
  relationShip: boolean;
  amount: number;
}

@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.scss']
})
export class BeneficiariesComponent implements OnInit {

  form: FormGroup;

  get beneficiariesArray(): FormArray {
    return this.form.controls['beneficiaries'] as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  addBeneficiar(): void {
    this.beneficiariesArray.push(this.creteBeneficiar());
  }

  removeBeneficiar(beneficiarIndex: number): void {
    if (!(this.beneficiariesArray.value.length === 1)) {
      this.beneficiariesArray.removeAt(beneficiarIndex);
    }
  }

  private createForm(): void {
    this.form = this.fb.group({
      beneficiaries: this.fb.array([this.creteBeneficiar()])
    });
  }

  private creteBeneficiar(): FormGroup {
    return this.fb.group({
      name: [''],
      date: [''],
      type: [''],
      optional: [''],
      relationShip: [''],
      amount: [''],
    });
  }

}
