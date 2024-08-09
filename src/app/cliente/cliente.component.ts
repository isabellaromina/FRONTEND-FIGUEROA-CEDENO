
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule ,ValidationErrors
  ,AbstractControl,ValidatorFn, 
  FormsModule
 } from '@angular/forms';
import { DatosPersona } from '../model/datosPersona';
import { Genero } from '../model/genero';  
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../interface/cliente';


@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [ RouterLink, RouterOutlet,
    RouterLink, ReactiveFormsModule,FormsModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {

  id! : number;
nombre!: string;
apellido!: string;
telefono!: string;
correo!: string;
direccion!: string;
genero!: string;

  ngOnInit(): void{this.obtenerclientes();

  }
  

  mensaje!: string

  listaCliente: Cliente []=[];
  listaDatosPersona: DatosPersona[]=[];
  listaTipoVacaciones: Genero[]= [
    {id:1 ,valor:'Masculino'},
    {id:2 ,valor:'Femenino'},
    {id:3 ,valor:'otro'},
    


  ];
  
  formUser: FormGroup;


  constructor(private fb: FormBuilder,
    private _clienteService: ClienteService
  ) {

    this.formUser = this.fb.group({
      cedula: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono:['', Validators.required],
      fechaInicio:['', Validators.required],
      direccion:['', Validators.required],
      genero:['', Validators.required],
   

    });
  }



  

  // Método para calcular el total de solicitudes
  totalSolicitudes(): number {
    return this.listaDatosPersona.length;
  }

obtenerclientes(){
  this._clienteService.mostrarCliente().subscribe({
    next : data => {
      console.log(data);
      this.listaCliente=data;
    },
    error : error => {
      alert("Ocurrio un error");
    },
    complete : () => {
      console.info('Obtencion exitosa');
    }
  });
}
  agregarCliente(){
    const cliente : Cliente ={
      nombre: this.nombre,
      apellido: this.apellido,
      telefono: this.telefono,
      correo: this.correo,
      direccion: this.direccion,
      genero: this.genero,
  
    }
    this._clienteService.agregarCliente(cliente).subscribe({
      next : data =>{
        console.log(data);
      },
      error : error =>{
        alert("Ocurrio un error");
      },
      complete : () =>{
        console.info('Agregar cliente correcto');
        alert("Agregar cliente correcto");
      }
    });
    
    this.formUser.reset();
    }


    actualizarCliente (){
      const cliente : Cliente ={
        nombre: this.nombre,
        apellido: this.apellido,
        telefono: this.telefono,
        correo: this.correo,
        direccion: this.direccion,
        genero: this.genero,

      }
      this._clienteService.modificarCliente(cliente).subscribe({
        next : data => {
          console.log(data);
        },
        error : error => {
          alert ("ocurrio un error");
        },
        complete : () => {
          console.info('Modificacion completa');
        }
      });
      this.formUser.reset();
      }

  existeDatos(nombre: string): boolean{

    return this.listaDatosPersona.some(datos => datos.cedula === nombre);
  }

  eliminarCliente(id? : number){
    if (id == undefined){
      alert('El Id es indefinido');
      return;
    }
    this._clienteService.eliminarCliente(id).subscribe({
    next : data => {
      console.log('cliente Eliminado: ',data);
      this.obtenerclientes();
    },
    error : error => {
      alert ("Ocurrio un error");
    },
    complete : () => {
      console.info('Eliminacion completada');
    }
    });
    }


  agregarDatos(){

    if(this.existeDatos(this.formUser.value.cedula)){
      this.mensaje = "El elemento ya existe";
    }else{

      //Se tomo los datos del formulario
      const datos: DatosPersona = {
        
        cedula:this.formUser.value.cedula,
        apellidos:this.formUser.value.apellidos,
        telefono:this.formUser.value.telefono,
        fechaInicio:this.formUser.value.fechaInicio,
        direccion:this.formUser.value.direccion,
        genero:this.formUser.value.genero,


     } 

     //agregar a la lista
     this.listaDatosPersona.push(datos);
      
     //limpiar el formulario
     this.formUser.reset();
    }

  }

   eliminarPersona( nombre:string){
    return this.listaDatosPersona = this.listaDatosPersona.filter(encontrado=>encontrado.cedula!== nombre);
  }

  


}
