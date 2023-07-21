import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from 'src/app/interface/business';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-add-edit-business',
  templateUrl: './add-edit-business.component.html',
  styleUrls: ['./add-edit-business.component.css']
})
export class AddEditBusinessComponent implements OnInit {
  loading: Boolean = false;
  formAdd: FormGroup;
  id: Number;
  operation: String = 'Crear';

  constructor( 
    private fb: FormBuilder,
    private _businessService: BusinessService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute
  ){
    this.formAdd = this.fb.group({
      nit: ['', Validators.required],
      tradeName: ['', Validators.required],
      owner: ['', Validators.required],
      phone: ['', Validators.required],
      city: ['', Validators.required]
    })

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.operation = 'Actualizar'
      this.getBusiness(this.id)
    }
  }
  getBusiness(id: Number) {
    this._businessService.getBusinessById(id).subscribe(data=>{
      this.formAdd.patchValue({
        nit: data.nit,
        tradeName: data.tradeName,
        owner: data.owner,
        phone: data.phone,
        city: data.city
      })
      
    });
  }

  addEditBusiness(){
      const business: Business = {
        nit: this.formAdd.value.nit,
        tradeName: this.formAdd.value.tradeName,
        owner: this.formAdd.value.owner,
        phone: this.formAdd.value.phone,
        city: this.formAdd.value.city
      }
      if (this.id !=0) {
        business.id = this.id;
        this.editBusiness(this.id,business);
      }else{
        this.addBusiness(business);
      }
      
    }

    addBusiness(business: Business){
      this._businessService.createBusiness(business).subscribe(data =>{    
        this.messageSucceeded(data.tradeName,'creado');
        this.router.navigate(['/listBusiness'])
      })
    }

    editBusiness(id: Number, business: Business){
      this._businessService.updateBusiness(id, business).subscribe(() =>{
        this.messageSucceeded('','actualizado');
        this.router.navigate(['/listBusiness'])
      })
    }

    messageSucceeded(tradeName: String, status: String){
      this._snackBar.open(`El Negocio ${tradeName} ha sido ${status} !`, '', {
        duration: 3000,
      });
  }
















}
