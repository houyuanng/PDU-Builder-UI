import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  content = ["one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three"];

  constructor() { }

  ngOnInit(): void {
  }

}
