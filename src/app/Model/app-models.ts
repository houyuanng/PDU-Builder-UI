export class InsertInformation {
  insert_name: string = "";
  BOM_per_unit: string = "";
  length_in_mm: number = 0;
  category: string = "";
  specification_txt_addr: string = "";
  profileConstraint: string = "";
  positionOnPDU: string = "";
  technicalConstraint: string = "";
  processes_file_addr: string = "";
}

export class MaterialForInsert {
  material_name: string = "";
  amount: string = "";
}

export class Material {
  ItemId: string = "";
  material_name: string = "";
  price: number = 0;
  description: string = "";
}

export class Category{
  category: string = "";
  thumbnail_addr: string = "";
}

// minutes should change to number when formControl is added
export class Process{
  process: string = "";
  minutes: string = "";
}

export class ProfileConstraint{
  profile: string = "";
  selected: boolean = false;
}
  
// design
export class InsertsPerCategory {
  category: string = "";
  inserts: string[] = [];
}

export class QandA {
  question: string = "";
  answers: string[] = [];
}

export class Content {
  name: string = "";
}

export class InsertFormat {
  insertName: string = "";
  profileConstraint: string[] = [];
  category: string = "";
  question: string[] = [];
  answer: string[] = [];
}

// design/order-information
export class OrderInformation {
  orderNumber: number = 0;
  companyName: string = "";
  contactPerson: string = "";
  amount: number = 0;
  description: string = "";
  phoneNumber: number = 0;
  email: string = "";
}

export class iOrders{
  orderId: number = 0;
  companyName: string = "";
  lastEdit: Number = 0;
  viewOrderString: string = "";
  viewBomString: string = "";
  viewSummaryString: string = "";
  delete: boolean = false;
}

export class Table {
  names: string[] = [];
  content: string[] = [];
  prices: number[] = [];
}