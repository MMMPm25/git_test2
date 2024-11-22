import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HomeService } from '../../Services/home.service';
import { HomeModel } from '../../Model/home';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe, CommonModule, NgStyle } from '@angular/common';
import { InputMask } from 'primeng/inputmask';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [RouterLink,FormsModule,AsyncPipe,NgStyle,CommonModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent implements OnInit {
  pList: HomeModel[] = [];
  searchQuery: string = '';  // Store the search query
  filteredUserList: HomeModel[] = [];
  product: HomeModel = {
    pname: "",
    price: "",
  }
  editMode: boolean = false;
  ngOnInit(): void {
    this.getPList();

  }
  constructor(private _homeService: HomeService) { }
  getPList() {//Show Product
    this._homeService.getP().subscribe((res) => {
      this.pList = res;
      this.filteredUserList = res;  // Direct assignment ensures filteredUserList matches the fetched data
    });
  }





  private router = inject(Router)
  logout() {
    sessionStorage.clear();
    this.router.navigate(['home']);
  }

  onDelete(id:any) {
    const iscon = confirm('Are you sure yo delete this product?');
    if(iscon){
      this._homeService.deleteP(id).subscribe((res)=>{
        alert("Delete Product Success.");
        this.getPList();
      })
    }
  }
  onSubmit(form: NgForm): void {
    debugger;
    if (this.editMode) {
      console.log(form);
      this._homeService.updateP(this.product).subscribe((res) => {
        this.getPList();
        this.editMode = false;
        form.reset();
        alert("Success");
      });
    } else {
      console.log(form);
      this._homeService.addP(this.product).subscribe((res) => {
        this.getPList();
        form.reset();
        alert("Success");
      });
    }

  }


  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredUserList = [...this.pList];  // Ensure fresh copy of userList is assigned
    } else {
      this.filteredUserList = this.pList.filter(p =>
        p.pname.toLowerCase().includes(this.searchQuery.toLowerCase())

      );
    }
  }
  trackByIndex(index: number, item: any): number {
    return index;  // Just return the index as the identifier for simplicity
  }
  onEdit(pdata: HomeModel) {
    this.product = pdata;
    this.editMode = true;
  }

  onReset(form: NgForm) {
    form.reset();
    this.editMode = false;
    this.getPList();
  }

}
