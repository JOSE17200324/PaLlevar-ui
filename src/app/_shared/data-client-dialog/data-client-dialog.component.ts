import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderBean } from '../../_model/OrderBean';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CarServiceService } from '../../_service/car-service.service';

@Component({
  selector: 'app-data-client-dialog',
  templateUrl: './data-client-dialog.component.html',
  styleUrls: ['./data-client-dialog.component.scss']
})
export class DataClientDialogComponent implements OnInit {
  order:OrderBean
  form: FormGroup;
  constructor(
    public dialogo: MatDialogRef<DataClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderBean,
    private fb: FormBuilder,
    private carService:CarServiceService,
  ) {
 
   }

   enviarOrden(){
     debugger
    this.order = new OrderBean();
    this.order.address=this.form.value['address'];
    this.order.reference=this.form.value['reference'];
    this.order.phone=this.form.value['phone'];
    this.order.organizationId=this.carService.orderHeader.organizationId;
    this.carService.orderHeader=this.order;
    
    //this.carService.newOrder.next(this.order);
    this.dialogo.close();
  }


  ngOnInit(): void {
    this.form =this.fb.group({
      'address' :  new FormControl(''),
      'reference': new FormControl(''),
      'phone': new FormControl('')        
    });

  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }
 

}
