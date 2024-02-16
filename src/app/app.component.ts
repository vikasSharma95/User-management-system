import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from './user.service';
import { AddUserComponent } from './add-user/add-user.component';
import { MatDialog} from '@angular/material/dialog';
import { DeleteConfirmationComponent, } from './delete-confirmation/delete-confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'role','edit', 'delete'];
  dataSource: MatTableDataSource<{}>;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
user:any[]=[]
  constructor(private UserService: UserService, public dialoge: MatDialog,
    private snackBar: MatSnackBar) {
    // Create 100 users
    this.user = this.UserService.user;

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.user);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  edit(item:any){
console.log(item);
 var formData = this.dialoge.open(AddUserComponent,{
  data: item
})
formData.afterClosed().subscribe((data:any) =>{
  console.log(data); 
  this.user.push(data)
  this.dataSource = new MatTableDataSource(this.user);
  this.dataSource.paginator = this.paginator;
})
  }

  delete(id:any){
console.log(id);

    const dialogRef = this.dialoge.open(DeleteConfirmationComponent,{
      data:{
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });
   

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
       if(confirmed){
        this.user.splice(this.user.findIndex(a => a.id === id) , 1)
        this.dataSource = new MatTableDataSource(this.user);
        this.dataSource.paginator = this.paginator;
       }
       
      }
    });
  }
  AddUser(){
    var formData = this.dialoge.open(AddUserComponent,{
      data: {id: 0, name:'', role:'',email:'',}
    })
    formData.afterClosed().subscribe((data:any) =>{
      data.id = new Date().getTime()
      console.log(data); 
      this.user.push(data)
      this.dataSource = new MatTableDataSource(this.user);
      this.dataSource.paginator = this.paginator;
    })
  }
}


