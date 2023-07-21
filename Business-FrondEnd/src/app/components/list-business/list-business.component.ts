import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Business } from 'src/app/interface/business';
import { BusinessService } from 'src/app/services/business.service';


@Component({
  selector: 'app-list-business',
  templateUrl: './list-business.component.html',
  styleUrls: ['./list-business.component.css']
})
export class ListBusinessComponent implements AfterViewInit  {
  displayedColumns: string[] = ['nit', 'tradeName', 'phone', 'owner', 'city', 'opcions'];
  dataSource = new MatTableDataSource<Business>();
  loading: Boolean = false;
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _snackBar: MatSnackBar, private _businessService: BusinessService) {

   }

  getBusiness() {
    this.loading = true
    this._businessService.getBusiness().subscribe({
      next: (data) =>{
        this.loading = false
        this.dataSource.data = data
      },
      error: (e) => {
        this.loading = false
        alert('Ha ocurrido un error intenta mas Tarde')
      },
      complete: () => console.log('complete')      
    });
  }

  ngOnInit(): void { 
    this.getBusiness()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'items page'
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteBusiness(id: Number) {
    this.loading = true
    this._businessService.deleteBusiness(id).subscribe(()=>{
      this.messageSucceeded();
      this.loading = false;
      this.getBusiness()
    })

  }

  messageSucceeded(){
      this._snackBar.open('Business deleted', '', {
        duration: 3000,
      });
  }
}
