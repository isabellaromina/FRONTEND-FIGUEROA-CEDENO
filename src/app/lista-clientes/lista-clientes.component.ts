import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-clientes',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './lista-clientes.component.html',
  styleUrl: './lista-clientes.component.css'
})
export class ListaClientesComponent {

  
  numeroClientes: number=0;
  listaDatosPersona: any;

  constructor(private route: ActivatedRoute) {}

  
  ngOnInit(): void {
    this.numeroClientes = +this.route.snapshot.paramMap.get('valor')!;
    


  }

}
