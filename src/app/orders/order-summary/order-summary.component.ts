import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Material, Table } from 'src/app/Model/app-models';
import { Materials, Orders } from 'src/app/Model/logic-models';
import { BOMfields } from 'src/app/new-insert/new-insert.component';
import { isNgTemplate } from '@angular/compiler';
import { table } from 'console';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  constructor(private http: HttpClient) { }

  public get_orders: Orders[] = [];

  public tableiCompanyInfoLabel: string[] = [
    "Bedrijf",
    "Contact persoon",
    "telefoon",
    "Email"
  ];
  public tablePriceInfoLabel: string[] = [
    "Profiel",
    "profielLengte",
    "Onderdelen",
    "Marge",
    "stuk totaal",
    "Aantal lijsten",
    "totaal",
    "Korting",
    "Net totaal"
  ];

  public get_bom: BOMfields[] = [];
  public get_materials: Materials[] = []

  public ordersUrl: string = "https://localhost:44387/api/orders";
  public bomUrl: string = "https://localhost:44387/api/orderbom";
  public materialsUrl: string = "https://localhost:44387/api/materials";

  ngOnInit(): void {
    const retVal = this.http.get(this.ordersUrl).subscribe
    (data => {this.get_orders = data as Orders[];
    }, (error: any) => {
      console.error(error);
    });

    this.http.get(this.bomUrl).subscribe
    (data => {this.get_bom = data as BOMfields[];
    }, (error: any) => {
      console.error(error);
    });

    this.http.get(this.materialsUrl).subscribe
    (data => {this.get_materials = data as Materials[];
    }, (error: any) => {
      console.error(error);
    });
  }

  defineOrders() : Orders[]{
    return this.get_orders?? [{ real_design_img_addr: "", schem_design_img_addr: ""}];
  }

  getInsertsPrice() {
    // table showing:
    // insert name  |   Spec  |   price   | discount
    

  }

  tableContents() : BomCompleteList[] {

    let tableContent: BomCompleteList[] = [];
    let usedMaterials: Material[] = [];

    for (let bomMaterial of this.get_bom) {
      for (let material of this.get_materials) {
        if (bomMaterial.itemId == material.itemId){
          usedMaterials.push({ ItemId: material.itemId, material_name: material.material_name, price: material.price, description: material.description});
        }
      }
    }

    for (let material of usedMaterials){
      for (let bomMaterial of this.get_bom){
        if (bomMaterial.itemId == material.ItemId){
          tableContent.push({ 
            itemId: material.ItemId,
            name: material.material_name,
            pricePerPart: material.price,
            amount: bomMaterial.amount,
            totalPrice: bomMaterial.amount*material.price
           });
        }
      }
    }
    console.log(tableContent)

    return tableContent?? [];
  }

}

export class ComponentsTable{
  label: string = "";
  content: string[] = [];
  price: number = 0;
}

export class BomCompleteList{
  itemId: string = ""; 
  name: string = ""; 
  pricePerPart: number = 0;
  amount: number = 0;
  totalPrice: number = 0;
}