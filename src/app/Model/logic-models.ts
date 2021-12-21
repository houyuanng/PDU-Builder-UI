export class Inserts {
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

export class Process {
    process: string = "";
    price: number = 0;
}

export class Materials {
    itemId: string = "";
    material_name: string = "";
    price: number = 0;
    description: string = "";
}

export class Orders {
    order_id: number = 0;
    real_design_img_addr: string = "";
    schem_design_img_addr: string = "";
    length_in_mm: number = 0;
    BOM_addr: string = "";
    company_name: string = "";
    last_edit: string = "";
    xl_calculation_addr: string = "";
    insert_id_sequence_addr: string = "";
  }