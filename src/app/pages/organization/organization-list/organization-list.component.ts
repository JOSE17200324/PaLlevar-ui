import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CompanyBean } from '../../../_model/CompanyBean';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { OrganizationService } from '../../../_service/organization.service';
import { OrganizationFormComponent } from '../organization-form/organization-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['id', 'ruc', 'nombre','actions'];
  dataSource: MatTableDataSource<CompanyBean>;/// tabla 
  titleProductList: string;
  constructor(
    private companyService:OrganizationService, private dialog:MatDialog, private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.titleProductList="Listar Organizaciones";
    this.companyService.mensajeCambio.subscribe(data => { // cuando actuqalizas o creas se muestra una notificacion
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });

    this.companyService.companyCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    //this.companyService.getListProduct().subscribe(data => {
    this.companyService.getListCompany().subscribe(data => {  
    //this.companyService.getListProductByOrganizationAndSucursal().subscribe(data => {  
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    },error =>{
      this.companyService.mensajeCambio.next("Error al mostrar compañia");
    });

  }
  public openDialog(company: CompanyBean) {
    let productSelect = company != null ? company : new CompanyBean();
    this.dialog.open(OrganizationFormComponent, {
      width: '600',
      height: '600',
      data: productSelect
    });
  }
  public delete(company:CompanyBean){
      this.companyService.deleteCompany(company.id).subscribe(data => {
        this.companyService.getListCompany().subscribe(data => {
          this.companyService.companyCambio.next(data);
          this.companyService.mensajeCambio.next("Se elimino con éxito");
        }, error =>{
          console.error(error);
          this.companyService.mensajeCambio.next("Error al mostrar listado de compañias");
        });
      },error =>{
        console.error(error);
        this.companyService.mensajeCambio.next("La organizacion que desea eliminar esta siendo usada");
      });
    }

}
