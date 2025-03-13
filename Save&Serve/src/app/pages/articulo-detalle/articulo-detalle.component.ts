import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,RouterModule } from '@angular/router';
import { ArticuloService } from '../../services/articuloService/articulo.service';
import { Articulo } from '../../models/articulo.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-articulo-detalle',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './articulo-detalle.component.html',
    styleUrls: ['./articulo-detalle.component.scss']
})
export class ArticuloDetalleComponent implements OnInit {
    articulo: Articulo | undefined;

    constructor(
        private route: ActivatedRoute,
        private articuloService: ArticuloService
    ) { }
    ngOnInit(): void {

        this.route.params.subscribe(params => {
            const id = params['idArticulo'];
            console.log('ID recibido:', id);

            if (id) {
                this.articuloService.obtenerArticuloPorId(+id).subscribe(
                    (data) => {
                        this.articulo = data;
                        console.log('Artículo recibido:', data);
                    },
                    (error) => console.error('Error al obtener el artículo', error)
                );
            }
        });
    }
    getImagenUrl(imagen: string): string {
        if (!imagen) {
          return 'assets/img/default.jpg'; 
        }
      
        if (imagen.startsWith('http') || imagen.startsWith('assets') || imagen.startsWith('data:image')) {
          return imagen;
        }
      
        return `http://localhost:9000${imagen}`;
      }
}
