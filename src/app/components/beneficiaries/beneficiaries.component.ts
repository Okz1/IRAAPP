import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  public total = 0;
  public form: FormGroup;

  get beneficiariesArray(): FormArray {
    return this.form.controls['beneficiaries'] as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  addBeneficiar(): void {
    this.calcTotal();
    this.beneficiariesArray.push(this.creteBeneficiar());
    console.log(this.beneficiariesArray);
  
  }

  removeBeneficiar(beneficiarIndex: number): void {
    if (!(this.beneficiariesArray.value.length === 1)) {
      this.beneficiariesArray.removeAt(beneficiarIndex);
      this.calcTotal();
    }
  }

  calcTotal(): void {
    // let total;
    this.total = 0;
    this.beneficiariesArray.value.forEach(beneficiar => {
      this.total += beneficiar.amount;
    });
  }

  private createForm(): void {
    this.form = this.fb.group({
      beneficiaries: this.fb.array([this.creteBeneficiar()])
    });
  }

  private creteBeneficiar(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      date: ['', [Validators.required]],
      type: ['', [Validators.required]],
      optional: ['', [Validators.required]],
      relationShip: ['', [Validators.required]],
      amount: [0, [Validators.required]],
    });
  }

}
