import { Component, OnInit, Input } from '@angular/core';
import { ProductBean } from '../../../_model/ProductBean';
import { CategoryProductBean } from '../../../_model/CategoryProductBean';
import { MatDialog } from '@angular/material/dialog';
import { DialogAgregarCarritoComponent } from '../dialog-agregar-carrito/dialog-agregar-carrito.component';
import { CarritoComponent } from '../carrito/carrito.component';
@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {

  imagen = '../../../../assets/images/plato1.png';

  categoria1: CategoryProductBean = {id: 1, name: 'combo', description: 'descripcion 1', pathPhoto: '', _foto: null, _isFoto:null,
    createDate: null, userCreateId: 1, organizationId: 1, sucursalId: 1, };

  platillos: ProductBean[] = [
    {id: 1, name: 'Producto 1', description: 'descripcion 1', categoryProduct: null, _foto: null, _isFoto:null,createDate: null, userCreateId: 1, organizationId: 1, sucursalId: 1},
    {id: 2, name: 'Producto 2', description: 'descripcion 2', categoryProduct: null,_foto: null, _isFoto:null,createDate: null, userCreateId: 1, organizationId: 1, sucursalId: 1},
    {id: 3, name: 'Producto 3', description: 'descripcion 3', categoryProduct: null,_foto: null, _isFoto:null,createDate: null, userCreateId: 1, organizationId: 1, sucursalId: 1},
    {id: 4, name: 'Producto 4', description: 'descripcion 4', categoryProduct: null,_foto: null, _isFoto:null,createDate: null, userCreateId: 1, organizationId: 1, sucursalId: 1},
    {id: 5, name: 'Producto 5', description: 'descripcion 5', categoryProduct: null,_foto: null, _isFoto:null,createDate: null, userCreateId: 1, organizationId: 1, sucursalId: 1},
    {id: 6, name: 'Producto 6', description: 'descripcion 6', categoryProduct: null,_foto: null, _isFoto:null,createDate: null, userCreateId: 1, organizationId: 1, sucursalId: 1},
    {id: 7, name: 'Producto 7', description: 'descripcion 7', categoryProduct: null,_foto: null, _isFoto:null,createDate: null, userCreateId: 1, organizationId: 1, sucursalId: 1}
  ];

  panelOpenState = false;

  carrito: ProductBean[] = [];

  constructor(public dialogo: MatDialog) { }

  ngOnInit(): void {
  }

  agregarCarrito(item) {
    this.dialogo
      .open(DialogAgregarCarritoComponent, {
        data: `¿Desea agregar al carrito?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.carrito.push(item);
        } else {
        }
      });
  }
  verCarrito() {
    this.dialogo
      .open(CarritoComponent, {
        data: this.carrito, height: 'auto', width: 'auto'
      });
  }


 /* mostrarDialogo(): void {
    this.dialogo
      .open(DialogAgregarCarritoComponent, {
        data: `¿Desea agregar al carrito?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.carrito.push(item);
        } else {
        }
      });
  }*/
}



