import { Injectable } from '@angular/core';
import { OrderBean } from '../_model/OrderBean';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderCambio = new Subject<OrderBean[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/Order`; 

  order :OrderBean = new OrderBean();
  constructor(private http: HttpClient,
    private sharedService:SharedService) {
      this.order.sucursalId = this.sharedService.getSucursalIdByUserSession();
      this.order.organizationId = this.sharedService.getOrganizationIdByUserSession();
    }

  getListOrder() {
    return this.http.get<OrderBean[]>(`${this.url}/glo`);
  }
  getListOrderByOrganization() {
    
    return this.http.get<OrderBean[]>(`${this.url}/glpbo/${this.sharedService.getOrganizationIdByUserSession()}`);
  }

  getListOrderAttend() {
    this.order.organizationId = this.sharedService.getOrganizationIdByUserSession();
    return this.http.post<OrderBean[]>(`${this.url}/gloa`,this.order);
  }

  getListOrderPendding() {
    this.order.organizationId = this.sharedService.getOrganizationIdByUserSession();
    return this.http.post<OrderBean[]>(`${this.url}/glop`,this.order);
  }

  getListOrderDelivery() {
    this.order.organizationId = this.sharedService.getOrganizationIdByUserSession();
    return this.http.post<OrderBean[]>(`${this.url}/glody`,this.order);
  }


  getListOrderByUserId() {
    this.order.organizationId = this.sharedService.getUserIdSession();
    return this.http.get<OrderBean[]>(`${this.url}/globu/${this.order.organizationId}`);
  }

  saveNewOrder(order : OrderBean) {
    order.organizationId = this.sharedService.getOrganizationIdByUserSession();
     console.log(order);
    return this.http.post<OrderBean>(`${this.url}/sobos`,order);
  }

  deleteOrder(id: number) {
    return this.http.delete(`${this.url}/do/${id}`);
  }
}
